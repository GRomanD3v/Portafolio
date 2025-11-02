<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";
import { useProyectoStore } from "../stores/project"; 
import { useNotificationStore } from '../stores/notification';
import Header from "../components/Header.vue";

// 1. Inicialización de Stores y Router
const authStore = useAuthStore();
const proyectoStore = useProyectoStore();
const notificationStore = useNotificationStore();
const router = useRouter();
const route = useRoute(); // Para acceder a los parámetros de la ruta

// 2. Reactividad
const { user } = storeToRefs(authStore);
const { proyectosDisponibles, loadingProyectos } = storeToRefs(proyectoStore);

// 3. Estado Local del Formulario
const projectData = ref(null);
const isLoadingData = ref(true);

// 4. Obtener y cargar el curso
const projectId = route.params.id;

onMounted(() => {
  proyectoStore.iniciarListenerProyectos();
});

// Usamos un watcher para esperar a que los cursos se carguen desde Firestore
watch(
  [proyectosDisponibles, loadingProyectos],
  ([newProyectos, newLoading]) => {
    // Si ya no está cargando O si el listener ya retornó datos
    if (!newLoading && newProyectos.length > 0 && projectData.value === null) {
      const project = newProyectos.find(p => p.id === projectId);

      if (project) {
        // Clonamos el objeto para evitar mutar el estado del store directamente
        // Aseguramos que 'activo' sea booleano ya que el radio de Vuetify lo requiere
        projectData.value = { ...project, activo: Boolean(project.activo) };
        isLoadingData.value = false;
      } else {
        // Si el curso no existe (por si el usuario ingresa un ID incorrecto)
        notificationStore.showNotification({
          type: 'error',
          message: `❌ Proyecto con ID ${projectId} no encontrado.`
        });
        router.push({ name: 'admin' });
      }
    }
  }, { immediate: true }
);


// 5. Lógica del Header
const userNameDisplay = computed(() => {
  return user.value && user.value.email ? user.value.email.split("@")[0] : "Admin";
});

const handleLogout = async () => {
  await authStore.logoutUser();
  router.push({ name: "login" });
};

//Modal de confirmación
const isConfirmModalOpen = ref(false);
const pendingUpdate = ref(null); // No se utiliza, pero lo dejo por si se necesita revisar el estado antes de confirmar

const openConfirmModal = () => {
  isConfirmModalOpen.value = true;
};

const closeConfirmModal = () => {
  isConfirmModalOpen.value = false;
};

const confirmUpdateProject = async () => {
  closeConfirmModal();
  await updateProjectConfirmed();
};


// 6. Lógica de Edición (CRUD)
const handleUpdateProject = async () => {
  if (!projectData.value || !projectId) return;

  // Abrir modal de confirmación
  openConfirmModal();
};

// 6.1 Separamos el ID del resto de los datos (la ID no se debe enviar para actualizar)
const updateProjectConfirmed = async () => {
  const { id, ...dataToUpdate } = projectData.value;

  // 6.2 Llamamos a la acción de edición en el store
  const result = await proyectoStore.actualizarProyecto(projectId, dataToUpdate);

  if (result.success) {
    notificationStore.showNotification({
      type: 'success',
      message: `✅ Proyecto '${projectData.value.nombre}' actualizado con éxito.`
    });
    // Redirigir de vuelta al panel de administración
    router.push({ name: 'admin' });
  } else {
    notificationStore.showNotification({
      type: 'error',
      message: '❌ Error al actualizar el proyecto.'
    });
  }
};

// 7. Navegación
const goBack = () => {
  router.push({ name: 'admin' });
};
</script>

