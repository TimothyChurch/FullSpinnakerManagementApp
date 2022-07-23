// import { ObjectId } from "bson";
import { defineStore } from "pinia";

export const useIssueStore = defineStore("IssueStore", {
  state: () => ({
    issues: [],
    issue: {},
  }),
  getters: {},
  actions: {},
});
