import { ObjectId } from "bson";
import { defineStore } from "pinia";
import { propertyCollection, peopleCollection } from "@/composables/useMongodb";

export const usePropertyStore = defineStore("PropertyStore", {
  state: () => ({
    properties: [],
    selectedProperties: [],
    propertiesNames: [],
    property: {},
  }),
  getters: {},
  actions: {
    async getProperties() {
      if (this.properties.length == 0) {
        const data = await propertyCollection.find();
        this.properties = data;
      }
    },
    async getSelectedProperties(id) {
      const data = await propertyCollection.find({ _id: { $in: id } });
      this.selectedProperties = data;
    },
    async getProperty(id) {
      if (typeof id == "string") {
        id = new ObjectId(id);
      }
      const data = await propertyCollection.aggregate([
        { $match: { _id: id } },
        {
          $lookup: {
            from: "People",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $lookup: {
            from: "People",
            localField: "cleaner",
            foreignField: "_id",
            as: "cleaner",
          },
        },
      ]);
      this.property = data[0];
    },
    async getPropertiesNames() {
      const data = await propertyCollection.aggregate([
        { $project: { name: 1 } },
        { $sort: { name: 1 } },
      ]);
      this.propertiesNames = data;
    },
    async upsertOne() {
      if (!this.property._id) {
        this.property._id = new ObjectId();
      }
      const result = await propertyCollection.updateOne(
        { _id: this.property._id },
        { $set: this.property },
        { upsert: true }
      );
      if (this.property.owner) {
        this.property.owner.forEach(async (owner) => {
          await peopleCollection.updateOne(
            { _id: owner },
            { $addToSet: { properties: this.property._id } }
          );
        });
      }
      if (this.property.cleaner) {
        this.property.cleaner.forEach(async (cleaner) => {
          await peopleCollection.updateOne(
            { _id: cleaner },
            { $addToSet: { properties: this.property._id } }
          );
        });
      }
      await this.getProperty(this.property._id);
      return result;
    },
    resetProperty() {
      this.property = {};
      return;
    },
  },
});
