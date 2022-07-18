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
    :globalFilterFields="['Name', 'Address']"
    class="p-datatable-sm"
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
    <Column field="Name" header="Name" class="min-w-32" />
    <Column field="Role" header="Role" class="min-w-full" />
    <Column field="Phone" header="Phone Number" class="min-w-full" />
    <Column field="Email" header="Email" class="min-w-full" />
    <Column field="Properties" header="Properties">
      <template #body="slotProps">
        <div>
          <div v-for="property in slotProps.data.Properties" :key="property">
            <a class="h-4 p-1 truncate max-w-6">
              {{ PROPERTY_STORE.getPropertyName(property) }}
            </a>
          </div>
        </div>
      </template>
    </Column>
  </DataTable>
</template>
