import * as Realm from "realm-web";
const app = Realm.getApp("managementapp-ugznc");
const mongo = app.currentUser.mongoClient("mongodb-atlas");

export const propertyCollection = mongo
  .db("Management")
  .collection("Properties");

export const peopleCollection = mongo.db("Management").collection("People");

export const usersCollection = mongo.db("Management").collection("Users");

export const questionsCollection = mongo
  .db("Management")
  .collection("Questions");
