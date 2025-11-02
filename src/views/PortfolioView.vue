<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from "vue"; 
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";
import Header from "../components/Header.vue";
import { useProyectoStore } from "../stores/project"; 
import Footer from "../components/Footer.vue";

// 1. Inicialización y Reactividad
const authStore = useAuthStore();
const projectStore = useProyectoStore(); 
const router = useRouter();

// 2. Reactividad de auth y proyectos
const { user, isAuthenticated } = storeToRefs(authStore);
const { proyectosDisponibles } = storeToRefs(projectStore); 

// 3. Estado local para manejar la carga
const isLoading = ref(true);

// 4. Lógica del header: Nombre de usuario
const userNameDisplay = computed(() => {
  return user.value && user.value.email
    ? user.value.email.split("@")[0]
    : "Invitado";
});

// 5. Lógica de Cierre de Sesión 
const handleLogout = async () => {
  await authStore.logoutUser(); 

  if (!isAuthenticated.value) {
    router.push({ name: "login" });
  }
};

// 6. Carga y manejo del estado
onMounted(() => {
  //Inicia la escucha desde proyectos de firestore
projectStore.iniciarListenerProyectos();

  let stopWatch; 
  stopWatch = watch(proyectosDisponibles, (newProyectos) => {
    if (newProyectos !== undefined) {
      isLoading.value = false;
      if (stopWatch) stopWatch();
    }
  }, { immediate: true });
});

onUnmounted(() => {
  projectStore.detenerListenerProyectos();
});

// 7. Preparación de datos para la tarjeta
const proyectosListos = computed(() => {
    return proyectosDisponibles.value.map(p => ({
        ...p,
        // Convertir el string de tecnologías en un array (si existe)
        tecnologiaTags: p.tecnologias ? p.tecnologias.split(',').map(tag => tag.trim()) : []
    }));
});


</script>

<template>
  <!-- Usamos el v-app-bar del componente Header.vue. No necesitamos un div aquí. -->
  <!-- Header es la barra de navegación que usa v-app-bar -->
  <Header :user-name="userNameDisplay" @logout="handleLogout" />

  <!-- v-main es necesario para que el contenido se muestre debajo del v-app-bar -->
  <v-main class="bg">
    <v-container class="py-10">
      <h2 class="text-center text-white text-h3 font-weight-bold mb-10">
        Mis Proyectos Destacados
      </h2>
      <v-divider class="mb-10"></v-divider>

      <!-- PANTALLA DE CARGA (Vuetify) -->
      <v-row v-if="isLoading" justify="center" class="py-10">
        <v-col cols="12" class="text-center">
          <v-progress-circular
              :size="80"
              :width="7"
              color="primary"
              indeterminate
          ></v-progress-circular>
          <p class="mt-4 text-subtitle-1 text-medium-emphasis">Cargando proyectos...</p>
        </v-col>
      </v-row>

      <!-- LISTA DE PROYECTOS (Grid de Vuetify) -->
      <v-row v-else-if="proyectosDisponibles.length > 0">
        <!-- Iteración sobre proyectos, usando v-col para el layout responsivo -->
        <v-col
          v-for="proyecto in proyectosListos"
          :key="proyecto.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="mx-auto project-card" elevation="4" rounded="lg" height="100%">
            
            <!-- Imagen del proyecto (Portada) -->
            <v-img 
              :src="proyecto.img || 'https://placehold.co/600x400/ECEFF1/455A64?text=SIN+IMAGEN'" 
              :aspect-ratio="16/9" 
              cover
              class="align-end"
            ></v-img>

            <v-card-title class="text-h6 font-weight-bold text-primary pb-0">
              {{ proyecto.nombre}}
            </v-card-title>
            
            <v-card-text>
              <p class="text-medium-emphasis text-body-2 mb-3">
                {{ proyecto.descripcion.substring(0, 100) }}...
              </p>
              
              <!-- Tecnologías (Tags) -->
              <div class="mt-3">
                    <v-chip v-for="tag in proyecto.tecnologiaTags" :key="tag"
                        class="me-1 mb-1" size="small" color="blue-grey-darken-1" variant="tonal">
                        {{ tag }}
                    </v-chip>
              </div>
            </v-card-text>
            
            <v-spacer></v-spacer>

            <v-card-actions class="pt-0 px-4 pb-3">
              <!-- Enlace al sitio web (URL) -->
              <v-btn v-if="proyecto.enlaceWeb" 
                :href="proyecto.enlaceWeb" 
                target="_blank" 
                color="indigo-darken-3" 
                variant="flat" 
                size="small"
                prepend-icon="mdi-web">
                Ver Sitio
              </v-btn>

              <!-- Enlace a GitHub -->
              <v-btn v-if="proyecto.repositorio" 
                :href="proyecto.repositorio" 
                target="_blank" 
                color="grey-darken-1" 
                variant="text" 
                size="small"
                prepend-icon="mdi-github">
                GitHub
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- No hay proyectos (Vuetify) -->
      <v-row v-else justify="center" class="py-10">
        <v-col cols="12" class="text-center text-medium-emphasis">
          <v-icon icon="mdi-information-outline" size="40" color="grey-darken-1"></v-icon>
          <p class="mt-2 text-subtitle-1">No hay proyectos disponibles para mostrar.</p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <Footer />
</template>

<style scoped>

.bg {
  width: 100%;
  background: linear-gradient(to top, #3c006b, #03a590);
  color: white;
  padding: 7rem 2rem 4rem 2rem;
}

.project-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
  /* Sombra sutil con color primario de Vuetify */
  box-shadow: 0 0.5rem 1.5rem rgba(25, 118, 210, 0.2) !important; 
}
</style>
