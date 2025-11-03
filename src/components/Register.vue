<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia'; // Necesario para 'loading' del store

const router  = useRouter();
// 1. Iniciar el Store
const authStore = useAuthStore();
const { loading } = storeToRefs(authStore); // Obtenemos loading directamente del store

// 2. Variables reactivas para el formulario
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// 3. Variables auxiliares para la UI
const success = ref(null);
const localError = ref(null);

// 4. Función principal de Registro
const handleRegister = async () => {
    // Limpiar estados locales
    localError.value = null; 
    success.value = null;

    // Validar que las contraseñas coincidan
    if (password.value !== confirmPassword.value) {
        localError.value = 'Las contraseñas no coinciden';
        return;
    }

    // El Store se encarga de manejar el estado `loading`

    // Registrar usuario
    const result = await authStore.registerUser(email.value, password.value);
    
    // Si la promesa devuelve éxito (sin Firebase error)
    if (result && result.success) { 
        success.value = '¡Cuenta creada exitosamente! Redirigiendo...';
        
        // Esperar 2 segundos y redirigir
        setTimeout(() => {
            router.push({ name: 'login' });
        }, 2000);
    }
    // Si hubo un error de Firebase, localError se mantiene null, pero authStore.error se actualizará.
};
</script>

<template>
    <!-- 
        Estructura de Vuetify para centrar el formulario y aplicar el fondo gris.
    -->
    <v-main>
        <v-container fluid class="fill-height justify-center pa-4">
            <!-- La tarjeta de registro -->
            <v-card 
                class="pa-6 elevation-12 rounded-lg" 
                max-width="600" 
                width="100%"
            >
                <!-- Header -->
                <div class="text-center mb-6">
                    <v-card-title class="text-h4 font-weight-bold text-success mb-1 justify-center">
                        <img src="/groman.png" alt="Logo de Gonzalo Román" style="height: 40px; margin-right: 8px; vertical-align: middle;"> 
                        CREAR CUENTA
                    </v-card-title>
                    <v-card-subtitle class="text-subtitle-1 text-medium-emphasis">
                        Regístrate para comenzar a administrar
                    </v-card-subtitle>
                </div>

                <!-- Formulario -->
                <v-form @submit.prevent="handleRegister">
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
                        class="mb-3"
                        density="comfortable"
                        required
                        :disabled="loading"
                        hint="La contraseña debe tener al menos 6 caracteres"
                        persistent-hint
                    ></v-text-field>

                    <!-- Confirmar Contraseña Field -->
                    <v-text-field
                        v-model="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        variant="outlined"
                        prepend-inner-icon="mdi-lock-check"
                        class="mb-6"
                        density="comfortable"
                        required
                        :disabled="loading"
                    ></v-text-field>

                    <!-- Error Alert: Muestra error local o el error del Store (Firebase) -->
                    <v-alert
                        v-if="localError || authStore.error"
                        type="error"
                        title="Error de Registro"
                        :text="localError || authStore.error"
                        class="mb-6"
                        density="compact"
                        icon="mdi-alert-circle"
                    ></v-alert>

                    <!-- Success Alert -->
                    <v-alert
                        v-if="success"
                        type="success"
                        title="Éxito"
                        :text="success"
                        class="mb-6"
                        density="compact"
                        icon="mdi-check-circle"
                    ></v-alert>

                    <!-- Botón Registro -->
                    <v-btn
                        type="submit"
                        color="success"
                        size="large"
                        block
                        :loading="loading" 
                        :disabled="loading" 
                        class="font-weight-bold"
                    >
                        <!-- Usar slot predefinido de Vuetify para iconos de carga/no carga -->
                        <template v-if="!loading" v-slot:default>
                            <v-icon start icon="mdi-account-plus"></v-icon>
                            Crear Cuenta
                        </template>
                    </v-btn>

                    <!-- Link a Login -->
                    <div class="text-center mt-4 text-body-2">
                        ¿Ya tienes cuenta? 
                        <router-link
                            to="/login"
                            class="text-success font-weight-bold text-decoration-none"
                        >
                            Inicia Sesión
                        </router-link>
                    </div>
                </v-form>
            </v-card>
        </v-container>
    </v-main>
</template>

<style scoped>
/* Estilos para asegurar que ocupe todo el fondo y use el mismo gris que el Login.
*/
.v-main {
    height: 100vh;
    width: 100vw;
    background-color: rgb(2, 41, 52); 
    background-image: url(src/assets/img/g-bg.png);
    background-size: cover;
}

.v-card-title {
    letter-spacing: 0.1em; 
}
</style>
