<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePropertyStore } from "@/store/PropertyStore";
import { toggleEditProperty } from "@/composables/useDialog";
import PropertyInfoTabs from "@/components/admin/properties/PropertyInfoTabs.vue";
const route = useRoute();
const router = useRouter();
const PROPERTY_STORE = usePropertyStore();
await PROPERTY_STORE.getProperty(route.params.id);

watch(route, () => {
  PROPERTY_STORE.getProperty(route.params.id);
});
const openEdit = () => {
  toggleEditProperty();
};
const toPerson = (id) => {
  router.push({ name: "Person", params: { id: id.toString() } });
};
const getStatus = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Pending":
      return "warning";
    case "Lost":
      return "error";
    default:
      return "warning";
  }
};
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
            placeholder="Coming in the future"
          />
        </div>
      </template>
      <template #content><PropertyInfoTabs /></template>
    </Card>
    <Card id="infoCard" class="overflow-auto m-4">
      <template #title>
        <div class="flex flex-row justify-content-around align-items-center">
          <div class="flex text-center text-lg">
            {{ PROPERTY_STORE.property.name }}
          </div>
          <Badge
            class="flex"
            :value="PROPERTY_STORE.property.status"
            :severity="getStatus(PROPERTY_STORE.property.status)"
          />
          <i class="pi pi-pencil p-2" @click="openEdit()" />
        </div>
      </template>
      <template #content>
        <div class="flex flex-column align-items-center">
          <Image :src="PROPERTY_STORE.property.photo" />
          {{ PROPERTY_STORE.property.address }}
          <Button
            v-for="owner in PROPERTY_STORE.property.owner"
            :key="owner"
            class="m-2"
            @click="toPerson(owner._id)"
          >
            {{ owner.name }}
          </Button>
          <label for="owner" class="font-medium text-900">Cleaner</label>
          <Button
            v-for="cleaner in PROPERTY_STORE.property.cleaner"
            :key="cleaner"
            class="m-2"
            @click="toPerson(cleaner._id)"
          >
            {{ cleaner.name }}
          </Button>
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
