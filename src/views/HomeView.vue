<template>
  <Container :component="[homeC]" :active-tab="0" />
</template>

<script setup lang="ts">
import Container from '@/components/Container.component.vue';
import Home from '@/components/Home.component.vue';
import { markRaw } from 'vue';

const homeC = markRaw(Home);

</script>
