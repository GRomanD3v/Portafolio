import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import AdminVue from '@/views/ProjectAdminView.vue'
import { useProyectoStore } from '@/stores/project' // Importación de la store de Proyecto

describe('ProjectAdminView.vue - Eliminar Proyecto', () => {
  let proyectoStore

  beforeEach(() => {
    setActivePinia(createPinia())
    // Inicialización de la store de Proyecto
    proyectoStore = useProyectoStore() 

    // Mock de la función eliminarProyecto
    proyectoStore.eliminarProyecto = vi.fn().mockResolvedValue({ success: true })

    // Agregamos un proyecto de prueba
    proyectoStore.proyectosDisponibles = [ // Asegúrate de que esta propiedad coincida con AdminView
      { 
        id: 'proyecto1', 
        nombre: 'Proyecto de Prueba', 
        tecnologias: 'Vue, Firebase', 
        activo: true 
      }
    ]
  })

  it('abre el modal y llama a eliminarProyecto al confirmar', async () => {
    const wrapper = mount(AdminVue, {
      global: {
        stubs: {
          // Asumimos que ProjectModal y Header están correctamente registrados o mockeados.
          // Si no se mockean, el test podría fallar si dependen de funcionalidad externa.
          ProjectModal: true, 
          Header: true,
          'v-icon': true, // Mock de componentes de Vuetify si es necesario
          'v-btn': true,
          'v-dialog': true,
          'v-card': true,
        }
      }
    })

    // Abrir modal de eliminar
    await wrapper.vm.openDeleteModal('proyecto1', 'Proyecto de Prueba')
    
    // Verificar que el modal de confirmación se abrió
    expect(wrapper.vm.isConfirmDeleteModalOpen).toBe(true)
    
    // Verificar que el nombre del proyecto pendiente es correcto
    expect(wrapper.vm.pendingDeleteProject.nombre).toBe('Proyecto de Prueba')

    // Confirmar eliminación
    await wrapper.vm.confirmDeleteProject()

    // Verificar que eliminarProyecto fue llamado con el id correcto
    expect(proyectoStore.eliminarProyecto).toHaveBeenCalledWith('proyecto1')
    
    // Verificar que el modal se cerró
    expect(wrapper.vm.isConfirmDeleteModalOpen).toBe(false)
    
    // Verificar que el proyecto pendiente se reseteó
    expect(wrapper.vm.pendingDeleteProject).toBe(null)
  })
})
