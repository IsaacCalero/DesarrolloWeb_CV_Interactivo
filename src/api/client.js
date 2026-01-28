// Importar axios para realizar solicitudes HTTP hacia el backend
import axios from 'axios';

// Crear una instancia personalizada de Axios con configuración específica
// Esta instancia se usará en toda la aplicación para comunicarse con la API
export const api = axios.create({
    // baseURL: dirección base del servidor backend
    // Puerto 5000 es donde corre el servidor Node.js/Express
    baseURL: 'http://localhost:5000/api',
    
    // headers: configuración de encabezados HTTP por defecto
    // Content-Type: application/json indica que enviamos y recibimos datos en formato JSON
    headers: {
        'Content-Type': 'application/json',
    },
});

// INTERCEPTOR DE SOLICITUDES: Se ejecuta antes de cada petición HTTP
// Este middleware automáticamente añade el token JWT a todas las solicitudes autenticadas
api.interceptors.request.use(
    // Función de éxito: se ejecuta si la configuración es válida
    (config) => {
        // Buscar el token JWT almacenado en el localStorage del navegador
        // El token se guarda allí tras un login exitoso
        const token = localStorage.getItem('token');
        
        // Si existe un token en el localStorage, añadirlo a los encabezados de la solicitud
        // Formato: "Authorization: Bearer <token>"
        // El servidor verificará este token en el middleware de autenticación
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Retornar la configuración actualizada para continuar con la solicitud
        return config;
    },
    // Función de error: se ejecuta si hay un error en la solicitud
    (error) => {
        // Rechazar la promesa para propagar el error
        return Promise.reject(error);
    }
);

// Exportar la instancia de Axios configurada para usarla en otros archivos
export default api;