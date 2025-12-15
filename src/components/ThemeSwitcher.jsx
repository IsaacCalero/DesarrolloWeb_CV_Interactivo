// src/components/ThemeSwitcher.jsx

import React from 'react';
import { Sun, Moon } from 'lucide-react';

// 🚨 CORRECCIÓN CRÍTICA: Importar el hook correcto (useCvContext)
import { useCvContext } from '../context/CvContext'; 

const ThemeSwitcher = () => {
    // 🚨 CORRECCIÓN CRÍTICA: Usar el hook correcto (useCvContext)
    const { darkMode, toggleDarkMode } = useCvContext(); 

    const iconClasses = "h-5 w-5 transition-colors duration-200";

    return (
        <button
            onClick={toggleDarkMode}
            // Clases de estilo para el botón, dependientes del modo oscuro
            className={`p-2 rounded-full shadow-md transition-colors duration-200 ${
                darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-800'
            }`}
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
            {darkMode ? (
                // Icono para Modo Oscuro (se ve el sol)
                <Sun size={20} className={iconClasses} />
            ) : (
                // Icono para Modo Claro (se ve la luna)
                <Moon size={20} className={iconClasses} />
            )}
        </button>
    );
};

export default ThemeSwitcher;