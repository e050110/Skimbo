package services.auth.providers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import services.auth._
import models.user.ProviderUser
import models.user.SkimboToken
import parser.json.PathDefaultReads
import play.api.libs.functional.syntax._
import java.net.URLEncoder
import parser.json.providers.GoogleplusUser
import services.commands.CmdToUser
import play.api.libs.ws.WS
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import services.dao.UserDao
import services.commands.CmdFromUser
import services.actors.UserInfosActor
import models.command.NewToken

object GooglePlus extends OAuth2Provider {

  override val name = "googleplus"
  override val namespace = "gp"
  override val method = Post
  override val permissionsSep = " "
  override val permissions = Seq(
    "https://www.googleapis.com/auth/userinfo.email", // View your email address
    "https://www.googleapis.com/auth/plus.login") // Know who you are on Google

  override def additionalAccreditationParameters = 
    Map("request_visible_actions" -> "http://schemas.google.com/AddActivity",
        "approval_prompt" -> "force",
        "access_type" -> "offline")
    
  override def processToken(response: play.api.libs.ws.Response) = 
    Token((response.json \ "access_token").asOpt[String], 
        (response.json \ "expires_in").asOpt[Int],
        (response.json \ "refresh_token").asOpt[String])
  
  override def distantUserToSkimboUser(idUser: String, response: play.api.libs.ws.Response): Option[ProviderUser] = {
    if(isInvalidToken(idUser, response)) {
      CmdToUser.sendTo(idUser, models.command.TokenInvalid(name))
      None
    } else {
      try {
        GoogleplusUser.asProviderUser(idUser, response.json)
      } catch {
        case t:Throwable => {
          Logger("G+Provider").error("Error during fetching user details G+ "+t.getMessage())
          Logger("G+Provider").error(response.json.toString)
          None
        }
      }
    }
  }
  
  override def isInvalidToken(idUser:String, response: play.api.libs.ws.Response): Boolean = {
    if(response.status == 401) {
      val data = Map(
        "client_id" -> clientId,
        "client_secret" -> secret,
        "grant_type" -> "refresh_token",
        "refresh_token" -> getToken(idUser).get.secret.get)
  
      val req = WS.url(accessTokenUrl).withHeaders(accessTokenHeaders: _*)
  
      val res = Await.result(req.post(data.mapValues(Seq(_))), Duration("5 seconds"))
      println("GooglePlusProvider :: isInvalidToken :: "+res.body.toString)
      processTokenSafe(res) match {
        // Provider return token
        case Token(Some(token), _, refresh) => {
          UserDao.setToken(idUser, this, SkimboToken(token, refresh))
          CmdFromUser.interpretCmd(idUser, NewToken.asCommand(this))
          UserInfosActor.refreshInfosUser(idUser, this)
          UserInfosActor.restartProviderColumns(idUser, this)
          false
        }
        // Provider return nothing > an error has occurred during authentication
        case _ =>
          true
      }
    } else {
      false
    }
  }
  
}

