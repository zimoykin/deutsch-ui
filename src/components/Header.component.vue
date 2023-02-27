<template>
  <div :style="{ height: '10vh' }" class="relative flex justify-center items-center mx-1">
    <div :style="store.isMobileView ? { width: '100%', } : { maxWidth: '1080px', width: '75%', }"
      class="flex rounded-md justify-center items-center bg-slate-200">
      <p class="text-3xl  mx-1 p-1 rounded-md">🏠</p>
      <input class="w-full my-2 p-1 bg-slate-200 text-center rounded-md" placeholder="type here..." v-model="searchInput">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import useStore from '@/store';

const store = useStore();
const searchInput = ref();
let timeoutId: number;
watch(() => searchInput.value, () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    console.log(searchInput.value);
  }, 1000);
});
</script>
