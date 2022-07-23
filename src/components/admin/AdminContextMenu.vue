<script setup>
import { ref } from "vue";
import {
  addIssue,
  addPerson,
  addProperty,
  addQuestion,
} from "@/composables/useDialog";

const items = ref([
  {
    label: "Add",
    icon: "pi pi-fw pi-plus",
    items: [
      {
        label: "Issue",
        icon: "pi pi-fw pi-exclamation-circle",
        command: () => {
          addIssue();
        },
      },
      {
        label: "Question",
        icon: "pi pi-fw pi-question",
        command: () => {
          addQuestion();
        },
      },
      {
        label: "Property",
        icon: "pi pi-fw pi-home",
        command: () => {
          addProperty();
        },
      },
      {
        label: "Person",
        icon: "pi pi-fw pi-user",
        command: () => {
          addPerson();
        },
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: "Quit",
    icon: "pi pi-fw pi-power-off",
  },
]);
</script>

<template>
  <div>
    <ContextMenu :global="true" :model="items" />
  </div>
</template>
