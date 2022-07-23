import { ref } from "vue";
import { useToggle } from "@vueuse/core";

export const visible = ref(false);
export const addIssue = ref(false);
export const editIssue = ref(false);
export const addPerson = ref(false);
export const editPerson = ref(false);
export const addProperty = ref(false);
export const editProperty = ref(false);
export const addQuestion = ref(false);
export const editQuestion = ref(false);

export const toggleVisible = useToggle(visible);
export const toggleAddIssue = useToggle(addIssue);
export const toggleEditIssue = useToggle(editIssue);
export const toggleAddPerson = useToggle(addPerson);
export const toggleEditPerson = useToggle(editPerson);
export const toggleAddProperty = useToggle(addProperty);
export const toggleEditProperty = useToggle(editProperty);
export const toggleAddQuestion = useToggle(addQuestion);
export const toggleEditQuestion = useToggle(editQuestion);
