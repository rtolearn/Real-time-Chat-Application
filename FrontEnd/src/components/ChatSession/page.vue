<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="backgroundColor"
    class="w-full h-screen flex flex-col justify-center items-center"
  >
    <!-- Toggle Button -->
    <div class="w-4/5 card flex justify-between items-center gap-2 px-2 my-5">
      <RouterLink to="/">
        <div class="flex justify-center items-center gap-2 
          bg-red-500
          border border-red-300 p-2
          rounded-lg">
          <i class="pi pi-sign-out"></i>
          <h1>Leave</h1>
        </div>
      </RouterLink>

      <div class="flex justify-center items-center gap-2">
        <h1>Light Theme</h1>
        <ToggleSwitch v-model="checked" />
        <h1>Dark Theme</h1>
      </div>
    </div>

    <!-- Speaker -->

    <!-- Typing Chat Box -->
    <div class="w-4/5 h-1/2 border solid border-black mx-auto rounded-t-lg">
      <div class="w-full h-full flex flex-col justify-end items-center py-1">
        <hr class="w-full h-auto border-1 border-gray-400" />
        <IconField class="w-full h-auto p-3">
          <InputText
            v-model="inputValue"
            type="text"
            variant="outlined"
            class="w-full h-auto flex flex-wrap border solid border-gray-600 rounded-md focus:border-red-700"
          />
          <InputIcon class="pi pi-send mx-2" />
        </IconField>
      </div>
    </div>
  </div>
</template>

<script setup>
import ToggleSwitch from "primevue/toggleswitch";
import InputText from "primevue/inputtext";

import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { ref, computed } from "vue";
const inputValue = ref(null);
const checked = ref(false);
const backgroundColor = computed(() => {
  return checked.value ? "bg-[#1f0f66] text-white" : "bg-[#ffffff] text-black";
});
</script>
