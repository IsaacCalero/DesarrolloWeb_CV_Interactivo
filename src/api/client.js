// Importar axios para realizar solicitudes HTTP hacia el backend
import axios from 'axios';

// Crear una instancia personalizada de Axios
export const api = axios.create({
    // baseURL: Usamos '/api' como ruta relativa. 
    // En Vercel, esto apuntará automáticamente a tu dominio (ej: tu-web.vercel.app/api)
    // En local, Vite redirigirá esto al puerto 5000 si tienes configurado el proxy.
    baseURL: '/api',
    
    headers: {
        'Content-Type': 'application/json',
    },
});

// INTERCEPTOR DE SOLICITUDES
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;