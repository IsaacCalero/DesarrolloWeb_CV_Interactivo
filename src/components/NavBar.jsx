// Importar React y componentes de react-router-dom para navegación
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importar componente para cambiar entre modo oscuro y claro
import ThemeSwitcher from './ThemeSwitcher';

// Componente NavBar: barra de navegación principal con autenticación y controles
// Props:
//   - isEditingMode: boolean que indica si está en modo edición
//   - setIsEditingMode: función para cambiar el modo edición
const NavBar = ({ isEditingMode, setIsEditingMode }) => {
    // Hook para navegar entre rutas sin usar <Link>
    const navigate = useNavigate();
    
    // Obtener el token JWT del localStorage
    // Este token es el que identifica al usuario autenticado
    const token = localStorage.getItem('token');
    
    // Obtener el nombre de usuario del localStorage
    // Se guarda durante el login para mostrar un saludo personalizado
    const username = localStorage.getItem('user');

    // Función para cerrar sesión (logout)
    const handleLogout = () => {
        // Eliminar el token del localStorage para desautenticar al usuario
        localStorage.removeItem('token');
        // Eliminar el nombre de usuario del localStorage
        localStorage.removeItem('user');
        // Desactivar el modo edición al cerrar sesión
        setIsEditingMode(false);
        // Navegar a la página principal
        navigate('/');
        // Recargar la página para limpiar todos los estados globales
        window.location.reload();
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-20 transition-colors duration-200">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                
                {/* SECCIÓN IZQUIERDA: Título y Navegación de Rutas */}
                <div className="flex items-center gap-6">
                    {/* Título principal del sitio */}
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mi Portafolio</h1>
                    
                    {/* Menú de navegación principal */}
                    <nav className="flex gap-4">
                        {/* Link a la página principal (Hoja de Vida) */}
                        <Link 
                            to="/" 
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
                        >
                            Hoja de Vida
                        </Link>
                        {/* Link a la página del Blog */}
                        <Link 
                            to="/blog" 
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
                        >
                            Blog
                        </Link>
                    </nav>
                </div>

                {/* SECCIÓN DERECHA: Controles de Edición, Autenticación y Tema */}
                <div className="flex items-center gap-3">
                    
                    {/* BOTÓN DE MODO EDICIÓN: Solo visible si el usuario está autenticado (tiene token) */}
                    {token && (
                        <button
                            onClick={() => setIsEditingMode(!isEditingMode)}
                            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors shadow-md duration-200 ${
                                // Estilos dinámicos según el modo de edición
                                isEditingMode
                                    ? 'bg-red-500 hover:bg-red-600 text-white'      // Rojo cuando está en modo edición
                                    : 'bg-green-500 hover:bg-green-600 text-white'  // Verde cuando está bloqueado
                            }`}
                        >
                            {isEditingMode ? '🔒 Bloquear' : '✏️ Editar'}
                        </button>
                    )}

                    {/* BOTÓN DE LOGIN / LOGOUT */}
                    {token ? (
                        // Si hay token, mostrar nombre de usuario y botón para logout
                        <div className="flex items-center gap-2">
                            {/* Mostrar nombre de usuario (oculto en móviles) */}
                            <span className="text-xs hidden md:block text-gray-500 italic">Hola, {username}</span>
                            {/* Botón para cerrar sesión */}
                            <button 
                                onClick={handleLogout}
                                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                            >
                                Salir
                            </button>
                        </div>
                    ) : (
                        // Si no hay token, mostrar link a la página de login
                        <Link 
                            to="/login" 
                            className="text-xs text-gray-400 hover:text-blue-500 transition-colors"
                        >
                            Admin
                        </Link>
                    )}

                    {/* Separador visual: línea delgada entre controles */}
                    <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-600 mx-1"></div>

                    {/* COMPONENTE DE CAMBIO DE TEMA: Alterna entre modo oscuro y claro */}
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    );
};

// Exportar el componente para usarlo en otras partes de la aplicación
export default NavBar;