<script setup lang="ts">
import { MessageType } from '@/types/message-types.type';
import { defineProps, PropType } from 'vue';

const props = defineProps({
    messages: { type: Array as PropType<Array<{ message: string; topic?: MessageType; speaker: string; }>>, required: true },
    click: {
        type: Function,
        required: true,
    },
});

const click = (id: number) => {
    if (props.click) {
        props.click(id);
    }
};

</script>

<template>
    <div class="absolute animation-x rounded shadow top-0 right-0">
        <div @click="click(index)" class="flex justify-end bg-gradient-to-t from-cyan-300 to-purple-300 h-32 w-64 m-4 p-2"
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
