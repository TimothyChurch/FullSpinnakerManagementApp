import { ref } from "vue";
import { useToggle } from "@vueuse/core";

export const visible = ref(false);
export const addProperty = ref(false);
export const editProperty = ref(false);

export const toggleVisible = useToggle(visible);
export const toggleAddProperty = useToggle(addProperty);
export const toggleEditProperty = useToggle(editProperty);
