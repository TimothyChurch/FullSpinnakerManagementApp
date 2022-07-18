import * as Realm from "realm-web";
const app = Realm.getApp("managementapp-ugznc");

export async function useMongodb() {
  const mongo = app.currentUser.mongoClient("mongodb-atlas");
  const data = await mongo.db("Management").collection("Properties").find();
  console.log(data);
  return data;
}
