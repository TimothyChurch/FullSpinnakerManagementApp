<script setup>
import { ref } from "vue";
import {
  toggleAddIssue,
  toggleAddPerson,
  toggleAddProperty,
  toggleAddQuestion,
} from "@/composables/useDialog";
const items = ref([
  {
    label: "Add",
    icon: "pi pi-fw pi-plus",
    items: [
      {
        label: "Issue",
        icon: "pi pi-fw pi-exclamation-circle",
        command: toggleAddIssue,
      },
      {
        label: "Question",
        icon: "pi pi-fw pi-question",
        command: toggleAddQuestion,
      },
      {
        label: "Property",
        icon: "pi pi-fw pi-home",
        command: toggleAddProperty,
      },
      {
        label: "Person",
        icon: "pi pi-fw pi-user",
        command: toggleAddPerson,
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
