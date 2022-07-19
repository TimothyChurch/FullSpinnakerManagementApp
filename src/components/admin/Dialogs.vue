<script setup>
import {
  addProperty,
  toggleAddProperty,
  editProperty,
  toggleEditProperty,
} from "@/composables/useDialog";
import AddProperty from "@/components/admin/forms/AddProperty";
import EditProperty from "@/components/admin/forms/EditProperty";
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <!-- Add Property Dialog -->
        <Dialog :visible="addProperty" @update:visible="toggleAddProperty">
          <AddProperty />
        </Dialog>
        <!-- Edit Property Dialog -->
        <Dialog :visible="editProperty" @update:visible="toggleEditProperty">
          <EditProperty />
        </Dialog>
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
