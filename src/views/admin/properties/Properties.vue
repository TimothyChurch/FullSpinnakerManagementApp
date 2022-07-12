<script setup>
import PropertyTable from "../../../components/PropertyTable.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <PropertyTable />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
