<template>
    <div v-if="props.visible" class="absolute top-0 left-0 bg-slate-700 bg-opacity-40 w-full h-full animation-x">
        <div
            class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center m-1 bg-gradient-to-br from-slate-300 via-purple-300 to-blue-400 rounded-md shadow-md w-44 lg:w-96 md:w-80 sm:w-50 h-3/5">
            <div class="absolute top-0 right-0 m-2 rounded shadow bg-red-300 hover:bg-red-400 py-2 px-4" @click="onClose()">
                <p class="font-mono"> {{ 'X' }}</p>
            </div>
            <div class="pt-4">
                <component :is="props.component" :main="throughProps" :onClose="onClose" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import useStore from '@/store';

const props = defineProps({
    visible: { type: Boolean, required: true },
    onClose: { type: Function, required: true },
    component: { type: Object, required: true },
    throughProps: { type: Object },
});

const store = useStore();

</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

.animation-x {
    animation-name: fadeIn;
    animation-duration: 0.5s
}</style>
