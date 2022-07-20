<script setup>
import AdminContextMenu from "@/components/admin/AdminContextMenu.vue";
import AdminDialogs from "@/components/admin/Dialogs";
import * as Realm from "realm-web";
const app = new Realm.App("managementapp-ugznc");
const loginAnonymous = async () => {
  const credentials = Realm.Credentials.anonymous();
  await app.logIn(credentials);
};
loginAnonymous();
</script>

<template>
  <router-view />
  <AdminContextMenu />
  <AdminDialogs />
</template>

<style lang="scss">
@import "./assets/styles/app/layout.scss";
</style>
