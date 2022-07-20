<script setup>
import { usePropertyStore } from "@/store/PropertyStore";
const PROPERTY_STORE = usePropertyStore();
</script>

<template>
  {{ PROPERTY_STORE.property.name }}
</template>
