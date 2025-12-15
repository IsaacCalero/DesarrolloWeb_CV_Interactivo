// src/utils/api.js

import axios from 'axios';

// La URL base de tu JSON Server. Asumimos que corre en el puerto 3000 por defecto.
const API_BASE_URL = 'http://localhost:3000'; 

// Crear una instancia de Axios con la configuración base
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;