<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const tabs = [
  {
    label: "Home",
    icon: "pi pi-fw pi-home",
    to: `/property/${route.params.id}`,
  },
  {
    label: "Info",
    icon: "pi pi-fw pi-info-circle",
    to: `/property/${route.params.id}/info`,
  },
  {
    label: "Map",
    icon: "pi pi-fw pi-map",
    to: `/property/${route.params.id}/map`,
  },
  {
    label: "Search",
    icon: "pi pi-fw pi-search",
    to: `/property/${route.params.id}/search`,
  },
];
</script>

<template>
  <TabMenu :model="tabs" />
  <router-view />
</template>
