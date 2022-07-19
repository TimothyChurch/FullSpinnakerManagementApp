<script setup>
import EditProperty from "@/components/admin/forms/EditProperty";
import { usePropertyStore } from "@/store/PropertyStore";
const PROPERTY_STORE = usePropertyStore();
PROPERTY_STORE.resetProperty();
</script>

<template>
  <EditProperty />
</template>
