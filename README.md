🚀 CV Interactivo Fullstack
Este es mi portafolio profesional desarrollado como una aplicación web fullstack. La plataforma permite gestionar y visualizar mi trayectoria académica, experiencia laboral y publicaciones de blog de forma dinámica.🔗 Link del Proyecto en Vivo: https://desarrollo-web-cv-interactivo.vercel.app/🛠️ Tecnologías UtilizadasFrontendReact.js: Biblioteca principal para la interfaz de usuario.Tailwind CSS: Framework para el diseño responsive y moderno.Axios: Gestión eficiente de peticiones HTTP.BackendNode.js & Express: API REST escalable con arquitectura Serverless.MongoDB Atlas: Base de datos NoSQL en la nube.Mongoose: Modelado de datos y comunicación con MongoDB.JWT (JSON Web Tokens): Sistema de autenticación para el área administrativa.DespliegueVercel: Alojamiento integral del Frontend y el Backend a través de funciones de Node.js.🏗️ Estructura del ProyectoEl proyecto utiliza una estructura optimizada para Vercel, manteniendo el código organizado y modular:Plaintext├── api/                # Backend (Node.js API)
│   ├── config/         # Conexión a MongoDB Atlas
│   ├── controllers/    # Lógica de negocio
│   ├── models/         # Esquemas de datos (Mongoose)
│   ├── routes/         # Definición de rutas (Endpoints)
│   └── index.cjs       # Punto de entrada principal (Serverless)
├── src/                # Frontend (React components & logic)
├── public/             # Assets y archivos estáticos
├── vercel.json         # Configuración de despliegue y rewrites
└── package.json        # Dependencias generales
⚙️ Instalación LocalSi deseas clonar y ejecutar este proyecto localmente:Clonar el repositorio:Bashgit clone https://github.com/tu-usuario/nombre-repo.git
cd nombre-repo
Instalar dependencias:Bashnpm install
Variables de Entorno (.env):Fragmento de códigoMONGODB_URI=tu_cadena_de_conexion
JWT_SECRET=tu_clave_secreta
Lanzar la aplicación:Bashnpm run dev
🌐 Endpoints de la APIMétodoRutaDescripciónGET/api/estudiosObtiene la lista de formación académica.GET/api/experienciaObtiene la trayectoria laboral.POST/api/auth/loginAcceso para administración de contenid
