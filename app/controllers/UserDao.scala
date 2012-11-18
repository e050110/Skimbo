package controllers;

import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.Play.current
import scala.concurrent.{ ExecutionContext, Future }
import play.api.libs.iteratee.{ Iteratee, Enumerator }
import models.User
import play.api.libs.concurrent.futureToPlayPromise
import play.modules.reactivemongo._
import reactivemongo.api._
import reactivemongo.bson._
import reactivemongo.bson.handlers.DefaultBSONHandlers._
import reactivemongo.core.protocol.Query
import models.user.Column
import services.endpoints.JsonRequest._

object UserDao {

  val log = Logger(UserDao.getClass())
  val db = ReactiveMongoPlugin.db
  val collection = db("users")

  def add(user: models.User)(implicit context: scala.concurrent.ExecutionContext) = {
    implicit val writer = User.UserBSONWriter
    collection.insert(user)
  }

  def findAll()(implicit context: scala.concurrent.ExecutionContext): Future[List[User]] = {
    implicit val reader = User.UserBSONReader
    val query = BSONDocument()
    val found = collection.find(query)
    found.toList
  }

  def findOneById(id: String)(implicit context: scala.concurrent.ExecutionContext): Future[Option[User]] = {
    implicit val reader = User.UserBSONReader
    val query = BSONDocument("accounts.id" -> new BSONString(id))
    collection.find(query).headOption()
  }

  def update(user: models.User)(implicit context: scala.concurrent.ExecutionContext) = {
    val query = BSONDocument("accounts.id" -> new BSONString(user.accounts.head.id))
    collection.update(query, user)
  }
  
  def updateColumn(user: models.User, title:String, column:Column)(implicit context: scala.concurrent.ExecutionContext) = {
    deleteColumn(user, title)
    val query = BSONDocument("accounts.id" -> new BSONString(user.accounts.head.id))
    val update = BSONDocument("$push" -> BSONDocument("columns" -> Column.toBSON(column)))
    collection.update(query, update)
  }

  def findByIdProvider(provider: String, id: String)(implicit context: scala.concurrent.ExecutionContext): Future[Option[User]] = {
    implicit val reader = User.UserBSONReader
    val query = BSONDocument(
      "distants.social" -> new BSONString(provider),
      "distants.id" -> new BSONString(id))
    collection.find(query).headOption()
  }

  def deleteColumn(user: models.User, columnTitle: String)(implicit context: scala.concurrent.ExecutionContext) = {
    val query = BSONDocument("accounts.id" -> new BSONString(user.accounts.head.id))
    val update = BSONDocument("$pull" -> BSONDocument("columns" -> BSONDocument("title" -> new BSONString(columnTitle))))
    collection.update(query, update)
  }
  
  def delete(user:User)(implicit context: scala.concurrent.ExecutionContext) = {
    collection.remove(user)
  }

}