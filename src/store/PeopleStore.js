import { defineStore } from "pinia";
import * as Realm from "realm-web";
const app = Realm.getApp("managementapp-ugznc");
const mongo = app.currentUser.mongoClient("mongodb-atlas");

export const usePeopleStore = defineStore("PeopleStore", {
  state: () => ({
    people: [],
    person: {},
  }),
  getters: {},
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
          if (person.id == id) {
            name = person.fields.Name;
          }
        });
      }
      return name;
    },
  },
});
