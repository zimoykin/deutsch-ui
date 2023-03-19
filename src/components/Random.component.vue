<template>
    <p>random</p>
</template>

<script setup lang="ts">
import useStore from '@/store';

const store = useStore();
store.toast = {
    message: 'I am sorry, this page is not implemented',
    topic: 'info',
};

</script>
