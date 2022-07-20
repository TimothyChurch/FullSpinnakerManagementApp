import { ObjectId } from "bson";
import { defineStore } from "pinia";
import { usePropertyStore } from "./PropertyStore";
import * as Realm from "realm-web";
const app = Realm.getApp("managementapp-ugznc");

export const usePeopleStore = defineStore("PeopleStore", {
  state: () => ({
    people: [],
    person: {},
    owners: [],
    cleaners: [],
    vendors: [],
  }),
  getters: {},
  actions: {
    async getPeople() {
      if (this.people.length == 0) {
        await this.refreshPeople();
      }
    },
    async getOwners() {
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const peopleCollection = mongo.db("Management").collection("People");
      const owners = await peopleCollection.find({ role: "Owner" }); // TODO Use project to just pull in _id and name for forms
      this.owners = owners;
    },
    async getCleaners() {
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const peopleCollection = mongo.db("Management").collection("People");
      const cleaners = await peopleCollection.find({ role: "Cleaner" });
      this.cleaners = cleaners;
    },
    async refreshPeople() {
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const peopleCollection = mongo.db("Management").collection("People");
      const data = await peopleCollection.find();
      this.people = data;
    },
    async getPerson(id) {
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const peopleCollection = mongo.db("Management").collection("People");
      if (typeof id == "string") {
        id = new ObjectId(id);
      }
      const data = await peopleCollection.findOne({ _id: id });
      return data;
    },
    async getLinked() {
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const peopleCollection = mongo.db("Management").collection("People");
      const PROPERTY_STORE = usePropertyStore();
      if (PROPERTY_STORE.property.owner) {
        PROPERTY_STORE.property.owner = await Promise.all(
          PROPERTY_STORE.property.owner.map(async (owner) => {
            const data = await peopleCollection.findOne({ _id: owner });
            return data;
          })
        );
      }
      if (PROPERTY_STORE.property.cleaner) {
        PROPERTY_STORE.property.cleaner = await Promise.all(
          PROPERTY_STORE.property.cleaner.map(async (cleaner) => {
            const data = await peopleCollection.findOne({ _id: cleaner });
            return data;
          })
        );
      }
    },
    setPerson(id) {
      console.log(id);
      this.people.forEach((person) => {
        if (person.id == id) {
          console.log("here");
          return person;
        }
      });
    },
    async getName(id) {
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const peopleCollection = mongo.db("Management").collection("People");
      const personId = new ObjectId(id);
      const results = await peopleCollection.findOne({ _id: personId });
      return results.name;
    },
  },
});
