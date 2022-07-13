<script setup>
import PropertyInfo from "@/components/guest/property/PropertyInfo.vue";
import PropertyHeader from "@/components/guest/property/PropertyHeader.vue";
</script>

<template>
  <div class="h-screen flex flex-column">
    <PropertyHeader :model="tabs" class="flex flex-none w-full" />
    <PropertyInfo class="flex flex-grow-1 overflow-hidden" />
  </div>
</template>
