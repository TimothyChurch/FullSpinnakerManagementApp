<script setup>
import { ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useToggle } from "@vueuse/core";
import { usePropertyStore } from "@/store/PropertyStore";
const PROPERTY_STORE = usePropertyStore();
const newQuestion = ref(false);
const toggle = useToggle(newQuestion);
const saveQuestion = () => {
  PROPERTY_STORE.saveQuestion();
  PROPERTY_STORE.question = {};
  newQuestion.value = false;
};
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  question: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});
</script>

<template>
  <div class="flex flex-col flex-wrap justify-content-between p-2">
    <Button
      icon="pi pi-plus"
      class="p-button-rounded p-button-success col-1"
      @click="toggle()"
    />
    <InputText
      placeholder="Search questions"
      type="text"
      class="col-11"
      v-model="filters['global'].value"
    />
    <div v-if="newQuestion == true" class="flex col-12 gap-2">
      <InputText
        v-model="PROPERTY_STORE.question.question"
        class="col-5"
        placeholder="Question"
      />
      <InputText
        v-model="PROPERTY_STORE.question.answer"
        class="flex-grow-1"
        placeholder="Answer"
        @keydown.enter="saveQuestion()"
      />
      <Button
        icon="pi pi-check"
        class="col-1 p-button-rounded p-button-outlined p-button-success"
        @click="saveQuestion()"
      />
      <Button
        icon="pi pi-times"
        class="col-1 p-button-rounded p-button-outlined p-button-danger"
        @click="toggle()"
      />
    </div>
    <div class="col-12">
      <DataTable
        :value="PROPERTY_STORE.property.questions"
        :autolayout="true"
        :paginator="true"
        :rows="10"
        v-model:filters="filters"
        :globalFilterFields="['question']"
      >
        <Column field="question" header="Question" />
        <Column field="answer" header="Answer" />
        <Column>
          <template #body>
            <div class="flex gap-1">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-outlined"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-outlined p-button-danger"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
