<script setup>
import { useRouter } from "vue-router";
import { usePeopleStore } from "@/store/PeopleStore";
const router = useRouter();
const PEOPLE_STORE = usePeopleStore();

const toProperty = (id) => {
  router.push({ name: "Property", params: { id: id.toString() } });
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
  <div class="flex flex-row flex-wrap overflow-auto">
    <div
      v-for="property in PEOPLE_STORE.person.properties"
      :key="property._id"
      class="flex col-3"
      @click="toProperty(property._id)"
    >
      <Card class="m-2 property-card">
        <template #header>
          <Image :src="`${property.photo}`" />
        </template>
        <template #content>
          <div class="flex justify-content-between align-items-center p-2">
            <h4>{{ property.name }}</h4>
            <div class="flex">
              <Badge
                :severity="getStatus(property.status)"
                :value="property.status"
              />
            </div>
          </div>
          <div class="px-2 pb-2 text-center">
            {{ property.address }}
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .p-card-body {
  padding: 0;
}
::v-deep .p-card-content {
  padding: 0;
}
</style>
