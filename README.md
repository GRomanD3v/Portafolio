# Portafolio Dinámico Personal
### Integrante: Gonzalo Román Reyes
### Repositorio:

### Credenciales Administrador 
- Para entrar como administrador necesitas agregar /login o /admin y te llevará al formulario de inicio de sesión dónde puedes crear tu cuenta de usuario. 
* importante: Solo el correo registrado como administrador puede: Crear, Leer, Actualizar y Borrar los proyectos.
```
Correo: hola@groman.cl
Contraseña: 1234xmi
```
### Firebase Hosting: 
```
https://portafoliom7.web.app/

```

---
### Descripción del Proyecto

Este proyecto es un sistema de portafolio web moderno y dinámico diseñado para mostrar proyectos de desarrollo de manera profesional y gestionable. Está construido como una Single Page Application (SPA) utilizando el framework Vue 3 y se distingue por su arquitectura robusta de estado centralizado (Pinia) y una interfaz de usuario visualmente atractiva (Vuetify).

El objetivo principal es doble: ofrecer una vista pública de los proyectos para posibles empleadores/clientes y proporcionar un panel de administración privado y seguro para la gestión de contenido en tiempo real.

### Stack Tecnológico Principal

Este portafolio se basa en una pila de tecnologías modernas centradas en JavaScript, enfocándose en la experiencia de desarrollo (DX) y la performance.

### Frontend Framework
- Vue 3 (Composition API) : Utilizado para construir la interfaz de usuario de manera reactiva y modular. Proporciona una base sólida y performante para la SPA.

 ### Gestión de Estado Pinia: 
- El gestor de estado oficial de Vue. Permite centralizar la lógica de autenticación y la gestión de proyectos, haciendo la aplicación más predecible y fácil de mantener.

### Componentes UI:
- Vuetify 3. Un framework de componentes de interfaz de usuario basado en Material Design. Asegura un diseño responsive, profesional y consistente en todas las vistas (incluyendo Login y Registro).

### Backend / BaaS Firebase:
- Utilizado como Backend-as-a-Service (BaaS) para autenticación, base de datos y despliegue.

### Base de Datos Cloud Firestore
- Una base de datos NoSQL en tiempo real. Es el corazón de la administración, permitiendo a los usuarios autenticados gestionar proyectos y publicar/despublicar tarjetas que se reflejan instantáneamente en la vista pública.

### Autenticación / Firebase Authentication
- Proporciona un sistema seguro y fácil de implementar para el registro e inicio de sesión de los administradores.

### Despliegue / Firebase Hosting
- Plataforma de alojamiento (hosting) de alto rendimiento, ideal para servir la SPA de forma rápida y segura a través de una CDN global.

---

### Arquitectura y Funcionalidades Clave

### 1. Sistema de Autenticación y Rutas Protegidas

- Rutas Públicas: La vista principal del portafolio (/) es completamente pública y no requiere inicio de sesión. Muestra solo los proyectos cuyo campo estado es true.

- Rutas de Acceso: Las rutas de Login y Registro usan componentes de Vuetify y están protegidas con guardias de navegación (router.beforeEach). Si el usuario ya está autenticado, es redirigido automáticamente a la vista principal para evitar el acceso repetido a estas páginas.

- Rutas de Administración: Las rutas como /admin o /admin/editar/:id están protegidas con el mismo sistema de guardias, asegurando que solo los usuarios autenticados tengan acceso a las herramientas de gestión.

---
### 2. Gestión de Proyectos en Tiempo Real (Firestore)

- Colección Pública: Los datos de los proyectos se almacenan en una colección de Firestore diseñada para acceso público (solo lectura para no administradores), garantizando que el portafolio se cargue correctamente incluso si el usuario no ha iniciado sesión.

- Listener en Vivo: La aplicación utiliza onSnapshot de Firestore para escuchar cambios en la base de datos en tiempo real. Esto significa que si un administrador publica o despublica un proyecto, la vista pública se actualiza automáticamente sin necesidad de recargar la página.

- Modelado de Datos: Cada proyecto incluye campos esenciales como título, descripción, url y un campo booleano crucial: estado.

---
### 3. Diseño y UX (Vuetify)

- Diseño Material: El uso de Vuetify garantiza que toda la aplicación (desde los campos de texto hasta los botones de acción) siga las directrices de Material Design, ofreciendo una experiencia de usuario limpia y profesional.

- Layout Responsivo: El layout principal utiliza los componentes de diseño de Vuetify para asegurar que la aplicación se adapte y funcione perfectamente en dispositivos móviles, tablets y escritorios.

- Estandarización: Los componentes clave como Login y Register comparten la misma estructura de layout centrada con un fondo unificado, mejorando la consistencia visual.

---


### Despliegue y Mantenimiento

- El proyecto está diseñado para un proceso de despliegue simple y continuo:

- Construcción: Se utiliza npm run build para generar la versión optimizada del sitio en la carpeta dist/.

- Hosting con Firebase: Se utiliza Firebase Hosting, configurado para servir el contenido de la carpeta dist/. Esto proporciona:

- Velocidad: Uso de Content Delivery Networks (CDN) globales.

- Seguridad: Certificados SSL automáticos.

- Mantenimiento Cero: La infraestructura del servidor es gestionada por Firebase, permitiendo al desarrollador centrarse únicamente en el código de la aplicación.

