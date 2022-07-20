<script setup>
import { ref } from "vue";
import PropertyDetails from "./PropertyDetails.vue";
import PropertyQuestions from "./PropertyQuestions.vue";
import PropertyIssues from "./PropertyIssues.vue";
import PropertyCalendar from "./PropertyCalendar.vue";
import PropertyPerformance from "./PropertyPerformance.vue";
const tabs = [
  {
    label: "Details",
    icon: "pi pi-fw pi-home",
  },
  {
    label: "Questions",
    icon: "pi pi-fw pi-question",
  },
  {
    label: "Issues",
    icon: "pi pi-fw pi-exclamation-circle",
  },
  {
    label: "Calendar",
    icon: "pi pi-fw pi-calendar",
  },
  {
    label: "Performance",
    icon: "pi pi-fw pi-chart-line",
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
        <PropertyDetails v-if="activeIndex == 0" />
        <PropertyQuestions v-if="activeIndex == 1" />
        <PropertyIssues v-if="activeIndex == 2" />
        <PropertyCalendar v-if="activeIndex == 3" />
        <PropertyPerformance v-if="activeIndex == 4" />
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
