package controllers.dev;

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.future

import models.user.SkimboToken
import play.api.Play.current
import play.api.libs.json.Json
import play.api.mvc.Action
import play.api.mvc.Controller
import services.auth.ProviderDispatcher
import services.auth.providers.Twitter
import services.dao.UserDao
import services.endpoints.Endpoints
import services.security.Authentication

object Util extends Controller with Authentication {

  def testRes(service: String) = Action { implicit request =>
    val idUser = request.session.get("id").get
    Async {
      Endpoints.getConfig(service).flatMap { config =>
        Endpoints.genererUrl(service, Seq.empty, None).map { url =>
          config.provider.fetch(idUser, url).get.map { response =>
            Ok(config.provider.resultAsJson(response))
          }
        }
      }.getOrElse(future(BadRequest("Service not found")))
    }
  }
  
  def testSkimboRes(service: String) = Action { implicit request =>
    val idUser = request.session.get("id").get
    Async {
      Endpoints.getConfig(service).flatMap { config =>
        Endpoints.genererUrl(service, Seq.empty, None).map { url =>
          config.provider.fetch(idUser, url).get.map { response =>
            val res = config.parser.get.getSkimboMsg(response, config.provider)
            Ok(res.map(Json.toJson(_)).toString)
          }
        }
      }.getOrElse(future(BadRequest("Service not found")))
    }
  }

  def staticRes() = Action { implicit request =>
    val idUser = request.session.get("id").get
    import scala.concurrent.ExecutionContext.Implicits.global
    Async {
      Endpoints.getConfig("facebook.notification").flatMap { config =>
        Endpoints.genererUrl("facebook.notification", Seq.empty, None).map { url =>
          config.provider.fetch(idUser, url).get.map { response =>
            Ok(config.provider.resultAsJson(response))
          }
        }
      }.getOrElse(future(BadRequest("Service not found")))
    }
  }
  
  def urlTest(id:String) = Action { implicit request =>
    val idUser = request.session.get("id").get
    import scala.concurrent.ExecutionContext.Implicits.global
    Async {
      Twitter.fetch(idUser, "https://api.twitter.com/1.1/statuses/show.json?id="+id).withTimeout(6000).get.map { response =>
        Ok(response.json)
      }
    }
  }

  def deleteUser() = Authenticated { user =>
    request =>
      Async {
        UserDao.findOneById(user.accounts.head.id).map { user =>
          user.map { u =>
            UserDao.delete(u.accounts.head.id)
            Ok("user deleted")
          }.getOrElse(BadRequest("Service not found"))
        }
      }
  }

  def deleteAllUsers(pwd: String) = Authenticated { user =>
    request =>
      if (pwd == current.configuration.getString("pwdDelAllDb").get) {
        UserDao.findAll.foreach { users =>
          users foreach { user =>
            UserDao.delete(user.accounts.head.id)
          }
        }
      }
      Ok("users deleted")
  }

  def userDistantRes(providerName: String) = Action { implicit request =>
    val idUser = request.session.get("id").get
    Async {
      ProviderDispatcher(providerName).map { provider =>
        provider.fetch(idUser, provider.getUserInfosUrl.get).get.map { response =>
          Ok(response.json)
        }
      }.getOrElse(future(Ok("Service not found")))
    }
  }

  def userRes(providerName: String) = Action { implicit request =>
    val idUser = request.session.get("id").get
    import scala.concurrent.ExecutionContext.Implicits.global
    Async {
      ProviderDispatcher(providerName).map { provider =>
        provider.getUser(idUser).map { response =>
          Ok(Json.toJson(response))
        }
      }.getOrElse(future(Ok("Provider not found")))
    }
  }

  def invalidToken(providerName: String, pwd: String) = Action { implicit request =>
    import scala.concurrent.ExecutionContext.Implicits.global
    if (pwd == current.configuration.getString("pwdDelAllDb").get) {
      ProviderDispatcher(providerName).map { provider =>
        UserDao.findAll().map { users =>
          val userWithProvider = users.filter { user =>
            user.distants.exists { distant =>
              distant.socialType == providerName
            }
          }
          userWithProvider.map { user =>
            UserDao.setToken(user.accounts.head.id, provider, SkimboToken("1"), None);
          }
        }
      }
    }
    Ok("ok")
  }
  
  def myInfos() = Action { implicit request =>
    val idUser = request.session.get("id").get
    import scala.concurrent.ExecutionContext.Implicits.global
    Async {
      UserDao.findOneById(idUser).map { user =>
        user.map(u => Ok(models.User.toJson(u))).getOrElse(Ok("error"))
      }
    }
  }

}
