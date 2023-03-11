<template>
    <p>examples</p>
    <div v-for="(value, ind) in examples" :key="ind">
        <label :for="value">
            <input :id="value" :value="value" class="p-2 text-center" placeholder="example" v-on:change="(e: any) => changed(e.target.value, ind)"
                @keydown.enter="examples.length - 1 === ind ? examples.push('') : {}">
        </label>
    </div>
    <div @click="saveAndClose()" class="bg-green-300 p-2">
        <p> SAVE </p>
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
    debugger;
    console.log(value);
    examples.value[ind] = value;
};

const saveAndClose = () => {
    props.onClose(examples.value.filter((a: string) => a !== ''));
};
</script>
