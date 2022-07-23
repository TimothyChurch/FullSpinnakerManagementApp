import { ObjectId } from "bson";
import { defineStore } from "pinia";
import {
  questionsCollection,
  propertyCollection,
} from "@/composables/useMongodb";
import { usePropertyStore } from "@/store/PropertyStore";

export const useQuestionStore = defineStore("QuestionStore", {
  state: () => ({
    questions: [],
    question: {},
  }),
  getters: {},
  actions: {
    async getQuestion(id) {
      if (typeof id === "string") {
        id = new ObjectId(id);
      }
      const data = await questionsCollection.aggregate([
        {
          $match: { _id: id },
        },
        { $unwind: "$answer" },
        {
          $lookup: {
            from: "Properties",
            localField: "answer.property",
            foreignField: "_id",
            as: "answer.property",
          },
        },
        {
          $project: {
            "answer.property": { $first: "$answer.property" },
            "answer.answer": "$answer.answer",
            question: 1,
          },
        },
        {
          $project: {
            "answer.property.name": 1,
            "answer.property._id": 1,
            "answer.answer": 1,
            question: 1,
            _id: 1,
          },
        },
        {
          $sort: { "answer.property.name": 1 },
        },
        {
          $group: {
            _id: "$_id",
            answer: { $push: "$answer" },
            question: { $first: "$question" },
          },
        },
      ]);
      this.question = data[0];
    },
    async getSelectedQuestions() {
      const PROPERTY_STORE = usePropertyStore();
      const results = await questionsCollection.aggregate([
        { $match: { _id: { $in: PROPERTY_STORE.property.questions } } },
        { $unwind: "$answer" },
        { $match: { "answer.property": PROPERTY_STORE.property._id } },
      ]);
      this.questions = results;
    },
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
      return results;
    },
  },
});
