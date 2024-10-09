<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Enter username."
    :style="{ width: '25rem' }"
    :draggable="false"
    :closable="false"
  >
    <div class="flex flex-col items-start gap-4 mb-4">
      <label for="username" class="font-semibold w-fit h-auto">Username:</label>
      <InputText
        v-model="inputValue"
        id="username"
        class="w-full h-auto"
        autocomplete="off"
        placeholder="Exp: Chen Yang"
      />
    </div>

    <div class="flex justify-between items-center gap-2 mt-2">
      <Button
        type="button"
        label="Cancel"
        @click="goBackToPreviousPage"
      ></Button>
      <Button
        type="button"
        label="Confirm"
        @click="handleConfirmButton"
      ></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref} from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import router from "@/router";
 import { io } from "socket.io-client";
 io("http://localhost:3000")
//Variable for the modal dialog
const visible = ref(true);
const inputValue = ref("");
//Define emits
const emit = defineEmits("userName");
// let socket;
// onMounted(()=>{
// socket = io('http://localhost:3000')
// })


function handleConfirmButton() {
  if (inputValue.value === "") {
    alert("Please enter username.");
  } else {
    emit("userName", inputValue.value);
    visible.value = false;
  }
}

function goBackToPreviousPage() {
  router.go(-1);
}


</script>
