<script setup>
import AdminContextMenu from "@/components/admin/AdminContextMenu.vue";
import AdminDialogs from "@/components/admin/Dialogs";
import * as Realm from "realm-web";
new Realm.App("managementapp-ugznc");
</script>

<template>
  <router-view />
  <AdminContextMenu />
  <AdminDialogs />
</template>

<style lang="scss">
@import "./assets/styles/app/layout.scss";
</style>
