<template>
  <div class="w-4/5 h-1/2 border solid border-black mx-auto rounded-t-lg">
    <!-- Display messages in the chat box-->
    <div
      class="message-container w-full h-4/5 overflow-y-scroll flex flex-col p-1"
    >
      <div
        v-for="(message, index) in displayMessages"
        :key="index"
        class="flex flex-col"
      >
        <!-- Display the message sent and received message -->
        <div
          v-if="Object.keys(message).length > 2"
          class="w-1/2 h-fit border solid rounded-tl-xl rounded-tr-xl p-2 my-1 break-words"
          :class="
            message.sender === 'sent'
              ? 'bg-blue-400 self-end text-end text-white rounded-bl-xl '
              : 'bg-green-200 self-start text-start rounded-br-xl'
          "
        >
          <small class="font-bold underline">{{ message.name }}:</small>
          <p class="">
            {{ message.text }}
          </p>
          <small class="italic">{{ message.timestamp }}</small>
        </div>
        <!-- Display the information once a new user has joined the chat room -->
        <div v-else class="mx-auto italic">
          <p>{{ message.text }}</p>
        </div>
      </div>

      <!-- Display message when the user is typing -->
      <div
        v-if="typistName !== ''"
        class="w-full h-full flex flex-col justify-end pl-5 mt-5"
      >
        <p class="">{{ typistName }} is typing...</p>
      </div>
    </div>

    <!-- Typing Chat Box -->
    <div class="w-full h-1/5 flex flex-col justify-end items-center">
      <hr class="w-full h-auto border-1 border-gray-400" />
      <IconField class="w-full h-auto p-3 justify-en">
        <InputText
          v-model="inputValue"
          type="text"
          class="w-full h-auto flex flex-wrap border solid border-gray-600 rounded-md focus:border-red-700"
          @focus="sendTypingStatus"
          @blur="clearTypingStatus"
          @keypress="sendTypingStatus"
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
  userName: {
    type: String,
    required: true,
  },
});
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
const typistName = ref("");
const userIdName = ref("");
const userIdDisconnected = ref("");
onMounted(() => {
  // Connect to the chat server
  socket = io("http://localhost:3000"); // Adjust the URL based on your server's location

  // Listen for incoming messages from the server
  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    //Change the "sender" so that
    msg.sender = "received";
    displayMessages.value.push(msg); // Push received message
    console.log(displayMessages.value);
    nextTick(() => {
      scrollToBottom();
    });
  });

  socket.on("typing", (name) => {
    if (name) {
      typistName.value = name;
    } else {
      typistName.value = "";
    }
  });

  socket.on("joinning message", (usersName) => {
    console.log(usersName + "passed from the server")
    userIdName.value = usersName;
    // Also push into display message, but then the sender name put it as something else
    displayMessages.value.push({
      text: `${usersName} has joined this chatroom...`,
      sender: "Connected",
    });
  });

  socket.on("user leaving", (userName) => {
    userIdDisconnected.value = userName;
    displayMessages.value.push({
      text: `${userName} has disconnected from this chatroom...`,
      sender: "Disconnected",
    });
  });



});

// Funtion used to send message to the server
function sendMessage() {
  if (inputValue.value) {
    const currentTime = new Date();
    const messageToSend = {
      name: props.userName,
      text: inputValue.value,
      sender: "sent",
      timestamp: formatDateTime(currentTime),
    };

    socket.emit("chat message", messageToSend);
    displayMessages.value.push(messageToSend);
    console.log(displayMessages.value);
    inputValue.value = "";

    nextTick(() => {
      scrollToBottom();
    });
  }
}

// Function to send typing status
function sendTypingStatus() {
  socket.emit("typing", props.userName);
}

function clearTypingStatus() {
  socket.emit("typing", "");
}

const scrollToBottom = () => {
  const messageContainer = document.querySelector(".message-container"); // Ensure the correct class
  if (messageContainer) {
    messageContainer.scrollTo(0, messageContainer.scrollHeight); // Scroll to the bottom
  }
};
</script>
