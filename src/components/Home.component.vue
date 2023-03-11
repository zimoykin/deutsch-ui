<template>
    <div class="grid m-2">
        <div class="flex justify-center m-1">
            <div :style="{ width: width66, height }"
                class="animation-x rounded-lg shadow-md items-center justify-center flex bg-[#96C5CF] mr-2 cursor-pointer"
                @click="click.flashCards()" @keydown="click.flashCards()">
                <p> FLASH CARDS</p>
            </div>
            <div :style="{ width: width33, height }"
                class="animation-3x rounded-lg shadow-md items-center justify-center flex bg-[#F4B9BA] cursor-pointer"
                @click="click.profile()" @keydown="click.profile()">
                <p> PROFILE</p>
            </div>
        </div>

        <div class="flex justify-center m-1">
            <div :style="{ width: width33, height }"
                class="animation-3x rounded-lg shadow-md items-center justify-center flex bg-[#F6E4DA] mr-2 cursor-pointer"
                @click="click.addNew()" @keydown="click.addNew()">
                <p> ADD NEW</p>
            </div>
            <div :style="{ width: width66, height }"
                class="animation-2x rounded-lg shadow-md items-center justify-center flex bg-[#C2DDD6] cursor-pointer"
                @keydown="click.random()" @click="click.random()">
                <p> RANDOM</p>
            </div>
        </div>

        <div class="flex justify-center m-1">
            <div :style="{ width: width66, height }"
                class="animation-3x rounded-lg shadow-md items-center justify-center flex bg-[#F4B9BA] mr-2 cursor-pointer"
                @keydown="click.dictionary()" @click="click.dictionary()">
                <p> DICTIONARY</p>
            </div>
            <div :style="{ width: width33, height }"
                class="animation-3x rounded-lg shadow-md items-center justify-center flex bg-[#96C5CF] cursor-pointer"
                @keydown="click.konjugation()" @click="click.konjugation()">
                <p>KONJUGATION</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import useStore from '@/store';
import { ref, onMounted } from 'vue';

const store = useStore();
console.log(store.count);
store.count += 1;

const width66 = ref('0px');
const width33 = ref('0px');
const height = ref('0px');

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
    dictionary() {
        router.push('/dictionary');
    },
    konjugation() {
        router.push('/konjugation');
    },
    addNew() {
        router.push('/add-new');
    },
    flashCards() {
        router.push('/category');
    },
    profile() {
        router.push('/profile');
    },
    random() {
        router.push('/random');
    },
};

window.addEventListener('resize', () => width());
</script>
