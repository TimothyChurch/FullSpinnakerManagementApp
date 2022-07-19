<script setup>
import { ref } from "vue";
import { toggleAddProperty } from "@/composables/useDialog";
const items = ref([
  {
    label: "Add",
    icon: "pi pi-fw pi-plus",
    items: [
      {
        label: "Issue",
        icon: "pi pi-fw pi-exclamation-circle",
      },
      {
        label: "Question",
        icon: "pi pi-fw pi-question",
      },
      {
        label: "Property",
        icon: "pi pi-fw pi-home",
        command: toggleAddProperty,
      },
      {
        label: "Person",
        icon: "pi pi-fw pi-user",
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
