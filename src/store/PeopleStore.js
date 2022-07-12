import { defineStore } from "pinia";
import { useAirtable } from "@/composables/useAirtable";

const peopleTable = useAirtable("People");

export const usePeopleStore = defineStore("PeopleStore", {
  state: () => ({
    people: [],
    person: {},
  }),
  getters: {},
  actions: {
    async getPeople() {
      if (this.people.length == 0) {
        let temp = [];
        await peopleTable.select({}).eachPage((records, fetchNextPage) => {
          records.forEach((record) => {
            temp.push(record);
          });
          fetchNextPage();
        });
        this.people = temp;
      }
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
