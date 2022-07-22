import { useToggle } from "@vueuse/core";
import { ref } from "vue";

import { peopleCollection, propertyCollection } from "@/composables/useMongodb";

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
    console.log(properties);
    let questions = await propertyCollection.aggregate([
      {
        $search: {
          index: "property",
          embeddedDocument: {
            path: "questions",
            operator: {
              text: { query, path: "questions.question" },
            },
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: { questions: 1 },
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
    return { properties, people, issues, questions };
  } else {
    return [];
  }
}

export const visible = ref(false);

export const toggleVisible = useToggle(visible);
