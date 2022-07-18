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
    <template #header>
      <div class="flex flex-column justify-content-center w-full">
        <div class="p-input-icon-left mr-4">
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
      </div>
    </template>
    <div class="flex flex-column justify-content-center">
      <div
        v-if="
          results.properties ||
          results.people ||
          results.issues ||
          results.questions
        "
        class="flex flex-row justify-content-around"
      >
        <div
          v-if="results.properties.length > 0"
          class="flex flex-column p-3 col-3"
        >
          <div class="text-3xl font medium text-900 mb-3 align-self-center">
            Properties
          </div>
          <div
            v-for="result in results.properties"
            :key="result._id"
            class="flex surface-card shadow-2 p-1 m-1"
          >
            <router-link
              :to="{ name: 'Property', params: { id: result._id.toString() } }"
              @click="exit(property)"
            >
              <Avatar :image="`${result.Photo}`" size="xlarge" shape="circle" />
              {{ result.Name }}
            </router-link>
          </div>
        </div>
        <div
          v-if="results.people.length > 0"
          class="flex flex-column p-3 col-3"
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
        <div
          v-if="results.issues.length > 0"
          class="flex flex-column p-3 col-3"
        >
          <div class="text-3xl font medium text-900 mb-3 align-self-center">
            Issues
          </div>
          <div
            v-for="result in results.issues"
            :key="result._id"
            class="flex surface-card shadow-2 p-1 m-1"
          >
            {{ result.Name }}
          </div>
        </div>
        <div
          v-if="results.questions.length > 0"
          class="flex flex-column p-3 col-3"
        >
          <div class="text-3xl font medium text-900 mb-3 align-self-center">
            Questions
          </div>
          <div
            v-for="result in results.questions"
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
