<template>
    <div>
        <Button @click="emits('click')" class="p-2 mr-2 border-2 w-full" :class="
            [
                {'bg-red-700 hover:bg-red-500 text-white shadow-sm active:bg-red-900': props.red && !props.outlined,},
                {'bg-blue-700 hover:bg-blue-500 text-white shadow-sm active:bg-blue-900': blue && !props.outlined,},
                {'bg-green-700 hover:bg-green-500 text-white shadow-sm active:bg-green-900': green && !props.outlined,},
                {'bg-yellow-700 hover:bg-yellow-500 text-white shadow-sm active:bg-yellow-900': yellow && !props.outlined,},
                {'bg-cyan-700 hover:bg-cyan-500 text-white shadow-sm active:bg-cyan-900': cyan && !props.outlined,},
                {'bg-gray-700 hover:bg-gray-500 text-white shadow-sm active:bg-gray-900': gray && !props.outlined,},
                {'border-red-500 hover:bg-red-700 hover:text-white rounded-md shadow-sm active:bg-red-900': red && props.outlined,},
                {'border-blue-500 hover:bg-blue-700 hover:text-white rounded-md shadow-sm active:bg-blue-900': blue && props.outlined,},
                {'border-green-500 hover:bg-green-700 hover:text-white rounded-md shadow-sm active:bg-green-900': green && props.outlined,},
                {'border-yellow-500 hover:bg-yellow-700 hover:text-white rounded-md shadow-sm active:bg-yellow-900': yellow && props.outlined,},
                {'border-cyan-500 hover:bg-cyan-700 hover:text-white rounded-md shadow-sm active:bg-cyan-900': cyan && props.outlined,},
                {'border-gray-500 hover:bg-gray-700 hover:text-white rounded-md shadow-sm active:bg-gray-900': gray && props.outlined,},
                {'rounded-md': !props.rounded},
                {'rounded-3xl': props.rounded},
            ]
        ">
            <span v-if="text">{{ text }}</span>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Button from 'primevue/button';

interface Props {
    text?: string;
    margin?: boolean;
    outlined?: boolean;
    red?: boolean;
    blue?: boolean;
    yellow?: boolean;
    green?: boolean;
    cyan?: boolean;
    gray?: boolean;
    rounded?: boolean;
}

interface Emits {
    (e: 'click'): void;
}

const props = withDefaults(defineProps<Props>(), { text: '', outlined: false,  });
const emits = defineEmits<Emits>();
</script>