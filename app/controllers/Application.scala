package controllers

import models.Service
import play.api.Logger
import play.api.mvc._
import services.actors.UserInfosActor
import services.auth.ProviderDispatcher
import services.security.AuthenticatedAction.Authenticated
import views.html._
import services.auth.providers._
import models.User

object Application extends Controller {

  def index = Action { implicit request =>
    request.session.get("id")
      .map(_ => Ok(views.html.unified()))
      .getOrElse(Ok(views.html.index(Service.list)))
  }

  def authenticate(providerName: String) = Action { implicit request =>
    val providerOpt  = ProviderDispatcher(providerName);
    val userOpt = request.session.get("id").map(User.create)

    providerOpt.map(provider => 
      userOpt.map(_ => provider.auth(routes.Application.closePopup))
      .getOrElse(provider.auth(routes.Application.index)))
    .getOrElse(BadRequest)
  }

  def logout() = Authenticated { action =>
    UserInfosActor.killActorsForUser(action.user.accounts.last.id)
    Ok(views.html.index(Service.list(action.request))).withNewSession
  }
  
  def closePopup() = Action {
    Ok(views.html.popupEndAuthentication())
  }

}