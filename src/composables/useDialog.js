import { ref } from "vue";
import { useToggle } from "@vueuse/core";
import { useIssueStore } from "@/store/IssueStore";
import { usePeopleStore } from "@/store/PeopleStore";
import { usePropertyStore } from "@/store/PropertyStore";
import { useQuestionStore } from "@/store/QuestionStore";

export const editIssue = ref(false);
export const editPerson = ref(false);
export const editProperty = ref(false);
export const editQuestion = ref(false);

export const toggleEditIssue = useToggle(editIssue);
export const toggleEditPerson = useToggle(editPerson);
export const toggleEditProperty = useToggle(editProperty);
export const toggleEditQuestion = useToggle(editQuestion);

export function addIssue() {
  const ISSUE_STORE = useIssueStore();
  ISSUE_STORE.issue = {};
  ISSUE_STORE.issue.created = new Date();
  toggleEditIssue();
}
export function addPerson() {
  const PEOPLE_STORE = usePeopleStore();
  PEOPLE_STORE.person = {};
  toggleEditPerson();
}
export function addProperty() {
  const PROPERTY_STORE = usePropertyStore();
  PROPERTY_STORE.property = {};
  toggleEditProperty();
}
export function addQuestion() {
  const QUESTION_STORE = useQuestionStore();
  QUESTION_STORE.question = {};
  toggleEditQuestion();
}
