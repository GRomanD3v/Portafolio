<script setup>

</script>

<template>
  <v-footer app class="animated-footer text-center d-flex flex-column py-1">
    <v-container>
      <p class="text-white mb-0 text-body-2">
        Desarrollado por <strong>Gonzalo Román</strong> — Examen Final Módulo 8 —
        <strong>FrontEnd Trainee 2025</strong>
      </p>
    </v-container>
  </v-footer>
</template>

<style scoped>
.animated-footer {
  background: linear-gradient(-45deg, #3c006b, #03a590, #2196f3, #4caf50);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

p {
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style>