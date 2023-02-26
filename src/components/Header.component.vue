<template>
    <div class="flex justify-center bg-slate-400">
        <input class="m-1 p-2 bg-slate-200 text-center rounded-md"
            placeholder="type here..."
            :style="store.isMobileView ? { width: '100%', } : { maxWidth: '1080px', width: '75%', }"
            v-model="searchInput" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useStore from '@/store';

const store = useStore();
const searchInput = ref();
</script>
