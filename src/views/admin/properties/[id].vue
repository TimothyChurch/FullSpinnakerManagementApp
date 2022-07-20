<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { usePropertyStore } from "@/store/PropertyStore";
import { usePeopleStore } from "@/store/PeopleStore";
import { toggleEditProperty } from "@/composables/useDialog";
import PropertyInfoTabs from "@/components/admin/properties/PropertyInfoTabs.vue";
const route = useRoute();
const PROPERTY_STORE = usePropertyStore();
const PEOPLE_STORE = usePeopleStore();
await PROPERTY_STORE.getProperty(route.params.id);
await PEOPLE_STORE.getLinked();

watch(route, () => {
  PROPERTY_STORE.getProperty(route.params.id);
});
</script>

<template>
  <div class="flex flex-column-reverse lg:flex-row justify-content-between">
    <Card class="flex flex-grow-1 m-4 mr-0">
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
      <template #content><PropertyInfoTabs /></template>
    </Card>
    <Card id="infoCard" class="overflow-auto m-4">
      <template #title>
        <span class="flex text-center">
          {{ PROPERTY_STORE.property.name }}
        </span>
      </template>
      <template #content>
        <div class="flex flex-column align-items-center">
          <Image :src="PROPERTY_STORE.property.photo" />
          {{ PROPERTY_STORE.property.address }}
          <Button
            v-for="owner in PROPERTY_STORE.property.owner"
            :key="owner"
            class="m-2"
          >
            {{ owner.Name }}
          </Button>
          <label for="owner" class="font-medium text-900">Cleaner</label>
          <Button
            v-for="cleaner in PROPERTY_STORE.property.cleaner"
            :key="cleaner"
            class="m-2"
          >
            {{ cleaner.Name }}
          </Button>
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
  max-width: 350px;
  min-width: 350px;
}
</style>
