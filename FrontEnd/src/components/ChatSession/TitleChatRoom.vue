<template>
    <div class="w-4/5 h-auto text-start pl-5">
      <h1>Title</h1>
      <p>
        Total number of users:
        {{ numberUsers }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, inject } from 'vue';
  
  const socket = inject('socket'); // Inject the socket from the parent component
  const numberUsers = ref(0);
  
  onMounted(() => {
    if (socket) {
      socket.on('total users', (num) => {
        numberUsers.value = num;
      });
    }
  });
  </script>
  