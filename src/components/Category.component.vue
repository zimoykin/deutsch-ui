<template>
    <div class="grid m-2 animation-x">
        <div class="grid justify-center w-full">
            <div v-if="isLoading">
                <SpinnerComponent />
            </div>
            <div class="w-full overflow-y-scroll" v-else>
                <div class="grid" v-for="item in categories" :key="item">

                    <div class="flex justify-center m-1">
                        <div :style="{ width: width66, height }" v-if="item[0]"
                            class="rounded-lg shadow-md items-center justify-center flex bg-[#96C5CF] mr-2 cursor-pointer"
                            @click="click.flashCard(item[0])" @keydown="click.flashCard(item[0])">
                            <p> {{ item[0] }}</p>
                        </div>
                        <div v-if="item[1]" :style="{ width: width33, height }"
                            class="rounded-lg shadow-md items-center justify-center flex bg-[#F4B9BA] cursor-pointer"
                            @click="click.flashCard(item[0])" @keydown="click.flashCard(item[0])">
                            <p> {{ item[1] }}</p>
                        </div>
                    </div>

                    <div class="flex justify-center m-1">
                        <div v-if="item[2]" :style="{ width: width33, height }"
                            class="rounded-lg shadow-md items-center justify-center flex bg-[#F6E4DA] mr-2 cursor-pointer"
                            @click="click.flashCard(item[0])" @keydown="click.flashCard(item[0])">
                            <p> {{ item[2] }}</p>
                        </div>
                        <div v-if="item[3]" :style="{ width: width66, height }"
                            class="rounded-lg shadow-md items-center justify-center flex bg-[#C2DDD6] cursor-pointer"
                            @keydown="click.flashCard(item[0])" @click="click.flashCard(item[0])">
                            <p> {{ item[3] }}</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import useStore from '@/store';
import { ref, onMounted } from 'vue';
import SpinnerComponent from './shared/Spinner.component.vue';

const store = useStore();
console.log(store.count);
store.count += 1;

const width66 = ref('0px');
const width33 = ref('0px');
const height = ref('0px');
const isLoading = ref(false);

const categories = ref();
const topicsRaw = JSON.stringify(['basic', 'auto']);

if (topicsRaw !== null) {
    const value = JSON.parse(topicsRaw) as string[];

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
}

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
};

window.addEventListener('resize', () => width());
</script>
