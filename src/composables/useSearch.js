import * as Realm from "realm-web";
import { useToggle } from "@vueuse/core";
import { ref } from "vue";

const app = Realm.getApp("managementapp-ugznc");
const mongo = app.currentUser.mongoClient("mongodb-atlas");
const management = mongo.db("Management");

export async function useSearch(query) {
  if (query) {
    let properties = await management.collection("Properties").aggregate([
      {
        $search: {
          autocomplete: { query, path: "Name" },
          index: "property",
        },
      },
      {
        $limit: 5,
      },
    ]);
    let people = await management.collection("People").aggregate([
      {
        $search: {
          autocomplete: { query, path: "Name" },
          index: "people",
        },
      },
      {
        $limit: 5,
      },
    ]);
    let issues = []; // TODO Get data from mongodb
    let questions = [];
    return { properties, people, issues, questions };
  } else {
    return [];
  }
}

export const visible = ref(false);

export const toggleVisible = useToggle(visible);
