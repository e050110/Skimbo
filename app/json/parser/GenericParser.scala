package json.parser

import json.Skimbo
import play.api.libs.json._

trait GenericParser {
  def cut(json:String):List[JsValue] = cut(Json.parse(json))
  def cut(json: JsValue):List[JsValue] = json.as[List[JsValue]]
  def asSkimbo(json:JsValue): Option[Skimbo]
  def nextSinceId(sinceId:String, sinceId2:String): String = sinceId 
}