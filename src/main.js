import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
// Importar Firebase Auth y Store
import { auth } from './firebase/init'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from './stores/auth'


import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

// --- INICIO DE CORRECCIÓN ---

// 1. Importar los estilos CSS de Material Design Icons (MDI)
import '@mdi/font/css/materialdesignicons.css' 
// 2. Importar el set de iconos MDI para Vuetify
import { mdi } from 'vuetify/iconsets/mdi'

// 3. Crear la instancia de vuetify, incluyendo la configuración de iconos
const vuetify = createVuetify({ 
    components, 
    directives,
    icons: {
        defaultSet: 'mdi', // Usar MDI como set por defecto
        sets: {
            mdi,
        },
    },
})

// --- FIN DE CORRECCIÓN ---


// 4. Crear la instancia de Pinia
const pinia = createPinia()

// 5. Crear la instancia de la aplicación (guardarla en una variable 'app')
const app = createApp(App)

// 6. Aplicar Pinia, Router y Vuetify a la aplicación ANTES de montarla
app.use(pinia)
app.use(router)
app.use(vuetify) // Usamos la instancia de Vuetify con la configuración de iconos

// Mantener sesión activa al iniciar la aplicación
const authStore = useAuthStore()
await authStore.initAuth();


// 7. Montar la aplicación
app.mount('#app')
