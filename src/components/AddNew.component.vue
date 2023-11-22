<template>
    <div v-if="isLoading">
        <SpinnerComponent />
    </div>
    <div v-else>
        <div class="my-1 mx-20">
            <div class="animation-2x flex m-1 bg-slate-400 bg-opacity-30 rounded-md">
                <div class="grid m-2 w-20">
                    <p class="text-left">type</p>
                    <p class="text-left">artikel</p>
                    <p class="text-left">Partizip 2</p>
                    <p class="text-left">Praeteritum</p>
                </div>

                <div class="mr-1 items-center">
                    <label for="wordType" class="rounded-md flex p-1 w-max">
                        <select :class="dynamicStyles" id="wordType" type="text" v-model="wordType">
                            <option v-for="(key) in Object.keys(WORD_TYPE)" :key="key" :value="key">{{ key.toUpperCase() }}
                            </option>
                        </select>
                    </label>
                    <label for="artikel" class="rounded-md flex p-1">
                        <select :class="dynamicStyles" id="artikel" type="text" v-model="artikelSelected"
                            :disabled="wordType === WORD_TYPE.noun ? false : true">
                            <option v-for="(key) in Object.keys(artikel)" :key="key" :value="key">{{
                                key.toUpperCase()
                            }}
                            </option>
                        </select>
                    </label>

                    <label for="partizip2" class="rounded-md flex p-1">
                        <input :disabled="wordType === WORD_TYPE.verb ? false : true" :class="dynamicStyles" id="partizip2"
                            type="text" v-model="partizip2">
                    </label>

                    <label for="praeteritum" class="rounded-md flex p-1">
                        <input :disabled="wordType === WORD_TYPE.verb ? false : true" :class="dynamicStyles"
                            id="praeteritum" type="text" v-model="praeteritum">
                    </label>
                </div>
            </div>
            <div class="animation-2x flex m-1 bg-slate-400 bg-opacity-30 rounded-md py-1 px-1">
                <div class="grid m-2 w-20">
                    <p class="text-left">de</p>
                    <p class="text-left">eng</p>
                    <p class="text-left">ru</p>
                </div>
                <div class="mr-1 items-center">
                    <label for="germanWord" class="rounded-md flex p-1">
                        <input :class="dynamicStyles" id="germanWord" type="text" v-model="germanWord">
                    </label>
                    <label for="englishWord" class="rounded-md flex p-1">
                        <input :class="dynamicStyles" id="englishWord" type="text" v-model="englishWord">
                    </label>
                    <label for="russianWord" class=" rounded-md flex p-1">
                        <span class="block bg-gray-500 rounded-md">
                            <input :class="dynamicStyles" id="russianWord" type="text" v-model="russianWord">
                        </span>
                    </label>
                </div>
            </div>

            <div class="animation-2x flex m-1 bg-slate-400 bg-opacity-30 rounded-md py-1 px-1">
                <div class="grid m-2 w-20">
                    <p class="text-left">level</p>
                    <p class="text-left">topics</p>
                    <p class="text-left">examples</p>
                    <p class="text-left">konjugation</p>
                </div>

                <div class="mr-1 items-center">
                    <label for="level">
                        <span class="blockrounded-md">
                            <select :class="dynamicStyles" id="level" type="text" v-model="level">
                                <option v-for="key in ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']" :key="key" :value="key">{{
                                    key.toLowerCase() }}
                                </option>
                            </select>
                        </span>
                    </label>

                    <label for="topics">
                        <label for="wordType" class="rounded-md flex p-1 w-max">
                            <select :class="dynamicStyles" id="topic" type="text" v-model="topics">
                                <option v-for="(key) in topicsMock" :key="key" :value="key">{{
                                    key.toUpperCase() }}
                                </option>
                            </select>
                        </label>
                    </label>

                    <div :class="dynamicStyles"
                        class="cursor-pointe bg-slate-400 text-white p-2 rounded shadow mb-2"
                        @click="konjugation_visibility = !konjugation_visibility">
                        <p>konjugation</p>
                    </div>

                    <div class="cursor-pointe bg-slate-500 text-white p-2 rounded shadow"
                        @click="examples_visibility = !examples_visibility">
                        <p>examples</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="animation-x absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="bg-green-300 px-8 py-2 rounded shadow cursor-pointer hover:bg-green-400" @click="click.save()">
                <p>SAVE</p>
            </div>
        </div>

        <DialogModal :visible="konjugation_visibility" :on-close="onCloseKonjugationWindow" :component="AddKonjugation"
            :through-props="konjugation" />
        <DialogModal :visible="examples_visibility" :on-close="onCloseExamplesWindow" :component="AddExamples"
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
const praeteritum = ref();
const germanWord = ref();
const englishWord = ref();
const russianWord = ref();
const level = ref('A1');
const topics = ref(['basic', 'Wetter']);
const examples_visibility = ref(false);
const isLoading = ref(false);
const konjugation_visibility = ref(false);

const topicsMock = [
    'basic',
    'nature | natur',
    'supermarket | supermarkt',
    'doctor | arzt',
    'car | auto',
    'in appartment | in Wohnung',
    'food | essen',
    'travel | reisen',
];

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
    konjugation_visibility.value = false;
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
    examples_visibility.value = false;
    examples.value = props;
};

const dynamicStyles = ref('w-100 lg:w-96 md:w-70 sm:w-65 p-1 rounded-md shadow-md');

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
            de: germanWord.value,
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
        de: string,
        ru: string,
        eng: string,
        level: string,
        konjugation: IKonjugation,
        examples: [],
        topic: string[],
        type: string,
        partizip2?: string;
    }>({
        path: `word/${route.query.id}`,
    }).finally(() => {
        isLoading.value = false;
    }).then((data) => {
        debugger;
        artikelSelected.value = data.artikel?.toLowerCase();
        russianWord.value = data.ru?.toLowerCase();
        englishWord.value = data.eng?.toLowerCase();
        germanWord.value = data.de?.toLowerCase();
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
