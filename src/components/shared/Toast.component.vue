<script setup lang="ts">
import useStore from '@/store';
import { MessageType } from '@/types/message-types.type';
import { defineProps, PropType } from 'vue';

const props = defineProps({
    messages: { type: Array as PropType<Array<{ message: string; topic?: MessageType; speaker: string; }>>, required: true },
});

const store = useStore();

const click = () => {
    console.log('toast');
    store.toast = { message: 'under construction', topic: 'info' };
};

</script>

<template>
    <div @click="click()" class="absolute animation-x rounded shadow top-0 right-0">
        <div class="flex justify-end bg-gradient-to-t from-cyan-300 to-purple-300 h-32 w-64 m-4 p-2"
            v-for="(value, index) in props.messages" :key="index">
            <div>
                <h4 class="bg-white p-1 m-1 rounded w-48 h-30">
                    {{ value?.message }}
                </h4>
            </div>
            <div>
                <h1 class="text-4xl rounded-full bg-white h-10 w-10">
                    {{ value?.speaker }}
                </h1>
            </div>
        </div>
    </div>
</template>
