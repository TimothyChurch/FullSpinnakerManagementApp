<script setup>
import EditPerson from "@/components/admin/forms/EditPerson";
import { usePeopleStore } from "@/store/PeopleStore";
const PROPERTY_STORE = usePeopleStore();
PROPERTY_STORE.person = {};
</script>

<template>
  <EditPerson />
</template>
