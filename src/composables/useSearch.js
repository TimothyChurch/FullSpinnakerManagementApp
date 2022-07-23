import { useToggle } from "@vueuse/core";
import { ref } from "vue";

import { peopleCollection, propertyCollection } from "@/composables/useMongodb";
import { questionsCollection } from "./useMongodb";

export async function useSearch(query) {
  if (query) {
    let properties = await propertyCollection.aggregate([
      {
        $search: {
          index: "property",
          compound: {
            should: [
              { autocomplete: { query, path: "name" } },
              { autocomplete: { query, path: "address" } },
              {
                embeddedDocument: {
                  path: "owner",
                  operator: {
                    text: { query, path: "owner.name" },
                  },
                },
              },
            ],
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: { _id: 1, name: 1, photo: 1 },
      },
    ]);
    let questions = await questionsCollection.aggregate([
      { $search: { autocomplete: { query, path: "question" } } },
      { $limit: 5 },
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
    return { properties, people, issues, questions };
  } else {
    return [];
  }
}

export const visible = ref(false);

export const toggleVisible = useToggle(visible);
