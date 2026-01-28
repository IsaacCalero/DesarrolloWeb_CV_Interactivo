// src/pages/HomePage.jsx
import React from 'react';

// --- IMPORTAR COMPONENTES DE CV ---
// Componente de encabezado con foto e información básica
import Header from '../components/Header';
// Componente de datos personales (email, teléfono, ubicación)
import DatosPersonales from '../components/DatosPersonales';
// Componente para listar y gestionar experiencia laboral
import Experiencia from '../components/Experiencia';
// Componente para listar y gestionar formación académica
import Estudios from '../components/Estudios';

// --- IMPORTAR CONTEXTOS Y HOOKS ---
// Custom hook que proporciona el estado de darkMode a nivel global
// CORRECCIÓN: Usar el hook useCvContext() que definimos en CvContext.jsx
import { useCvContext } from '../context/CvContext';
// Custom hook reutilizable para operaciones CRUD (GET, POST, PUT, DELETE)
// Este hook simplifica la comunicación con la API del backend
import useCvData from '../hooks/useCvData';

/**
 * Componente HomePage: página principal que muestra la Hoja de Vida completa
 * 
 * Estructura:
 * - Fila 1: Header (foto y datos básicos) + DatosPersonales (contacto)
 * - Fila 2: Experiencia (laboral) + Estudios (académica)
 * 
 * Los datos estáticos (Header, DatosPersonales) provienen de App.jsx
 * Los datos dinámicos (Experiencia, Estudios) se cargan desde la API usando hooks
 * 
 * @param {Object} data - Datos estáticos del CV (header, datosPersonales)
 * @param {boolean} isEditingMode - Indica si está en modo edición
 * @param {Object} staticHandlers - Funciones para actualizar datos estáticos
 */
function HomePage({ data, isEditingMode, ...staticHandlers }) {
    // --- OBTENER CONTEXTO GLOBAL ---
    // Obtener el estado de darkMode del contexto para aplicar tema oscuro/claro
    const { darkMode } = useCvContext(); 

    // --- CARGAR DATOS DINÁMICOS DESDE LA API ---
    // Hook para gestionar experiencia laboral
    // - data: array de experiencias
    // - loading: boolean indicando si se está cargando
    // - error: mensaje de error si falla la carga
    // - handlers: objeto con funciones onAdd, onUpdate, onDelete, refresh
    const { 
        data: experienciaData, 
        loading: expLoading, 
        error: expError, 
        handlers: expHandlers 
    } = useCvData('experience');

    // Hook para gestionar educación/estudios
    // Mismo patrón que experienciaData pero para la ruta 'estudios'
    const { 
        data: estudiosData, 
        loading: estLoading, 
        error: estError, 
        handlers: estHandlers 
    } = useCvData('estudios');
    
    // --- MANEJO DE ESTADOS DE CARGA ---
    // Mientras se cargan los datos, mostrar un mensaje de carga
    if (expLoading || estLoading) {
        return (
            <div className="text-center py-12 text-blue-500 dark:text-blue-300">
                Cargando Hoja de Vida...
            </div>
        );
    }

    // --- MANEJO DE ERRORES ---
    // Si hay error al cargar cualquier sección, mostrar mensaje de error
    if (expError || estError) {
        const errorMessage = expError || estError;
        return (
            <div className="text-center py-12 text-red-600 dark:text-red-400 font-bold">
                {errorMessage}
            </div>
        );
    }

    // --- RENDERIZADO PRINCIPAL ---
    return (
        <div className="space-y-6">
            
            {/* FILA 1: Header y Datos Personales */}
            {/* Estos componentes usan datos estáticos de App.jsx porque son únicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Componente Header: foto de perfil e información básica */}
                {/* onUpdate: función para actualizar los datos del header */}
                <Header
                    data={data.header}
                    onUpdate={staticHandlers.handleUpdateHeader}
                    isEditingMode={isEditingMode}
                    darkMode={darkMode} 
                />

                {/* Componente DatosPersonales: email, teléfono, ubicación */}
                {/* onUpdate: función para actualizar los datos personales */}
                <DatosPersonales
                    data={data.datosPersonales}
                    onUpdate={staticHandlers.handleUpdateDatosPersonales}
                    isEditingMode={isEditingMode}
                    darkMode={darkMode}
                />
            </div>

            {/* FILA 2: Experiencia y Estudios */}
            {/* Estos componentes usan datos dinámicos del Hook porque hay múltiples registros */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Componente Experiencia: gestiona experiencia laboral */}
                {/* Recibe datos y funciones CRUD del hook useCvData */}
                <Experiencia
                    experiencias={experienciaData}     // Array de experiencias de la API
                    onAdd={expHandlers.onAdd}          // Función para agregar experiencia
                    onUpdate={expHandlers.onUpdate}    // Función para actualizar experiencia
                    onDelete={expHandlers.onDelete}    // Función para eliminar experiencia
                    isEditingMode={isEditingMode}
                    darkMode={darkMode}
                />

                {/* Componente Estudios: gestiona formación académica */}
                {/* Recibe datos y funciones CRUD del hook useCvData */}
                <Estudios
                    estudios={estudiosData}            // Array de estudios de la API
                    onAdd={estHandlers.onAdd}          // Función para agregar estudio
                    onUpdate={estHandlers.onUpdate}    // Función para actualizar estudio
                    onDelete={estHandlers.onDelete}    // Función para eliminar estudio
                    isEditingMode={isEditingMode}
                    darkMode={darkMode}
                />
            </div>
        </div>
    );
}

// Exportar el componente para usarlo en el routing principal
export default HomePage;