<template>
    <div v-if="isLoading">
        <SpinnerComponent />
    </div>
    <div v-else class="grid animation-x">
        <div class='grid justify-center items-center text-center w-full m-2'>
            <div class="grid justify-center items-center text-center">
                <img class="rounded-full border-solid border-black border-4 max-xl:" :src="image" alt="avatar" />
                <p :style="{ fontFamily: 'Gothic A1', fontSize: 'xxx-large', fontWeight: 'lighter' }">{{
                    userName
                }}</p>
                <p :style="{ fontFamily: 'Gothic A1', fontSize: 'medium', fontWeight: 'lighter' }"> {{ email }}</p>
            </div>

            <div class="my-6" :style="{  }">
                <div class="flex justify-center items-center text-center my-4">
                    <div
                        class="w-3/5 bg-[#96C5CF] h-28 mr-4 rounded-md shadow-md flex justify-center items-center text-center bg-opacity-40">
                        {{ 'CHANGE PASSWORD' }}
                    </div>

                    <div class="w-2/5 bg-[#F4B9BA] h-28 rounded-md shadow-md flex justify-center items-center text-center bg-opacity-40">
                        {{ 'DELETE ME' }}
                    </div>
                </div>

                <div class="flex">
                    <div @click="click.switchEnv()"
                        class="w-2/5 bg-[#F6E4DA] h-28 rounded-md shadow-md flex justify-center items-center text-center bg-opacity-40">
                        {{ environment }}
                    </div>

                    <div @click="click.logout()"
                        class="w-3/5 bg-[#C2DDD6] h-28 ml-4 rounded-md shadow-md flex justify-center items-center text-center bg-opacity-40">
                        {{ 'LOGOUT' }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import useStore from '@/store';
import { ref } from 'vue';
import image from '@/assets/img/wolf.png';
import SpinnerComponent from './shared/Spinner.component.vue';

const environment = ref();
const isLoading = ref();
const userName = ref();
const email = ref();
const store = useStore();

const click = {
    switchEnv() {
        console.log('switch env');
    },
    logout() {
        store.logout();
    },
};
</script>
