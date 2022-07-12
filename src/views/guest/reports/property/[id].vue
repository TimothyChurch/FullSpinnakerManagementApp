<script setup>
import { useRoute } from "vue-router";
import { useAirdnaStore } from "@/store/AirdnaStore";
import RentalizerReport from "@/components/RentalizerReport";
const AIRDNA_STORE = useAirdnaStore();
await AIRDNA_STORE.getRentalizerReports();
const route = useRoute();
const report = await AIRDNA_STORE.getRentalizerReport(route.params.id);
const details = JSON.parse(report.fields.JSON);
</script>

<template>
  <div>
    <RentalizerReport :data="details" />
  </div>
</template>
