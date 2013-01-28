package services.auth.actions

import java.util.UUID

import play.api.mvc._

trait SecurityProvider {

  /**
   * Execute authentication process with this provider and redirect to `redirectRoute`
   */
  def auth(redirectRoute: Call)(implicit request: RequestHeader): Result

  /**
   * Retrieve security token
   */
  def getToken(implicit request: RequestHeader): Option[Any] = None

  /**
   * Delete security token
   */
  def deleteToken(implicit request: RequestHeader)

  /**
   * Assign unique ID to client after authentication
   */
  protected def generateUniqueId(session: Session) = {
    session + ("id" -> session.get("id").getOrElse(UUID.randomUUID().toString))
  }
  
  /**
   * Has the client a token on this service
   */
  def hasToken(implicit request: RequestHeader) = getToken.isDefined

}