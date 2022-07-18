<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usePropertyStore } from "@/store/PropertyStore";
import { usePeopleStore } from "@/store/PeopleStore";
const route = useRoute();
const PROPERTY_STORE = usePropertyStore();
PROPERTY_STORE.getProperty(route.params.id);
const PEOPLE_STORE = usePeopleStore();
watch(route, () => {
  PROPERTY_STORE.getProperty(route.params.id);
});
const owners = ref([]);
const cleaners = ref([]);
const loadOwners = async () => {
  owners.value = await PEOPLE_STORE.getOwners;
};
const loadCleaners = async () => {
  cleaners.value = await PEOPLE_STORE.getCleaners;
};
</script>

<template>
  <div class="flex flex-column-reverse lg:flex-row justify-content-between">
    <Card class="flex flex-auto m-4 mr-0"
      >Information goes esresfsefesfhere</Card
    >
    <Card class="overflow-auto m-4 max-w-90">
      <template #title>
        <div class="flex flex-column align-items-center">
          <h3>{{ PROPERTY_STORE.property.Name }}</h3>
        </div>
      </template>
      <template #content>
        <div class="flex flex-column align-items-center">
          <Image :src="PROPERTY_STORE.property.Photo" />
          <Inplace :closable="true">
            <template #display>
              {{ PROPERTY_STORE.property.Address }}
            </template>
            <template #content>
              <InputText v-model="PROPERTY_STORE.property.Address" autofocus />
            </template>
          </Inplace>
          <Inplace @open="loadOwners()" :closable="true">
            <template #display>
              <Chip
                v-for="owner in PROPERTY_STORE.property.Owner"
                :key="owner"
                >{{ PEOPLE_STORE.getName(owner) }}</Chip
              >
            </template>
            <template #content>
              <MultiSelect
                v-model="PROPERTY_STORE.property.Owner"
                :options="owners"
                optionLabel="Name"
                optionValue="_id"
                :filter="true"
                display="chip"
              ></MultiSelect>
            </template>
          </Inplace>
          <Inplace @open="loadCleaners()" :closable="true">
            <template #display>
              <Chip
                v-for="cleaner in PROPERTY_STORE.property.Cleaners"
                :key="cleaner"
                >{{ PEOPLE_STORE.getName(cleaner) }}</Chip
              >
            </template>
            <template #content>
              <MultiSelect
                v-model="PROPERTY_STORE.property.Cleaners"
                :options="cleaners"
                optionLabel="Name"
                optionValue="_id"
                :filter="true"
                display="chip"
              ></MultiSelect>
            </template>
          </Inplace>
          <p>{{ PROPERTY_STORE.property.Cleaners }}</p>
        </div>
      </template>
    </Card>
  </div>
</template>
