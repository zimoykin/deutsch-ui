<template>
    <Container :component="[flashCardComponent]" :active-tab="0" />
  </template>

<script setup lang="ts">
import Container from '@/components/Container.component.vue';
import FlashCard from '@/components/FlashCard.component.vue';
import { markRaw } from 'vue';

const flashCardComponent = markRaw(FlashCard);

</script>
