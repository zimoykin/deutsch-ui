<template>
    <div class="animation-x">
        <p>konjugation</p>
    </div>
</template>

<script setup lang="ts">
import useStore from '@/store';

const store = useStore();
store.toast = {
    message: 'this page is not implemented, please try later!',
};
</script>
