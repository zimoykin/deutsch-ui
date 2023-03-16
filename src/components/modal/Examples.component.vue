<template>
    <div>
        <div class="my-1 mx-2">
            <p class="mb-2 text-start">EXAMPLES: </p>
            <div class="m-1" v-for="(value, ind) in examples" :key="ind">
                <label :for="value">
                    <input :id="value" :value="value" class="p-2 text-center w-full rounded shadow" placeholder="example"
                        v-on:change="(e: any) => changed(e.target.value, ind)"
                        @keydown.enter="examples.length - 1 === ind ? examples.push('') : {}">
                </label>
            </div>
        </div>
        <div class="m-2 flex justify-center">
            <div @click="save()"
                class="absolute bottom-2 bg-green-300 bg-opacity-40 rounded shadow p-2 w-11/12 hover:bg-green-400">
                <p> SAVE </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps({
    main: {
        default: [],
    },
    onClose: { type: Function, required: true },
});

const examples = ref<Array<string>>([]);
onMounted(() => {
    examples.value = props.main as string[];
});

const changed = (value: string, ind: number) => {
    console.log(value);
    examples.value[ind] = value;
};

const save = () => {
    props.onClose(examples.value.filter((a: string) => a !== ''));
};
</script>
