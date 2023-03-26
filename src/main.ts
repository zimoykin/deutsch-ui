import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@/assets/main.css';
import '@/assets/animation.css';
import * as interceptor from './utils/axios-instance';

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app');

interceptor.init();
