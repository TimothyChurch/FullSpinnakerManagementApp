<script setup></script>

<template>
  <Suspense>
    <template #default>
      <div>blah blah blah</div>
    </template>
    <template #fallback>
      Loading...
      <!-- TODO Add skeleton table -->
    </template>
  </Suspense>
</template>
