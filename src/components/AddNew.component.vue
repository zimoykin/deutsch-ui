<template>
    <div class="grid my-2 animation-x">
        <div class="flex items-center justify-center mx-1 bg-red-400 bg-opacity-30 rounded-md py-2">
            <div class="mr-1">
                <label for="artikel" class="rounded-md grid items-center justify-center">
                    <p class="text-left">ARTIKEL</p>
                    <select :class="dynamicStyles" id="artikel" type="text" v-model="artikelSelected">
                        <option v-for="(key) in Object.keys(artikel)" :key="key" :value="key">{{ key.toUpperCase() }}
                        </option>
                    </select>
                </label>
            </div>
            <div class="ml-1">
                <label for="germanWord" class="rounded-md grid ml-1 w-full">
                    <p class="text-left">GERMAN</p>
                    <input :class="dynamicStyles" id="germanWord" type="text" v-model="germanWord">
                </label>
            </div>
        </div>
        <div class="flex items-center justify-center m-2 bg-slate-400 bg-opacity-30 rounded-md py-2">
            <div class="items-center justify-center mr-1">
                <label for="englishWord" class="rounded-md grid items-center justify-center">
                    <p class="text-left">ENGLISH</p>

                    <input :class="dynamicStyles" id="englishWord" type="text" v-model="englishWord">

                </label>
            </div>
            <div class="items-center justify-center ml-1">
                <label for="russianWord" class=" rounded-md grid items-center justify-center">
                    <p class="text-left">RUSSIAN</p>
                    <span class="block bg-gray-500 rounded-md">
                        <input :class="dynamicStyles" id="russianWord" type="text" v-model="russianWord">
                    </span>
                </label>
            </div>
        </div>

        <div class="flex justify-center mx-2 bg-blue-400 bg-opacity-30 rounded-md py-2">
            <div class="justify-center mr-1">
                <label for="level">
                    <p class="text-left">LEVEL</p>
                    <span class="block bg-gray-500 rounded-md">
                        <select :class="dynamicStyles" id="level" type="text" v-model="level">
                            <option v-for="key in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']" :key="key" :value="key">{{
                                key.toUpperCase() }}
                            </option>
                        </select>
                    </span>
                </label>
            </div>

            <div class="items-center justify-center ml-1">
                <label for="topics">
                    <p class="text-left">TOPICS</p>
                    <div class="mb-2" v-for="(value, index) in topics" :key="index">
                        <span class="block bg-gray-500 rounded-md">
                            <input :class="dynamicStyles" id="topics" type="text" :value="value"
                                @input="(e) => updateTopic(e, index)">
                        </span>
                    </div>
                    <button class="bg-slate-500 text-white p-3 rounded shadow-md font-bold" @click="addTopic()">
                        <p>+</p>
                    </button>
                </label>
            </div>
        </div>
    </div>

    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="bg-green-300 px-8 py-2 rounded-2xl shadow cursor-pointer hover:bg-green-400">
            <p>SAVE</p>
        </div>
    </div>
    <div class="grid w-22 justify-center items-center">
        <div class="cursor-pointe bg-yellow-700 text-white p-2 rounded shadow mb-2" @click="showKonjugation = !showKonjugation">
            <p>show konjugation</p>
        </div>
        <div class="cursor-pointe bg-yellow-700 text-white p-2 rounded shadow" @click="showExamples = !showExamples">
            <p>show examples</p>
        </div>
    </div>
    <DialogModal :visible="showKonjugation" :on-close="onCloseKonjugationWindow" :component="AddKonjugation"
        :through-props="konjugation" />
    <DialogModal :visible="showExamples" :on-close="onCloseExamplesWindow" :component="AddExamples"
        :through-props="examples" />
</template>

<script setup lang="ts">
import useStore from '@/store';
import artikel from '@/types/artikel';
import DialogModal from '@/components/modal/DialogModal.component.vue';
import AddKonjugation from '@/components/modal/Konjugation.component.vue';
import AddExamples from '@/components/modal/Examples.component.vue';
import { ref } from 'vue';
import { IKonjugation } from '@/types/konjugation.interface';

const store = useStore();
const artikelSelected = ref();
const germanWord = ref();
const englishWord = ref();
const russianWord = ref();
const level = ref('A1');
const topics = ref(['basic', 'Wetter']);
const showKonjugation = ref(false);
const showExamples = ref(false);

const konjugation = ref<IKonjugation>({
    ich: undefined,
    du: undefined,
    erSieEs: undefined,
    wir: undefined,
    ihr: undefined,
    sie: undefined,
});

const examples = ref<Array<string>>(['']);

const onCloseKonjugationWindow = (props: Record<string, any>) => {
    console.log('closed konjugation', props);
    showKonjugation.value = false;
    Object.keys(props).forEach((key) => {
        if (Object.keys(konjugation.value).includes(key)) {
            konjugation.value[key as keyof IKonjugation] = props[key];
        }
    });
    console.log(konjugation.value);
};

const onCloseExamplesWindow = (props: string[]) => {
    console.log('closed onCloseExamplesWindow', props);
    showExamples.value = false;
};

const dynamicStyles = ref('w-44 lg:w-96 md:w-80 sm:w-50 p-2 rounded-md shadow-md');

const addTopic = () => {
    if (topics.value[topics.value.length - 1] !== '') {
        topics.value.push('');
    }
};

const updateTopic = (value: Record<string, any>, index: number) => {
    let data = topics.value[index];
    if (data !== undefined) {
        data = value.data;
    }
};

</script>
