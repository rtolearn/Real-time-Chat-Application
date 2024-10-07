<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    v-for="(item, index) in rooms"
    :key="index"
    class="w-full h-auto border solid border-blue-200 rounded-md p-5 my-2"
  >
    <div>
      <div>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <h1 class="text-base md:text-lg">Title:</h1>
            <p class="text-xs md:text-sm text-gray-500">{{ item.title }}</p>
          </div>

          <div class="flex items-center gap-2">
            <h1 class="text-base md:text-lg">Member:</h1>
            <p class="text-xs md:text-sm text-gray-500 font-bold">
              {{ item.maxMember }}
            </p>
          </div>
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
        <div class="flex justify-between items-center my-4">
          <div
            v-for="(tag, index) in item.tags"
            :key="index"
            class="w-fit h-auto flex flex-wrap justify-start items-center gap-2 w-3/5"
          >
            <p class="border solid border-gray-400 p-2 rounded-lg">{{ tag }}</p>
          </div>
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

const rooms = [
  {
    title: "Environment",
    host: "Ng Chen Yang",
    maxMember: "4",
    tags: ["tag 1", "tag 2", "tag 3"],
  },
  {
    title: "Land",
    host: "Ng Ah beng ",
    maxMember: "5",
    tags: ["tag 1", "tag 2", "tag 3"],
  },
  {
    title: "Sea",
    host: "Tna beh yi",
    maxMember: "3",
    tags: ["tag 1", "tag 2", "tag 3"],
  },
  {
    title: "Environment",
    host: "jacky",
    maxMember: "2",
    tags: ["tag 1", "tag 2", "tag 3"],
  },
];



</script>
