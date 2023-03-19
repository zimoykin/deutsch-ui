<template>
  <div>
    <Header v-if="store.isLogined" />
    <LoginComponent v-if="!store.isLogined" />
    <div v-else :style="{ height: '90vh' }" class="w-full h-full flex items-center justify-center">
      <div :style="store.isMobileView ? { width: '100%', } : { maxWidth: '1080px', width: '75%', }"
        class="flex h-full rounded-md m-1 justify-center bg-slate-200">
        <router-view />
      </div>
    </div>
    <Toast v-if="errorMessages.length" :messages="errorMessages" />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/shared/Header.component.vue';
import LoginComponent from '@/components/Login.component.vue';
import useStore from '@/store';
import { ref, watch } from 'vue';
import Toast from './components/shared/Toast.component.vue';
import { MessageType } from './types/message-types.type';
import { speaker } from './utils/speaker-bot';

const store = useStore();
// let timeoutToast: number;

const errorMessages = ref<{ message: string; topic?: MessageType; speaker: string; }[]>([]);
watch(() => store.toast, () => {
    if (store.toast) {
        if (errorMessages.value?.length > 5) {
            errorMessages.value = errorMessages.value.slice(0, 4);
        }
        errorMessages?.value.push({ ...store.toast, speaker: speaker(store.toast.topic) });
        errorMessages.value.forEach((_, ind) => {
            setTimeout(() => {
                errorMessages.value = errorMessages.value.filter((a, index) => index !== ind);
            }, 5_000);
        });
    }
});

const toastClick = () => {
    errorMessages.value = [];
};

window.addEventListener('resize', () => {
    store.isMobileView = window.innerHeight > window.innerWidth;
}, { passive: true });

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  /* a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  } */
}
</style>
