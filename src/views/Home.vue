<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as Realm from "realm-web";
const app = Realm.getApp("managementapp-ugznc");
const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
  const credentials = Realm.Credentials.emailPassword(
    email.value,
    password.value
  );
  await app.logIn(credentials);
  router.push(app.currentUser.customData.role);
};
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    {{ app.currentUser }}
    <div class="text-center mb-5">
      <img
        src="images/blocks/logos/hyper.svg"
        alt="Image"
        height="50"
        class="mb-3"
      />
      <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
      <span class="text-600 font-medium line-height-3"
        >Don't have an account?</span
      >
      <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
        >Create today!</a
      >
    </div>

    <div>
      <label for="email1" class="block text-900 font-medium mb-2">Email</label>
      <InputText id="email1" type="text" class="w-full mb-3" v-model="email" />

      <label for="password1" class="block text-900 font-medium mb-2"
        >Password</label
      >
      <InputText
        id="password1"
        type="password"
        class="w-full mb-3"
        v-model="password"
      />

      <div class="flex align-items-center justify-content-between mb-6">
        <a
          class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          >Forgot password?</a
        >
      </div>

      <Button
        label="Sign In"
        icon="pi pi-user"
        class="w-full"
        @click="login"
      ></Button>
    </div>
  </div>
</template>
