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
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/shared/Header.component.vue';
import LoginComponent from '@/components/Login.component.vue';
import useStore from '@/store';

const store = useStore();
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
