<script setup>
const address = "";
const bedrooms = "";
const bathrooms = "";
const accomodates = "";
</script>

<template>
  <div>
    <label for="address">Address</label>
    <InputText id="address" type="text" v-model="address" />
    <label for="bedrooms">Bedrooms</label>
    <InputNumber id="bedrooms" v-model="bedrooms" />
    <label for="bathrooms">Bathrooms</label>
    <InputNumber id="bathrooms" v-model="bathrooms" mode="decimal" />
    <label for="accomodates">Accomodates</label>
    <InputNumber id="accomodates" v-model="accomodates" />
  </div>
</template>
