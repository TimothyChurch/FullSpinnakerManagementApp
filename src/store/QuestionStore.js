import { ObjectId } from "bson";
import { defineStore } from "pinia";
import {
  questionsCollection,
  propertyCollection,
} from "@/composables/useMongodb";

export const useQuestionStore = defineStore("QuestionStore", {
  state: () => ({
    questions: [],
    question: {},
  }),
  getters: {},
  actions: {
    async saveQuestion() {
      if (!this.question._id) {
        this.question._id = new ObjectId();
      }
      const results = await questionsCollection.updateOne(
        { _id: this.question._id },
        { $set: this.question },
        { upsert: true }
      );
      this.question.answer.forEach(async (answer) => {
        await propertyCollection.updateOne(
          { _id: answer.property },
          { $addToSet: { questions: this.question._id } }
        );
      });
      this.question = {};
      return results;
    },
  },
});
