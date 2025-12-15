import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import useBlogData from '../hooks/useBlogData'; 
import { useCvContext } from '../context/CvContext';
import { Calendar, User, ArrowLeft } from 'lucide-react';

// 🚨 Importaciones de Markdown
import ReactMarkdown from 'react-markdown'; 
import remarkGfm from 'remark-gfm'; // Para soporte de tablas, tareas y notas al pie


// Función auxiliar para esperar (útil para reintentos de red)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const PostDetailPage = () => {
    // 1. Obtener el ID de la URL
    const { id } = useParams(); 
    
    // 2. Obtener el contexto y las funciones del Blog
    const { darkMode } = useCvContext();
    const { fetchPostById } = useBlogData(); // Solo extraemos la función de fetching

    // 3. Estado local para el post
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);

    // Función para cargar el post con lógica de reintento (maneja el 404 intermitente)
    const loadPost = useCallback(async () => {
        setLoading(true); 
        setError(null);

        const MAX_RETRIES = 3;
        let attempt = 0;
        let postData = null;
        let lastError = null;

        while (attempt < MAX_RETRIES) {
            attempt++;
            try {
                // Intento de carga
                postData = await fetchPostById(id);
                
                if (postData) {
                    // Éxito: Salir del bucle
                    setPost(postData);
                    setError(null);
                    setLoading(false);
                    return;
                } else {
                    // Post no encontrado (404 real o no existe el ID)
                    lastError = "La publicación no fue encontrada (Error 404).";
                    break; 
                }

            } catch (err) {
                // Error de red (como el 404 durante el reinicio del servidor)
                lastError = err.message || "Error de conexión. Reintentando...";
                
                if (attempt < MAX_RETRIES) {
                    console.warn(`Intento ${attempt} fallido. Reintentando en 500ms...`, err.message);
                    await sleep(500); // Esperar medio segundo antes de reintentar
                } else {
                    console.error(`Fallo al cargar el post ID ${id} después de ${MAX_RETRIES} intentos.`);
                }
            }
        }

        // Si salimos del bucle sin éxito 
        setPost(null); 
        setError(lastError || "No se pudo cargar la publicación después de múltiples intentos.");
        setLoading(false);

    }, [id, fetchPostById]); 

    // Ejecutar la carga cuando el componente se monta o el ID cambia
    useEffect(() => {
        loadPost();
    }, [loadPost]);


    // Estilos dinámicos
    const containerClasses = `min-h-screen pt-12 pb-20 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`;
    const cardClasses = `p-8 md:p-10 rounded-xl shadow-2xl transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border border-gray-700 text-gray-200' : 'bg-white border border-gray-200 text-gray-800'
    }`;


    // ----------------------------------------------------
    // Vistas de Estado
    // ----------------------------------------------------

    if (loading) {
        return (
            <div className={containerClasses}>
                <div className="container mx-auto px-4">
                    <p className={`text-center text-2xl py-20 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                        Cargando publicación...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className={containerClasses}>
                <div className="container mx-auto px-4">
                    <div className={`${cardClasses} text-center py-20`}>
                        <p className="text-2xl text-red-500 mb-6">
                            {error || 'Error 404: Publicación no encontrada.'}
                        </p>
                        <Link 
                            to="/blog" 
                            className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft size={18} className="mr-2" />
                            Volver al listado de posts
                        </Link>
                    </div>
                </div>
            </div>
        );
    }


    // ----------------------------------------------------
    // Vista Principal (Post cargado)
    // ----------------------------------------------------

    return (
        <div className={containerClasses}>
            <div className="container mx-auto px-4 max-w-4xl">
                
                {/* Botón de retroceso */}
                <Link 
                    to="/blog" 
                    className={`inline-flex items-center mb-6 text-lg font-semibold transition-colors group ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
                >
                    <ArrowLeft size={20} className="mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
                    Volver al Blog
                </Link>

                <article className={cardClasses}>
                    
                    {/* Imagen Principal */}
                    {post.imagen && (
                        <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
                            <img 
                                src={post.imagen} 
                                alt={post.titulo} 
                                className="w-full h-auto object-cover"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </div>
                    )}

                    {/* Título */}
                    <h1 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                        {post.titulo}
                    </h1>

                    {/* Metadatos */}
                    <div className={`flex flex-wrap items-center space-x-4 text-sm mb-8 border-b pb-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        <span className="flex items-center gap-1.5 font-medium">
                            <User size={16} className="text-blue-500" /> 
                            Autor: {post.autor || 'Anónimo'}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm">
                            <Calendar size={16} className="text-blue-500" /> 
                            Publicado: {post.fecha || 'N/A'}
                        </span>
                    </div>

                    {/* Contenido (USANDO REACT-MARKDOWN) */}
                    <div className={`prose max-w-none ${darkMode ? 'prose-invert prose-blue' : 'prose-lg'}`}>
                        <ReactMarkdown 
                            children={post.contenido} 
                            remarkPlugins={[remarkGfm]} 
                        />
                    </div>
                </article>
            </div>
        </div>
    );
};

export default PostDetailPage;