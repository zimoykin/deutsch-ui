<template>
    <div v-if="props.visible" class="absolute top-0 left-0 bg-slate-700 bg-opacity-40 w-full h-full">
        <div
            class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center m-1 bg-white rounded-md shadow-md w-44 lg:w-96 md:w-80 sm:w-50 h-3/5">
            <div class="relative w-full items-end justify-end" @click="onClose()">
                <p>X</p>
            </div>
            <component :is="props.component" :main="throughProps" :onClose="onClose" />
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
