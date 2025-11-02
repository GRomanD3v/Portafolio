<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const { user, isAuthenticated, isAdmin } = storeToRefs(authStore);

const props = defineProps({
    userName: {
        type: String,
        required: true,
    }
});

const emit = defineEmits(['logout']);

const isInHomeView = computed(() => route.name === 'home');
const isInAdminView = computed(() => route.name === 'admin');

const goToAdmin = () => {
    router.push({ name: 'admin' });
};

const goToHome = () => {
    router.push({ name: 'home' });
};
</script>

<template>
    <v-app-bar 
        color="teal-darken-4" 
        flat 
        density="comfortable"
        height="80"
    >
        <v-container class="d-flex align-center py-4">
            <img src="https://groman.cl/wp-content/uploads/2023/11/logo-2023.png" alt="Logo de la empresa" width="auto" height="30">

            <v-toolbar-title class="font-weight-bold text-h6 me-4 mx-3">
          Portafolio Proyectos
            </v-toolbar-title>
            
            <v-spacer></v-spacer>

            <div class="d-flex align-center">
                
                <v-btn
                    v-if="isAuthenticated && isAdmin && isInAdminView"
                    @click="goToHome"
                    color="white"
                    variant="flat"
                    size="small"
                    class="mx-1 text-none"
                    prepend-icon="mdi-eye"
                >
                    Ver Portafolio
                </v-btn>

                <v-btn
                    v-if="isAuthenticated && isAdmin && !isInAdminView"
                    @click="goToAdmin"
                    color="amber"
                    variant="flat"
                    size="small"
                    class="mx-1 text-none"
                    prepend-icon="mdi-cog"
                >
                    Panel Admin
                </v-btn>
                
                <span class="mx-3 text-subtitle-2 d-none d-sm-inline">
                    Bienvenido, <strong class="text-amber">{{ userName }}</strong>
                </span>

                <v-btn
                    @click="$emit('logout')"
                    color="error"
                    variant="flat"
                    size="small"
                    class="mx-1 text-none"
                    prepend-icon="mdi-logout"
                >
                    Cerrar Sesión
                </v-btn>
            </div>
        </v-container>
    </v-app-bar>
</template>

<style scoped>
/* No se necesitan estilos adicionales ya que v-app-bar maneja la posición y el estilo. */
</style>