<template>
    <div class="h-full w-full flex items-center justify-center spinCarga">
        <ProgressSpinner 
        :class="{
            'spin30': wh30,
            'spin50': wh50,
            'spin100': wh100,
            'spin150': wh150,
            'spin200': wh200,
            'spin250': wh250,
        }" 
        :strokeWidth="strokeWidth" 
        :animationDuration="animationDuration" />
    </div>>
</template>

<script setup lang="ts">
interface Props {
    color?: string;
    strokeWidth?: string;
    animationDuration?: string;
    wh30?: boolean;
    wh50?: boolean;
    wh100?: boolean;
    wh150?: boolean;
    wh200?: boolean;
    wh250?: boolean;
    wh300?: boolean;
    wh400?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    strokeWidth: "4",
    animationDuration: '0.5s',
});

</script>

<style>
.spin30 svg {
    width: 200px;
    height: 200px;
}
.spin50 svg {
    width: 200px;
    height: 200px;
}
.spin100 svg {
    width: 200px;
    height: 200px;
}
.spin150 svg {
    width: 200px;
    height: 200px;
}
.spin200 svg {
    width: 200px;
    height: 200px;
}
.spin250 svg {
    width: 200px;
    height: 200px;
}
.spin300 svg {
    width: 200px;
    height: 200px;
}
.spin400 svg {
    width: 200px;
    height: 200px;
}
</style>


