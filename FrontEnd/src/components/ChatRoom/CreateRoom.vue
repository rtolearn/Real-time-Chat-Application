<template>
  <div class="flex flex-col sm:flex-row justify-start items-start gap-5 p-5">
    <div>
      <Button
        icon="pi pi-plus"
        label="Create a chat"
        class="rounded-full py-5"
        @click="visible = true"
      />

      <Dialog
        v-model:visible="visible"
        modal
        header="Chat Room details"
        :style="{ width: '50vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :draggable="false"
      >
        <form class="w-full" @submit="verifyInput">
          <div class="my-2">
            <label class="block text-md md:text-lg font-semibold my-2"
              >Title:</label
            >
            <InputText
              v-model="chatRoomDetails.title"
              placeholder="Title of chat room"
              aria-label="username"
              :invalid="chatRoomDetailsError.titleError"
              class="w-full h-auto my-2"
            />
            <Message v-if="chatRoomDetailsError.titleError" severity="error"
              >Required</Message
            >
          </div>
          <div class="my-2">
            <label class="block text-md md:text-lg font-semibold my-2"
              >Host:</label
            >
            <InputText
              v-model="chatRoomDetails.host"
              placeholder="Username"
              aria-label="username"
              :invalid="chatRoomDetailsError.hostError"
              class="w-full h-auto my-2"
            />
            <Message v-if="chatRoomDetailsError.hostError" severity="error"
              >Required</Message
            >
          </div>
          <div class="my-2">
            <label class="block text-md md:text-lg font-semibold my-2"
              >Max Member:</label
            >
            <InputText
              v-model="chatRoomDetails.maxMember"
              type="number"
              :invalid="chatRoomDetailsError.maxMemberError"
              class="w-full h-auto my-2"
            />
            <Message v-if="chatRoomDetailsError.maxMemberError" severity="error"
              >Required</Message
            >
          </div>

          <!-- Tags input field -->
          <div class="my-2">
            <label class="block text-md md:text-lg font-semibold my-2"
              >Tags:</label
            >
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <!-- Input field for adding tags -->
              <InputText
                v-model="newTag"
                placeholder="Add a tag"
                @keydown.enter.prevent="addTag"
                class="w-full h-auto my-2"
              />
            </div>

            <!-- Display the list of tags -->
            <div v-if="chatRoomDetails.tags.length">
              <ul class="flex flex-wrap gap-2">
                <li
                  v-for="(tag, index) in chatRoomDetails.tags"
                  :key="index"
                  class="bg-gray-100 p-2 rounded-md flex items-center"
                >
                  <span>{{ tag }}</span>
                  <Button
                    icon="pi pi-times"
                    class="ml-2"
                    @click="removeTag(index)"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div class="flex justify-end">
            <Button type="submit" label="Create" class="w-full h-auto mt-10" />
          </div>
        </form>
      </Dialog>
    </div>

    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        type="text"
        v-model="value"
        placeholder="Search..."
        class="w-full"
      />
    </IconField>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import InputIcon from "primevue/inputicon";
import Message from "primevue/message";
import { ref } from "vue";
const visible = ref(false);
const value = ref(null);

const verifyInput = (e) => {
  e.preventDefault();
  // alert("enter the verification")
  const validInputs = ref(true);

  for (let property in chatRoomDetails.value) {
    // alert("enter the loop")
    if (
      chatRoomDetails.value[property] === "" ||
      chatRoomDetails.value[property] === 0
    ) {
      //alert("enter the comparison")
      chatRoomDetailsError.value[property + "Error"] = true;
      // alert(chatRoomDetailsError.value[property + "Error"]);
      validInputs.value = false;
    } else {
      validInputs.value = true;
    }
  }

  if (validInputs.value) {
    visible.value = false;
    submitData();
  } else {
    return;
  }
};

const submitData = () => {
  alert(JSON.stringify(chatRoomDetails.value));
};

const chatRoomDetails = ref({
  title: "",
  host: "",
  maxMember: 0,
  tags: [],
});

const chatRoomDetailsError = ref({
  titleError: false,
  hostError: false,
  maxMemberError: false,
  tagsError: false,
});

// Function to add a tag to the list
const addTag = () => {
  if (newTag.value.trim() !== "") {
    chatRoomDetails.value.tags.push(newTag.value.trim());
    newTag.value = ""; // Clear input after adding tag
  }
};
// Temporary variable to store new tag
const newTag = ref("");
// Function to remove a tag from the list
const removeTag = (index) => {
  chatRoomDetails.value.tags.splice(index, 1);
};
</script>
