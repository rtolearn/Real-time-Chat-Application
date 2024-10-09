<template>
        <div class="text-center">
            <h1>Title</h1>
            <!-- <h2>Host</h2>
            <p>Description</p>
            <p>Total number of user</p>
            <p>Time counter</p> -->
            <p>Total number of user:
                {{ numberUsers }}
            </p>
        </div>
</template>\



<script setup>
import {ref,onMounted} from 'vue'
import { io } from 'socket.io-client';
let socket;

const numberUsers = ref();
onMounted(()=>{
    socket = io('http://localhost:3000')
    socket.on('Total user', (num) =>{
        numberUsers.value = num;
    })
})








</script>