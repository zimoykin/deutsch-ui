<template>
    <div class="grid m-2 animation-x">
        <div class="grid justify-center w-full">
            <div v-if="isLoading">
                <SpinnerComponent />
            </div>
            <div class="w-full" v-else>
                <!-- <div class="grid" v-for="item in categories[0]" :key="item"> -->

                <div class="flex justify-center m-1">
                    <div :style="{ width: width66, height }"
                        class="animation-2x rounded-lg shadow-md items-center justify-center flex bg-[#96C5CF] mr-2 cursor-pointer bg-opacity-50"
                        @click="click.addNew()" @keydown="click.addNew()">
                        <p> {{ 'add new word' }}</p>
                    </div>
                    <div :style="{ width: width33, height }"
                        class="animation-x rounded-lg shadow-md items-center justify-center flex bg-[#F4B9BA] cursor-pointer bg-opacity-50"
                        @click="click.test()" @keydown="click.test()">
                        <p> {{ 'test' }}</p>
                    </div>
                </div>

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
    addNew() {
        router.push('/add-new');
    },
    test() {
        console.log('test');
    },
};

window.addEventListener('resize', () => width());
</script>
