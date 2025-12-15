// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

const NavBar = ({ isEditingMode, setIsEditingMode }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-20 transition-colors duration-200">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                
                {/* Título y Navegación */}
                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mi Portafolio</h1>
                    <nav className="flex gap-4">
                        <Link 
                            to="/" 
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
                        >
                            Hoja de Vida
                        </Link>
                        <Link 
                            to="/blog" // <--- ¡CORRECCIÓN CRUCIAL: Apuntando a /blog!
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
                        >
                            Blog
                        </Link>
                    </nav>
                </div>

                {/* Controles (Edición y Tema) */}
                <div className="flex gap-3">
                    {/* Botón de modo edición (Se mantiene para la ruta /) */}
                    <button
                        onClick={() => setIsEditingMode(!isEditingMode)}
                        className={`px-4 py-2 font-bold rounded-lg transition-colors shadow-md duration-200 ${
                            isEditingMode
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                    >
                        {isEditingMode ? '🔒 Bloquear Edición' : '✏️ Activar Edición'}
                    </button>

                    {/* Botón de modo oscuro (Usando el Contexto) */}
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    );
};

export default NavBar;