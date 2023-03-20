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

            <div class="relative rounded-md shadow-md"
                :style="{ width: width, height: height, backgroundColor: backgroundColor }">
                <div class="absolute w-full h-full flex justify-end p-2" :style="{ zIndex: 7, color: 'gray' }">
                    <p class="cursor-pointer" @click="click.skip()" @keydown.enter="click.skip()">skip</p>
                </div>
                <div class="absolute lowercase flex w-full h-full justify-center items-center text-center" :style="{
                    zIndex: 6
                }">
                    <h2>{{ assignmentTask }}</h2>
                </div>
            </div>

            <div v-if="typeTask === 'pick' || typeTask === 'artikel'" class="my-6 grid">
                <div class="flex my-2">
                    <div class="w-3/5 lowercase bg-white h-28 mr-2 rounded shadow flex justify-center items-center cursor-pointer"
                        @click="click.tryAnswer(options.option1)">
                        <p class="text-center">{{ options.option1 }}</p>
                    </div>

                    <div class="w-2/5 lowercase bg-white h-28 rounded shadow flex justify-center items-center cursor-pointer"
                        @click="click.tryAnswer(options.option2)">
                        <p class="text-center">{{ options.option2 }}</p>
                    </div>
                </div>

                <div class="flex">
                    <div class="w-2/5 lowercase bg-white h-28 rounded shadow flex justify-center items-center cursor-pointer"
                        @click="click.tryAnswer(options.option3)">
                        <p class="text-center">{{ options.option3 }}</p>
                    </div>

                    <div v-if="options.option4 && options.option4 != '___'"
                        class="w-3/5 lowercase bg-white h-28 ml-2 rounded-md shadow-md flex justify-center items-center cursor-pointer"
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
const progress = ref(0);
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

const backgroundColor = ref('white');

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

const getAssignmerntPath = () => {
    let assignmentPath = 'assignment';
    const { category } = route.query;
    if (category) {
        assignmentPath += `_${category}`;
    }

    return { assignmentPath, category };
};
const getAssignment = async () => {
    let path = 'flash-cards';
    isLoading.value = true;

    const { assignmentPath, category } = getAssignmerntPath();

    if (category) {
        path += `?topic=${category}`;
    }

    return network({
        method: 'GET',
        path,
        svc: 'svc',
        auth: true,
    })
        .then((data) => {
            localStorage.setItem(assignmentPath, JSON.stringify(data));
            store.assignment = data as any;
        })
        .catch((err) => {
            store.toast = { message: err.message, topic: 'networkError' };
        }).finally(() => {
            isLoading.value = false;
        });
};

const nextTask = () => {
    const current: any = store.assignment[0];
    if (current) {
        assignmentTask.value = current.word;
        if (current.task === 'pick' || current.task === 'artikel') {
            const [option1, option2, option3, option4] = current.options;
            options.option1 = option1;
            options.option2 = option2;
            options.option3 = option3;
            options.option4 = option4;
        }

        typeTask.value = current.task;

        progress.value = 100 - store.assignment.length * 10;
    } else {
        store.toast = {
            message: 'Well done!!!',
            topic: 'success',
        };
        getAssignment().then(() => {
            nextTask();
        });
    }
};
onMounted(() => {
    getWidth();
    getHeight();

    isLoading.value = true;
    const { assignmentPath } = getAssignmerntPath();

    const assignmentStored = localStorage.getItem(assignmentPath);
    if (assignmentStored) {
        store.assignment = JSON.parse(assignmentStored);
        isLoading.value = false;
        nextTask();
    } else {
        getAssignment().then(() => {
            nextTask();
        });
    }
});

window.addEventListener('resize', () => {
    getWidth();
    getHeight();
});

const moveTaskToEnd = () => {
    const currentTask = {} as Record<string, any>;
    const current: any = store.assignment[0];
    Object.assign(currentTask, current);

    if (current) {
        store.assignment = store.assignment.slice(1, store.assignment.length);
        store.assignment.push(currentTask);
        nextTask();
    }
};

const click = {
    skip() {
        const current: any = store.assignment[0];
        assignmentTask.value = current.correct.trim().toLowerCase();
        backgroundColor.value = '#F6E4DA';
        setTimeout(() => {
            backgroundColor.value = 'white';
            moveTaskToEnd();
        }, 3000);
    },
    tryAnswer(_word: string) {
        const current: any = store.assignment[0];
        writeAnswer.value = '';
        if (current) {
            assignmentTask.value = current.correct.trim().toLowerCase();
            if (current.correct.trim().toLowerCase() === _word.trim().toLowerCase()) {
                store.assignment = store.assignment.slice(1, store.assignment.length);
                backgroundColor.value = '#96C5CF';
                setTimeout(() => {
                    backgroundColor.value = 'white';
                    nextTask();
                }, 2000);
            } else {
                backgroundColor.value = '#F4B9BA';
                setTimeout(() => {
                    backgroundColor.value = 'white';
                    moveTaskToEnd();
                }, 3000);
            }
        }
    },
};

</script>
