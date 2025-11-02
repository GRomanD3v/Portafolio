import { defineStore } from 'pinia';
import { db } from '../firebase/init'; // Importa la instancia de Firestore
import { collection, onSnapshot, query, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';


const PROYECTOS_COLLECTION = 'proyectos';

export const useProyectoStore = defineStore('proyecto', {
    state: () => ({
        // Lista principal de proyectos
        proyectos: [],
        // Indica si los proyectos se están cargando
        loading: true,
        // Almacenamos la función de unsubscribe para detener la escucha
        unsub: null, 
    }),
    
    getters: {
        // Devuelve la lista de cursos disponibles
        proyectosDisponibles: (state) => state.proyectos,
        loadingProyectos: (state) => state.loading,
        getProyectoById: (state) => (id) => state.proyectos.find(p => p.id === id),
    },

    actions: {
        // --- Lógica del Listener ---
        iniciarListenerProyectos() {
            if (this.unsub) {
                // El listener ya está activo, no hacemos nada
                return;
            }

            this.loading = true;
            const proyectosQuery = query(collection(db, PROYECTOS_COLLECTION));
            
            // Guardamos la función de unsubscribe en this.unsub
            this.unsub = onSnapshot(proyectosQuery, (snapshot) => {
                const proyectosArray = [];
                snapshot.forEach((doc) => {
                    proyectosArray.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                this.proyectos = proyectosArray;
                this.loading = false;
            }, (error) => {
                console.error("Firestore Listener Error:", error);
                // Si hay error (como el de permisos), lo detenemos para evitar bucles
                this.detenerListenerProyectos(); 
            });
        },

        //Detiene el listener de Firestore 
        detenerListenerProyectos() {
            if (this.unsub) {
                this.unsub(); // Ejecuta la función para detener la escucha
                this.unsub = null; // Limpiamos la referencia
                console.log("Firestore Listener detenido correctamente.");
            }
        },

        // --- Lógica CRUD ---
        async agregarProyecto(nuevoProyecto) {
            try {
                const proyectosCollection = collection(db, PROYECTOS_COLLECTION);
                
                const proyectoConMetadatos = { 
                    ...nuevoProyecto, 
                    createdAt: new Date().toISOString(), 
                };

                const docRef = await addDoc(proyectosCollection, proyectoConMetadatos);

                return { success: true, id: docRef.id }; 

            } catch (err) {
                console.error("Error al agregar proyecto:", err);
                return { success: false, error: err };
            }
        },
        
        async actualizarProyecto(id, data) {
             try {
                const proyectoRef = doc(db, PROYECTOS_COLLECTION, id);
                await updateDoc(proyectoRef, data);
                return { success: true };
            } catch (error) {
                console.error("Error al actualizar proyecto:", error);
                return { success: false, error: error };
            }
        },

        async eliminarProyecto(id) {
            try {
                const proyectoRef = doc(db, PROYECTOS_COLLECTION, id);
                await deleteDoc(proyectoRef);
                return { success: true };
            } catch (error) {
                console.error("Error al eliminar proyecto:", error);
                return { success: false, error: error };
            }
        }
    }
});
