<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usePeopleStore } from "@/store/PeopleStore";
import PeopleInfoTabs from "@/components/admin/people/PeopleInfoTabs.vue";
import { toggleEditPerson } from "@/composables/useDialog";
const route = useRoute();
const PEOPLE_STORE = usePeopleStore();
await PEOPLE_STORE.getPerson(route.params.id);

watch(route, () => {
  PEOPLE_STORE.getPerson(route.params.id);
});
const status = ref("");
status.value = () => {
  switch (PEOPLE_STORE.person.status) {
    case "Active":
      return "success";
    case "Inactive":
      return "error";
    default:
      return "warning";
  }
};
const openEdit = () => {
  toggleEditPerson();
};
</script>

<template>
  <div
    class="flex flex-column-reverse align-content-center lg:flex-row lg:justify-content-between"
  >
    <Card class="flex flex-grow-1 m-4 mr-0">
      <template #content><PeopleInfoTabs /></template>
    </Card>
    <Card id="infoCard" class="overflow-auto m-4">
      <template #title>
        <div class="flex flex-row justify-content-around">
          <span class="flex text-center">{{ PEOPLE_STORE.person.name }}</span>
          <Badge
            class="flex"
            :value="PEOPLE_STORE.person.status"
            :severity="status()"
          />
          <i class="pi pi-pencil" @click="openEdit()" />
        </div>
      </template>
      <template #content>
        <div class="grid fromgrid p-fluid">
          <div class="field flex justify-content-between mb-2 col-12">
            <label for="phone" class="font-medium text-900">Phone Number</label>
            <div id="phone">{{ PEOPLE_STORE.person.phone }}</div>
          </div>
          <div class="surface-border border-top-1 col-12"></div>
          <div class="field flex justify-content-between mb-2 col-12">
            <label for="email" class="font-medium text-900"> Email </label>
            <div id="email">{{ PEOPLE_STORE.person.email }}</div>
          </div>
          <div class="surface-border border-top-1 col-12"></div>
          <div class="field flex justify-content-between mb-2 col-12">
            <label for="airbnbEmail" class="font-medium text-900">
              Airbnb Email
            </label>
            <div id="airbnbEmail">{{ PEOPLE_STORE.person.airbnbEmail }}</div>
          </div>
          <div class="surface-border border-top-1 col-12"></div>
          <div class="field flex justify-content-between mb-2 col-12">
            <label for="airbnbPassword" class="font-medium text-900"
              >Airbnb Password
            </label>
            <div id="airbnbPassword">
              {{ PEOPLE_STORE.person.airbnbPassword }}
            </div>
          </div>
          <div class="surface-border border-top-1 col-12"></div>
          <div class="field flex justify-content-between mb-2 col-12">
            <label for="vrboEmail" class="font-medium text-900">
              VRBO Email
            </label>
            <div id="vrboEmail">{{ PEOPLE_STORE.person.vrboEmail }}</div>
          </div>
          <div class="surface-border border-top-1 col-12"></div>
          <div class="field flex justify-content-between mb-2 col-12">
            <label for="vrboPassword" class="font-medium text-900"
              >VRBO Password
            </label>
            <div id="vrboPassword">
              {{ PEOPLE_STORE.person.vrboPassword }}
            </div>
          </div>
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
  width: 100%;
}
</style>
