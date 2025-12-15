// src/pages/HomePage.jsx
import React from 'react';

// Componentes de CV
import Header from '../components/Header';
import DatosPersonales from '../components/DatosPersonales';
import Experiencia from '../components/Experiencia';
import Estudios from '../components/Estudios';

// Contextos y Hooks
// 🚨 CORRECCIÓN: Usar el hook y la ruta correcta que definimos en CvContext.jsx
import { useCvContext } from '../context/CvContext'; 
import useCvData from '../hooks/useCvData'; // 🆕 Importamos nuestro hook

/**
 * Componente principal para la ruta '/' (Hoja de Vida).
 * Carga los datos de Experiencia y Estudios directamente desde la API.
 */
function HomePage({ data, isEditingMode, ...staticHandlers }) {
    // 🚨 CORRECCIÓN: Usar el hook useCvContext()
    const { darkMode } = useCvContext(); 

    // 🆕 Usamos los hooks para la carga y CRUD de cada sección
    const { data: experienciaData, loading: expLoading, error: expError, handlers: expHandlers } = useCvData('experiencia');
    const { data: estudiosData, loading: estLoading, error: estError, handlers: estHandlers } = useCvData('estudios');
    
    // Mostramos un mensaje de carga o error si alguna sección falla
    if (expLoading || estLoading) {
        return <div className="text-center py-12 text-blue-500 dark:text-blue-300">Cargando Hoja de Vida...</div>;
    }

    if (expError || estError) {
        const errorMessage = expError || estError;
        return <div className="text-center py-12 text-red-600 dark:text-red-400 font-bold">{errorMessage}</div>;
    }

    return (
        <div className="space-y-6">
            
            {/* Fila 1: Header y Datos Personales (Usan data y handlers de App.jsx, ya que son datos estáticos o únicos) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Header
                    data={data.header}
                    onUpdate={staticHandlers.handleUpdateHeader}
                    isEditingMode={isEditingMode}
                    darkMode={darkMode} 
                />

                <DatosPersonales
                    data={data.datosPersonales}
                    onUpdate={staticHandlers.handleUpdateDatosPersonales}
                    isEditingMode={isEditingMode}
                    darkMode={darkMode}
                />
            </div>

            {/* Fila 2: Experiencia y Estudios (Usan los datos y handlers del Hook) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Experiencia
                    experiencias={experienciaData} // 👈 ¡Datos del Hook!
                    onAdd={expHandlers.onAdd}      // 👈 ¡CRUD del Hook!
                    onUpdate={expHandlers.onUpdate} 
                    onDelete={expHandlers.onDelete} 
                    isEditingMode={isEditingMode}
                    darkMode={darkMode}
                />

                <Estudios
                    estudios={estudiosData}      // 👈 ¡Datos del Hook!
                    onAdd={estHandlers.onAdd}    // 👈 ¡CRUD del Hook!
                    onUpdate={estHandlers.onUpdate} 
                    onDelete={estHandlers.onDelete} 
                    isEditingMode={isEditingMode}
                    darkMode={darkMode}
                />
            </div>
        </div>
    );
}

export default HomePage;