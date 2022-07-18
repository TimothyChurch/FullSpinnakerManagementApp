<script setup>
import { reactive } from "vue";
import { usePeopleStore } from "@/store/PeopleStore";
import { usePropertyStore } from "@/store/PropertyStore";
import { visible, toggleVisible } from "@/composables/useDialog";

const PEOPLE_STORE = usePeopleStore();
const PROPERTY_STORE = usePropertyStore();

const owners = await PEOPLE_STORE.getOwners;
const cleaners = await PEOPLE_STORE.getCleaners;
const property = reactive({
  name: "",
  status: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  pms: "",
  entry: "",
  owner: "",
  cleaner: "",
});

const setProperty = () => {
  if (PROPERTY_STORE.property.length > 0) {
    property.name = PROPERTY_STORE.property[0].Name;
    property.status = PROPERTY_STORE.property[0].Status;
    property.street = PROPERTY_STORE.property[0].Street;
    property.city = PROPERTY_STORE.property[0].City;
    property.state = PROPERTY_STORE.property[0].State;
    property.zipcode = PROPERTY_STORE.property[0].Zipcode;
    property.pms = PROPERTY_STORE.property[0].PMS;
    property.entry = PROPERTY_STORE.property[0].Entry;
    property.owner = PROPERTY_STORE.property[0].Owner;
    property.cleaner = PROPERTY_STORE.property[0].Cleaners;
  }
};

const statuses = ["Cold", "Warm", "Pending", "Active", "Withdrawn", "Lost"];
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="toggleVisible"
    @show="setProperty()"
  >
    {{ property }}
    {{ PROPERTY_STORE.property[0] }}
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div class="grid">
        <div class="col-12">
          <div class="grid formgrid p-fluid">
            <div class="field mb-4 col-10">
              <label for="name" class="font-medium text-900">Name</label>
              <InputText id="name" type="text" v-model="property.name" />
            </div>
            <div class="field mb-4 col-2">
              <label for="status" class="font-medium text-900">Status</label>
              <Dropdown
                id="status"
                type="text"
                v-model="property.status"
                :options="statuses"
              />
            </div>
            <div class="field mb-4 col-12 md:col-4">
              <label for="street" class="font-medium text-900">
                Street Address
              </label>
              <InputText id="street" type="text" v-model="property.street" />
            </div>
            <div class="field mb-4 col-12 md:col-4">
              <label for="city" class="font-medium text-900">City</label>
              <InputText id="city" type="text" v-model="property.city" />
            </div>
            <div class="field mb-4 col-12 md:col-2">
              <label for="state" class="font-medium text-900">State</label>
              <InputText id="state" type="text" v-model="property.state" />
            </div>
            <div class="field mb-4 col-12 md:col-2">
              <label for="zipcode" class="font-medium text-900">Zip Code</label>
              <InputText id="zipcode" type="text" v-model="property.zipcode" />
            </div>
            <div class="field mb-4 col-12 md:col-6">
              <label for="pms" class="font-medium text-900">PMS ID #</label>
              <InputText id="pms" type="text" v-model="property.pms" />
            </div>
            <div class="field mb-4 col-12 md:col-6">
              <label for="entry" class="font-medium text-900">Entry Code</label>
              <InputText id="entry" type="text" v-model="property.entry" />
            </div>
            <div class="field mb-4 col-12 md:col-6">
              <label for="owner" class="font-medium text-900">Owner</label>
              <MultiSelect
                id="owner"
                type="text"
                v-model="property.owner"
                :options="owners"
                :filter="true"
                display="chip"
                optionLabel="Name"
                optionValue="_id"
              >
              </MultiSelect>
            </div>
            <div class="field mb-4 col-12 md:col-6">
              <label for="cleaner" class="font-medium text-900">Cleaner</label>
              <MultiSelect
                id="cleaner"
                type="text"
                v-model="property.cleaner"
                :options="cleaners"
                :filter="true"
                display="chip"
                optionLabel="Name"
                optionValue="_id"
              >
              </MultiSelect>
            </div>
            <div class="col-12">
              <Button label="Save Changes" class="w-auto mt-3"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
