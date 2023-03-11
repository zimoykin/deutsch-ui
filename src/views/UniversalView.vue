<template>
    <Container
        class="shadow-2xl"
        :style="{ ...backgroundColor, width: '100%', transition: 'background-color 1s', 'animation-delay': '1s' }"
        :component="[compHome, compProfile, compAddNew, compRandom, compDictionary, compKonjugation, compSearch, compCategory, compFlashCard]"
        :activeTab="activeTab" />
</template>

<script setup lang="ts">
import Container from '@/components/shared/Container.component.vue';
import Home from '@/components/Home.component.vue';
import Profile from '@/components/Profile.component.vue';
import {
    watch, markRaw, ref, defineProps,
} from 'vue';
import AddNew from '@/components/AddNew.component.vue';
import Random from '@/components/Random.component.vue';
import Dictionary from '@/components/Dictionary.component.vue';
import Konjugation from '@/components/KonjugationAssignment.component.vue';
import Search from '@/components/Search.component.vue';
import Category from '@/components/Category.component.vue';
import FlashCardComponent from '@/components/FlashCard.component.vue';
import { useBackgroundColor } from '@/composable/useBackgroundColor';
//
const props = defineProps({
    page: String,
});

let backgroundColor = useBackgroundColor(props.page);

const compHome = markRaw(Home);
const compProfile = markRaw(Profile);
const compAddNew = markRaw(AddNew);
const compRandom = markRaw(Random);
const compDictionary = markRaw(Dictionary);
const compKonjugation = markRaw(Konjugation);
const compSearch = markRaw(Search);
const compCategory = markRaw(Category);
const compFlashCard = markRaw(FlashCardComponent);

const determineIndexPage = (): number => {
    switch (props.page) {
        case 'profile': return 1;
        case 'home': return 0;
        case 'add-new': return 2;
        case 'random': return 3;
        case 'dictionary': return 4;
        case 'konjugation': return 5;
        case 'search': return 6;
        case 'category': return 7;
        case 'flashCard': return 8;
        default: return 0;
    }
};

const activeTab = ref(determineIndexPage());

watch(() => props.page, () => {
    console.log(props.page);
    activeTab.value = determineIndexPage();
    backgroundColor = useBackgroundColor(props.page);
});

</script>
