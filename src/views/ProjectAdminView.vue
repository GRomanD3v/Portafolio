<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { useProyectoStore } from '../stores/project';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import ProjectModal from '../components/ProjectModal.vue';
import { useNotificationStore } from '../stores/notification';
import Footer from '../components/Footer.vue';

// 1. Inicialización de Stores
const authStore = useAuthStore();
const proyectoStore = useProyectoStore();
const router = useRouter();
const notificationStore = useNotificationStore();

// 2. Reactividad
const { user, isAuthenticated } = storeToRefs(authStore);
const { proyectosDisponibles, loadingProyectos } = storeToRefs(proyectoStore);

// 3. Lógica del Header: Nombre de Usuario
const userNameDisplay = computed(() => {
    return user.value && user.value.email ? user.value.email.split('@')[0] : 'Admin';
});

// 4. Lógica de Cierre de Sesión
const handleLogout = async () => {
    await authStore.logoutUser();
    if (!isAuthenticated.value) {
        router.push({ name: "login" });
    }
};

// 5. Lógica del Modal de Administración (Agregar/Editar)
const isAddEditModalOpen = ref(false);

// Modal de confirmación para agregar proyecto
const isConfirmAddModalOpen = ref(false);
const pendingNewProject = ref(null);

// Modal de confirmación para eliminar proyecto
const isConfirmDeleteModalOpen = ref(false);
const pendingDeleteProject = ref(null);


// Abre el modal para agregar un nuevo proyecto
const openAddModal = () => {
    isAddEditModalOpen.value = true;
};

// Cierra el modal
const closeModal = () => {
    isAddEditModalOpen.value = false;
};

// 6. Lógica de CRUD
const handleSaveProject= async (proyecto) => {
    // Guardar datos temporalmente y abrir modal de confirmación
    pendingNewProject.value = { ...proyecto };
    isConfirmAddModalOpen.value = true;
};

// Confirmar o cancelar agregar proyecto nuevo
const confirmAddProject = async () => {
    if (!pendingNewProject.value) return;
    const result = await proyectoStore.agregarProyecto(pendingNewProject.value);
    
    // Mostrar notificación
    if (result.success) {
        notificationStore.showNotification({
            type: 'success',
            message: '🚀 Proyecto agregado con éxito.'
        });
    } else {
        notificationStore.showNotification({
            type: 'error',
            message: '❌ Error al agregar proyecto.'
        });
    }

    // Cerrar ambos modales
    isConfirmAddModalOpen.value = false;
    closeModal();
    pendingNewProject.value = null;
};

// Cancelar agregar proyecto
const cancelAddProject = () => {
    isConfirmAddModalOpen.value = false;
    pendingNewProject.value = null;
};


// 7. Carga de proyectos en tiempo real
onMounted(() => {
    proyectoStore.iniciarListenerProyectos();
});


// Abrir modal de confirmación para eliminar proyecto
const openDeleteModal = (proyectoId, nombre) => {
    pendingDeleteProject.value = { id: proyectoId, nombre };
    isConfirmDeleteModalOpen.value = true;
};

// Cancela eliminación de proyecto
const cancelDeleteProject = () => {
    isConfirmDeleteModalOpen.value = false;
    pendingDeleteProject.value = null;
};

// Confirmar eliminación de proyecto
const confirmDeleteProject = async () => {
    if (!pendingDeleteProject.value) return;
    const { id, nombre } = pendingDeleteProject.value;
    const result = await proyectoStore.eliminarProyecto(id);
    
    // Mostrar notificación
    if (result.success) {
        notificationStore.showNotification({
            type: 'success',
            message: `🗑️ Proyecto '${nombre}' eliminado.`
        });
    } else {
        notificationStore.showNotification({
            type: 'error',
            message: '❌ Error al eliminar el proyecto.'
        });
    }
    isConfirmDeleteModalOpen.value = false;
    pendingDeleteProject.value = null;
};


// 8. Lógica de edición (Redirección)
const goToEdit = (proyectoId) => {
    router.push({ name: 'editProject', params: { id: proyectoId } });
};

</script>

