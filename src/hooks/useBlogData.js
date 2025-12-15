import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/api'; // Asegúrate de que esta ruta sea correcta

const useBlogData = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener todos los posts
    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // GET request al endpoint /posts del JSON Server
            const response = await axiosInstance.get('/posts');
            setPosts(response.data);
        } catch (err) {
            console.error("Error fetching posts:", err);
            setError("No se pudo cargar la lista de posts.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Cargar posts al montar el hook
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Función para obtener un solo post por ID
    const fetchPostById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/posts/${id}`);
            setLoading(false);
            return response.data;
        } catch (err) {
            console.error(`Error fetching post ${id}:`, err);
            setError("No se pudo cargar la publicación.");
            setLoading(false);
            return null;
        }
    }, []);


    // Aquí podrías agregar addPost, updatePost, deletePost si el blog fuera editable, pero por ahora solo es de lectura.

    return {
        posts,
        loading,
        error,
        fetchPosts, // Retornamos para recargar si es necesario
        fetchPostById
    };
};

export default useBlogData;