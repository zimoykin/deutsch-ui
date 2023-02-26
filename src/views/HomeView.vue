<template>
  <div class="home">
    <HomeComp />
  </div>
</template>

<script lang="ts">
import HomeComp from '@/components/Home.component.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    HomeComp,
  },
})
export default class HomeView extends Vue {}
</script>
