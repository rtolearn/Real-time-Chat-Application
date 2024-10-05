<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="w-4/5 min-h-[25rem] h-auto flex flex-col mx-auto my-5 p-5 border solid border-black rounded-lg"
  >
    <CreateRoom />
    <!-- Display all the chat room -->
    <Room />
  </div>
</template>

<script setup>
import Room from "./Room.vue";
import CreateRoom from './CreateRoom.vue'



</script>

<style scoped></style>
