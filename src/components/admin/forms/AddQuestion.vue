<script setup>
import EditQuestion from "@/components/admin/forms/EditQuestion";
import { useQuestionStore } from "@/store/QuestionStore";
const QUESTION_STORE = useQuestionStore();
QUESTION_STORE.question = {};
</script>

<template>
  <EditQuestion />
</template>
