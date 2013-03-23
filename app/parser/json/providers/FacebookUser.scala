package parser.json.providers

import play.api.Logger
import play.api.mvc.RequestHeader
import services.auth.providers.Facebook
import models.user.SkimboToken
import parser.json.GenericJsonParserUser
import play.api.libs.json.JsValue

case class FacebookUser(
    id: String,
    name: String
)

object FacebookUser extends GenericJsonParserUser {

  override def cut(json: JsValue) = super.cut(json \ "data")
  
  override def asProviderUser(json: JsValue)(implicit request: RequestHeader): Option[models.user.ProviderUser] = {
      val id = (json \ "id").as[String]
      val name = (json \ "name").asOpt[String]
      val picture = (json \ "picture" \ "data" \ "url").asOpt[String]
      println("FACEBOOK IMAGE == "+json.toString)
      Some(models.user.ProviderUser(
          id, 
          Facebook.name, 
          Some(SkimboToken(Facebook.getToken.get.token, None)), 
          name, 
          name, 
          None, 
          picture))
  }

}