# Aplicación de Lista de Tareas - Versión Monolítica

Esta es una aplicación de lista de tareas simple implementada como una
aplicación monolítica. La aplicación utiliza un stack tecnológico que incluye
HTML, CSS, JavaScript (Node.js), y SQLite para el almacenamiento de datos.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- monolithic-app
  - public
    - index.html
    - style.css
    - script.js
  - server.js
  - package.json

* **`public`**: Contiene archivos estáticos (HTML, CSS, JS) para el frontend.
* **`server.js`**: Archivo principal del servidor monolítico.
* **`package.json`**: Archivo de configuración de Node.js que incluye
  dependencias y scripts.

## Configuración e Instalación

1. **Instalación de Dependencias:**

   ```bash
   npm install
   ```

2. **Ejecución de la Aplicación:**

   ```bash
   npm start
   ```

   la aplicación se ejecutará en [http://localhost:3000](http://localhost:3000).

# Funcionalidades

- Visualización de Tareas:

  - Se pueden ver todas las tareas existentes.

- Agregado de Nuevas Tareas:

  - Se pueden agregar nuevas tareas mediante el formulario.

- Eliminación de Tareas:

  - Cada tarea tiene un botón "Eliminar" para eliminarla de la lista.

# Tecnologías Utilizadas

- HTML, CSS, JavaScript (Node.js):

  - Utilizados para la interfaz de usuario y la lógica frontend.

- SQLite:

  - Base de datos integrada para almacenar y gestionar las tareas.

- Express:

  -Framework de Node.js para la creación del servidor web.

# Contribuciones

Siéntete libre de realizar contribuciones o mejoras a este proyecto. Puedes
bifurcar el repositorio, realizar tus cambios y enviar una solicitud de
extracción.
