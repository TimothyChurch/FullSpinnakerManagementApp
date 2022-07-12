<script setup>
import { ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { usePeopleStore } from "@/store/PeopleStore";
import { usePropertyStore } from "@/store/PropertyStore";

const PROPERTY_STORE = usePropertyStore();
await PROPERTY_STORE.getProperties();
const properties = PROPERTY_STORE.properties;

const PEOPLE_STORE = usePeopleStore();
await PEOPLE_STORE.getPeople();
const people = ref(PEOPLE_STORE.people);

const filters1 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});
</script>

<template>
  {{ properties[0].id }}
  <DataTable
    v-model:value="people"
    :autoLayout="true"
    :paginator="true"
    :rows="10"
    v-model:filters="filters1"
    :globalFilterFields="['fields.Name', 'fields.Address']"
  >
    <template #header>
      <div class="flex justify-content-between">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters1['global'].value"
            placeholder="Keyword Search"
          />
        </span>
      </div>
    </template>
    <Column field="fields.Name" header="Name" />
    <Column field="fields.Role" header="Role" />
    <Column field="fields.Phone" header="Phone Number" />
    <Column field="fields.Email" header="Email" />
    <Column field="fields.Properties" header="Properties">
      // eslint-disable-next-line vue/no-unused-vars
      <template #body="slotProps">
        {{ slotProps.data.fields.Properties }}
      </template>
    </Column>
  </DataTable>
</template>
