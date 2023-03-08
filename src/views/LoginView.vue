<template>
    <div class="flex items-center m-2">
        <input class="p-2 m-1 rounded-md shadow-md" v-bind="email" />
        <input class="p-2 m-1 rounded-md shadow-md" v-bind="password" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref<string>();
const password = ref<string>();

</script>
