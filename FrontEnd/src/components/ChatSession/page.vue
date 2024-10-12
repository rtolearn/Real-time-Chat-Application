<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- Prompt user to enter username before starting communication in group chat -->
    <div v-if="visibleModalDialog">
      <EnterUsername
        @userName="handleUserName"
        @visibleModalDialog="handleVisibleModalDialog"
      />
    </div>
    <div
      v-else
      class="w-full h-screen flex flex-col justify-center items-center"
    >
      <!-- Content (Title, descriptioin, number of users.....) -->
      <TitleChatRoom />
      <!-- Display Action Button -->
      <ActionButton
        :userName="userNamePassToChatBox"
        @editedUserName="handleUserName"
      />
      <!-- Chat Box -->
      <ChatBox :userName="userNamePassToChatBox" />
    </div>
  </div>
</template>
<script setup>
import { ref, provide } from "vue";
import ActionButton from "./ActionButton.vue";
import ChatBox from "./ChatBox.vue";
import TitleChatRoom from "./TitleChatRoom.vue";
import EnterUsername from "./EnterUsername.vue";
import { io } from "socket.io-client";

// Initialize the socket properly
const socket = io("http://localhost:3000");
provide("socket", socket);

const visibleModalDialog = ref(true);
function handleVisibleModalDialog(status) {
  visibleModalDialog.value = status;
  console.log("Status: " + status)
 
}
//Variable for the changed name
const userNamePassToChatBox = ref("");
const handleUserName = (name) => {
  userNamePassToChatBox.value = name;
};
</script>
