import { ObjectId } from "bson";
import { defineStore } from "pinia";
import { peopleCollection } from "@/composables/useMongodb";
import { propertyCollection } from "../composables/useMongodb";

export const usePeopleStore = defineStore("PeopleStore", {
  state: () => ({
    people: [],
    person: {},
    owners: [],
    cleaners: [],
    technicians: [],
  }),
  getters: {},
  actions: {
    async getPeople() {
      if (this.people.length == 0) {
        await this.refreshPeople();
      }
    },
    async refreshPeople() {
      const data = await peopleCollection.find();
      this.people = data;
    },
    async getOwners() {
      const owners = await peopleCollection.aggregate([
        { $match: { role: "Owner" } },
        { $sort: { name: 1 } },
      ]);
      this.owners = owners;
    },
    async getCleaners() {
      const cleaners = await peopleCollection.aggregate([
        { $match: { role: "Cleaner" } },
        { $sort: { name: 1 } },
      ]);
      this.cleaners = cleaners;
    },
    async getTechnicians() {
      const technicians = await peopleCollection.aggregate([
        {
          $match: {
            role: {
              $in: [
                "HVAC",
                "Yard",
                "Handyman",
                "Plumber",
                "Pest Control",
                "Electrician",
                "Locksmith",
                "Appliance Repair",
              ],
            },
          },
        },
        { $sort: { name: 1 } },
      ]);
      this.technicians = technicians;
    },
    async getPerson(id) {
      if (typeof id == "string") {
        id = new ObjectId(id);
      }
      const data = await peopleCollection.aggregate([
        { $match: { _id: id } },
        {
          $lookup: {
            from: "Properties",
            localField: "properties",
            foreignField: "_id",
            as: "properties",
          },
        },
      ]);
      this.person = data[0];
    },
    async savePerson() {
      if (!this.person._id) {
        this.person._id = new ObjectId();
      }
      const result = await peopleCollection.updateOne(
        { _id: this.person._id },
        { $set: this.person },
        { upsert: true }
      );
      this.person.properties.forEach(async (property) => {
        if (this.person.role === "Owner") {
          if (typeof property == "string") {
            property = new ObjectId(property);
          }
          await propertyCollection.updateOne(
            { _id: property },
            { $addToSet: { owner: this.person._id } }
          );
        } else if (this.person.role === "Cleaner") {
          console.log("Cleaner");
          await propertyCollection.updateOne(
            { _id: property },
            { $addToSet: { cleaner: this.person._id } }
          );
        }
      });
      await this.getPerson(this.person._id);
      return result;
    },
  },
});
