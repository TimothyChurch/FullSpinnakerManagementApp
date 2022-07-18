import { ref } from "vue";
import { useToggle } from "@vueuse/core";

export const visible = ref(false);

export const toggleVisible = useToggle(visible);
