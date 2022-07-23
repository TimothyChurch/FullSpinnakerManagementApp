<script setup>
import { ref } from "vue";
import { toggleEditQuestion } from "@/composables/useDialog";
import { useQuestionStore } from "@/store/QuestionStore";
import { FilterMatchMode, FilterOperator } from "primevue/api";
const QUESTION_STORE = useQuestionStore();
QUESTION_STORE.getSelectedQuestions();

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  question: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});
const openEdit = () => {
  toggleEditQuestion();
};
</script>

<template>
  <div>
    <DataTable
      :value="QUESTION_STORE.questions"
      :autoLayout="true"
      :paginator="true"
      :rows="10"
      v-model:filters="filters"
      :globalFilterFields="['question']"
    >
      <template #header>
        <div class="flex align-content-center">
          <InputText
            v-model="filters['global'].value"
            type="text"
            class="col-6"
            placeholder="Search..."
          />
          <Button
            icon="pi pi-plus"
            class="p-button-sm p-button-rounded p-button-outlined p-button-secondary mx-2"
            @click="openEdit()"
          />
        </div>
      </template>
      <Column field="question" header="Question" />
      <Column field="answer" header="Answer">
        <template #body="slotProps">
          {{ slotProps.data.answer.answer }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
