package services.auth.providers

import services.auth._
import play.api.mvc.RequestHeader
import play.api.libs.ws.WS
import play.api.Logger
import org.apache.commons.codec.binary.Base64.encodeBase64
import models.user.ProviderUser
import services.commands.CmdToUser
import models.user.SkimboToken

object Reddit extends OAuth2Provider {

  override val name = "reddit"
  override val namespace = "rd"
    
  override def additionalAccreditationParameters = Map("duration" -> "permanent")
  override val permissions = Seq("identity", "modposts")
  
  override protected def fetchAccessTokenResponse(code: String)(implicit request: RequestHeader) = {
    val data = Map(
      "code" -> code,
      "redirect_uri" -> authRoute.absoluteURL(false),
      "grant_type" -> "authorization_code")

    var url = WS
      .url(accessTokenUrl)
      .withQueryString(data.toSeq: _*)
      .withAuth(clientId, secret, com.ning.http.client.Realm.AuthScheme.BASIC)
    url.post("")
  }

  override def processToken(response: play.api.libs.ws.Response) = { 
    Token((response.json \ "access_token").asOpt[String], 
        (response.json \ "expires_in").asOpt[Int],
        (response.json \ "refresh_token").asOpt[String])
  }
  
  override def fetch(idUser: String, url: String) = {
    val token = "bearer "+getToken(idUser).get.token
    WS.url(url)
      .withHeaders(("Authorization" -> token), ("user-agent" -> "skimbo by /u/skimbo34"))
  }
  
  override def distantUserToSkimboUser(idUser: String, response: play.api.libs.ws.Response): Option[ProviderUser] = {
    if(isInvalidToken(idUser, response)) {
      CmdToUser.sendTo(idUser, models.command.TokenInvalid(name))
      None
    } else {
      try {
        val json = response.json
        val id = (json \ "id").as[String]
        val username = (json \ "name").asOpt[String]
        val name = (json \ "name").asOpt[String]
        val description = Some("")
        val profileImage = None
        Some(models.user.ProviderUser(
            id, 
            Reddit.name, 
            Some(SkimboToken(getToken(idUser).get.token, None)), 
            username, 
            name, 
            description, 
            profileImage))
      } catch {
        case t:Throwable => {
          Logger("RedditProvider").error("Error during fetching user details Reddit "+t.getMessage())
          Logger("RedditProvider").error(response.body.toString())
          None
        }
      }
    }
  }
    
}