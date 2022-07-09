<script setup>
import { useAirdnaStore } from "@/store/AirdnaStore";
const AIRDNA_STORE = useAirdnaStore();
AIRDNA_STORE.getRentalizerReports();
</script>

<template>
  <div v-for="report in AIRDNA_STORE.rentalizer" :key="report.id">
    {{ report.fields.Stats }}
  </div>
</template>
