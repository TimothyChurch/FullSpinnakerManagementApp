<script setup>
const sideNav = [
  { label: "Welcome" },
  { label: "About Us" },
  { label: "Before You Leave Home" },
  { label: "Pre-Arrival Info" },
  { label: "Arrival Instructions" },
  { label: "Essential Property Info" },
  { label: "Safety Info" },
  { label: "Enjoying Your Time With Us" },
  { label: "Where's The Nearest..?" },
  { label: "Practical Area Information" },
  { label: "Local Eats & Drinks" },
  { label: "So Long, Farewell!" },
];
</script>

<template>
  <div class="flex flex-row w-full justify-content-around">
    <div class="flex col-4 h-screen overflow-scroll justify-content-end">
      <ul class="list-none p-0 m-0">
        <li
          v-for="item in sideNav"
          :key="item.label"
          class="surface-0 p-4 mb-3 shadow-2 border-round flex flex-row"
        >
          <div class="flex align-content-center">
            <i
              class="pi pi-home flex col align-self-center"
              style="font-size: 2rem"
            />
          </div>
          <div class="surface-0 p-4 flex col text-xl">
            {{ item.label }}
          </div>
        </li>
      </ul>
    </div>
    <div class="flex col-6 surface-0 p-4 mb-3 shadow-2 border-round">
      This is the info section
    </div>
  </div>
</template>
