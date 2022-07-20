<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
// import { usePropertyStore } from "@/store/PropertyStore";
import { usePeopleStore } from "@/store/PeopleStore";
const route = useRoute();
// const PROPERTY_STORE = usePropertyStore();
const PEOPLE_STORE = usePeopleStore();
await PEOPLE_STORE.getPerson(route.params.id);

watch(route, () => {
  PEOPLE_STORE.getPerson(route.params.id);
});
</script>

<template>
  <div
    class="flex flex-column-reverse align-content-center lg:flex-row lg:justify-content-between"
  >
    <Card class="flex flex-grow-1 m-4 mr-0">
      <template #title>
        <div class="p-input-icon-left w-full">
          <i class="pi pi-search" />
          <InputText
            class="w-full"
            type="text"
            placeholder="Search person details"
          />
        </div>
      </template>
      <template #content>The Person's information</template>
    </Card>
    <Card id="infoCard" class="overflow-auto m-4">
      <template #title>
        <span class="flex text-center"> Person's Name </span>
      </template>
      <template #content> This is the person's details </template>
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
  width: 100%;
}
</style>
