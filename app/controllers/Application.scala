package controllers

import play.api.libs.EventSource
import play.api.mvc._
import services.actors.ProviderActor
import services.auth.ProviderDispatcher
import services.auth.providers._

object Application extends Controller {

  def index = Action { implicit request =>
    Ok(views.html.unified())
  }

  def authenticate(providerName: String) = Action { implicit request =>
    ProviderDispatcher(providerName).map(provider =>
      provider.auth(routes.Application.index)).getOrElse(BadRequest)
  }

  def testActor2() = Action { implicit request =>

    val endpoints = Seq(
      (Twitter, "http://dev.studio-dev.fr/test-ws-json.php?nom=twitter", 2),
      (Facebook, "http://dev.studio-dev.fr/test-ws-json.php?nom=facebook", 5),
      (Viadeo, "http://dev.studio-dev.fr/test-ws-json.php?nom=viadeo", 3))

    val enumerator = ProviderActor(endpoints);
    // -> to Skimbo 
    // -> filter en fonction des déjà vus
    // -> to Json
    Ok.feed(enumerator &> EventSource()).as("text/event-stream")
  }

}