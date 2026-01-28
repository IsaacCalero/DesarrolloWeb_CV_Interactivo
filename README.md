# CV Interactivo y Blog Personal

Aplicación web desarrollada con **React** y **Vite** que funciona como un **Curriculum Vitae interactivo** y un **blog personal**. El proyecto permite presentar información profesional de forma dinámica y mostrar artículos técnicos renderizados en **Markdown**, utilizando un backend simulado con **JSON Server**.

---

## Descripción del Proyecto

Este proyecto tiene como objetivo aplicar conceptos fundamentales del desarrollo web moderno, como el uso de componentes en React, manejo de rutas, consumo de APIs REST y renderizado de contenido dinámico.  

La aplicación está dividida en dos partes principales:
- **CV Interactivo:** muestra experiencia, educación y habilidades de manera clara y responsiva.
- **Blog Personal:** permite la lectura de artículos relacionados con desarrollo web y tecnología.

---

## ✨ Funcionalidades

- CV interactivo con diseño responsive
- Modo oscuro / claro utilizando React Context
- Blog integrado con artículos dinámicos
- Consumo de una API REST simulada
- Renderizado de contenido en formato Markdown

---

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología |
|---------|-----------|
| Frontend | React, Vite |
| Estilos | Tailwind CSS |
| Routing | React Router DOM |
| Cliente HTTP | Axios |
| Backend Simulado | JSON Server |
| Markdown | react-markdown, remark-gfm |

---

## ⚙️ Instalación y Ejecución

Sigue los pasos a continuación para ejecutar el proyecto en tu entorno local.

### 1️⃣ Clonar el repositorio

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio


2️⃣ Instalar dependencias
npm install

3️⃣ Configurar y ejecutar JSON Server

Este proyecto utiliza JSON Server para simular un backend REST.

Asegúrate de que el archivo db.json contenga las colecciones necesarias, como:

posts (para el blog)

información del CV (experiencia, educación, habilidades, etc.)

Ejecuta el servidor en el puerto 3000:

npx json-server --watch db.json --port 3000

4️⃣ Ejecutar la aplicación

En una segunda terminal, inicia el servidor de desarrollo de Vite:

npm run dev

🌐 Acceso a la Aplicación

Con ambos servidores en ejecución, abre tu navegador y accede a la URL proporcionada por Vite (generalmente):

http://localhost:5173/


Desde allí podrás navegar por el CV interactivo y el blog personal.