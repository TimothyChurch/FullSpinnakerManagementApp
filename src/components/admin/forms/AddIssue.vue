<script setup>
import EditIssue from "@/components/admin/forms/EditIssue";
import { useIssueStore } from "@/store/IssueStore";
const ISSUE_STORE = useIssueStore();
ISSUE_STORE.issue = {};
</script>

<template>
  <EditIssue />
</template>
