<template>
  <v-container class="pt-2 pb-16 about-me-section">
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
        
        <h1 class="text-white text-h5 font-weight-medium mb-2"> <!-- Cambiado a medium -->
          Gonzalo Román Reyes
        </h1>
        <p class="text-h6 text-grey-lighten-2 font-weight-regular"> <!-- Cambiado a regular -->
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
              <h2 class="text-h4 text-white font-weight-medium mb-4">Buen día!</h2> <!-- Cambiado a medium -->
              
              <div class="text-body-1 text-grey-lighten-5 improved-readability space-y-4">
                <p>
                  Soy Gonzalo Román, Diseñador Gráfico Multimedia titulado en el Instituto Profesional de las artes ARCOS.
                </p>

                <p>
                  Mi trayectoria se ha centrado en el diseño web y gráfico con especialización en UX/UI, desarrollando principalmente sitios autoadministrables en WordPress. A lo largo de mi experiencia profesional, he trabajado en la creación de identidades visuales y piezas gráficas para diversas campañas de marketing digital.
                </p>

                <p>
                  La formación en diseño UX/UI obtenida en Coderhouse me ha permitido integrar principios de estética, funcionalidad y experiencia de usuario en cada proyecto. He colaborado con marcas de múltiples rubros, implementando soluciones integrales que abarcan desde el desarrollo de imagen corporativa hasta el diseño web responsive y accesible.
                </p>

                <p>
                  Actualmente, estoy ampliando mis competencias técnicas mediante el programa Front End Trainee de Talento Digital. Esta formación representa un paso significativo en mi desarrollo profesional dentro del área TI, permitiéndome complementar mi background en diseño con habilidades sólidas en desarrollo frontend. Este portafolio evidencia la integración de ambos campos, aplicando los conocimientos técnicos adquiridos durante el programa.
                </p>
              </div>
            </v-col>

            <!-- Sidebar con información adicional -->
            <v-col cols="12" md="4">
              <!-- Especialidades -->
              <v-card class="glass-effect pa-4 rounded-lg mb-4" elevation="0">
                <h3 class="text-h6 text-white font-weight-medium mb-3">Especialidades</h3> <!-- Cambiado a medium -->
                <v-list density="compact" class="bg-transparent">
                  <v-list-item 
                    v-for="skill in skills" 
                    :key="skill" 
                    class="px-0"
                  >
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check-circle" color="green-lighten-2" size="small"></v-icon>
                    </template>
                    <v-list-item-title class="text-body-2 text-grey-lighten-4 improved-readability-item">
                      {{ skill }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <!-- Enlaces de contacto -->
              <v-card class="glass-effect pa-4 rounded-lg" elevation="0">
                <h3 class="text-h6 text-white font-weight-medium mb-3">Contacto</h3> <!-- Cambiado a medium -->
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

/* MEJORAS DE LEGIBILIDAD */
.improved-readability {
  line-height: 1.8 !important; /* Más espacio entre líneas */
  font-weight: 400 !important; /* Peso regular para mejor lectura */
  letter-spacing: 0.01em; /* Espaciado de letras sutil */
}

.improved-readability-item {
  font-weight: 400 !important; /* Peso regular para items de lista */
  letter-spacing: 0.01em;
}

/* Mejoras de espaciado */
.space-y-4 > * + * {
  margin-top: 1.5rem; /* Más espacio entre párrafos */
}

/* Títulos con mejor jerarquía */
.text-h4 {
  font-weight: 500 !important; /* Medium para títulos principales */
}

.text-h5, .text-h6 {
  font-weight: 500 !important; /* Medium para subtítulos */
}

/* Efectos hover sutiles */
.content-card {
  transition: all 0.3s ease;
}

.content-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Mejora el contraste para mejor accesibilidad */
.text-grey-lighten-5 {
  color: rgba(255, 255, 255, 0.95) !important;
}

.text-grey-lighten-4 {
  color: rgba(255, 255, 255, 0.9) !important;
}
</style>