import { ObjectId } from "bson";
import { defineStore } from "pinia";
import { peopleCollection } from "@/composables/useMongodb";

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
    async getOwnersNames() {
      const owners = await peopleCollection.aggregate([
        { $match: { role: "Owner" } },
        { $project: { name: 1 } },
      ]);
      this.owners = owners;
    },
    async getCleaners() {
      const cleaners = await peopleCollection.aggregate([
        { $match: { role: "Cleaner" } },
        { $project: { name: 1 } },
      ]);
      this.cleaners = cleaners;
    },
    async refreshPeople() {
      const data = await peopleCollection.find();
      this.people = data;
    },
    async getPerson(id) {
      if (typeof id == "string") {
        id = new ObjectId(id);
      }
      const data = await peopleCollection.findOne({ _id: id });
      this.person = data;
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
      const personId = new ObjectId(id);
      const results = await peopleCollection.findOne({ _id: personId });
      return results.name;
    },
  },
});
