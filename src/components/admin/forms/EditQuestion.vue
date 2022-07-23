<script setup>
import { ref } from "vue";
import { useQuestionStore } from "@/store/QuestionStore";
import { usePropertyStore } from "@/store/PropertyStore";
import { toggleEditQuestion } from "@/composables/useDialog";
const QUESTION_STORE = useQuestionStore();
const PROPERTY_STORE = usePropertyStore();
PROPERTY_STORE.getPropertiesNames();
const property = ref();
const answer = ref();
const saveQuestion = () => {
  if (!QUESTION_STORE.question.answer) {
    QUESTION_STORE.question.answer = [
      {
        property: property.value._id,
        answer: answer.value,
      },
    ];
  } else {
    QUESTION_STORE.question.answer.push({
      property: property.value,
      answer: answer.value,
    });
  }
  QUESTION_STORE.saveQuestion();
  toggleEditQuestion();
};
</script>

<template>
  <div class="surface-ground px-4 py-8 md:px-6 lg: px-8">
    <div class="grid formgrid p-fluid">
      <div class="field mb-4 col-12">
        <label for="property" class="font-medium text-900">Property</label>
        <Dropdown
          v-model="property"
          :options="PROPERTY_STORE.propertiesNames"
          :filter="true"
          optionLabel="name"
        />
      </div>
      <div class="field mb-4 col-12">
        <label for="question" class="font-medium text-900">Question</label>
        <InputText
          type="text"
          id="question"
          v-model="QUESTION_STORE.question.question"
          placeholder="Question"
        />
      </div>
      <div class="field mb-4 col-12">
        <label for="answer" class="font-medium text-900">Answer</label>
        <InputText
          type="text"
          id="answer"
          v-model="answer"
          placeholder="Answer"
        />
      </div>
      <div class="flex flex-row col-12 justify-content-center">
        <Button class="justify-content-center" @click="saveQuestion()"
          >Save</Button
        >
      </div>
    </div>
  </div>
</template>
