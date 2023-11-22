<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    word: Object,
});

const router = useRouter();

const onClick = {
    word(id: string) {
        if (id) {
            router.push(`/add-new?id=${id}`);
        }
    },
};

</script>

<template>
    <div class="mx-8" @click="onClick.word(String(props.word?._id))">
        <div class="p-2 w-full bg-opacity-20 bg-slate-400 flex">
            <div class="w-1/5">
                <p> {{ props.word?.artikel }} </p>
            </div>
            <div class="w-2/5">
                <p>{{ props.word?.de }}</p>
            </div>
            <div class="w-2/5">
                <p>{{ props.word?.ru }}</p>
            </div>
            <div class="w-2/5">
                <p>{{ props.word?.eng }}</p>
            </div>
        </div>
    </div>
</template>
