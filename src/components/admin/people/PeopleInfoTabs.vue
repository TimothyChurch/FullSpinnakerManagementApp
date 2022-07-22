<script setup>
import { ref } from "vue";
import PropertyCards from "./PropertyCards.vue";
const tabs = [
  {
    label: "Properties",
    icon: "pi pi-fw pi-home",
  },
  {
    label: "Performance",
    icon: "pi pi-fw pi-chart-line",
  },
  {
    label: "Questions",
    icon: "pi pi-fw pi-question",
  },
  {
    label: "Issues",
    icon: "pi pi-fw pi-exclamation-circle",
  },
];
const activeIndex = ref(0);
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <TabMenu
          :model="tabs"
          v-model:activeIndex="activeIndex"
          class="w-full"
        />
        <PropertyCards v-if="activeIndex == 0" />
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
