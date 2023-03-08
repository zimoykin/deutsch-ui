<template>
    <div class="grid my-2 w-full ">
        <div class="flex items-center justify-center mx-2 bg-red-400 bg-opacity-30 rounded-md py-2">
            <label for="germanWord" class="rounded-md grid items-center justify-center">
                <p class="text-left">ARTIKEL</p>
                <span class="block bg-gray-500 rounded-md">
                    <select :style="{ width: `${Number(width) * 0.20}px`, padding: '10px' }"
                        class="m-0.5 rounded-md shadow-md" id="artikel" type="text" v-model="artikelSelected">
                        <option v-for="(key) in Object.keys(artikel)" :key="key" :value="key">{{ key.toUpperCase() }}
                        </option>
                    </select>
                </span>
            </label>
            <label for="germanWord" class="rounded-md grid items-center justify-center ml-1">
                <p class="text-left">GERMAN</p>
                <span class="block bg-gray-500 rounded-md">
                    <input :style="{ width: `${Number(width) - 20 - Number(width) * 0.20}px`, padding: '10px' }"
                        class="m-0.5 rounded-md shadow-md" id="germanWord" type="text" v-model="germanWord">
                </span>
            </label>
        </div>
        <div class="flex items-center justify-center m-2 bg-slate-400 bg-opacity-30 rounded-md py-2">
            <div class="items-center justify-center mr-2">
                <label for="englishWord" class="rounded-md grid items-center justify-center">
                    <p class="text-left">ENGLISH</p>
                    <span class="block bg-gray-500 rounded-md">
                        <input :style="{ width: `${(Number(width) - 40) / 2}px`, padding: '10px' }"
                            class="m-0.5 rounded-md shadow-md" id="englishWord" type="text" v-model="englishWord">
                    </span>
                </label>
            </div>
            <div class="items-center justify-center ml-2">
                <label for="russianWord" class=" rounded-md grid items-center justify-center">
                    <p class="text-left">RUSSIAN</p>
                    <span class="block bg-gray-500 rounded-md">
                        <input :style="{ width: `${(Number(width) - 40) / 2}px`, padding: '10px' }"
                            class="m-0.5 rounded-md shadow-md" id="russianWord" type="text" v-model="russianWord">
                    </span>
                </label>
            </div>
        </div>

        <div class="flex justify-center mx-2 bg-blue-400 bg-opacity-30 rounded-md py-2">
            <div class="justify-center mr-2">
                <label for="level">
                    <p class="text-left">LEVEL</p>
                    <span class="block bg-gray-500 rounded-md">
                        <select :style="{ width: `${(Number(width) - 40) / 2}px`, padding: '10px' }"
                            class="m-0.5 rounded-md shadow-md" id="level" type="text" v-model="level">
                            <option v-for="key in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']" :key="key" :value="key">{{
                                key.toUpperCase() }}
                            </option>
                        </select>
                    </span>
                </label>
            </div>

            <div class="items-center justify-center ml-2">
                <label for="topics">
                    <p class="text-left">TOPICS</p>
                    <div class="mb-2" v-for="(value, index) in topics" :key="index">
                        <span class="block bg-gray-500 rounded-md">
                            <input :style="{ width: `${(Number(width) - 40) / 2}px`, padding: '10px' }"
                                class="m-0.5 rounded-md shadow-md" id="topics" type="text" :value="value"
                                @input="(e) => updateTopic(e, index)">
                        </span>
                    </div>
                    <button class="bg-slate-500 text-white p-3 rounded shadow-md font-bold" @click="addTopic()">
                        <p>+</p>
                    </button>
                </label>
            </div>
        </div>
    </div>

    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="bg-green-300 px-8 py-2 rounded-2xl shadow cursor-pointer hover:bg-green-400">
            <p>SAVE</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import useStore from '@/store';
import artikel from '@/types/artikel';
import { ref } from 'vue';

const store = useStore();
const artikelSelected = ref();
const germanWord = ref();
const englishWord = ref();
const russianWord = ref();
const level = ref('A1');
const topics = ref(['basic', 'Wetter']);

const width = ref('0');

const resize = () => {
    width.value = store.isMobileView ? `${window.innerWidth * 0.95}` : `${Math.min(window.innerWidth * 0.66, 960)}`;
};

window.addEventListener('resize', resize);

resize();

const addTopic = () => {
    if (topics.value[topics.value.length - 1] !== '') {
        topics.value.push('');
    }
};

const updateTopic = (value: Record<string, any>, index: number) => {
    let data = topics.value[index];
    if (data !== undefined) {
        data = value.data;
    }
};
</script>
