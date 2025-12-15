// src/pages/BlogPage.jsx
import React from 'react';
import useBlogData from '../hooks/useBlogData';
import { useCvContext } from '../context/CvContext'; // <-- Importación correcta del hook
import { Calendar, User, ArrowRight, Rss } from 'lucide-react';
import { Link } from 'react-router-dom';

// Componente individual para cada tarjeta de post
const PostCard = ({ post, darkMode }) => {
    const cardClasses = `rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' : 'bg-white border border-gray-200 hover:bg-gray-50'
    }`;
    const titleClasses = `text-xl font-bold line-clamp-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`;
    const textClasses = darkMode ? 'text-gray-400' : 'text-gray-600';

    return (
        <div className={cardClasses}>
            {/* Imagen del Post (Si existe) */}
            {post.imagen && (
                <div className="h-48 overflow-hidden rounded-t-xl">
                    <img 
                        src={post.imagen} 
                        alt={post.titulo} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                        onError={(e) => { e.target.style.display = 'none'; }} // Oculta si la URL falla
                    />
                </div>
            )}
            
            <div className="p-5">
                <h3 className={titleClasses}>{post.titulo}</h3>
                
                {/* Metadatos */}
                <div className={`flex items-center space-x-4 text-sm mt-2 mb-4 ${textClasses}`}>
                    <span className="flex items-center gap-1">
                        <Calendar size={14} /> 
                        {post.fecha || 'N/A'} 
                    </span>
                    <span className="flex items-center gap-1">
                        <User size={14} /> 
                        {post.autor || 'Anónimo'} 
                    </span>
                </div>

                {/* Resumen del Post */}
                <p className={`text-base line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    {post.resumen || post.contenido?.substring(0, 150) + '...' || 'Sin resumen disponible.'}
                </p>

                {/* Enlace de lectura */}
                <Link 
                    to={`/blog/${post.id}`} // <--- Usa la ruta /blog/:id
                    className="mt-4 inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors group"
                >
                    Leer Publicación 
                    <ArrowRight size={16} className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};


const BlogPage = () => {
    // 🚨 USO CRÍTICO DEL HOOK: Esto es lo que fallaba antes.
    const { darkMode } = useCvContext();
    const { posts, loading, error } = useBlogData();

    const containerClasses = `min-h-screen pt-12 pb-20 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`;
    const headerClasses = `text-4xl font-extrabold flex items-center gap-3 mb-10 ${
        darkMode ? 'text-white' : 'text-gray-900'
    }`;

    // ----------------------------------------------------
    // Lógica de Renderizado de Estados
    // ----------------------------------------------------

    if (loading) {
        return (
            <div className={containerClasses}>
                <div className="container mx-auto px-4">
                    <p className={`text-center text-xl ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                        Cargando posts... ⏳
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={containerClasses}>
                <div className="container mx-auto px-4">
                    <p className="text-center text-xl text-red-500">
                        Error al cargar el blog: {error} ❌
                    </p>
                    <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                       Asegúrese de que el JSON Server esté corriendo en http://localhost:3000
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={containerClasses}>
            <div className="container mx-auto px-4">
                
                <h1 className={headerClasses}>
                    <Rss size={32} className="text-blue-500" /> 
                    Mi Blog Técnico
                </h1>

                {posts.length === 0 ? (
                    <p className={`text-center py-10 italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        ⚠️ No hay publicaciones disponibles en este momento.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} darkMode={darkMode} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;