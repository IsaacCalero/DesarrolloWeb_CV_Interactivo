// Importar hooks de React para gestionar estado, efectos y optimización
import { useState, useEffect, useCallback } from 'react';
// Importar la instancia configurada de Axios para hacer solicitudes a la API
import { api } from '../api/client';

/**
 * Custom Hook optimizado para gestionar datos del CV con MongoDB Atlas y Node.js
 * 
 * Este hook encapsula toda la lógica CRUD (Create, Read, Update, Delete) para
 * cualquier recurso del backend, permitiendo reutilización de código.
 * 
 * @param {string} endpoint - La ruta del API sin la barra inicial (ej: 'estudios', 'experiencia', 'posts')
 * @returns {Object} Objeto con: data, loading, error, y handlers para operaciones CRUD
 */
const useCvData = (endpoint) => {
    // Estado para almacenar los datos obtenidos del backend
    // Es un array que contiene los documentos de MongoDB
    const [data, setData] = useState([]);
    
    // Estado para indicar si se está cargando datos
    // true durante la solicitud, false cuando termina
    const [loading, setLoading] = useState(true);
    
    // Estado para almacenar mensajes de error si algo falla
    const [error, setError] = useState(null);

    // --- OPERACIÓN READ: Obtener datos del servidor (GET) ---

    // Función asincrónica para traer datos del backend
    // useCallback optimiza el rendimiento memorizando la función
    const fetchData = useCallback(async () => {
        // Indicar que está cargando
        setLoading(true);
        // Limpiar errores previos
        setError(null);
        try {
            // Hacer solicitud GET a la ruta del endpoint
            // api.get() añade automáticamente el token en los encabezados (gracias al interceptor)
            const response = await api.get(`/${endpoint}`);
            
            // Verificar que la respuesta sea un array válido
            // Si no es array, usar array vacío como fallback
            // MongoDB devuelve un array de documentos ordenados por fecha
            setData(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            // Si hay error, mostrarlo en la consola para debugging
            console.error(`Error al cargar ${endpoint}:`, err);
            // Guardar un mensaje de error amigable
            setError(`Error al conectar con el servidor de la API.`);
        } finally {
            // Indicar que terminó de cargar (éxito o error)
            setLoading(false);
        }
    }, [endpoint]);

    // Hook useEffect: se ejecuta una sola vez al montar el componente
    // Carga los datos iniciales del servidor
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- OPERACIONES CRUD ---

    // OPERACIÓN CREATE: Agregar un nuevo elemento (POST)
    const handleAdd = useCallback(async (newItem) => {
        try {
            // Hacer solicitud POST con los datos del nuevo elemento
            // El endpoint recibe los datos en el cuerpo de la solicitud
            await api.post(`/${endpoint}`, newItem);
            
            // Después de agregar, recargar los datos para mostrar el nuevo elemento
            await fetchData();
        } catch (err) {
            // Mostrar error en la consola
            console.error(`Error al añadir ${endpoint}:`, err);
            // Mostrar alerta al usuario con recomendación
            alert("Error al guardar: Verifica tu conexión o permisos.");
        }
    }, [endpoint, fetchData]);

    // OPERACIÓN UPDATE: Actualizar un elemento existente (PUT)
    // Nota: Usamos '_id' en lugar de 'id' porque MongoDB utiliza '_id' como identificador único
    const handleUpdate = useCallback(async (id, updatedItem) => {
        try {
            // Hacer solicitud PUT para actualizar el elemento con el ID especificado
            // El ID va en la URL, los datos actualizados van en el cuerpo
            await api.put(`/${endpoint}/${id}`, updatedItem);
            
            // Después de actualizar, recargar los datos para reflejar los cambios
            await fetchData();
        } catch (err) {
            // Mostrar error en la consola para debugging
            console.error(`Error al actualizar ${endpoint}:`, err);
            // No mostramos alerta aquí para no interrumpir tanto al usuario
        }
    }, [endpoint, fetchData]);

    // OPERACIÓN DELETE: Eliminar un elemento (DELETE)
    // Nota: Usamos '_id' de MongoDB como identificador
    const handleDelete = useCallback(async (id) => {
        // Pedir confirmación al usuario antes de eliminar permanentemente
        if (!window.confirm("¿Estás seguro de eliminar este elemento?")) return;
        
        try {
            // Hacer solicitud DELETE para eliminar el elemento con el ID especificado
            await api.delete(`/${endpoint}/${id}`);
            
            // Después de eliminar, recargar los datos para actualizar la lista
            await fetchData();
        } catch (err) {
            // Mostrar error en la consola
            console.error(`Error al eliminar ${endpoint}:`, err);
            // No mostramos alerta aquí, el error ya se mostró en la confirmación
        }
    }, [endpoint, fetchData]);

    // Retornar un objeto con todos los estados y funciones que los componentes necesitan
    return {
        // Estados
        data,          // Array de datos del servidor
        loading,       // boolean indicando si está cargando
        error,         // Mensaje de error (null si no hay error)
        
        // Objeto con funciones CRUD y función para refrescar
        handlers: {
            onAdd: handleAdd,        // Función para agregar elementos
            onUpdate: handleUpdate,  // Función para actualizar elementos
            onDelete: handleDelete,  // Función para eliminar elementos
            refresh: fetchData       // Función para recargar datos manualmente
        }
    };
};

// Exportar el hook personalizado para usarlo en componentes
export default useCvData;