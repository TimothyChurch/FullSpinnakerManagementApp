<script setup>
import { usePeopleStore } from "@/store/PeopleStore";
const PEOPLE_STORE = usePeopleStore();
PEOPLE_STORE.getPeople();
const sideNav = [
  {
    label: "Home",
    icon: "pi pi-home mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl",
    route: "/admin",
  },
  {
    label: "Properties",
    icon: "pi pi-building mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl",
    route: "/admin/properties",
  },
  {
    label: "People",
    icon: "pi pi-user mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl",
    route: "/admin/people",
  },
  {
    label: "AirDNA",
    icon: "pi pi-building mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl",
    route: "/admin/airdna",
  },
];
</script>

<template>
  <div class="min-h-screen flex relative lg:static surface-ground">
    <!-- Side Nav Bar -->
    <div
      id="app-sidebar-9"
      class="h-full lg:h-auto surface-section hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border w-18rem lg:w-7rem select-none"
    >
      <div class="flex flex-column h-full">
        <div
          class="flex align-items-center justify-content-center flex-shrink-0"
          style="height: 60px"
        >
          <img
            src="images/blocks/logos/hyper-cyan.svg"
            alt="Image"
            height="30"
          />
        </div>
        <div class="mt-3">
          <ul class="list-none p-0 m-0">
            <li v-for="link in sideNav" :key="link.label">
              <router-link
                v-ripple
                class="flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors p-ripple no-underline"
                :to="link.route"
                active-class="text-cyan-600 border-cyan-600"
                exact-active-class="text-cyan-600 border-cyan-600"
              >
                <i :class="link.icon"></i>
                <span
                  class="font-medium inline text-base lg:text-xs lg:block"
                  >{{ link.label }}</span
                >
              </router-link>
            </li>
          </ul>
        </div>
        <div class="mt-auto">
          <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
          <a
            v-ripple
            class="m-3 flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:surface-200 border-round text-600 transition-duration-150 transition-colors p-ripple"
          >
            <img
              src="images/blocks/avatars/circle/avatar-f-1.png"
              class="mr-2 lg:mr-0"
              style="width: 32px; height: 32px"
            />
            <span class="font-medium inline lg:hidden">Amy Elsner</span>
          </a>
        </div>
      </div>
    </div>
    <div class="min-h-screen flex flex-column relative flex-auto">
      <div
        class="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 surface-border"
        style="height: 60px"
      >
        <div class="flex">
          <a
            v-ripple
            class="cursor-pointer block lg:hidden text-700 mr-3 mt-1 p-ripple"
            v-styleclass="{
              selector: '#app-sidebar-9',
              enterClass: 'hidden',
              enterActiveClass: 'fadeinleft',
              leaveToClass: 'hidden',
              leaveActiveClass: 'fadeoutleft',
              hideOnOutsideClick: true,
            }"
          >
            <i class="pi pi-bars text-4xl"></i>
          </a>
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText
              type="text"
              class="border-none w-10rem sm:w-20rem"
              placeholder="Search"
            />
          </span>
        </div>
        <a
          v-ripple
          class="cursor-pointer block lg:hidden text-700 p-ripple"
          v-styleclass="{
            selector: '@next',
            enterClass: 'hidden',
            enterActiveClass: 'fadein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'fadeout',
            hideOnOutsideClick: true,
          }"
        >
          <i class="pi pi-ellipsis-v text-2xl"></i>
        </a>
        <!-- Notifications & Profile -->
        <ul
          class="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static"
        >
          <li>
            <a
              v-ripple
              class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
              <span class="block lg:hidden font-medium">Inbox</span>
            </a>
          </li>
          <li>
            <a
              v-ripple
              class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"
            >
              <i
                class="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0"
                v-badge.danger
              ></i>
              <span class="block lg:hidden font-medium">Notifications</span>
            </a>
          </li>
          <li class="border-top-1 surface-border lg:border-top-none">
            <a
              v-ripple
              class="flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"
            >
              <img
                src="images/blocks/avatars/circle/avatar-f-1.png"
                class="mr-3 lg:mr-0"
                style="width: 32px; height: 32px"
              />
              <div class="block lg:hidden">
                <div class="text-900 font-medium">Amy Elsner</div>
                <span class="text-600 font-medium text-sm"
                  >Marketing Specialist</span
                >
              </div>
            </a>
          </li>
        </ul>
      </div>
      <!-- Main Content -->
      <router-view />
    </div>
  </div>
</template>
