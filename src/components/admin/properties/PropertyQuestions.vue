<script setup>
import { usePropertyStore } from "@/store/PropertyStore";
const PROPERTY_STORE = usePropertyStore();
</script>

<template>
  Property Questions Page
  {{ PROPERTY_STORE.property }}
</template>
