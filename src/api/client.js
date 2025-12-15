// src/api/client.js
import axios from 'axios';

// Configura la instancia de Axios
export const api = axios.create({
    // La URL base es la dirección de tu JSON Server
    baseURL: 'http://localhost:3000', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Ahora puedes usar esta instancia en cualquier componente o hook:
// api.get('/experiencia')
// api.post('/posts', newPost)