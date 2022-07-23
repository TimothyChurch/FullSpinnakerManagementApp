<script setup>
import { useRouter } from "vue-router";
import { usePeopleStore } from "@/store/PeopleStore";
import { usePropertyStore } from "@/store/PropertyStore";
import { toggleEditPerson } from "@/composables/useDialog";
const router = useRouter();
const PEOPLE_STORE = usePeopleStore();
const PROPERTY_STORE = usePropertyStore();
PROPERTY_STORE.getProperties();

const roles = [
  "Owner",
  "Cleaner",
  "Photographer",
  "HVAC",
  "Yard Care",
  "Handyman",
  "Plumber",
  "Pest Control",
  "Electrician",
  "Locksmith",
  "Admin",
];

const status = ["Cold", "Hot", "Pending", "Active", "Past", "Lost"];

const handleClick = () => {
  PEOPLE_STORE.person.properties = PEOPLE_STORE.person.properties.map(
    (property) => {
      return property._id;
    }
  );
  PEOPLE_STORE.savePerson();
  router.push(`/admin/people/${PEOPLE_STORE.person._id.toString()}`);
  toggleEditPerson();
};
</script>

<template>
  <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
    <div class="grid formgrid p-fluid">
      <div class="field mb-4 col-12 md:col-8">
        <label for="name" class="font-medium text-900">Name</label>
        <InputText v-model="PEOPLE_STORE.person.name" id="name" type="text" />
      </div>
      <div class="field mb-4 col-6 md:col-2">
        <label for="role" class="font-medium text-900">Role</label>
        <Dropdown
          v-model="PEOPLE_STORE.person.role"
          id="role"
          :options="roles"
        />
      </div>
      <div class="field mb-4 col-6 md:col-2">
        <label for="status" class="font-medium text-900">Status</label>
        <Dropdown
          v-model="PEOPLE_STORE.person.status"
          id="status"
          :options="status"
        />
      </div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="phone" class="font-medium text-900"> Phone Number </label>
        <InputText v-model="PEOPLE_STORE.person.phone" id="phone" type="text" />
      </div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="email" class="font-medium text-900">Email Address</label>
        <InputText v-model="PEOPLE_STORE.person.email" id="email" type="text" />
      </div>
      <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="airbnbEmail" class="font-medium text-900"
          >Airbnb Email</label
        >
        <InputText
          v-model="PEOPLE_STORE.person.airbnbEmail"
          id="airbnbEmail"
          type="text"
        />
      </div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="airbnbPassword" class="font-medium text-900"
          >Airbnb Password</label
        >
        <InputText
          v-model="PEOPLE_STORE.person.airbnbPassword"
          id="airbnbPassword"
          type="text"
        />
      </div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="vrboEmail" class="font-medium text-900">VRBO Email</label>
        <InputText
          v-model="PEOPLE_STORE.person.vrboEmail"
          id="vrboEmail"
          type="text"
        />
      </div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="vrboPassword" class="font-medium text-900"
          >VRBO Password</label
        >
        <InputText
          v-model="PEOPLE_STORE.person.vrboPassword"
          id="vrboPassword"
          type="text"
        />
      </div>
      <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
      <div class="field mb-4 col-12">
        <label for="properties" class="font-medium text-900">Properties</label>
        <MultiSelect
          v-model="PEOPLE_STORE.person.properties"
          :options="PROPERTY_STORE.properties"
          :filter="true"
          optionLabel="name"
          display="chip"
        />
      </div>
      <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
      <div class="col-12">
        <Button
          label="Save Changes"
          class="w-auto mt-3"
          @click="handleClick()"
        ></Button>
      </div>
    </div>
  </div>
</template>
