import { useToggle } from "@vueuse/core";
import { ref } from "vue";

import { peopleCollection, propertyCollection } from "@/composables/useMongodb";

export async function useSearch(query) {
  if (query) {
    let properties = await propertyCollection.aggregate([
      {
        $search: {
          autocomplete: { query, path: "name" },
          index: "property",
        },
      },
      {
        $limit: 5,
      },
    ]);
    let people = await peopleCollection.aggregate([
      {
        $search: {
          autocomplete: { query, path: "name" },
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
