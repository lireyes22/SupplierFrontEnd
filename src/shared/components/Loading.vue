<!-- src/components/FullScreenLoading.vue -->
<template>
    <div v-if="visible" class="loading-overlay">
        <div class="spinner"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLoadingStore } from '@stores/loadingStore';

// Acceder al estado del store de loading
const loadingStore = useLoadingStore();
const visible = computed(() => loadingStore.isLoading);
</script>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.spinner {
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-top: 5px solid white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>