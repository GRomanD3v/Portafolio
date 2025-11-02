import { createRouter, createWebHistory } from 'vue-router';
// Importa el Store de Auth (debes importarlo de esta manera para usarlo fuera de un componente)
import { useAuthStore } from '../stores/auth'; 

// Definición de las rutas
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue'),
        meta: { requiresAuth: false } // No requiere autenticación
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../components/Register.vue'),
        meta: { requiresAuth: false } // No requiere autenticación
    },
    {
        path: '/',
        name: 'home',
        // CORRECCIÓN 1: Asumiendo que PortfolioView es tu HomeView
        component: () => import('../views/PortfolioView.vue'), 
        meta: { requiresAuth: false } // El portafolio público no requiere autenticación
    },
    {
        path: '/admin',
        name: 'admin',
        // CORRECCIÓN 2: Usar la vista del panel de administración de proyectos
        component: () => import('../views/ProjectAdminView.vue'),
        meta: { requiresAuth: true } // Requiere Autenticación
    },
    {
        path: '/admin/editar/:id', // :id es el parámetro dinámico del ID del proyecto
        name: 'editProject', // CORRECCIÓN 3: Cambiar el nombre de la ruta
        // CORRECCIÓN 4: Usar la vista de edición de proyecto
        component: () => import('../views/EditProjectView.vue'), 
        meta: { requiresAuth: true }    
    },
    
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// 🔑 GUARDIA DE NAVEGACIÓN GLOBAL
router.beforeEach((to, from, next) => {
    // Solo accedemos al store dentro de beforeEach para asegurar que Pinia esté inicializado
    const authStore = useAuthStore(); 
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    
    // Si la ruta requiere autenticación y el usuario NO está autenticado
    if (requiresAuth && !authStore.isAuthenticated) {
        // Redirige al login
        next({ name: 'login' });
    } 
    // Si el usuario ya está autenticado e intenta acceder a login o register
    else if (!requiresAuth && authStore.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
        // Redirige al home
        next({ name: 'home' });
    }
    // Permite la navegación
    else {
        next();
    }
});

export default router;