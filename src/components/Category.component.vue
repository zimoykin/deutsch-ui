<template>
    <div class="grid m-2 animation-x">
        <div class="grid justify-center w-full">
            <div v-if="isLoading">
                <SpinnerComponent />
            </div>
            <div class="w-full" v-else>
                <!-- <div class="grid" v-for="item in categories[0]" :key="item"> -->

                <div class="flex justify-center m-1">
                    <div :style="{ width: width66, height }" v-if="categories[page][0]"
                        class="animation-2x rounded-lg shadow-md items-center justify-center flex bg-[#96C5CF] mr-2 cursor-pointer bg-opacity-50"
                        @click="click.flashCard(categories[page][0])" @keydown="click.flashCard(categories[page][0])">
                        <p> {{ categories[page][0] }}</p>
                    </div>
                    <div v-if="categories[page][1]" :style="{ width: width33, height }"
                        class="animation-x rounded-lg shadow-md items-center justify-center flex bg-[#F4B9BA] cursor-pointer bg-opacity-50"
                        @click="click.flashCard(categories[page][1])" @keydown="click.flashCard(categories[page][1])">
                        <p> {{ categories[page][1] }}</p>
                    </div>
                </div>

                <div class="flex justify-center m-1">
                    <div v-if="categories[page][2]" :style="{ width: width33, height }"
                        class="animation-3x rounded-lg shadow-md items-center justify-center flex bg-[#F6E4DA] mr-2 cursor-pointer bg-opacity-50"
                        @click="click.flashCard(categories[page][2])" @keydown="click.flashCard(categories[page][2])">
                        <p> {{ categories[page][2] }}</p>
                    </div>
                    <div v-if="categories[page][3]" :style="{ width: width66, height }"
                        class="animation-3x rounded-lg shadow-md items-center justify-center flex bg-[#C2DDD6] cursor-pointer bg-opacity-50"
                        @keydown="click.flashCard(categories[page][3])" @click="click.flashCard(categories[page][3])">
                        <p> {{ categories[page][3] }}</p>
                    </div>
                </div>

                <div class="flex justify-center m-1 mt-4">
                    <div :style="{ width: width66 }"
                        class="animation-2x rounded-lg shadow items-center justify-center flex bg-[#96C5CF] mr-2 cursor-pointer bg-opacity-30 p-4"
                        @click="click.previus()" @keydown="click.previus()">
                        <p> {{ "previus".toUpperCase() + (page != 0 ? (" :: " + page) : '') }}</p>
                    </div>
                    <div v-if="page <= categories.length - 1" :style="{ width: width33 }"
                        class="animation-x rounded-lg shadow items-center justify-center flex bg-[#F4B9BA] cursor-pointer bg-opacity-30 p-4 ml-2"
                        @click="click.next()" @keydown="click.next()">
                        <p> {{ "next".toUpperCase() + (page < categories.length - 1 ? (" :: " + (page + 1)) : '') }}</p>
                                </div>
                            </div>
                            <!-- </div> -->
                        </div>

                    </div>
                </div>
</template>

<script setup lang="ts">
import router from '@/router';
import useStore from '@/store';
import network from '@/utils/network';
import { ref, onMounted } from 'vue';
import SpinnerComponent from './shared/Spinner.component.vue';

const store = useStore();
console.log(store.count);
store.count += 1;

const width66 = ref('0px');
const width33 = ref('0px');
const height = ref('0px');
const isLoading = ref(false);

const categories = ref([] as string[][]);
const page = ref(0);

const prepareCategories = (value: string[]) => {
    const numOfGroup = value.length % 4;
    categories.value = [];
    for (let i = 0; i < numOfGroup;) {
        const group = [];
        for (let j = 0; j < 4; j += 1) {
            if (value[i * 4 + j]) {
                group.push(value[i * 4 + j]);
            }
        }
        i += 1;
        categories.value.push(group);
    }

    console.log(categories.value);
};

isLoading.value = true;
network<string[]>({ method: 'GET', svc: 'svc', path: 'topic' })
    .then((data) => {
        prepareCategories(data);
    }).catch((err: Error) => {
        store.toast = {
            message: err.message,
            topic: 'networkError',
        };
    }).finally(() => {
        isLoading.value = false;
    });

const width = () => {
    let size = (window.innerWidth * (store.isMobileView ? 1 : 0.75));
    size = store.isMobileView ? size : Math.min(size, 720);
    width66.value = `${size * 53 / 100}px`;
    width33.value = `${size * 33 / 100}px`;

    height.value = `${window.innerHeight * 0.23}px`;
};
onMounted(() => {
    width();
});

const click = {
    flashCard(item: string) {
        router.push(`/flash-card?category=${item}`);
    },
    next() {
        page.value += 1;
    },
    previus() {
        page.value -= 1;
    },
};

window.addEventListener('resize', () => width());
</script>
