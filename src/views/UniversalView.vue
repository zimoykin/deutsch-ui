<template>
    <Container :component="[compHome, compProfile, compAddNew, compRandom, compDictionary, compKonjugation, compSearch]"
        :activeTab="activeTab" />
</template>

<script setup lang="ts">
import Container from '@/components/Container.component.vue';
import Home from '@/components/Home.component.vue';
import Profile from '@/components/Profile.component.vue';
import {
    watch, markRaw, ref, defineProps,
} from 'vue';
import AddNew from '@/components/AddNew.component.vue';
import Random from '@/components/Random.component.vue';
import Dictionary from '@/components/Dictionary.component.vue';
import Konjugation from '@/components/Konjugation.component.vue';
import Search from '@/components/Search.component.vue';
//
const props = defineProps({
    page: String,
});

const compHome = markRaw(Home);
const compProfile = markRaw(Profile);
const compAddNew = markRaw(AddNew);
const compRandom = markRaw(Random);
const compDictionary = markRaw(Dictionary);
const compKonjugation = markRaw(Konjugation);
const compSearch = markRaw(Search);

const activeTab = ref(0);

watch(() => props.page, () => {
    switch (props.page) {
        case 'profile': activeTab.value = 1; break;
        case 'home': activeTab.value = 0; break;
        case 'add-new': activeTab.value = 2; break;
        case 'random': activeTab.value = 3; break;
        case 'dictionary': activeTab.value = 4; break;
        case 'konjugation': activeTab.value = 5; break;
        case 'search': activeTab.value = 6; break;
        default: activeTab.value = 0; break;
    }
});

</script>
