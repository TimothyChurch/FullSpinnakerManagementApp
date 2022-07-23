<script setup>
import {
  editIssue,
  toggleEditIssue,
  editPerson,
  toggleEditPerson,
  editProperty,
  toggleEditProperty,
  editQuestion,
  toggleEditQuestion,
} from "@/composables/useDialog";
import EditIssue from "@/components/admin/forms/EditIssue";
import EditProperty from "@/components/admin/forms/EditProperty";
import EditQuestion from "@/components/admin/forms/EditQuestion";
import EditPerson from "@/components/admin/forms/EditPerson.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <!-- Edit Issue Dialog -->
        <Dialog :visible="editIssue" @update:visible="toggleEditIssue">
          <EditIssue />
        </Dialog>
        <!-- Edit Person Dialog -->
        <Dialog :visible="editPerson" @update:visible="toggleEditPerson">
          <EditPerson />
        </Dialog>
        <!-- Edit Property Dialog -->
        <Dialog :visible="editProperty" @update:visible="toggleEditProperty">
          <EditProperty />
        </Dialog>
        <!-- Edit Question Dialog -->
        <Dialog :visible="editQuestion" @update:visible="toggleEditQuestion">
          <EditQuestion />
        </Dialog>
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
