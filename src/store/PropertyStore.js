import { ObjectId } from "bson";
import { defineStore } from "pinia";
import * as Realm from "realm-web";
const app = Realm.getApp("managementapp-ugznc");
const mongo = app.currentUser.mongoClient("mongodb-atlas");
export const usePropertyStore = defineStore("PropertyStore", {
  state: () => ({
    properties: [],
    property: {},
    details: {},
  }),
  getters: {},
  actions: {
    async getProperties() {
      if (this.properties.length == 0) {
        const data = await mongo
          .db("Management")
          .collection("Properties")
          .find();
        this.properties = data;
      }
    },
    async getProperty(id) {
      console.log(id);
      const propId = new ObjectId(id);
      this.property = await mongo
        .db("Management")
        .collection("Properties")
        .findOne({ _id: propId });
    },
    getPropertyName(id) {
      let name = "";
      this.properties.forEach((property) => {
        if (property._id.toString() === id.toString()) {
          name = property.Name;
        }
      });
      return name;
    },
    getDetails() {
      return;
    },
  },
});