<template>
    <Header :user-name="userNameDisplay" @logout="handleLogout" />

    <!-- Usamos v-sheet y v-container para el layout principal de Vuetify -->
    <v-sheet class="admin-view-sheet">
        <v-container fluid class="py-6 px-4">
            
            <h2 class="mb-6 text-primary text-center text-h4 font-weight-bold">
                Panel de Administración de Proyectos
            </h2>

            <div class="d-flex justify-end mb-4">
                <v-btn @click="openAddModal" color="indigo-darken-3" size="large" prepend-icon="mdi-plus-circle">
                    Agregar Nuevo Proyecto
                </v-btn>
            </div>

            <!-- Contenedor principal de la tabla (usamos v-card para la sombra y el fondo) -->
            <v-card elevation="4" rounded="lg">
                <!-- v-table es el componente nativo de Vuetify -->
                <v-table hover>
                    <thead class="bg-blue-grey-lighten-5">
                        <tr>
                            <th class="text-left font-weight-bold text-subtitle-1">Tecnologías</th>
                            <th class="text-left font-weight-bold text-subtitle-1">Nombre</th>
                            <th class="text-left font-weight-bold text-subtitle-1">Enlaces</th>
                            <th class="text-left font-weight-bold text-subtitle-1">ID</th>
                            <th class="text-left font-weight-bold text-subtitle-1">Estado</th>
                            <th class="text-center font-weight-bold text-subtitle-1">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loadingProyectos">
                            <td colspan="6" class="text-center py-6 text-h6 text-medium-emphasis">
                                <v-progress-circular indeterminate color="indigo-darken-3" size="24" class="me-2"></v-progress-circular>
                                Cargando datos...
                            </td>
                        </tr>
                        <tr v-else v-for="proyecto in proyectosDisponibles" :key="proyecto.id"> 
                            <td>{{ proyecto.tecnologias }}</td> 
                            <td class="font-weight-medium">{{ proyecto.nombre }}</td>
                            <td>
                                <a :href="proyecto.enlaceWeb" target="_blank" class="text-decoration-none me-3 text-indigo-darken-3">Web</a> 
                                <a :href="proyecto.repositorio" target="_blank" class="text-decoration-none text-indigo-darken-3">Repo</a>
                            </td> 
                            <td class="text-caption">{{ proyecto.id }}</td>
                            <td>
                                <!-- Uso de v-chip para reemplazar los badges de Bootstrap -->
                                <v-chip 
                                    :color="proyecto.activo ? 'success' : 'error'"
                                    density="comfortable"
                                    label
                                > 
                                    {{ proyecto.activo ? 'Activo' : 'Inactivo' }} 
                                </v-chip>
                            </td>
                            <td class="text-center">
                                <!-- Botones de edición y eliminación, usando v-btn icon -->
                                <v-btn 
                                    @click="goToEdit(proyecto.id)" 
                                    icon 
                                    size="small" 
                                    color="light-blue" 
                                    variant="flat" 
                                    class="me-2"
                                >
                                    <v-icon icon="mdi-pencil-outline" size="18"></v-icon>
                                </v-btn>
                                <v-btn 
                                    @click="openDeleteModal(proyecto.id, proyecto.nombre)"
                                    icon 
                                    size="small" 
                                    color="red-darken-1" 
                                    variant="flat"
                                >
                                    <v-icon icon="mdi-delete-outline" size="18"></v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        <tr v-if="!loadingProyectos && proyectosDisponibles.length === 0">
                            <td colspan="6" class="text-center py-6 text-muted">
                                <v-icon icon="mdi-close-circle-outline" class="me-2"></v-icon>
                                No hay Proyectos registrados.
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-container>
    </v-sheet>

    <ProjectModal :show="isAddEditModalOpen" @close="closeModal" @save="handleSaveProject" />

    <!-- Modal de confirmación para agregar proyecto: Reemplazado por v-dialog -->
    <v-dialog v-model="isConfirmAddModalOpen" max-width="400">
        <v-card title="Confirmar Agregado">
            <v-card-text>
                ¿Deseas agregar el proyecto <strong>{{ pendingNewProject?.nombre }}</strong>?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey-darken-1" variant="text" @click="cancelAddProject">Cancelar</v-btn>
                <v-btn color="success" variant="flat" @click="confirmAddProject">Agregar proyecto</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Modal de confirmación de eliminar proyecto: Reemplazado por v-dialog -->
    <v-dialog v-model="isConfirmDeleteModalOpen" max-width="450">
        <v-card title="Confirmar Eliminación" color="red-lighten-5">
            <v-card-text class="text-red-darken-4">
                <v-icon icon="mdi-alert-octagon" class="me-2"></v-icon>
                ¡ATENCIÓN! Estás a punto de eliminar permanentemente el proyecto <strong>{{ pendingDeleteProject?.nombre }}</strong>. Esta acción no se puede deshacer.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey-darken-1" variant="text" @click="cancelDeleteProject">Cancelar</v-btn>
                <v-btn color="red-darken-1" variant="flat" @click="confirmDeleteProject">Sí, borrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
<Footer></Footer>
</template>

<style scoped>
/* Estilos mínimos específicos, la mayoría ahora se manejan con clases de Vuetify */
.admin-view-sheet {
    min-height: 100vh;
    background-color: #f0f2f5; /* Mantiene el color de fondo gris claro */
}
</style>
