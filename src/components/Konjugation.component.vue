<template>
    <div>
        <p> KONJUGATION </p>
        <div class="grid text-center">
            <input placeholder="ich" class="p-2 text-center" v-model="ich" />
            <input placeholder="du" class="p-2 text-center" v-model="du" />
            <input placeholder="er-sie-es" class="p-2 text-center" v-model="erSieEs" />
            <input placeholder="wir" class="p-2 text-center" v-model="wir" />
            <input placeholder="ihr" class="p-2 text-center" v-model="ihr" />
            <input placeholder="sie" class="p-2 text-center" v-model="sie" />
        </div>

        <div @click="save()" class="bg-green-300 p-2">
            <p> SAVE </p>
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
