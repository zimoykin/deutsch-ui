<template>
    <div  class="">
        <component :is="activeTab" />
    </div>
</template>

<script setup lang="ts">
import useStore from '@/store';
import { computed } from '@vue/reactivity';
import { defineProps } from 'vue';

const props = defineProps({
    component: {
        type: Array,
        default: () => [],
    },
    activeTab: Number,
});
const activeTab = computed(() => {
    const index = props.activeTab || 0;
    return props.component[index];
});

const store = useStore();
console.log(store.count);
store.count += 1;
</script>
