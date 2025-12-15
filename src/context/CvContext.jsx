// src/context/CvContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el Contexto
const CvContext = createContext();

// 2. Hook personalizado para usar el contexto fácilmente
export const useCvContext = () => {
    const context = useContext(CvContext);
    if (!context) {
        throw new Error('useCvContext debe usarse dentro de un CvProvider');
    }
    return context;
};

// 3. Obtener el modo inicial del sistema o localStorage
const getInitialTheme = () => {
    // Verificar localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme === 'dark';
    }
    // Verificar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};


// 4. Componente Proveedor (CvProvider)
export const CvProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(getInitialTheme);

    // Lógica para aplicar la clase 'dark' al <html> y guardar en localStorage
    useEffect(() => {
        const root = window.document.documentElement;
        
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Función para cambiar el tema
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    // Objeto de valores que se pasan a los consumidores
    const value = {
        darkMode,
        toggleDarkMode,
        // Aquí podrías agregar otras funciones o estados relacionados con el CV,
        // pero por ahora solo manejamos el tema.
    };

    return (
        <CvContext.Provider value={value}>
            {children}
        </CvContext.Provider>
    );
};