<template>
    <div v-if="isLoading">
        <SpinnerComponent />
    </div>
    <div v-else v-for="item in result" :key="String(item.ger)">
        <WordPreviewComponent :word="item" />
    </div>
</template>

<script setup lang="ts">
import network from '@/utils/network';
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import SpinnerComponent from './shared/Spinner.component.vue';
import WordPreviewComponent from './WordPreview.component.vue';

const route = useRoute();
const word = ref();
const isLoading = ref(false);
const result = ref<any[]>([]);
watch(() => route.query.word, () => {
    isLoading.value = true;
    word.value = route.query.word;
    network<any[]>({
        path: `/search/${word.value}`,
    }).then((data) => {
        result.value = data;
    }).finally(() => {
        isLoading.value = false;
    });
});
</script>
