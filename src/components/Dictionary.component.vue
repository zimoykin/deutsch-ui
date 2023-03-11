<template>
    <div class="inline-block animation-x">
        <div class="flex" v-for="item in items" :key="item[0]">
            <div v-for="sub in item" :key="sub">
                <p @click="isLoading ? () => { } : pickedLetter = sub"
                    :class='["mx-1 my-1 cursor-pointer hover:bg-slate-700 hover:text-white", `${pickedLetter === sub ? "text-xl bg-slate-700 text-white" : ""}`]'>
                    {{ sub }}</p>
            </div>
        </div>
    </div>
    <div v-if="isLoading">
        <SpinnerComponent />
    </div>

</template>

<script setup lang="ts">
import router from '@/router';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import SpinnerComponent from './shared/Spinner.component.vue';

const alpabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß'];
const page = ref(0);
const limit = ref(10);
const pickedLetter = ref<string>();
const isLoading = ref(false);

const items = computed(() => {
    const numberInGroup = 15;
    const lines = alpabet.length / numberInGroup;
    const result = [];
    for (let i = 0; i < lines;) {
        const group = [];
        for (let j = 0; j < numberInGroup; j += 1) {
            if (alpabet[i * numberInGroup + j]) {
                group.push(alpabet[i * numberInGroup + j]);
            }
        }
        i += 1;
        result.push(group);
    }

    return result;
});

const route = useRoute();
if (!route.query.page) {
    router.push(`?page=${page.value.toString()}&limit=${limit.value.toString()}`);
}

watch(pickedLetter, () => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 3000);
});

</script>
