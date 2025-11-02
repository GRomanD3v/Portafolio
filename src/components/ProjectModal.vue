<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  initialProject: { type: Object, default: null }
})

const emit = defineEmits(['close', 'save'])

const defaultProject = {
  nombre: '',
  tecnologias: '',
  descripcion: '',
  repositorio: '',
  enlaceWeb: '',
  img: 'https://placehold.co/400x200/222/FFF?text=Proyecto+Nuevo',
  activo: true,
}

const projectData = ref({ ...defaultProject })
const modalTitle = ref('Agregar Nuevo Proyecto')

watch(() => props.show, (newVal) => {
  if (newVal) {
    projectData.value = props.initialProject
      ? { ...props.initialProject }
      : { ...defaultProject }
    modalTitle.value = props.initialProject
      ? 'Editar Proyecto'
      : 'Agregar Nuevo Proyecto'
  }
})

const handleSubmit = () => {
  emit('save', projectData.value)
}
</script>

<template>
  <v-dialog v-model="props.show" height="700" max-width="550">
    <v-card>
      <v-card-title class="bg-primary text-white">
        {{ modalTitle }}
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="projectData.nombre"
            label="Nombre del Proyecto"
            required
          />
          <v-text-field
            v-model="projectData.tecnologias"
            label="Tecnologías Usadas HTML, CSS... (separadas por coma)"
            required
          />
          <v-textarea
            v-model="projectData.descripcion"
            label="Descripción"
            rows="3"
            required
          />
          <v-text-field
            v-model="projectData.repositorio"
            label="URL Repositorio (GitHub)"
            type="url"
            required
          />
          <v-text-field
            v-model="projectData.enlaceWeb"
            label="URL Proyecto Desplegado (Demo)"
            type="url"
            required
          />
          <v-text-field
            v-model="projectData.img"
            label="URL de Imagen/Captura"
            type="url"
          />
          <v-img
            v-if="projectData.img"
            :src="projectData.img"
            max-height="120"
            class="my-3 rounded-lg elevation-2"
          ></v-img>

          <v-radio-group
            v-model="projectData.activo"
            label="Estado del Proyecto"
          >
            <v-radio label="Activo / Visible en portafolio" :value="true" />
            <v-radio label="Inactivo / Oculto" :value="false" />
          </v-radio-group>

          <v-card-actions class="justify-end mt-4">
            <v-btn variant="tonal" color="grey" @click="emit('close')">
              Cancelar
            </v-btn>
            <v-btn color="primary" type="submit" prepend-icon="mdi-content-save">
              Guardar Proyecto
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
