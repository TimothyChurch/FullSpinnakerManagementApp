import { ObjectId } from "bson";
import { defineStore } from "pinia";
import { issuesCollection } from "@/composables/useMongodb";
import { propertyCollection } from "../composables/useMongodb";

export const useIssueStore = defineStore("IssueStore", {
  state: () => ({
    issues: [],
    issue: {},
  }),
  getters: {},
  actions: {
    async saveIssue() {
      if (!this.issue._id) {
        this.issue._id = new ObjectId();
      }
      await issuesCollection.updateOne(
        { _id: this.issue._id },
        { $set: this.issue },
        { upsert: true }
      );
      if (this.issue.property) {
        await propertyCollection.updateOne(
          { _id: this.issue.property._id },
          { $addToSet: { issues: this.issue._id } }
        );
      }
      // TODO Once these collection are created open these up
      // if (this.issue.guest) {
      //   await guestCollection.updateOne(
      //     { _id: this.issue.guest._id },
      //     { $addToSet: { issues: this.issue._id } }
      //   );
      // }
      // if (this.issue.technician) {
      //   await technicianCollection.updateOne(
      //     { _id: this.issue.technician._id },
      //     { $addToSet: { issues: this.issue._id } }
      //   );
      // }
      return;
    },
  },
});
