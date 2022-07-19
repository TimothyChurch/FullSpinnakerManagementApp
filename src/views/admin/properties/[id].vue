<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { usePropertyStore } from "@/store/PropertyStore";
import { usePeopleStore } from "@/store/PeopleStore";
import { toggleEditProperty } from "@/composables/useDialog";
const route = useRoute();
const PROPERTY_STORE = usePropertyStore();
PROPERTY_STORE.getProperty(route.params.id);
const PEOPLE_STORE = usePeopleStore();
watch(route, () => {
  PROPERTY_STORE.getProperty(route.params.id);
});
// const owners = ref([]);
// const cleaners = ref([]);
// const loadOwners = async () => {
//   owners.value = await PEOPLE_STORE.getOwners;
// };
// const loadCleaners = async () => {
//   cleaners.value = await PEOPLE_STORE.getCleaners;
// };
</script>

<template>
  <div class="flex flex-column-reverse lg:flex-row justify-content-between">
    <Card class="flex flex-auto m-4 mr-0">
      <template #title>
        <div class="p-input-icon-left w-full">
          <i class="pi pi-search" />
          <InputText
            class="w-full"
            type="text"
            placeholder="Search property details"
          />
        </div>
      </template>
      <template #content> {{ PROPERTY_STORE.property }}</template>
    </Card>
    <Card id="infoCard" class="overflow-auto m-4 max-w-90">
      <template #title>
        <span class="flex text-center">
          {{ PROPERTY_STORE.property.name }}
        </span>
      </template>
      <template #content>
        <div class="flex flex-column align-items-center">
          <Image :src="PROPERTY_STORE.property.photo" />
          {{ PROPERTY_STORE.property.address }}
          <div v-for="owner in PROPERTY_STORE.property.owner" :key="owner">
            {{ owner }}
            {{ PEOPLE_STORE.getName(owner) }}
          </div>
          <label for="owner" class="font-medium text-900">Cleaner</label>
          <Chip
            v-for="cleaner in PROPERTY_STORE.property.cleaner"
            :key="cleaner"
            >{{ PEOPLE_STORE.getName(cleaner) }}</Chip
          >
          <p>{{ PROPERTY_STORE.property.cleaner }}</p>
          <Button @click="toggleEditProperty">Edit</Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<style>
.p-card-body {
  width: 100%;
}
#infoCard {
  max-width: 450px;
}
</style>
