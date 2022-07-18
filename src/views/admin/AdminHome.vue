<script setup>
import PropertyEdit from "@/components/forms/PropertyEdit";
</script>

<template>
  <Suspense>
    <template #default>
      <PropertyEdit />
    </template>
    <template #fallback>
      Loading...
      <!-- TODO Add skeleton table -->
    </template>
  </Suspense>
</template>
