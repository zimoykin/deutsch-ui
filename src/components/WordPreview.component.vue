<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    word: Object,
});

</script>

<template>
    <div class="mx-8">
        <div class="p-2 w-full bg-opacity-20 bg-slate-400 flex">
            <div class="w-1/5">
                <p> {{ props.word?.artikel }} </p>
            </div>
            <div class="w-2/5">
                <p>{{ props.word?.ger }}</p>
            </div>
            <div class="w-2/5">
                <p>{{ props.word?.rus }}</p>
            </div>
            <div class="w-2/5">
                <p>{{ props.word?.eng }}</p>
            </div>
        </div>
    </div>
</template>
