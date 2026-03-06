<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-spinner">
      <div class="spinner-ring"></div>
      <img src="/images/logo-brasil-center.png" alt="Logo" class="spinner-logo">
    </div>
  </div>
</template>

<script setup>
import { useLoadingStore } from '~/stores/loading'
import { computed } from 'vue'

const loadingStore = useLoadingStore()
const isLoading = computed(() => loadingStore.isLoading)
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.5s ease forwards;
}

/* Spinner Container */
.loading-spinner {
  position: relative;
  width: 150px;
  height: 150px;
}

/* Spinner Ring */
.spinner-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 8px solid var(--brand-primary-lightest);
  border-top: 8px solid var(--brand-primary-dark);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Logo Central */
.spinner-logo {
  position: absolute;
  width: 108px;
  object-position: center;
  object-fit: contain;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Spin Animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Fade Animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
