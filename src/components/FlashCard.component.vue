<template>
    <div class="grid justify-center items-center animation-x">
        <div v-if="isLoading">
            <SpinnerComponent />
        </div>
        <div class="grid m-1 overflow-scroll" v-else>
            <!-- progressbar -->
            <div :style="{
                'width': width,
                'height': '3rem',
                display: 'flex',
                'background': '#D9D9D9'

            }" class="my-4 rounded-2xl bg-white shadow-md w-96 h-9 flex justify-start items-center">
                <div id='progress' :style="{
                    'width': progress + '%',
                    'height': '3rem',
                    'display': 'flex',
                    'background': '#C2DDD6'

                }" class="my-4 rounded-2xl bg-white shadow-md w-96 h-9">
                </div>
            </div>

            <div class="relative rounded-md bg-white shadow-md uppercase" :style="{ width: width, height: height }">
                <div class="absolute w-full h-full flex justify-end p-2 cursor-pointer"
                    :style="{ zIndex: 7, color: 'gray' }" @click="click.skip()" @keydown.enter="click.skip()">
                    <p>skip</p>
                </div>
                <div class="absolute flex w-full h-full justify-center items-center text-center" :style="{
                    zIndex: 6
                }">
                    <h2>{{ assignmentTask }}</h2>
                </div>
            </div>

            <div v-if="typeTask === 'pick'" class="my-6 grid">
                <div class="flex my-2">
                    <div class="w-3/5 uppercase bg-white h-28 mr-2 rounded shadow flex justify-center items-center cursor-pointer"
                        @click="click.tryAnswer(options.option1)">
                        <p class="text-center">{{ options.option1 }}</p>
                    </div>

                    <div class="w-2/5 uppercase bg-white h-28 rounded shadow flex justify-center items-center cursor-pointer"
                        @click="click.tryAnswer(options.option2)">
                        <p class="text-center">{{ options.option2 }}</p>
                    </div>
                </div>

                <div class="flex">
                    <div class="w-2/5 uppercase bg-white h-28 rounded shadow flex justify-center items-center cursor-pointer"
                        @click="click.tryAnswer(options.option3)">
                        <p class="text-center">{{ options.option3 }}</p>
                    </div>

                    <div v-if="options.option4 && options.option4 != '___'"
                        class="w-3/5 uppercase bg-white h-28 ml-2 rounded-md shadow-md flex justify-center items-center cursor-pointer"
                        @click="click.tryAnswer(options.option4)">

                        <p class="text-center">{{ options.option4 }}</p>

                    </div>
                </div>
            </div>
            <div v-else class="flex justify-center w-full">
                <input v-model="writeAnswer" class="p-4 my-4 w-full text-center rounded-md shadow-md"
                    @keypress.enter="click.tryAnswer(writeAnswer)" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useStore from '@/store/index';
import network from '@/utils/network';
import { useRoute } from 'vue-router';
import SpinnerComponent from './shared/Spinner.component.vue';

const store = useStore();
const route = useRoute();
const isLoading = ref(false);
const progress = ref(25);
const width = ref('0px');
const height = ref('0px');
const assignmentTask = ref('Spielen');
const options = {
    option1: 'option1',
    option2: 'option2',
    option3: 'option3',
    option4: 'option4',
};
const writeAnswer = ref('');
const typeTask = ref('pick');

const getWidth = () => {
    let size = (window.innerWidth * (store.isMobileView ? 1 : 0.75));
    size = store.isMobileView ? size - 50 : Math.min(size, 520);
    width.value = `${size}px`;
};
const getHeight = () => {
    const size = (window.innerHeight * 0.3);
    // size = store.isMobileView ? size - 50 : Math.min(size, 720);
    height.value = `${size}px`;
};

const nextTask = () => {
    const current: any = store.assignment[0];
    assignmentTask.value = current.task;
    const [option1, option2, option3, option4] = current.options;

    options.option1 = option1;
    options.option2 = option2;
    options.option3 = option3;
    options.option4 = option4;
};

onMounted(() => {
    getWidth();
    getHeight();

    isLoading.value = true;
    let assignmentPath = 'assignment';
    const { category } = route.query;
    if (category) {
        assignmentPath += `_${category}`;
    }

    const assignmentStored = localStorage.getItem(assignmentPath);
    if (assignmentStored) {
        store.assignment = JSON.parse(assignmentStored);
        isLoading.value = false;
        nextTask();
    } else {
        let path = 'flash-cards';
        if (category) {
            path += `?topic=${category}`;
        }

        network({
            method: 'GET',
            path,
            svc: 'svc',
            auth: true,
        })
            .then((data) => {
                localStorage.setItem(assignmentPath, JSON.stringify(data));
                store.assignment = data as never;
                nextTask();
            })
            .catch((err) => {
                store.error = { message: err.message, topic: 'network error' };
            }).finally(() => {
                isLoading.value = false;
            });
    }
});

window.addEventListener('resize', () => {
    getWidth();
    getHeight();
});

const click = {
    skip() {
        console.log('click');
    },
    tryAnswer(_word: string) {
        console.log('click');
    },
};

</script>
