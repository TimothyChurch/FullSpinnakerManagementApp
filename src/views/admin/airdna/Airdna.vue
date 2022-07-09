<script setup>
import { ref } from "vue";
const tabs = ref([
  {
    label: "Rentalizer",
    icon: "pi pi-fw pi-home",
    to: "/admin/airdna/rentalizer",
  },
  {
    label: "Monthly ADR",
    icon: "pi pi-fw pi-home",
    to: "/admin/airdna/monthly_adr",
  },
  {
    label: "Future Rates",
    icon: "pi pi-fw pi-home",
    to: "/admin/airdna/future_rates",
  },
  {
    label: "Daily Rates",
    icon: "pi pi-fw pi-home",
    to: "/admin/airdna/daily_rates",
  },
]);
</script>

<template>
  <div>
    <TabMenu :model="tabs" />
    <router-view />
  </div>
</template>
