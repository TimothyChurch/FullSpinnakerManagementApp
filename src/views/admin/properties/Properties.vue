<script setup>
import PropertyTable from "../../../components/PropertyTable.vue";
import { usePropertyStore } from "@/store/PropertyStore";
const PROPERTY_STORE = usePropertyStore();
PROPERTY_STORE.getProperties();
</script>

<template>
  <PropertyTable />
</template>
