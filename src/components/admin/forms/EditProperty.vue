<script setup>
import { useRouter } from "vue-router";
import { usePeopleStore } from "@/store/PeopleStore";
import { usePropertyStore } from "@/store/PropertyStore";
import { toggleEditProperty } from "@/composables/useDialog";
const router = useRouter();
const PEOPLE_STORE = usePeopleStore();
const PROPERTY_STORE = usePropertyStore();
PEOPLE_STORE.getOwners();
PEOPLE_STORE.getCleaners();

const handleClick = () => {
  if (PROPERTY_STORE.property.owner) {
    PROPERTY_STORE.property.owner = PROPERTY_STORE.property.owner.map(
      (owner) => {
        return owner._id;
      }
    );
  }
  if (PROPERTY_STORE.property.cleaner) {
    PROPERTY_STORE.property.cleaner = PROPERTY_STORE.property.cleaner.map(
      (cleaner) => {
        return cleaner._id;
      }
    );
  }
  PROPERTY_STORE.upsertOne();
  router.push(`/admin/properties/${PROPERTY_STORE.property._id.toString()}`);
  toggleEditProperty();
};
</script>

<template>
  <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
    <div class="grid formgrid p-fluid">
      <div class="field mb-4 col-12">
        <label for="name" class="font-medium text-900">Name</label>
        <InputText
          v-model="PROPERTY_STORE.property.name"
          id="name"
          type="text"
        />
      </div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="pms" class="font-medium text-900">PMS ID</label>
        <InputText
          v-model="PROPERTY_STORE.property.pms"
          id="pms"
          type="number"
        />
      </div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="hot" class="font-medium text-900">HOT Info</label>
        <InputText v-model="PROPERTY_STORE.property.hot" id="hot" type="text" />
      </div>
      <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
      <div class="field mb-4 col-12 md:col-4">
        <label for="street" class="font-medium text-900">
          Street Address
        </label>
        <InputText
          v-model="PROPERTY_STORE.property.street"
          id="street"
          type="text"
        />
      </div>
      <div class="field mb-4 col-12 md:col-4">
        <label for="city" class="font-medium text-900">City</label>
        <InputText
          v-model="PROPERTY_STORE.property.city"
          id="city"
          type="text"
        />
      </div>
      <div class="field mb-4 col-12 md:col-2">
        <label for="state" class="font-medium text-900">State</label>
        <InputText
          v-model="PROPERTY_STORE.property.state"
          id="state"
          type="text"
        />
      </div>
      <div class="field mb-4 col-12 md:col-2">
        <label for="zip" class="font-medium text-900">Zipcode</label>
        <InputText v-model="PROPERTY_STORE.property.zip" id="zip" type="text" />
      </div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="lat" class="font-medium text-900">Latitude</label>
        <InputText
          v-model="PROPERTY_STORE.property.lat"
          id="lat"
          type="number"
        />
      </div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="lng" class="font-medium text-900">Longitude</label>
        <InputText
          v-model="PROPERTY_STORE.property.lng"
          id="lng"
          type="number"
        />
      </div>
      <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="owner" class="font-medium text-900">Owner</label>
        <MultiSelect
          v-model="PROPERTY_STORE.property.owner"
          :options="PEOPLE_STORE.owners"
          :filter="true"
          optionLabel="name"
          display="chip"
        />
      </div>
      <div class="field mb-4 col-12 md:col-6">
        <label for="cleaner" class="font-medium text-900">Cleaner</label>
        <MultiSelect
          v-model="PROPERTY_STORE.property.cleaner"
          :options="PEOPLE_STORE.cleaners"
          :filter="true"
          optionLabel="name"
          display="chip"
        />
      </div>
      <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
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
