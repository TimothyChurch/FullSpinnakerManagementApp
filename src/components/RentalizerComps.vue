<script setup>
import { defineProps } from "vue";
import { useToast } from "primevue/usetoast";
const props = defineProps({ data: Object });
const toast = useToast();
const showSticky = () => {
  toast.add({
    severity: "info",
    summary: "Coming Soon",
    detail: "Will be adding this feature soon",
    life: 3000,
  });
};
</script>

<template>
  <Toast />
  <div class="surface-ground">
    <div class="grid justify-content-center">
      <div
        v-for="comp in props.data"
        :key="comp.airbnb_property_id"
        class="col-12 md:col-6 lg:col-4 xl:col-3 justify-around"
      >
        <div
          class="surface-card shadow-2 border-rounded p-4 h-full flex-column justify-content-between"
        >
          <div class="flex flex-column align-items-center surface-border pb-3">
            <img
              v-bind:src="comp.cover_img"
              class="mb-3 bg-cover"
              :height="250"
              :width="300"
            />
            <span class="text-lg text-900 font-medium mb-2">
              {{ comp.title }}
            </span>
            <div class="surface-ground col-10 p-0 border-1 surface-border">
              <div
                class="surface-card border-bottom-1 surface-border flex flex-column md:flex-row"
              >
                <div
                  class="border-bottom-1 md:border-right-1 md:border-bottom-none surface-border justify-content-center flex-auto px-3"
                >
                  <div class="mb-2">
                    <div class="text-500 font-medium text-center">Revenue</div>
                  </div>
                  <div class="text-center text-900 font-medium mb-2 text-xl">
                    ${{ comp.stats.revenue.ltm.toLocaleString() }}
                  </div>
                </div>
                <div
                  class="border-bottom-1 md:border-bottom-none surface-border justify-content-center flex-auto px-3"
                >
                  <div class="mb-2">
                    <div class="text-500 font-medium text-center">
                      Potential
                    </div>
                  </div>
                  <div class="text-900 font-medium mb-2 text-xl text-center">
                    ${{ comp.stats.revenue_potential.ltm.toLocaleString() }}
                  </div>
                </div>
              </div>
              <div class="surface-card border-round flex flex-column">
                <div
                  class="surface-card flex flex-row flex-wrap justify-content-center col-12 p-0"
                >
                  <div
                    class="border-bottom-1 md:border-right-1 md:border-bottom-none surface-border justify-content-center col-12 lg:col-4 md:col-6 p-0 pt-2"
                  >
                    <div class="mb-2">
                      <div class="text-500 font-medium text-center">
                        Days Available
                      </div>
                    </div>
                    <div class="text-center text-900 font-medium mb-2 text-xl">
                      {{ comp.stats.days_available.ltm }}
                    </div>
                  </div>
                  <div
                    class="border-bottom-1 md:border-right-1 md:border-bottom-none surface-border justify-content-center col-12 lg:col-4 md:col-6 p-0 pt-2"
                  >
                    <div class="mb-2">
                      <div class="text-500 font-medium text-center">ADR</div>
                    </div>
                    <div class="text-900 font-medium mb-2 text-xl text-center">
                      ${{ comp.stats.adr.ltm.toLocaleString() }}
                    </div>
                  </div>
                  <div
                    class="border-bottom-1 md:border-bottom-none surface-border justify-content-center col-12 lg:col-4 md:col-6 p-0 pt-2"
                  >
                    <div class="mb-2">
                      <div class="text-500 font-medium text-center">
                        Occupancy
                      </div>
                    </div>
                    <div class="text-900 font-medium mb-2 text-xl text-center">
                      {{ comp.stats.occupancy.ltm * 100 }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {{ comp.rating / 2 }}
            <Rating
              :modelValue="comp.rating / 2"
              :readonly="true"
              :stars="5"
              :cancel="false"
            ></Rating>
            <div>
              <Button
                v-if="comp.platforms.airbnb_property_id != null"
                icon="pi pi-check"
                class="p-button-rounded p-button-outlined m-2"
                @click="showSticky"
              >
                <svg width="17" height="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.808 14.578a2.684 2.684 0 0 1-1.667 2.108c-.44.18-.916.235-1.392.18a3.643 3.643 0 0 1-1.392-.468c-.659-.36-1.319-.919-2.088-1.748 1.209-1.46 1.941-2.793 2.216-3.982a4.437 4.437 0 0 0 .092-1.532 2.904 2.904 0 0 0-.495-1.225C10.515 7.1 9.562 6.63 8.5 6.63c-1.062 0-2.015.487-2.583 1.28-.256.36-.42.775-.494 1.225a3.69 3.69 0 0 0 .092 1.532c.274 1.19 1.025 2.541 2.216 4-.752.829-1.429 1.388-2.088 1.748-.477.27-.934.415-1.392.469-.472.052-.95-.01-1.392-.18a2.686 2.686 0 0 1-1.666-2.108c-.055-.45-.018-.9.165-1.406.054-.18.147-.36.238-.576.128-.288.275-.595.42-.901l.02-.036a195.005 195.005 0 0 1 4.03-8.091l.054-.109c.147-.27.293-.558.44-.829.146-.288.311-.558.513-.793a1.928 1.928 0 0 1 1.465-.667c.567 0 1.08.235 1.464.667.202.235.367.505.514.793.146.27.292.559.44.828l.055.109a236.91 236.91 0 0 1 4.01 8.109v.017c.147.288.275.613.421.901.092.217.184.397.238.577.146.47.201.92.128 1.388zM8.5 13.731c-.989-1.226-1.63-2.38-1.85-3.352-.091-.415-.11-.775-.055-1.1.037-.287.147-.54.293-.756.348-.486.934-.793 1.612-.793s1.282.289 1.612.793c.147.217.256.469.293.757.054.324.036.703-.055 1.1-.22.954-.86 2.107-1.85 3.35zm8.26-.937c-.09-.216-.183-.45-.274-.648-.147-.325-.293-.631-.422-.92l-.018-.017a186.897 186.897 0 0 0-4.048-8.145l-.054-.108c-.147-.27-.293-.559-.44-.847-.183-.324-.366-.667-.659-.991A2.976 2.976 0 0 0 8.52 0c-.916 0-1.74.396-2.345 1.081a6.159 6.159 0 0 0-.66.991c-.146.288-.292.576-.44.847l-.054.107a209.71 209.71 0 0 0-4.047 8.145l-.018.036c-.128.288-.275.595-.422.92-.098.213-.19.43-.275.648-.238.667-.311 1.297-.22 1.946a3.84 3.84 0 0 0 2.381 2.99c.476.2.97.289 1.484.289a4.888 4.888 0 0 0 2.308-.648c.75-.415 1.464-1.01 2.27-1.874.806.865 1.539 1.46 2.271 1.874A4.888 4.888 0 0 0 13.06 18c.513 0 1.025-.09 1.483-.288a3.834 3.834 0 0 0 2.381-2.991c.147-.63.074-1.26-.164-1.927z"
                    fill="#E0565B"
                    fill-rule="nonzero"
                  />
                </svg>
              </Button>
              <Button
                v-if="comp.platforms.vrbo_property_id != null"
                class="p-button-rounded p-button-outlined m-2"
                @click="showSticky"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="18"
                  viewBox="0 0 126 116"
                >
                  <g fill-rule="nonzero" fill="none">
                    <path
                      d="M63.36 83.42L66.44 77 56.07 24.08C53.19 9.2 56.63 2.69 68.33.45v-.2H57.52c-3.13 1.55-9.75 6.26-6 23.92l11.84 59.25z"
                      fill="#8EC089"
                    ></path>
                    <path
                      d="M57.24 96.2l3.06-6.38-13.68-66.07c-2.56-12.82-1.47-19.5 2.8-23.3v-.2h-7.28C39.88 5 39.2 9.83 41.78 22.5l15.46 73.7z"
                      fill="#E85F24"
                    ></path>
                    <path
                      d="M23.49.25h-7.66v.2c3.45 4.13 4.44 9.22 7.15 20.36l20.46 94.64H48L27.5 20.52C24.62 8.34 24.14 5 23.49.25z"
                      fill="#245ABC"
                    ></path>
                    <path
                      d="M51.15 108.94l3-6.31-17-80.3c-3-12.47-2.31-18.18-1.1-22.08h-6.6c-.11 5.09.15 9.29 2.58 20l19.12 88.69z"
                      fill="#1C4695"
                    ></path>
                    <path
                      d="M8.19.25H0v.2c7.48 2.94 11.16 8.64 14.11 21.91l20.15 93.09h4.59L18.56 21.63C15.07 5.55 11.39 2.57 8.19.25z"
                      fill="#318EEE"
                    ></path>
                    <g>
                      <path
                        d="M84.33 41.68l.3.2C96 14.86 99 7.47 103.7.45v-.2h-9.25v.28c.96 10.77-2.78 20.68-10.12 41.15z"
                        fill="#E85F24"
                      ></path>
                      <path
                        d="M112.42.25c-9.63 5.63-15.37 16.09-27.48 41.83l.3.2c13.89-26 21.83-36.43 39.78-41.83v-.2h-12.6z"
                        fill="#1C4695"
                      ></path>
                      <path
                        d="M83.71 41.28l.31.2C91.27 17.39 93.6 6.73 87.2.25h-9.07v.2C88.25 4 90.52 14.36 83.71 41.28z"
                        fill="#8EC089"
                      ></path>
                    </g>
                  </g>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
