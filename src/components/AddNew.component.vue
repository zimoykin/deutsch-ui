<template>
    <div v-if="isLoading">
        <SpinnerComponent />
    </div>
    <div v-else>
        <div class="grid my-2">
            <div class="animation-3x flex items-center justify-center mx-1 bg-red-400 bg-opacity-30 rounded-md py-2 px-1">
                <div class="mr-1">
                    <label for="artikel" class="rounded-md grid items-center justify-center">
                        <p class="text-left">TYPE</p>
                        <select :class="dynamicStyles" id="wordType" type="text" v-model="wordType">
                            <option v-for="(key) in Object.keys(WORD_TYPE)" :key="key" :value="key">{{ key.toUpperCase() }}
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

            <div class="animation-3x flex items-center justify-center mx-1 bg-gray-500 bg-opacity-30 rounded-md py-2 px-1">

                <div class="h-full" v-if="wordType === WORD_TYPE.noun || wordType === WORD_TYPE.verb">
                    <div class="" v-if="wordType === WORD_TYPE.noun">
                        <label for="artikel" class="rounded-md grid items-center justify-center">
                            <p class="text-left">ARTIKEL</p>
                            <select :class="dynamicStyles" id="artikel" type="text" v-model="artikelSelected">
                                <option v-for="(key) in Object.keys(artikel)" :key="key" :value="key">{{ key.toUpperCase()
                                }}
                                </option>
                            </select>
                        </label>
                    </div>
                    <div class="ml-1" v-if="wordType === WORD_TYPE.verb">
                        <label for="partizip2" class="rounded-md grid items-center justify-center">
                            <p class="text-left">PARTIZIP II</p>
                            <input :class="dynamicStyles" id="partizip2" type="text" v-model="partizip2">
                        </label>
                    </div>
                </div>

                <div class="ml-2">
                    <div class="grid w-22 justify-center items-center">
                        <div v-if="wordType === WORD_TYPE.verb" :class="dynamicStyles"
                            class="cursor-pointe bg-slate-400 text-white p-2 rounded shadow mb-2"
                            @click="konjugationVisibility = !konjugationVisibility">
                            <p>konjugation</p>
                        </div>
                        <div class="cursor-pointe bg-slate-500 text-white p-2 rounded shadow"
                            @click="showExamples = !showExamples">
                            <p>examples</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="animation-2x flex items-center justify-center m-2 bg-slate-400 bg-opacity-30 rounded-md py-2 px-1">
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

            <div class="animation-3x flex justify-center mx-2 bg-blue-400 bg-opacity-30 rounded-md py-2 px-1">
                <div class="justify-center mr-1">
                    <label for="level">
                        <p class="text-left">LEVEL</p>
                        <span class="block bg-gray-500 rounded-md">
                            <select :class="dynamicStyles" id="level" type="text" v-model="level">
                                <option v-for="key in ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']" :key="key" :value="key">{{
                                    key.toLowerCase() }}
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

        <div class="animation-x absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="bg-green-300 px-8 py-2 rounded shadow cursor-pointer hover:bg-green-400" @click="click.save()">
                <p>SAVE</p>
            </div>
        </div>

        <DialogModal :visible="konjugationVisibility" :on-close="onCloseKonjugationWindow" :component="AddKonjugation"
            :through-props="konjugation" />
        <DialogModal :visible="showExamples" :on-close="onCloseExamplesWindow" :component="AddExamples"
            :through-props="examples" />
    </div>
</template>

<script setup lang="ts">
import useStore from '@/store';
import artikel from '@/types/artikel';
import { WORD_TYPE } from '@/types/word-type';
import DialogModal from '@/components/modal/DialogModal.component.vue';
import AddKonjugation from '@/components/modal/Konjugation.component.vue';
import AddExamples from '@/components/modal/Examples.component.vue';
import { ref } from 'vue';
import { IKonjugation } from '@/types/konjugation.interface';
import network from '@/utils/network';
import { useRoute } from 'vue-router';
import SpinnerComponent from './shared/Spinner.component.vue';

const store = useStore();
const route = useRoute();
const artikelSelected = ref();
const wordType = ref();
const partizip2 = ref();
const germanWord = ref();
const englishWord = ref();
const russianWord = ref();
const level = ref('A1');
const topics = ref(['basic', 'Wetter']);
const showExamples = ref(false);
const isLoading = ref(false);
const konjugationVisibility = ref(false);

const konjugation = ref<IKonjugation>({
    ich: '',
    du: '',
    erSieEs: '',
    wir: '',
    ihr: '',
    sie: '',
});

const examples = ref<Array<string>>(['']);

const onCloseKonjugationWindow = (props: Record<string, any>) => {
    konjugationVisibility.value = false;
    console.log('closed konjugation', props);
    if (props) {
        Object.keys(props).forEach((key) => {
            if (key && Object.keys(konjugation.value).includes(key)) {
                konjugation.value[key as keyof IKonjugation] = props[key];
            }
        });
    }
};

const onCloseExamplesWindow = (props: string[]) => {
    showExamples.value = false;
    examples.value = props;
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

const click = {
    save() {
        isLoading.value = true;
        const body = {
            ger: germanWord.value,
            eng: englishWord.value,
            ru: russianWord.value,
            type: wordType.value,
            level: level.value,
        } as any;

        body.topic = topics.value;

        if (artikelSelected.value) {
            body.artikel = artikelSelected.value;
        }

        if (wordType.value === 'verb' && konjugation.value) {
            body.konjugation = konjugation.value;
        }

        network({
            method: 'POST',
            path: '/word',
            body,
        }).then(() => {
            store.toast = {
                message: 'Done!',
                topic: 'success',
            };
        }).catch((err) => {
            store.toast = {
                message: `error ${err.message}`,
                topic: 'error',
            };
        }).finally(() => {
            isLoading.value = false;
        });
    },
};

if (route.query.id) {
    isLoading.value = true;
    network<{
        artikel: string,
        ger: string,
        ru: string,
        eng: string,
        level: string,
        konjugation: IKonjugation,
        examples: [],
        topic: string[],
        type: string,
        partizip2?: string
    }>({
        path: `word/${route.query.id}`,
    }).finally(() => {
        isLoading.value = false;
    }).then((data) => {
        debugger;
        artikelSelected.value = data.artikel?.toLowerCase();
        russianWord.value = data.ru?.toLowerCase();
        englishWord.value = data.eng?.toLowerCase();
        germanWord.value = data.ger?.toLowerCase();
        level.value = data.level;
        examples.value = data.examples;
        konjugation.value = data.konjugation;
        topics.value = data.topic.map((_) => _.toLowerCase());
        wordType.value = data.type;
        partizip2.value = data.partizip2;
        if (!data.level) {
            store.toast = {
                message: 'no level',
                topic: 'error',
            };
        }
    }).catch((err) => {
        store.toast = {
            message: JSON.stringify(err),
            topic: 'error',
        };
    });
}

</script>
