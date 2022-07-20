<script setup>
import { usePropertyStore } from "@/store/PropertyStore";
const PROPERTY_STORE = usePropertyStore();
</script>

<template>
  Property Calendar Page
  {{ PROPERTY_STORE.property }}
</template>
