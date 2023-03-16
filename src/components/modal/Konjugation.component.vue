<template>
    <div>
        <div class="m-1">
            <p class="text-left"> KONJUGATION: </p>
            <div class="grid text-center mb-1">
                <input placeholder="ich" class="p-2 text-center mx-4 my-1 rounded shadow" v-model="ich" />
                <input placeholder="du" class="p-2 text-center mx-4 my-1 rounded shadow" v-model="du" />
                <input placeholder="er-sie-es" class="p-2 text-center mx-4 my-1 rounded shadow" v-model="erSieEs" />
                <input placeholder="wir" class="p-2 text-center mx-4 my-1 rounded shadow" v-model="wir" />
                <input placeholder="ihr" class="p-2 text-center mx-4 my-1 rounded shadow" v-model="ihr" />
                <input placeholder="sie" class="p-2 text-center mx-4 my-1 rounded shadow" v-model="sie" />
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
import { ref, defineProps, onMounted } from 'vue';

const ich = ref('');
const du = ref('');
const erSieEs = ref('');
const wir = ref('');
const ihr = ref('');
const sie = ref('');

const props = defineProps({
    main: {
        type: Object,
        required: true,
    },
    onClose: { type: Function, required: true },
});

onMounted(() => {
    ich.value = props.main.ich;
    du.value = props.main.du;
    erSieEs.value = props.main.erSieEs;
    wir.value = props.main.wir;
    ihr.value = props.main.ihr;
    sie.value = props.main.sie;
});

const save = () => {
    props.onClose({
        ich: ich.value,
        du: du.value,
        erSieEs: erSieEs.value,
        wir: wir.value,
        ihr: ihr.value,
        sie: sie.value,
    });
};

</script>
