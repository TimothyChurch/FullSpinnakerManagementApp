<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useQuestionStore } from "@/store/QuestionStore";
import { toggleEditQuestion } from "@/composables/useDialog";
const route = useRoute();
const router = useRouter();
const QUESTION_STORE = useQuestionStore();
await QUESTION_STORE.getQuestion(route.params.id);

watch(route, () => {
  QUESTION_STORE.getQuestion(route.params.id);
});
const openEdit = () => {
  toggleEditQuestion();
};
const toProperty = (id) => {
  router.push({ name: "Property", params: { id: id.toString() } });
};
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  property: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});
</script>

<template>
  <div>
    <Card>
      <template #title>
        <div class="flex justify-content-center align-items-center">
          {{ QUESTION_STORE.question.question }}
          <Button
            icon="pi pi-plus"
            class="p-button-sm p-button-rounded p-button-outlined p-button-secondary m-3"
            @click="openEdit()"
          />
        </div>
      </template>
      <template #content>
        <DataTable
          :value="QUESTION_STORE.question.answer"
          :autolayout="true"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
          :globalFilterFields="['property.name']"
          filterField="property.name"
        >
          <template #header>
            <InputText
              v-model="filters['global'].value"
              type="text"
              class="col-6"
              placeholder="Search for Specific Property"
            />
          </template>
          <Column
            field="property"
            header="Property"
            :sortable="true"
            sortField="property.name"
          >
            <template #body="slotProps">
              {{ slotProps.data.property.name }}
            </template>
          </Column>
          <Column field="answer" header="Answer" />
        </DataTable>
      </template>
    </Card>
    <Button @click="toProperty()">To Property</Button>
  </div>
</template>
