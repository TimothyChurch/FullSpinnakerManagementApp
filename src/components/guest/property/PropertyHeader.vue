<script setup></script>

<template>
  <div>
    <div class="px-2 py-3 md:px-4 lg:px-6 surface-section w-full mb-5">
      <div
        class="flex flex-column lg:flex-row lg:align-items-center lg:justify-content-between relative"
      >
        <div class="flex flex-row">
          <div
            style="width: 100px; height: 100px; border-radius: 10px"
            class="surface-card shadow-2 flex align-items-center justify-content-center"
          >
            <img
              src="images/blocks/logos/hyper.svg"
              alt="Image"
              width="70"
              height="70"
            />
          </div>
          <div class="flex flex-column justify-content-center p-2 h-auto">
            <div class="text-900 text-3xl font-medium mb-2">
              Full Spinnaker Management
            </div>
            <p class="mt-0 mb-3 text-700 text-xl">
              Vacation Rental Management for Investors
            </p>
          </div>
        </div>
        <div class="mt-3 lg:mt-0">
          <Button
            label="Follow"
            icon="pi pi-plus-circle"
            class="p-button-outlined mr-2"
          ></Button>
          <Button label="Website" icon="pi pi-link" class="mr-2"></Button>
          <Button
            icon="pi pi-ellipsis-v"
            class="p-button-outlined p-button-rounded"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>
