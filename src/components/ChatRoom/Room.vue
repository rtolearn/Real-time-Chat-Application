<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="w-full h-auto border solid border-black rounded-md p-5">
    <div>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <h1 class="text-base md:text-lg">Title:</h1>
          <p class="text-xs md:text-sm text-gray-500">Environment</p>
        </div>

        <div class="flex items-center gap-2">
          <h1 class="text-base md:text-lg">Member:</h1>
          <p class="text-xs md:text-sm text-gray-500">3</p>
        </div>
      </div>

      <div class="flex justify-start items-center gap-2">
        <h2 class="text-sm md:text-base">Host:</h2>
        <p class="text-xs md:text-sm text-gray-500">Ng Chen Yang</p>
      </div>

      <div class="flex justify-start items-center gap-2">
        <h2 class="text-sm md:text-base">Part Status:</h2>
        <p class="text-xs md:text-sm text-green-600 font-bold">Open</p>
      </div>

      <!-- Tags of room and button -->
      <div class="flex justify-between items-center my-4">
        <div class="w-fit h-auto flex flex-wrap justify-start items-center  gap-2
        w-3/5 ">
          <p class="border solid border-black rounded-full p-2">Subtopic</p>
          <p class="border solid border-black rounded-full p-2">Subtopic</p>
          <p class="border solid border-black rounded-full p-2">Subtopic</p>
          <p class="border solid border-black rounded-full p-2">Subtopic</p>         
        </div>
        <div class="flex justify-end">
          <Button icon="pi pi-check" label="Join" text raised severity="info" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "primevue/button";
</script>
