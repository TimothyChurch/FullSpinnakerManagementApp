import { ObjectId } from "bson";
import { defineStore } from "pinia";
import { propertyCollection, peopleCollection } from "@/composables/useMongodb";

export const usePropertyStore = defineStore("PropertyStore", {
  state: () => ({
    properties: [],
    selectedProperties: [],
    property: {},
    question: {},
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
      const propId = new ObjectId(id);
      this.property = await propertyCollection.findOne({ _id: propId });
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
    async saveQuestion() {
      await propertyCollection.updateOne(
        { _id: this.property._id },
        { $addToSet: { questions: this.question } }
      );
      this.property.questions.push(this.question);
    },
    async upsertOne() {
      if (!this.property._id) {
        console.log("test");
        this.property._id = new ObjectId();
      }
      const result = await propertyCollection.updateOne(
        { _id: this.property._id },
        { $set: this.property },
        { upsert: true }
      );
      this.property.owner.forEach(async (owner) => {
        await peopleCollection.updateOne(
          { _id: owner._id },
          { $addToSet: { properties: this.property._id } }
        );
      });
      this.property.cleaner.forEach(async (cleaner) => {
        await peopleCollection.updateOne(
          { _id: cleaner._id },
          { $addToSet: { properties: this.property._id } }
        );
      });
      return result;
    },
    resetProperty() {
      this.property = {};
      return;
    },
  },
});
