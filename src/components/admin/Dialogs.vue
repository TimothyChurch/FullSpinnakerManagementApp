<script setup>
import {
  addIssue,
  toggleAddIssue,
  editIssue,
  toggleEditIssue,
  addPerson,
  toggleAddPerson,
  editPerson,
  toggleEditPerson,
  addProperty,
  toggleAddProperty,
  editProperty,
  toggleEditProperty,
  addQuestion,
  toggleAddQuestion,
  editQuestion,
  toggleEditQuestion,
} from "@/composables/useDialog";
import AddIssue from "@/components/admin/forms/AddIssue";
import EditIssue from "@/components/admin/forms/EditIssue";
import AddProperty from "@/components/admin/forms/AddProperty";
import EditProperty from "@/components/admin/forms/EditProperty";
import AddQuestion from "@/components/admin/forms/AddQuestion";
import EditQuestion from "@/components/admin/forms/EditQuestion";
import AddPerson from "@/components/admin/forms/AddPerson.vue";
import EditPerson from "@/components/admin/forms/EditPerson.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <!-- Add Issue Dialog -->
        <Dialog :visible="addIssue" @update:visible="toggleAddIssue">
          <AddIssue />
        </Dialog>
        <!-- Edit Issue Dialog -->
        <Dialog :visible="editIssue" @update:visible="toggleEditIssue">
          <EditIssue />
        </Dialog>
        <!-- Add Person Dialog -->
        <Dialog :visible="addPerson" @update:visible="toggleAddPerson">
          <AddPerson />
        </Dialog>
        <!-- Edit Person Dialog -->
        <Dialog :visible="editPerson" @update:visible="toggleEditPerson">
          <EditPerson />
        </Dialog>
        <!-- Add Property Dialog -->
        <Dialog :visible="addProperty" @update:visible="toggleAddProperty">
          <AddProperty />
        </Dialog>
        <!-- Edit Property Dialog -->
        <Dialog :visible="editProperty" @update:visible="toggleEditProperty">
          <EditProperty />
        </Dialog>
        <!-- Add Question Dialog -->
        <Dialog :visible="addQuestion" @update:visible="toggleAddQuestion">
          <AddQuestion />
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
