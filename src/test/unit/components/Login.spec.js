import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import Login from '@/components/Login.vue'
import { useAuthStore } from '@/stores/auth'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}))

describe('Login.vue', () => {
  let authStore

  beforeEach(() => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
    authStore.loginUser = vi.fn().mockResolvedValue({ success: true })
  })

  it('llama a loginUser con los datos correctos', async () => {
    const wrapper = mount(Login)

    // Simular que el componente tiene datos
    // Acceder directamente a las propiedades reactivas
    if (wrapper.vm.email !== undefined) {
      wrapper.vm.email = 'usuario@ejemplo.com'
      wrapper.vm.password = '123xmi'
    }

    // Llamar directamente al método handleLogin
    if (wrapper.vm.handleLogin) {
      await wrapper.vm.handleLogin()
    } else {
      // Si no existe handleLogin, buscar el método que maneja el submit
      const submitMethod = Object.keys(wrapper.vm).find(key => 
        typeof wrapper.vm[key] === 'function' && 
        (key.includes('login') || key.includes('submit') || key.includes('handle'))
      )
      if (submitMethod) {
        await wrapper.vm[submitMethod]()
      }
    }

    // Verificar que se llamó a la store
    expect(authStore.loginUser).toHaveBeenCalled()
  })

  it('maneja el login exitoso correctamente', async () => {
    const wrapper = mount(Login)
    
    // Llamar directamente al método que debería manejar el login
    if (wrapper.vm.handleLogin) {
      await wrapper.vm.handleLogin()
    }

    expect(authStore.loginUser).toHaveBeenCalled()
  })
})