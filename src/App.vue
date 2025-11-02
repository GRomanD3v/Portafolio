<script setup>
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { storeToRefs } from 'pinia';
import AppToast from './components/AppToast.vue'; 
// Asumo que AppToast es un componente global
// Si AppToast utiliza clases de Bootstrap, considera refactorizarlo a v-snackbar o v-alert
// o envolverlo en el toast global de notificación.

const authStore = useAuthStore();
const router = useRouter();

const { isAuthReady } = storeToRefs(authStore); 

onMounted(() => {
    authStore.initAuth();
});

watch(isAuthReady, (isReady) => {
    if (isReady && authStore.isAuthenticated) {
        // Lógica de redirección o manejo post-autenticación si es necesario
    }
});
</script>

<template>
  <!-- 1. Envolvemos toda la aplicación en <v-app> para inyectar el contexto de layout de Vuetify -->
  <v-app>
    <!-- 2. Si la autenticación está lista, mostramos la vista (Header, AdminView, etc.) -->
    <v-main v-if="isAuthReady">
      <router-view />
    </v-main>

    <!-- 3. Pantalla de carga (usa componentes de Vuetify en lugar de clases de Bootstrap) -->
    <div v-else class="d-flex align-center justify-center bg-grey-lighten-3" style="min-height: 100vh;">
        <div class="text-center">
            <!-- Spinner de Vuetify -->
            <v-progress-circular
                :size="80"
                :width="7"
                color="primary"
                indeterminate
            ></v-progress-circular>
            <p class="text-medium-emphasis mt-3 text-subtitle-1">Verificando sesión...</p>
        </div>
    </div>
    
    <!-- Mantenemos el componente de notificaciones fuera del flujo principal, si es global -->
    <AppToast />
  </v-app>
</template>

<style scoped>
/* Estilos vacíos ya que las clases de Vuetify manejan el layout y el spinner. */
</style>
