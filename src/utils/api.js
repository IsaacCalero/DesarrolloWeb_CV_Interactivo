// src/utils/api.js
// Importar axios para realizar solicitudes HTTP hacia el backend
import axios from 'axios';

// Definir la URL base de la API del servidor backend
// Puerto 5000: donde corre el servidor Node.js/Express
// /api: prefijo de todas las rutas de la API
const API_BASE_URL = 'http://localhost:5000/api';

// Crear una instancia personalizada de Axios con configuración específica
// Esta instancia se usa en toda la aplicación para comunicarse con la API
const axiosInstance = axios.create({
    // baseURL: dirección base que se prepondrá a todas las solicitudes
    // Ej: axiosInstance.post('/posts') → http://localhost:5000/api/posts
    baseURL: API_BASE_URL,
    
    // headers: configuración de encabezados HTTP por defecto
    headers: {
        // Content-Type: especifica que enviamos y recibimos datos en formato JSON
        'Content-Type': 'application/json',
    },
});

// --- INTERCEPTOR DE SEGURIDAD (Requisito 4: Autenticación y 6: Protección de datos) ---
// Un interceptor es una función que se ejecuta automáticamente antes de cada solicitud
// En este caso, añade el token JWT de autenticación a las cabeceras

axiosInstance.interceptors.request.use(
    // Función de éxito: se ejecuta antes de cada solicitud HTTP
    (config) => {
        // Obtener el token JWT del localStorage
        // El token se guarda allí después del login exitoso
        const token = localStorage.getItem('token');
        
        // Si existe un token, añadirlo a los encabezados de la solicitud
        // Formato estándar JWT: "Authorization: Bearer <token>"
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Retornar la configuración actualizada para continuar con la solicitud
        return config;
    },
    // Función de error: se ejecuta si hay un error en la configuración
    (error) => {
        // Rechazar la promesa para propagar el error
        return Promise.reject(error);
    }
);

// Exportar la instancia de Axios configurada
// Se importa en otros archivos para hacer solicitudes autenticadas a la API
export default axiosInstance;