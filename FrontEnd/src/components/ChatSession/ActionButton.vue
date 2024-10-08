<template>
  <!-- Button -->
  <div class="w-4/5 card flex justify-between items-start gap-2 px-2 my-5">
    <RouterLink to="/">
      <div
        class="flex justify-center items-center gap-2 bg-red-500 border border-red-300 p-2 rounded-lg"
      >
        <i class="pi pi-sign-out"></i>
        <h1>Leave</h1>
      </div>
    </RouterLink>
    <div class="flex flex-col justify-center items-start gap-2 ">
      <label for="username">Name:</label>
      <InputText 
      v-model="inputName" 
      id="username" 
      @keyup.enter="emitUserName" 
      :placeholder="inputName ? inputName: 'Anonymous'"
      class="text-center"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
const emit = defineEmits(["userName"]);
const inputName = ref("");

const emitUserName = () => {
  emit("userName", inputName.value);
};
</script>
