<template>
    <p> HOME </p>
    <P> {{ store.count }} </P>
</template>

<script setup lang="ts">
import useStore from '@/store';

const store = useStore();
console.log(store.count);
store.count += 1;
</script>
