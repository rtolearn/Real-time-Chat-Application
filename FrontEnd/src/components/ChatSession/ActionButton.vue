<template>
  <!-- Button -->
  <div class="w-4/5 card flex justify-between items-start gap-2 px-2 my-5">
    <RouterLink to="/">
      <div
        class="flex justify-center items-center gap-2 bg-red-500 border border-red-300 p-2 rounded-lg"
        @click="handleDisconnection"
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
      @keyup.stop="emitUserName" 
      :placeholder="props.userName"
      class="text-center"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import { io } from "socket.io-client";

const inputName = ref("");

//Define emits
const emit = defineEmits(["editedUserName"]);
const emitUserName = () => {
  emit("editedUserName", inputName.value ? inputName.value:props.userName);
};
//Define props
const props = defineProps({
  userName:{
    type: String,
    required: true,
  }
})
let socket;
onMounted(()=>{
   socket = io('http://localhost:3000');
})
 
//Function to handle disconnection, once the user click the "leave" button
const handleDisconnection = () =>{
  socket.disconnect();
}
</script>
