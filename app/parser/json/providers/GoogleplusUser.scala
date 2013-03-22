package parser.json.providers

import play.api.Logger
import play.api.mvc.RequestHeader
import services.auth.providers.GooglePlus
import models.user.SkimboToken
import parser.json.GenericJsonParserUser
import play.api.libs.json.JsValue

object GoogleplusUser extends GenericJsonParserUser {

  override def cut(json: JsValue) = super.cut(json \ "items")
  
  override def asProviderUser(json: JsValue)(implicit request: RequestHeader): Option[models.user.ProviderUser] = {
    val id = (json \ "id").as[String]
    val username = (json \ "displayName").asOpt[String]
    val name = (json \ "name" \ "familyName").asOpt[String]
    val description = Some("")
    val profileImage = (json \ "image" \ "url").asOpt[String]
    Some(models.user.ProviderUser(
        id, 
        GooglePlus.name, 
        Some(SkimboToken(GooglePlus.getToken.get.token, None)), 
        username, 
        name, 
        description, 
        profileImage))
  }
  
}