<script setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";
import Chart from "./RentalizerChart.vue";
import Comps from "./RentalizerComps.vue";
import { useAirdnaStore } from "@/store/AirdnaStore";
const route = useRoute();
const props = defineProps({ data: Object });

const AIRDNA_STORE = useAirdnaStore();
const saveRentalizer = () => {
  AIRDNA_STORE.saveRentalizer(props.data);
};

const RentalizerChart = Chart;
const RentalizerComps = Comps;
</script>

<template>
  <div>
    <div class="flex align-items-center justify-content-center">
      <div class="align-items-center">
        <span class="text-700 font-medium mb-3">Rentalizer Report</span>
        <div class="text-900 font-medium text-3xl">
          {{ props.data.property_details.address }}
        </div>
      </div>
    </div>
    <!-- Data cards -->
    <div class="surface-ground px-4 py-3 md:px-6 lg:px-8">
      <div class="grid">
        <div class="col-12 md:col-4">
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex flex-column justify-content-center mb-2">
              <div>
                <div
                  class="flex justify-content-center text-500 font-medium mb-2"
                >
                  Revenue
                </div>
                <div
                  class="flex justify-content-center text-900 font-medium text-xl"
                >
                  ${{ props.data.property_stats.revenue.ltm.toLocaleString() }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex flex-column justify-content-center mb-2">
              <div
                class="flex justify-content-center text-500 font-medium mb-2"
              >
                ADR
              </div>
              <div
                class="flex justify-content-center text-900 font-medium text-xl"
              >
                ${{ props.data.property_stats.adr.ltm }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex justify-content-center mb-2">
              <div>
                <div
                  class="flex justify-content-center text-500 font-medium mb-2"
                >
                  Occupancy
                </div>
                <div
                  class="flex justify-content-center text-900 font-medium text-xl"
                >
                  {{ props.data.property_stats.occupancy.ltm * 100 }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Revenue Chart -->
    <Button
      v-if="route.name !== 'Property Report'"
      @click="saveRentalizer(props.data)"
      label="Save"
    />
    <RentalizerChart :data="props.data.property_stats" />
    <RentalizerComps :data="props.data.comps" />
  </div>
</template>
