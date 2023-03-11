<template>
  <div :style="{ height: '10vh' }" class="relative flex justify-center items-center mx-1">
    <div :style="store.isMobileView ? { width: '100%', } : { maxWidth: '1080px', width: '75%', }"
      class="flex rounded-md justify-center items-center bg-white shadow-xl">
      <p @keydown.enter="goToHome()" @click="goToHome()" class="cursor-pointer text-3xl  mx-1 p-1 rounded-md">🏠</p>
      <input class="w-full my-2 p-1 bg-white text-center rounded-md" placeholder="type here..." v-model="searchInput">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import useStore from '@/store';
import router from '@/router';

const store = useStore();
const searchInput = ref();
let timeoutId: number;
watch(() => searchInput.value, () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        if (searchInput.value) {
            router.push(`/search?word=${searchInput.value}`);
        }
    }, 1000);
});

const goToHome = () => {
    router.push('/');
};
</script>
