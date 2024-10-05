<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="w-4/5 min-h-[25rem] h-auto 
                flex flex-col
                mx-auto my-5 p-5
                border solid border-black
                rounded-lg">
        <div class="flex flex-col sm:flex-row justify-start items-start gap-5 p-5">
            <div>
                <Button 
                icon="pi pi-plus" 
                label="Create a chat"
                class="rounded-full py-5"
                />
            </div>
            
            <IconField >
                <InputIcon class="pi pi-search" />
                <InputText 
                type="text" 
                v-model="value" 
                placeholder="Search..." 
                class="w-full"/>
            </IconField>
        </div>
        <!-- Display all the chat room -->
        <Room /> 
    </div>
</template>


<script setup>
import Room from "./Room.vue"
import Button from 'primevue/button'
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';

import InputIcon from 'primevue/inputicon';
import {ref} from 'vue';

const value = ref(null);


</script>

<style scoped>




</style>