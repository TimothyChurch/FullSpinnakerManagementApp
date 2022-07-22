<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import * as Realm from "realm-web";
const app = Realm.getApp("managementapp-ugznc");
const router = useRouter();
const toast = useToast();
const email = ref("");
const password = ref("");
const login = async () => {
  const credentials = Realm.Credentials.emailPassword(
    email.value,
    password.value
  );
  try {
    await app.logIn(credentials);
    router.push(app.currentUser.customData.role);
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Invalid Username/Password",
      details: "Message",
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="flex justify-content-center align-items-center w-screen h-screen">
    <div class="surface-card p-4 shadow-2 border-round w-full h-max lg:w-6">
      <Toast position="top-center" />
      <div class="text-center mb-5">
        <!-- TODO Add logo -->
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
        <!-- TODO Create add profile link -->
      </div>

      <div>
        <label for="email1" class="block text-900 font-medium mb-2"
          >Email</label
        >
        <InputText
          id="email1"
          type="text"
          class="w-full mb-3"
          v-model="email"
        />

        <label for="password1" class="block text-900 font-medium mb-2"
          >Password</label
        >
        <InputText
          id="password1"
          type="password"
          class="w-full mb-3"
          v-model="password"
          @keyup.enter="login"
        />

        <div class="flex align-items-center justify-content-between mb-6">
          <!-- TODO Add forgot password link -->
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
  </div>
</template>
