<template>
    <div class="w-0 h-1">
        <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center m-1 animation-x">
            <div v-if="isLoading">
                <SpinnerComponent />
            </div>
            <div v-else>
                <h1
                    class="bg-red-400 text-white font-bold p-2 mb-4 rounded-md shadow-2xl hover:bg-transparent hover:text-blue-200">
                    Herzlich
                    willkommen!
                </h1>
                <div class="grid ease-in-out">
                    <label for="email">
                        <input id="email" class="p-4 rounded-md shadow-2xl my-1" v-model="email" placeholder="email"
                            type="email" />
                    </label>
                    <label for="password">
                        <input id='password' class="p-4 rounded-md shadow-2xl my-1" v-model="password"
                            placeholder="password" type="password" />
                    </label>
                </div>
                <div class="bg-green-300 mt-4 p-4 cursor-pointer rounded-md shadow-2xl hover:bg-slate-300 bg-opacity-40 hover:text-white"
                    @click="login">
                    <p> login </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useStore from '@/store';
import network from '@/utils/network';
import { ref } from 'vue';
import SpinnerComponent from './shared/Spinner.component.vue';

const store = useStore();

const isLoading = ref(false);
const email = ref<string>();
const password = ref<string>();

const login = async () => {
    isLoading.value = true;
    debugger;
    const response = await network<{ accessToken: string; refreshToken: string; }>({
        path: 'auth/login',
        method: 'POST',
        body: {
            email: email.value, password: password.value,
        },
        svc: 'auth',
    }).finally(() => {
        isLoading.value = false;
    });
    if (response && response.accessToken && response.refreshToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('accessToken', response.refreshToken);
        store.isLogined = true;
    }
};

</script>
