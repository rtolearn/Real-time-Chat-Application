<template>
  <div class="flex flex-col sm:flex-row justify-start items-start gap-5 p-5">
    <div>
      <Button
        icon="pi pi-plus"
        label="Create a chat"
        class="rounded-full py-5"
        @click="visible = true"
      />

      <Dialog
        v-model:visible="visible"
        modal
        header="Chat Room details"
        :style="{ width: '50vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :draggable="false"
      >
        <form class="w-full" @submit="verifyInput">
          <div class="my-2">
            <label class="block text-md md:text-lg font-semibold my-2"
              >Room:</label
            >
            <InputText
              v-model="chatRoomDetails.roomName"
              placeholder="Room's name"
              aria-label="username"
              :invalid="chatRoomDetailsError.roomNameError"
              class="w-full h-auto my-2"
            />
            <Message v-if="chatRoomDetailsError.roomNameError" severity="error"
              >Required</Message
            >
          </div>
          <div class="my-2">
            <label class="block text-md md:text-lg font-semibold my-2"
              >Host:</label
            >
            <InputText
              v-model="chatRoomDetails.host"
              placeholder="Host's name"
              aria-label="username"
              :invalid="chatRoomDetailsError.hostError"
              class="w-full h-auto my-2"
            />
            <Message v-if="chatRoomDetailsError.hostError" severity="error"
              >Required</Message
            >
          </div>
          <div class="my-2">
            <label class="block text-md md:text-lg font-semibold my-2"
              >Max Member:</label
            >
            <InputText
              v-model="chatRoomDetails.maxMember"
              type="number"
              :invalid="chatRoomDetailsError.maxMemberError"
              class="w-full h-auto my-2"
            />
            <Message v-if="chatRoomDetailsError.maxMemberError" severity="error"
              >Required</Message
            >
          </div>

          <div class="flex justify-end">
            <Button type="submit" label="Create" class="w-full h-auto mt-10" />
          </div>
        </form>
      </Dialog>
    </div>

    <IconField class="flex grow">
      <InputIcon class="pi pi-search" />
      <InputText
        type="text"
        v-model="value"
        placeholder="Search..."
        class="w-full"
      />
    </IconField>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import InputIcon from "primevue/inputicon";
import Message from "primevue/message";
import { ref } from "vue";
// import { rollupVersion } from "vite";


const visible = ref(false);
const value = ref(null);
const verifyInput = (e) => {
  e.preventDefault();
  // alert("enter the verification")
  const validInputs = ref(true);

  for (let property in chatRoomDetails.value) {
    // alert("enter the loop")
    if (
      chatRoomDetails.value[property] === "" ||
      chatRoomDetails.value[property] === 0
    ) {
      //alert("enter the comparison")
      chatRoomDetailsError.value[property + "Error"] = true;
      // alert(chatRoomDetailsError.value[property + "Error"]);
      validInputs.value = false;
    } else {
      validInputs.value = true;
    }
  }

  if (validInputs.value) {
    visible.value = false;
    submitData();
  } else {
    return;
  }
};



// Function to generate random room code
const generateRoomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let roomCode = '#';
  for (let i = 0; i < 8; i++) { // Adjust the length as needed
    roomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return roomCode;
};
//Define Emit
const emit = defineEmits(['roomInformation'])
const submitData = () => {
  //Emit
  alert(JSON.stringify(chatRoomDetails.value));
  chatRoomDetails.value.roomCode = generateRoomCode();
  emit('roomInformation',chatRoomDetails)
};

const chatRoomDetails = ref({
  roomName: "",
  roomCode: "1",
  host: "",
  maxMember: 0,
  
});

const chatRoomDetailsError = ref({
  roomNameError: false,
  hostError: false,
  maxMemberError: false,
});
</script>
