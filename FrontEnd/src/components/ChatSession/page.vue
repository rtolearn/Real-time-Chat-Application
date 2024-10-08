<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center"
  >
    <!-- Content (Title, descriptioin, number of users.....) -->
    <TitleChatRoom />
    <!-- Display Action Button -->
    <ActionButton 
    @userName = "handleUserName"
    
    />
    <!-- Chat Box -->
    <ChatBox 
    :userName = "userNameFromActionButton"
    />
  </div>
</template>
<script setup>
import {ref} from "vue"
import ActionButton from "./ActionButton.vue";
import ChatBox from "./ChatBox.vue";
import TitleChatRoom from "./TitleChatRoom.vue";

const userNameFromActionButton = ref("")
const handleUserName = (name) => {
  console.log("Name pass from action button: " + name)
  userNameFromActionButton.value = name;
  console.log("Value of  userNameFromActionButton: " + userNameFromActionButton.value)

}
</script>
