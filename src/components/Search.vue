<script setup>
import { ref } from "vue";
import { visible, toggleVisible, useSearch } from "@/composables/useSearch";
const query = ref("");
const results = ref({});
const runSearch = async () => {
  const data = await useSearch(query.value);
  console.log(data);
  results.value = data;
};
const exit = () => {
  query.value = "";
  results.value = {};
  toggleVisible();
};
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="exit"
    contentClass="flex flex-column"
  >
    <div class="flex flex-column justify-content-center">
      <div class="p-input-icon-left mb-4">
        <i class="pi pi-search" />
        <InputText
          type="text"
          v-model="query"
          @input="runSearch()"
          placeholder="Search"
          class="w-full"
          autofocus
        />
      </div>
      <div
        v-if="results.properties || results.people"
        class="flex flex-row justify-content-around"
      >
        <div
          v-if="results.properties.length > 0"
          class="flex flex-column p-4 flex-grow"
        >
          <div class="text-3xl font medium text-900 mb-3 align-self-center">
            Properties
          </div>
          <div
            v-for="result in results.properties"
            :key="result._id"
            class="flex surface-card shadow-2 p-1 m-1"
          >
            <img :src="`${result.Photo}`" />
            {{ result.Name }}
          </div>
        </div>
        <div
          v-if="results.people.length > 0"
          class="flex flex-column p-4 flex-grow"
        >
          <div class="text-3xl font medium text-900 mb-3 align-self-center">
            People
          </div>
          <div
            v-for="result in results.people"
            :key="result._id"
            class="flex surface-card shadow-2 p-1 m-1"
          >
            {{ result.Name }}
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style>
.p-dialog-content {
  width: 80vw;
  justify-content: center;
}
</style>
