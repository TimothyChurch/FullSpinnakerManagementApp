import { defineStore } from "pinia";
import * as Realm from "realm-web";
const app = Realm.getApp("managementapp-ugznc");
const mongo = app.currentUser.mongoClient("mongodb-atlas");

export const usePeopleStore = defineStore("PeopleStore", {
  state: () => ({
    people: [],
    person: {},
  }),
  getters: {
    async getOwners() {
      if (this.people.length == 0) {
        await this.refreshPeople();
      }
      const owners = this.people.filter((person) => {
        if (person.Role == "Owner") return true;
      });
      owners.map((owner) => {
        owner._id = owner._id.toString();
        return owner;
      });
      return owners;
    },
    async getCleaners() {
      if (this.people.length == 0) {
        await this.refreshPeople();
      }
      const cleaners = this.people.filter((person) => {
        if (person.Role == "Cleaner") return true;
      });
      cleaners.map((cleaner) => {
        cleaner._id = cleaner._id.toString();
        return cleaner;
      });
      return cleaners;
    },
  },
  actions: {
    async getPeople() {
      if (this.people.length == 0) {
        await this.refreshPeople();
      }
    },
    async refreshPeople() {
      const data = await mongo.db("Management").collection("People").find();
      this.people = data;
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
    getName(id) {
      let name = null;
      if (id != null) {
        this.people.forEach((person) => {
          if (person._id.toString() == id) {
            name = person.Name;
          }
        });
      }
      return name;
    },
  },
});
