<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="backgroundColor"
    class="w-full h-screen flex flex-col justify-center items-center"
  >
    <!-- Content (Title, descriptioin, number of users.....) -->
    <div></div>
    <!-- Button -->
    <div class="w-4/5 card flex justify-between items-center gap-2 px-2 my-5">
      <RouterLink to="/">
        <div
          class="flex justify-center items-center gap-2 bg-red-500 border border-red-300 p-2 rounded-lg"
        >
          <i class="pi pi-sign-out"></i>
          <h1>Leave</h1>
        </div>
      </RouterLink>

      <!-- <div class="flex justify-center items-center gap-2">
        <h1>Light Theme</h1>
        <ToggleSwitch v-model="checked" />
        <h1>Dark Theme</h1>
      </div> -->
    </div>

    <!-- Chat Box -->
    <div class="w-4/5 h-1/2 border solid border-black mx-auto rounded-t-lg">
      <!-- Display messages in the chat box-->
      <div
        class="message-container w-full h-4/5 overflow-y-scroll flex flex-col"
      >
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex flex-col"
        >
          <div
            class="w-fit h-fit border solid rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg p-2 m-1"
            :class="
              message.sender === 'sent'
                ? 'bg-blue-400 self-end text-end text-white'
                : 'bg-green-200 self-start text-start'
            "
          >
            <small>{{message.name}}</small>
            <p>
              {{ message.text }}
            </p>
            <small>{{message.timestamp}}</small>
          </div>
        </div>
      </div>

      <!-- Typing Chat Box -->
      <div class="w-full h-1/5 flex flex-col justify-end items-center py-1">
        <hr class="w-full h-auto border-1 border-gray-400" />
        <IconField class="w-full h-auto p-3 justify-en">
          <InputText
            v-model="inputValue"
            type="text"
            class="w-full h-auto flex flex-wrap border solid border-gray-600 rounded-md focus:border-red-700"
            @keyup.enter="sendMessage"
          />
          <InputIcon class="pi pi-send mx-2" @click="sendMessage" />
        </IconField>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
// import ToggleSwitch from "primevue/toggleswitch";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { io } from "socket.io-client";

const inputValue = ref("");
const checked = ref(false);
const messages = ref([]); // Array to hold all messages
const backgroundColor = computed(() => {
  return checked.value ? "bg-[#1f0f66] text-white" : "bg-[#ffffff] text-black";
});

let socket;

onMounted(() => {
  // Connect to the chat server
  socket = io("http://localhost:3000"); // Adjust the URL based on your server's location

  // Listen for incoming messages from the server
  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    messages.value.push(
      { 
        name: "hahaha",
        text: msg, 
        sender: "received" ,
        timestamp: formatDateTime(new Date())

      }); // Push received message
    nextTick(() => {
      scrollToBottom();
    });
  });
});

function sendMessage() {
  if (inputValue.value) {
    const currentTime = new Date();
    socket.emit("chat message", inputValue.value); // Send the message to the server
    messages.value.push({ text: inputValue.value, sender: "sent", timestamp: formatDateTime(currentTime) }); // Push sent message
    inputValue.value = ""; // Clear the input field
    //Scroll to the bottom every time a new message is keyed in
    // nextTick is used to wait for the DOM to updates before execute an actions
    nextTick(() => {
      scrollToBottom();
    });
  }
}

const scrollToBottom = () => {
  const messageContainer = document.querySelector(".message-container"); // Ensure the correct class
  if (messageContainer) {
    messageContainer.scrollTo(0, messageContainer.scrollHeight); // Scroll to the bottom
  }
};


// Function to format the date and time
const formatDateTime = (date) => {
  const options = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  };
  return date.toLocaleString('en-US', options); // Format the date and time
};
</script>
