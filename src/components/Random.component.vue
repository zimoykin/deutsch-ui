<template>
    <p>random</p>
</template>

<script setup lang="ts">
import useStore from '@/store';

const store = useStore();
store.toast = {
    message: 'this page is not implemented',
    topic: 'info',
};

</script>
