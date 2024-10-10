<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    v-for="(item, index) in props.roomDisplayDetails"
    :key="index"
    class="w-full h-auto border solid border-blue-200 rounded-md p-5 my-2"
  >
    <div>
      <div>
        <div class="flex justify-between items-center">
          <div class="flex justify-start items-center gap-2">
          <h2 class="text-sm md:text-base">Room Name:</h2>
          <p class="text-xs md:text-sm text-gray-500">{{ item.roomName }}</p>
        </div> 

          <div class="flex items-center gap-2">
            <h1 class="text-base md:text-lg">Member:</h1>
            <p class="text-xs md:text-sm text-gray-500 font-bold">
              {{ item.maxMember }}
            </p>
          </div>
        </div>

      

        <div class="flex justify-start items-center gap-2">
          <h2 class="text-sm md:text-base">Room Code:</h2>
          <p class="text-xs md:text-sm text-gray-500">{{ item.roomCode }}</p>
        </div>
        <div class="flex justify-start items-center gap-2">
          <h2 class="text-sm md:text-base">Host:</h2>
          <p class="text-xs md:text-sm text-gray-500">{{ item.host }}</p>
        </div>

        <div class="flex justify-start items-center gap-2">
          <h2 class="text-sm md:text-base">Part Status:</h2>
          <p class="text-xs md:text-sm text-green-600 font-bold">Open</p>
        </div>

        <!-- Tags of room and button -->
        <div class="flex justify-end items-center my-4">
          <div class="flex justify-end">
            <RouterLink to="/ChatSession">
              <Button
                icon="pi pi-check"
                label="Join"
                text
                raised
                severity="info"
              />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from "primevue/button";
import { onMounted } from "vue";

// Define props at the top level
const props = defineProps({
  roomDisplayDetails: {
    type: Array,
    required: true,
  },
});
onMounted(()=>{
  console.log(props.roomDisplayDetails)
})

</script>
