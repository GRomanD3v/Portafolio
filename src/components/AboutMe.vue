<template>
  <v-container class="py-2 about-me-section">
    <!-- Encabezado con foto -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12" class="text-center">
        <!-- Foto de perfil -->
        <v-avatar size="140" class="mb-4">
          <v-img
            src="https://groman.cl/wp-content/uploads/2025/05/g2.png"
            alt="Gonzalo Román Reyes"
            cover
            class="profile-image"
          ></v-img>
        </v-avatar>
        
        <h1 class="text-white text-h5 font-weight-regular mb-2">
          Gonzalo Román Reyes
        </h1>
        <p class="text-h6 text-grey-lighten-2 font-weight-light">
          Diseñador Gráfico Multimedia
        </p>
      </v-col>
    </v-row>

    <!-- Contenido principal -->
    <v-row justify="center">
      <v-col cols="12" lg="10">
        <v-card class="content-card glass-effect pa-6" elevation="0" rounded="xl">
          <!-- Sección de presentación -->
          <v-row align="start">
            <v-col cols="12" md="8">
              <h2 class="text-h4 text-white font-weight-regular mb-4">Buen día!</h2>
              
              <div class="text-body-1 text-grey-lighten-5 font-weight-regular  space-y-4">
                <p>
                  Mi nombre es <strong class="text-white">Gonzalo</strong> y soy <strong class="text-white">Diseñador Gráfico Multimedia</strong> titulado en el Instituto Profesional de las artes ARCOS.
                </p>

                <p>
                  Diseñador Web y Gráfico con enfoque UX/UI, especializado en el desarrollo de sitios autoadministrables en WordPress. Cuento con experiencia en la creación de identidades visuales y piezas gráficas para campañas de marketing digital.
                </p>

                <p>
                  Mi formación en diseño UX/UI (Coderhouse) me permite combinar estética, funcionalidad y experiencia de usuario en cada proyecto. He trabajado con marcas de distintos rubros, ofreciendo soluciones integrales que abarcan desde la imagen corporativa hasta el diseño web responsive y accesible.
                </p>

                <p>
                  He logrado aportar con mucha dedicación y profesionalismo mis conocimientos a una diversa cartera de clientes.
                </p>

                <p>
                  "Diseñador Gráfico Multimedia en constante evolución. Actualmente complemento mi experiencia con el curso de Front End Trainee en Talento Digital, donde este portafolio sintetiza la fusión entre diseño y desarrollo frontend adquirida durante la formación."
                </p>

              </div>
            </v-col>

            <!-- Sidebar con información adicional -->
            <v-col cols="12" md="4">
              <!-- Especialidades -->
              <v-card class="glass-effect pa-4 rounded-lg mb-4" elevation="0">
                <h3 class="text-h6 text-white font-weight-regular mb-3">Especialidades</h3>
                <v-list density="compact" class="bg-transparent">
                  <v-list-item 
                    v-for="skill in skills" 
                    :key="skill" 
                    class="px-0"
                  >
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check-circle" color="green-lighten-2" size="small"></v-icon>
                    </template>
                    <v-list-item-title class="text-body-2 text-grey-lighten-4">
                      {{ skill }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <!-- Enlaces de contacto -->
              <v-card class="glass-effect pa-4 rounded-lg" elevation="0">
                <h3 class="text-h6 text-white font-weight-regular mb-3">Contacto</h3>
                <div class="d-flex flex-column gap-2">
                  <v-btn 
                    color="white"
                    variant="outlined"
                    prepend-icon="mdi-linkedin"
                    href="https://www.linkedin.com/in/gonzalo-r-r/"
                    target="_blank"
                    size="small"
                    class="glass-button"
                  >
                    LinkedIn
                  </v-btn>
                  <v-btn 
                    color="white"
                    variant="outlined"
                    prepend-icon="mdi-github"
                    href="https://github.com/GRomanD3v"
                    target="_blank"
                    size="small"
                    class="glass-button"
                  >
                    GitHub
                  </v-btn>
                  <v-btn 
                    color="white"
                    variant="outlined"
                    prepend-icon="mdi-email"
                    href="mailto:hola@groman.cl"
                    size="small"
                    class="glass-button"
                  >
                    Email
                  </v-btn>
                  <v-btn 
                    color="white"
                    variant="outlined"
                    prepend-icon="mdi-file-account"
                    href="https://groman.cl/wp-content/uploads/2025/11/gr_cv25.pdf"
                    target="_blank"
                    size="small"
                    class="glass-button"
                  >
                    Descargar CV
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const skills = ref([
  'Diseño UX/UI',
  'WordPress',
  'Identidad Visual',
  'Diseño Web Responsive',
  'Marketing Digital',
  'Diseño Gráfico',
  'Desarrollo Frontend',
  'Figma/Adobe Creative Suite'
]);
</script>

<style scoped>
.about-me-section {
  /* Fondo sutil o puedes quitarlo completamente */
  background: transparent;
}

/* Efecto glass moderno */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Botones con efecto glass */
.glass-button {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  transition: all 0.3s ease;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Foto de perfil con efecto sutil */
.profile-image {
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Mejoras de espaciado y tipografía */
.space-y-4 > * + * {
  margin-top: 1rem;
}

.text-body-1 {
  line-height: 1.7;
  font-weight: 300;
}

/* Opacidades para texto sutil */
.opacity-50 {
  opacity: 0.5;
}

.opacity-70 {
  opacity: 0.7;
}

.opacity-90 {
  opacity: 0.9;
}

/* Efectos hover sutiles */
.quote-card, .content-card {
  transition: all 0.3s ease;
}

.quote-card:hover, .content-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}
</style>