<template>
  <Header :user-name="userNameDisplay" @logout="handleLogout" />

  <v-sheet class="edit-view-wrapper">
    <!-- Usamos v-container para el padding y centrado -->
    <v-container class="py-6">
      
      <h2 class="mb-6 text-center text-primary text-h4 font-weight-bold">
        <!-- Icono de Material Design para editar -->
        <v-icon icon="mdi-pencil-outline" class="me-2" size="32"></v-icon> Editar Proyecto
      </h2>

      <!-- Estado de Carga -->
      <div v-if="isLoadingData || projectData === null" class="text-center py-10">
        <!-- v-progress-circular para reemplazar spinner-border -->
        <v-progress-circular indeterminate color="primary" size="48" width="5"></v-progress-circular>
        <p class="mt-4 text-medium-emphasis">Cargando datos del Proyecto con ID: {{ projectId }}...</p>
      </div>

      <!-- Formulario de Edición (Usamos v-card para el contenedor principal) -->
      <v-card v-else class="mx-auto" elevation="8" rounded="lg" max-width="800">
        <v-card-title class="bg-blue-grey-darken-1 text-white font-weight-bold py-3">
          Editando: {{ projectData.nombre }}
        </v-card-title>
        
        <!-- Contenido del formulario -->
        <v-form @submit.prevent="handleUpdateProject" class="pa-6">
          <v-row dense>
            <!-- Nombre del Proyecto -->
            <v-col cols="12">
                <!-- v-text-field para reemplazar input[type=text] -->
                <v-text-field 
                    v-model="projectData.nombre" 
                    label="Nombre del Proyecto" 
                    variant="outlined"
                    required
                ></v-text-field>
            </v-col>

            <!-- URL de la Imagen -->
            <v-col cols="12">
                <v-text-field 
                    v-model="projectData.img" 
                    label="URL de la Portada/Imagen" 
                    variant="outlined"
                    placeholder="http://..."
                    required
                ></v-text-field>
                <div class="mt-2 text-center">
                    <!-- Vista previa de la imagen -->
                    <v-img :src="projectData.img" alt="Vista previa" max-height="150" class="rounded-lg mx-auto border-sm" contain></v-img>
                </div>
            </v-col>

            <!-- Enlace Web -->
            <v-col cols="12" md="6">
                <v-text-field 
                    v-model="projectData.enlaceWeb" 
                    label="URL de la Web Publicada" 
                    variant="outlined"
                    placeholder="http://sitioweb.com"
                ></v-text-field>
            </v-col>
            
            <!-- Repositorio -->
            <v-col cols="12" md="6">
                <v-text-field 
                    v-model="projectData.repositorio" 
                    label="URL del Repositorio (GitHub)" 
                    variant="outlined"
                    placeholder="http://github.com/usuario/repo" 
                    required
                ></v-text-field>
            </v-col>

            <!-- Tecnologías -->
            <v-col cols="12">
                <v-text-field 
                    v-model="projectData.tecnologias" 
                    label="Tecnologías (Separadas por coma)" 
                    variant="outlined"
                    placeholder="Ej: Vue, Pinia, Firebase, Vuetify" 
                    required
                    hint="Usar comas para separar las tecnologías (serán los tags)."
                    persistent-hint
                ></v-text-field>
            </v-col>

            <!-- Descripción Detallada -->
            <v-col cols="12">
                <!-- v-textarea para reemplazar textarea -->
                <v-textarea 
                    v-model="projectData.descripcion" 
                    label="Descripción Detallada" 
                    variant="outlined"
                    rows="4" 
                    required
                ></v-textarea>
            </v-col>

            <!-- Estado del Proyecto (Radio Buttons) -->
            <v-col cols="12">
                <v-label class="mb-2 font-weight-medium text-subtitle-1">Estado del Proyecto</v-label>
                <!-- v-radio-group para manejar los radio buttons -->
                <v-radio-group v-model="projectData.activo" inline hide-details>
                    <v-radio 
                        :value="true" 
                        color="success" 
                        label="Activo / Visible en Portafolio" 
                        class="me-6"
                    ></v-radio>
                    <v-radio 
                        :value="false" 
                        color="error" 
                        label="Inactivo / Oculto"
                    ></v-radio>
                </v-radio-group>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <!-- Botones de Acción -->
          <div class="d-flex justify-space-between pt-2">
            <!-- Botón Volver -->
            <v-btn 
                type="button" 
                variant="outlined" 
                color="blue-grey-darken-1" 
                @click="goBack"
                prepend-icon="mdi-arrow-left-circle-outline"
            >
                Volver
            </v-btn>
            <!-- Botón Guardar -->
            <v-btn 
                type="submit" 
                color="success" 
                variant="flat" 
                prepend-icon="mdi-content-save-outline"
            >
                Guardar Cambios
            </v-btn>
          </div>
        </v-form>
      </v-card>

      <!-- MODAL DE CONFIRMACIÓN (Reemplazado por v-dialog) -->
      <v-dialog v-model="isConfirmModalOpen" max-width="400">
          <v-card title="Confirmar Actualización">
              <v-card-text>
                  ¿Deseas guardar los cambios en el proyecto <strong>{{ projectData?.nombre }}</strong>?
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey-darken-1" variant="text" @click="closeConfirmModal">Cancelar</v-btn>
                  <v-btn color="success" variant="flat" @click="confirmUpdateProject">Guardar Cambios</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </v-container>
  </v-sheet>
</template>

<style scoped>
.edit-view-wrapper {
  /* Establece un color de fondo claro */
  background-color: #f5f5f5; 
  min-height: 100vh;
}
</style>
