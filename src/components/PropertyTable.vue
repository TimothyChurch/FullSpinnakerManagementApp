<script setup>
import { ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { usePropertyStore } from "@/store/PropertyStore";
const PROPERTY_STORE = usePropertyStore();
await PROPERTY_STORE.getProperties();

const properties = ref(PROPERTY_STORE.properties);
const filters1 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});
</script>

<template>
  <DataTable
    v-model:value="properties"
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
    <Column field="Name" header="Name" />
    <Column field="Address" header="Address" />
    <Column field="Owner" header="Owner" />
    <Column field="Cleaners" header="Cleaner" />
  </DataTable>
</template>
