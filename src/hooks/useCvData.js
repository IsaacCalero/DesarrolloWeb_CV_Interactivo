// src/hooks/useCvData.js
import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client'; // Importamos el cliente Axios que creamos

/**
 * Custom Hook para gestionar el estado, la carga y las operaciones CRUD
 * de una colección específica (ej. 'experiencia' o 'estudios') en la API.
 * * @param {string} endpoint - La ruta de la API (ej. 'experiencia' o 'estudios').
 * @returns {{data: Array, loading: boolean, error: string | null, handlers: object}}
 */
const useCvData = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ============================================
    // 1. Lógica de Carga (GET)
    // ============================================
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/${endpoint}`);
            setData(response.data.reverse()); // Usamos reverse para mostrar los más nuevos primero
        } catch (err) {
            console.error(`Error al cargar ${endpoint}:`, err);
            setError(`Error al cargar datos. ¿Está JSON Server corriendo en el puerto 3000?`);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // ============================================
    // 2. Lógica CRUD (POST, PUT, DELETE)
    // Se fuerza una recarga (fetchData) después de cada operación.
    // ============================================

    // CREATE (POST)
    const handleAdd = useCallback(async (newItem) => {
        try {
            await api.post(`/${endpoint}`, newItem);
            await fetchData(); // Recargar datos para actualizar el UI
        } catch (err) {
            console.error(`Error al añadir ${endpoint}:`, err);
            // Manejo de errores visual aquí si es necesario
        }
    }, [endpoint, fetchData]);

    // UPDATE (PUT)
    const handleUpdate = useCallback(async (id, updatedItem) => {
        try {
            await api.put(`/${endpoint}/${id}`, updatedItem);
            await fetchData(); // Recargar datos
        } catch (err) {
            console.error(`Error al actualizar ${endpoint}:`, err);
        }
    }, [endpoint, fetchData]);

    // DELETE (DELETE)
    const handleDelete = useCallback(async (id) => {
        try {
            await api.delete(`/${endpoint}/${id}`);
            await fetchData(); // Recargar datos
        } catch (err) {
            console.error(`Error al eliminar ${endpoint}:`, err);
        }
    }, [endpoint, fetchData]);

    return {
        data,
        loading,
        error,
        handlers: {
            onAdd: handleAdd,
            onUpdate: handleUpdate,
            onDelete: handleDelete,
        }
    };
};

export default useCvData;