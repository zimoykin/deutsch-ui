<template>
    <SpinnerComponent />
</template>

<script setup lang="ts">
import useStore from '@/store';
import { upsertTopics } from '@/utils/update-topics';
import { useRouter } from 'vue-router';
import SpinnerComponent from './shared/Spinner.component.vue';

const store = useStore();
const router = useRouter();

const hasError = () => {
    store.toast = {
        message: 'I am sorry, this page is not implemented',
        topic: 'info',
    };
};

const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const topicsRaw = localStorage.getItem('topic');
if (topicsRaw) {
    const topics = JSON.parse(topicsRaw);
    if (topics) {
        const random = randomIntFromInterval(0, topics.length - 1);
        router.push(`/flash-card?category=${topics[random]}`);
    } else {
        (
            hasError()
        );
    }
} else {
    upsertTopics().then(() => {
        const topicsRaw = localStorage.getItem('topic');
        if (topicsRaw) {
            const topics = JSON.parse(topicsRaw);
            if (topics) {
                const random = randomIntFromInterval(0, topics.length - 1);
                router.push(`/flash-card?category=${topics[random]}`);
            } else {
                hasError();
            }
        } else {
            hasError();
        }
    });
}

</script>
