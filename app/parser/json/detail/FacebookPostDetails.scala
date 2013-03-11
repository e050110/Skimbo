package parser.json.detail

import parser.json.GenericJsonParser
import play.api.libs.json.JsValue
import models.Skimbo
import parser.json.providers.FacebookWallParser

object FacebookPostDetails extends GenericJsonParser {

  override def asSkimbo(json: JsValue): Option[Skimbo] = FacebookWallParser.asSkimbo(json)
  
  override def cut(json: JsValue) = List(json)
  
}