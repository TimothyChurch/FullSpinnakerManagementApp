import { ObjectId } from "bson";
import { defineStore } from "pinia";
import * as Realm from "realm-web";
const app = Realm.getApp("managementapp-ugznc");

export const usePropertyStore = defineStore("PropertyStore", {
  state: () => ({
    properties: [],
    property: {
      name: null,
      status: null,
      pms: null,
      photo: null,
      address: null,
      lat: null,
      lng: null,
      hot: null,
      owner: [null],
      cleaner: [null],
      issues: [null],
      questions: [null],
      bookings: [null],
    },
    details: {},
  }),
  getters: {},
  actions: {
    async getProperties() {
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      if (this.properties.length == 0) {
        const data = await mongo
          .db("Management")
          .collection("Properties")
          .find();
        this.properties = data;
      }
    },
    async getProperty(id) {
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
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
    async upsertOne() {
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      if (!this.property._id) {
        this.property._id = new ObjectId();
      }
      if (this.property) {
        this.property.owner = this.property.owner.map((owner) => {
          return new ObjectId(owner);
        });
        console.log(this.property.owner.length > 0);
      }
      if (this.property.cleaner.length > 0) {
        this.property.cleaner = this.property.cleaner.map((cleaner) => {
          return ObjectId(cleaner);
        });
      }
      const result = await mongo
        .db("Management")
        .collection("Properties")
        .updateOne(
          { _id: this.property._id },
          { $set: this.property },
          { upsert: true }
        );
      return result;
    },
    resetProperty() {
      this.property = {
        name: null,
        status: null,
        pms: null,
        photo: null,
        address: null,
        lat: null,
        lng: null,
        hot: null,
        owner: [],
        cleaner: [],
        issues: [],
        questions: [],
        bookings: [],
      };
      return;
    },
  },
});
