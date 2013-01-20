package services.actors;

import scala.Option.option2Iterable
import scala.concurrent.duration.DurationInt
import scala.util.Failure
import scala.util.Success
import org.joda.time.DateTime
import akka.actor.Actor
import akka.actor.ActorSystem
import akka.actor.Props
import akka.actor.ReceiveTimeout
import akka.actor.actorRef2Scala
import parser.GenericParser
import models.command.Command
import models.command.Error
import models.command.TokenInvalid
import models.user.Column
import play.api.Logger
import play.api.UnexpectedException
import play.api.http.Status
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.iteratee.Concurrent
import play.api.libs.iteratee.Enumerator
import play.api.libs.iteratee.Iteratee
import play.api.libs.json.JsValue
import play.api.libs.json.Json
import play.api.libs.json.Json.toJsFieldJsValueWrapper
import play.api.mvc.RequestHeader
import play.libs.Akka
import services.auth.GenericProvider
import services.endpoints.EndpointConfig
import services.endpoints.Endpoints
import services.endpoints.JsonRequest.UnifiedRequest
import models.Skimbo

sealed case class Dead(idUser: String)
sealed case class DeadColumn(idUser: String, columnTitle: String)
sealed case class DeadProvider(idUser: String, providerName: String)

object ProviderActor {

  private val system: ActorSystem = ActorSystem("providers");

  def create(channel: Concurrent.Channel[JsValue], userId: String, column: Column)(implicit request: RequestHeader) {
    column.unifiedRequests.foreach { unifiedRequest =>
      val endpoint = for (
        provider <- Endpoints.getProvider(unifiedRequest.service);
        time <- Endpoints.getConfig(unifiedRequest.service).map(_.delay);
        parser <- Endpoints.getConfig(unifiedRequest.service).map(_.parser)
      ) yield (provider, time, parser)

      endpoint match {
        case Some((provider, time, parser)) => {
          val actor = system.actorOf(Props(
            new ProviderActor(channel, provider, unifiedRequest, time, userId, parser, column)))
          system.eventStream.subscribe(actor, classOf[Dead])
          system.eventStream.subscribe(actor, classOf[DeadColumn])
          system.eventStream.subscribe(actor, classOf[Ping])
          system.eventStream.subscribe(actor, classOf[DeadProvider])
        }
        case _ => Logger.error("Provider or Url not found for " + unifiedRequest.service + " :: args = " + unifiedRequest.args)
      }

    }
  }

  def killActorsForUser(userId: String) = {
    system.eventStream.publish(Dead(userId))
  }

  def killActorsForUserAndColumn(userId: String, columnTitle: String) = {
    system.eventStream.publish(DeadColumn(userId, columnTitle))
  }

  def killProvider(idUser: String, providerName: String) = {
    system.eventStream.publish(DeadProvider(idUser, providerName))
  }

}

class ProviderActor(channel: Concurrent.Channel[JsValue],
  provider: GenericProvider,
  unifiedRequest: UnifiedRequest,
  delay: Int,
  idUser: String,
  parser: Option[GenericParser] = None,
  column: Column)(implicit request: RequestHeader) extends Actor {

  val log = Logger(ProviderActor.getClass())
  var sinceId = ""
  var sinceDate = new DateTime().minusYears(1)

  val scheduler = Akka.system.scheduler.schedule(0 second, delay second) {
    self ! ReceiveTimeout
  }
  
  override def postStop() = {
    scheduler.cancel
  }

  def receive = {
    case ReceiveTimeout => {
      log.info("[" + unifiedRequest.service + "] Fetching")

      if (provider.hasToken(request) && parser.isDefined) {
        val optSinceId = if (sinceId.isEmpty) None else Some(sinceId)
        val url = Endpoints.genererUrl(unifiedRequest.service, unifiedRequest.args.getOrElse(Map.empty), optSinceId);
        val config = Endpoints.getConfig(unifiedRequest.service).get

        log.info("[" + unifiedRequest.service + "] " + url.get)

        if (url.isDefined) {
          provider.fetch(url.get).withTimeout(config.delay * 1000).get.onComplete {
            case Success(response) => {

              if (response.status != Status.OK) {
                log.error("[" + unifiedRequest.service + "] HTTP Error " + response.status)
                log.info(response.body.toString)
                if (provider.isInvalidToken(response)) {
                  channel.push(Json.toJson(TokenInvalid(provider.name)))
                  self ! Dead(idUser)
                } else if (provider.isRateLimiteError(response)) {
                  channel.push(Json.toJson(Error(provider.name, "Rate limite exceeded on")))
                } else {
                  channel.push(Json.toJson(Error(provider.name, "Error in column "+column.title+" with")))
                  self ! Dead(idUser)
                }
              } else {
                val skimboMsgs = parser.get.getSkimboMsg(response, provider)
                if (skimboMsgs.isEmpty) {
                  log.error("[" + unifiedRequest.service + "] Unexpected result")
                  log.info(response.body.toString)
                  channel.push(Json.toJson(Error(provider.name, "Unexpected result on")))
                } else {
                  val listJson = if (config.manualNextResults || config.mustBeReordered) reorderMessagesByDate(skimboMsgs.get) else skimboMsgs.get
                  val messagesEnumerators = Enumerator.enumerate(listJson)
                  val pusherIteratee = pushNewMessagesIteratee(config)
                  messagesEnumerators(pusherIteratee)
                }
              }
            }

            case Failure(error) => {
              log.error("[" + unifiedRequest.service + "] Timeout HTTP", error)
              channel.push(Json.toJson(Error(provider.name, "Timeout on")))
            }
          }
        } else {
          log.error("[" + unifiedRequest.service + "] Bad url" + unifiedRequest.args)
          self ! Dead(idUser)
        }
      } else if (!provider.hasToken(request)) {
        channel.push(Json.toJson(TokenInvalid(provider.name)))
        log.info("[" + unifiedRequest.service + "] No Token")
        self ! Dead(idUser)
      } else {
        log.error("Provider " + provider.name + " havn't parser for " + unifiedRequest.service)
        channel.push(Json.toJson(Error(provider.name, "No parser on")))
        self ! Dead(idUser)
      }
    }

    case Dead(id) => {
      if (id == idUser) {
        scheduler.cancel()
        context.stop(self)
      }
    }
    case DeadColumn(idUser: String, columnTitle: String) => {
      if (columnTitle == column.title) {
        self ! Dead(idUser)
      }
    }
    case DeadProvider(id: String, providerName: String) => {
      if (providerName == provider.name && id == idUser) {
        self ! Dead(idUser)
      }
    }
    case e: Exception => throw new UnexpectedException(Some("Incorrect message receive"), Some(e))
  }

  def reorderMessagesByDate(msgs: List[Skimbo]) = {
    msgs.sortWith((msg1, msg2) => msg1.createdAt.isBefore(msg2.createdAt))
  }

  def pushNewMessagesIteratee(config: EndpointConfig) = {
    Iteratee.foreach { skimboMsg: Skimbo =>
      val msg = Json.obj("column" -> column.title, "msg" -> skimboMsg)
      if (config.manualNextResults) {
        if (skimboMsg.createdAt.isAfter(sinceDate)) {
          channel.push(Json.toJson(Command("msg", Some(msg))))
          sinceDate = skimboMsg.createdAt
        }
      } else {
        sinceId = parser.get.nextSinceId(skimboMsg.sinceId, sinceId)
        channel.push(Json.toJson(Command("msg", Some(msg))))
      }
    }
  }

}