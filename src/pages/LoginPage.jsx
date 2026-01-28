// Importar hook useState para gestionar el estado local del formulario
import { useState } from 'react';
// Importar la instancia configurada de Axios con interceptores y baseURL
import { api } from '../api/client';
// Importar hook useNavigate de react-router-dom para redirigir después del login
import { useNavigate } from 'react-router-dom';

// Componente LoginPage: página de autenticación para administradores
// Solo usuarios autenticados pueden editar el CV, experiencia y estudios
const LoginPage = () => {
    // Estado para almacenar las credenciales del usuario (username y password)
    // Se actualiza en tiempo real mientras el usuario escribe
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    
    // Estado para almacenar mensajes de error
    // Se muestra si las credenciales son inválidas
    const [error, setError] = useState('');
    
    // Hook para redirigir a otras rutas después del login exitoso
    const navigate = useNavigate();

    // Función manejadora para el envío del formulario de login
    const handleSubmit = async (e) => {
        // Prevenir la recarga de página al enviar el formulario
        e.preventDefault();
        
        try {
            // Realizar solicitud POST a la API de autenticación
            // Se envían username y password en el cuerpo de la solicitud
            // El interceptor de Axios añade automáticamente headers necesarios
            const response = await api.post('/auth/login', credentials);
            
            // Si el login es exitoso, guardar el token JWT en localStorage
            // Este token se usa en solicitudes posteriores para autenticación
            localStorage.setItem('token', response.data.token);
            
            // Guardar el nombre de usuario en localStorage
            // Se usa en la NavBar para mostrar un saludo personalizado
            localStorage.setItem('user', response.data.username);
            
            // Redirigir a la página principal (hoja de vida)
            navigate('/');
            
            // Recargar la página para actualizar todos los estados globales
            // Esto activa el interceptor de Axios que ahora puede acceder al token
            window.location.reload();
        } catch (err) {
            // Si hay error de autenticación (usuario no existe o contraseña incorrecta)
            // mostrar un mensaje de error amigable al usuario
            setError('Credenciales inválidas. Intenta de nuevo.');
        }
    };

    return (
        // Contenedor principal: centrado vertical y horizontalmente
        <div className="flex items-center justify-center min-h-[70vh] px-4">
            
            {/* Tarjeta de login con estilos responsivos y soporte para modo oscuro */}
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700">
                
                {/* Título de la página */}
                <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-600 dark:text-blue-400">
                    Admin Access
                </h2>
                
                {/* Mostrar mensaje de error si las credenciales son inválidas */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Formulario de login */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Campo de entrada para el nombre de usuario */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Usuario</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                            required
                        />
                    </div>
                    
                    {/* Campo de entrada para la contraseña */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Contraseña</label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            required
                        />
                    </div>
                    
                    {/* Botón para enviar el formulario y autenticarse */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-300 shadow-lg"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

// Exportar el componente para usarlo en el routing principal
export default LoginPage;