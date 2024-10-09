<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <!-- Prompt user to enter username before starting communication in group chat -->
    <EnterUsername @userName="handleUserName"/>
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
</template>
<script setup>
import { ref } from "vue";
import ActionButton from "./ActionButton.vue";
import ChatBox from "./ChatBox.vue";
import TitleChatRoom from "./TitleChatRoom.vue";
import EnterUsername from "./EnterUsername.vue";
//Variable for the changed name
const userNamePassToChatBox = ref("");
const handleUserName = (name) => {
  console.log("Username passed from EnterUsername: ", name);
  userNamePassToChatBox.value = name;
};
</script>
