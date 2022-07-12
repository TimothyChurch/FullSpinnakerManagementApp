<script setup>
import { ref, reactive } from "vue";
import { rentalizer } from "@/composables/useAirdna";
import RentalizerReport from "@/components/RentalizerReport";

const address = ref("");
const bedrooms = ref(0);
const bathrooms = ref(0);
const accomodates = ref(0);
const res = reactive({});

const submit = async () => {
  res.data = await rentalizer(
    address.value,
    bedrooms.value,
    bathrooms.value,
    accomodates.value
  );
};
</script>

<template>
  <div>
    <div>
      <label for="address">Address</label>
      <InputText id="address" type="text" v-model="address" />
      <label for="bedrooms">Bedrooms</label>
      <InputNumber id="bedrooms" v-model="bedrooms" />
      <label for="bathrooms">Bathrooms</label>
      <InputNumber id="bathrooms" v-model="bathrooms" mode="decimal" />
      <label for="accomodates">Accomodates</label>
      <InputNumber id="accomodates" v-model="accomodates" />
      <Button label="Submit" @click="submit()" />
    </div>
    <div v-if="res.data != null">
      <RentalizerReport :data="res.data" />
    </div>
  </div>
</template>
