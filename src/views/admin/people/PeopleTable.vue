<script setup>
import PeopleTable from "@/components/PeopleTable";
</script>

<template>
  <Suspense>
    <template #default>
      <PeopleTable />
    </template>
    <template #fallback>
      Loading...
      <!-- TODO Add skeleton table -->
    </template>
  </Suspense>
</template>
