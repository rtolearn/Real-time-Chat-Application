<template>
  <div class="w-4/5 h-1/2 border solid border-black mx-auto rounded-t-lg">
    <!-- Display messages in the chat box-->
    <div class="message-container w-full h-4/5 overflow-y-scroll flex flex-col">
      <div
        v-for="(message, index) in displayMessages"
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
          <small>{{ message.name }}</small>
          <p>
            {{ message.text }}
          </p>
          <small>{{ message.timestamp }}</small>
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
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { io } from "socket.io-client";
//Define props
const props = defineProps({
    userName:{
        type: String,
        required: true,
    }
})
// Function to format the date and time
const formatDateTime = (date) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-US", options); // Format the date and time
};

// Variable 
let socket;
const inputValue = ref("");
const displayMessages = ref([]);

onMounted(() => {
  // Connect to the chat server
  socket = io("http://localhost:3000"); // Adjust the URL based on your server's location

  // Listen for incoming messages from the server
  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    //Change the "sender" so that
    msg.sender="received"
    displayMessages.value.push(msg); // Push received message
    console.log(displayMessages.value)
    nextTick(() => {
      scrollToBottom();
    });
  });
});

// Funtion used to send message to the server
function sendMessage() {
    console.log("before we send the user name is " + props.userName)
    if (inputValue.value) {
        console.log(props.userName)
    const currentTime = new Date();
    const messageToSend = {
      name: props.userName.valueOf ? props.userName : "anonymous",
      text: inputValue.value,
      sender: "sent",
      timestamp: formatDateTime(currentTime),
    };

    socket.emit("chat message", messageToSend); 
    displayMessages.value.push(messageToSend);  
    console.log(displayMessages.value)
    inputValue.value = "";

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
</script>
