<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

// 1. Inicializar Store
const authStore = useAuthStore();
const router = useRouter();

// 2. Desestructurar propiedades reactivas del Store usando storeToRefs
const { error, loading, user } = storeToRefs(authStore);

// 3. Variables reactivas para el formulario
const email = ref('');
const password = ref('');

// 4. Función principal de Login
const handleLogin = async () => {
    // 4.1. Limpiar error previo
    authStore.error = null;
    
    // 4.2. Llamar a la acción del Store
    await authStore.loginUser(email.value, password.value);
    
    // 4.3. LÓGICA DE REDIRECCIÓN
    if (!error.value && user.value) {
        router.push({ name: 'home' });
    }
};
</script>

<template>
    <!-- 
        El v-main y v-container con la clase fill-height aseguran que el formulario 
        se centre perfectamente en la pantalla.
    -->
    <v-main>
        <v-container fluid class="fill-height justify-center pa-4">
            <!-- La tarjeta de login, con ancho máximo y sombra -->
            <v-card 
                class="pa-6 elevation-12 rounded-lg" 
                max-width="450" 
                width="100%"
            >
                <!-- Header -->
                <div class="text-center mb-6">
                    <!-- Vuetify usa v-card-title o v-card-subtitle para el texto -->
                    <v-card-title class="text-h4 font-weight-bold text-indigo-darken-3 mb-1 justify-center">
                        <!-- Imagen (si existe en /groman.png) y texto -->
                        <img src="/groman.png" alt="Logo de Gonzalo Román" style="height: 40px; margin-right: 8px; vertical-align: middle;"> 
                        PORTAFOLIO
                    </v-card-title>
                    <v-card-subtitle class="text-subtitle-1 text-medium-emphasis">
                        Inicia sesión para continuar
                    </v-card-subtitle>
                </div>

                <!-- Formulario -->
                <v-form @submit.prevent="handleLogin">
                    <!-- Email Field -->
                    <v-text-field
                        v-model="email"
                        label="Correo electrónico"
                        type="email"
                        variant="outlined"
                        prepend-inner-icon="mdi-email"
                        class="mb-3"
                        density="comfortable"
                        required
                        :disabled="loading"
                    ></v-text-field>

                    <!-- Contraseña Field -->
                    <v-text-field
                        v-model="password"
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        prepend-inner-icon="mdi-lock"
                        class="mb-6"
                        density="comfortable"
                        required
                        :disabled="loading"
                    ></v-text-field>

                    <!-- Error Alert -->
                    <!-- Vuetify usa v-alert para mensajes de error -->
                    <v-alert
                        v-if="error"
                        type="error"
                        title="Error de inicio de sesión"
                        :text="error"
                        class="mb-6"
                        density="compact"
                        icon="mdi-alert-circle"
                    ></v-alert>

                    <!-- Botón Login -->
                    <v-btn
                        type="submit"
                        color="indigo-darken-3"
                        size="large"
                        block
                        :loading="loading" 
                        :disabled="loading" 
                        class="font-weight-bold"
                    >
                        <!-- Usar slot predefinido de Vuetify para iconos de carga/no carga -->
                        <template v-if="!loading" v-slot:default>
                            <v-icon start icon="mdi-login"></v-icon>
                            Iniciar Sesión
                        </template>
                    </v-btn>

                    <!-- Link a Registro -->
                    <div class="text-center mt-4 text-body-2">
                        ¿No tienes cuenta?
                        <router-link
                            to="/register"
                            class="text-indigo-darken-3 font-weight-bold text-decoration-none"
                        >
                            Regístrate aquí
                        </router-link>
                    </div>
                </v-form>
            </v-card>
        </v-container>
    </v-main>
</template>

<style scoped>
/* Se aplica un estilo para asegurar que el v-main (que representa el "body" del componente) 
   ocupe toda la altura y se le asigna el color gris claro uniforme.
*/
.v-main {
    height: 100vh;
    width: 100vw;
    /* CAMBIO: Usamos el color gris uniforme que se asemeja al fondo de tu captura. */
    background-color: #f0f2f5; 
}

.v-card-title {
    letter-spacing: 0.1em; /* Añade un poco de espaciado a PORTAFOLIO */
}
</style>
