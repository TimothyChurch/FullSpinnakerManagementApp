<script setup>
import { useIssueStore } from "@/store/IssueStore";
import { usePropertyStore } from "@/store/PropertyStore";
import { toggleEditIssue } from "@/composables/useDialog";
const ISSUE_STORE = useIssueStore();
const PROPERTY_STORE = usePropertyStore();
PROPERTY_STORE.getPropertiesNames();
const status = [
  "Reported",
  "Owner Notified",
  "In Progress",
  "Completed - Unpaid",
  "Completed - Paid",
];
const type = ["Maintenance", "Cleaning", "Lock", "Guest Damage"];
const saveIssue = () => {
  ISSUE_STORE.saveIssue();
  toggleEditIssue();
};
</script>

<template>
  <div class="surface-ground px-4 py-8 md:px-6 lg: px-8">
    <div class="grid formgrid p-fluid">
      <div class="field mb-4 col-12">
        <label for="title" class="font-medium text-900">Title</label>
        <InputText type="text" id="title" v-model="ISSUE_STORE.issue.tittle" />
      </div>
      <div class="field mb-4 col-12 md:col-4">
        <label for="property" class="font-medium text-900">Property</label>
        <Dropdown
          v-model="property"
          :options="PROPERTY_STORE.propertiesNames"
          :filter="true"
          optionLabel="name"
        />
      </div>
      <div class="field mb-4 col-12 md:col-4">
        <label for="type" class="font-medium text-900">Type</label>
        <Dropdown v-model="ISSUE_STORE.issue.type" :options="type" />
      </div>
      <div class="field mb-4 col-12 md:col-4">
        <label for="status" class="font-medium text-900">Status</label>
        <Dropdown v-model="ISSUE_STORE.issue.status" :options="status" />
      </div>
      <div class="field mb-4 col-12 md:col-4">
        <label for="guest" class="font-medium text-900">Guest</label>
        <InputText
          type="text"
          id="guest"
          v-model="ISSUE_STORE.issue.guest"
          placeholder="Will be linked dropdown later"
        />
        <!-- TODO Make input link to Guest database -->
      </div>
      <div class="field mb-4 col-12 md:col-8">
        <label for="details" class="font-medium text-900">Details</label>
        <Textarea
          v-model="ISSUE_STORE.issue.details"
          id="details"
          :autoResize="true"
          rows="5"
          cols="30"
        />
      </div>
      <div class="field mb-4 col-12 md:col-4">
        <label for="technician" class="font-medium text-900">Technician</label>
        <InputText
          v-model="ISSUE_STORE.issue.technician"
          id="technician"
          placeholder="Will be linked dropdown later"
        />
      </div>
      <div class="field mb-4 col-12 md:col-8">
        <label for="techNotes" class="font-medium text-900"
          >Technician Notes</label
        >
        <Textarea
          v-model="ISSUE_STORE.issue.techNotes"
          id="techNotes"
          :autoResize="true"
          rows="5"
          cols="30"
        />
      </div>
      <div class="flex flex-row col-12 justify-content-center">
        <Button class="justify-content-center" @click="saveIssue()"
          >Save</Button
        >
      </div>
    </div>
  </div>
</template>
