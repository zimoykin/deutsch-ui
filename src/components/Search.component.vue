<template>
    <p>search</p>
    <p>{{ word }}</p>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const word = ref();
watch(() => route.query.word, () => {
    word.value = route.query.word;
});
</script>
