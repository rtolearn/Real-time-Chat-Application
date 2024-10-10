<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="w-4/5 min-h-[25rem] h-auto flex flex-col mx-auto my-5 p-5 border solid border-black rounded-lg"
  >
    <CreateRoom @roomInformation="handleRoomInformation" />
    <!-- Display all the chat room -->
    <Room :roomDisplayDetails="rooms" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Room from "./Room.vue";
import CreateRoom from "./CreateRoom.vue";

const rooms = ref([
  {
    roomName: "Geography",
    roomCode: "#He4d03",
    host: "Ng Chen Yang",
    maxMember: "4",
  },
  {
    roomName: "Arceology",
    roomCode: "#He4d03",

    host: "Ng Ah beng",
    maxMember: "5",
  },
  {
    roomName: "Marine",
    roomCode: "#He4d03",
    host: "Tna beh yi",
    maxMember: "3",
  },
]);

function handleRoomInformation(roomObj) {
  rooms.value.push(roomObj);
}
</script>

<style scoped></style>
