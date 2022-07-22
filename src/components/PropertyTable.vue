<script setup>
import { ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { usePropertyStore } from "@/store/PropertyStore";
import { toggleVisible } from "@/composables/useDialog";

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
const editLink = async (_id) => {
  PROPERTY_STORE.property = await PROPERTY_STORE.properties.filter(
    (property) => {
      if (property._id.toString() == _id.toString()) {
        return true;
      }
    }
  );
  toggleVisible();
};
</script>

<template>
  <DataTable
    v-model:value="properties"
    :autoLayout="true"
    :paginator="true"
    :rows="10"
    v-model:filters="filters1"
    :globalFilterFields="['name', 'address']"
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
    <Column field="name" header="Name" />
    <Column field="address" header="Address" />
    <Column field="owner.name" header="Owner" />
    <Column field="cleaner.name" header="Cleaner" />
    <Column>
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          class="p-button-rounded p-button-success"
          @click="editLink(slotProps.data._id)"
        />
      </template>
    </Column>
  </DataTable>
</template>
