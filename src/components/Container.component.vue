<template>
    <div>
        <component :is="props.component"/>
    </div>
</template>

<script setup lang="ts">
import useStore from '@/store';
import { defineProps } from 'vue';

const props = defineProps({
  component: Object,
});

const store = useStore();
console.log(store.count);
store.count += 1;
</script>
