// src/pages/BlogPage.jsx
// Importar React para crear componentes
import React from 'react';
// Importar custom hook para obtener datos de posts del blog
import useBlogData from '../hooks/useBlogData';
// Importar contexto global para acceder al modo oscuro
import { useCvContext } from '../context/CvContext';
// Importar iconos de lucide-react para la interfaz visual
import { Calendar, User, ArrowRight, Rss, PlusCircle } from 'lucide-react';
// Importar componente Link de react-router-dom para navegación entre páginas
import { Link } from 'react-router-dom';

// Componente PostCard: tarjeta individual que muestra un post del blog
// Props:
//   - post: objeto con los datos del post (title, content, imageUrl, author, createdAt)
//   - darkMode: boolean para aplicar tema oscuro
const PostCard = ({ post, darkMode }) => {
    // Clases dinámicas para la tarjeta según el modo oscuro
    const cardClasses = `rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' : 'bg-white border border-gray-200 hover:bg-gray-50'
    }`;
    
    // Clases dinámicas para el título del post
    const titleClasses = `text-xl font-bold line-clamp-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`;
    
    // Clases dinámicas para el texto secundario
    const textClasses = darkMode ? 'text-gray-400' : 'text-gray-600';

    return (
        <div className={cardClasses}>
            {/* Mostrar imagen del post si existe */}
            {post.imageUrl && (
                <div className="h-48 overflow-hidden rounded-t-xl">
                    {/* 
                    Imagen destacada del post
                    - object-cover: ajusta la imagen manteniendo proporción
                    - hover:scale: efecto zoom al pasar el ratón
                    - onError: oculta la imagen si falla la carga
                    */}
                    <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </div>
            )}
            
            {/* Contenido de la tarjeta */}
            <div className="p-5">
                {/* Título del post (limitado a 2 líneas) */}
                <h3 className={titleClasses}>{post.title}</h3>
                
                {/* Metadata: fecha de publicación y autor */}
                <div className={`flex items-center space-x-4 text-sm mt-2 mb-4 ${textClasses}`}>
                    {/* Fecha de creación del post */}
                    <span className="flex items-center gap-1">
                        <Calendar size={14} /> 
                        {/* Convertir fecha ISO a formato legible, o mostrar 'Reciente' si no existe */}
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Reciente'}
                    </span>
                    {/* Autor del post */}
                    <span className="flex items-center gap-1">
                        <User size={14} /> 
                        {/* Mostrar autor o nombre por defecto */}
                        {post.author || 'Admin Santiago'}
                    </span>
                </div>

                {/* Resumen del contenido (limitado a 3 líneas) */}
                <p className={`text-base line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    {/* Mostrar primeros 150 caracteres del contenido seguido de puntos suspensivos */}
                    {post.content?.substring(0, 150) + '...' || 'Sin contenido disponible.'}
                </p>

                {/* Link a la página de detalle del post */}
                <Link 
                    to={`/blog/${post._id}`}
                    className="mt-4 inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors group"
                >
                    Leer Publicación 
                    {/* Icono que se desliza hacia la derecha al pasar el ratón */}
                    <ArrowRight size={16} className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};

// Componente principal BlogPage: página que muestra el listado de posts del blog
const BlogPage = () => {
    // Obtener el modo oscuro del contexto global
    const { darkMode } = useCvContext();
    
    // Obtener posts, estado de carga y errores del custom hook
    const { posts, loading, error } = useBlogData();
    
    // Verificar si el usuario es administrador revisando si existe un token en localStorage
    // Un token indica que el usuario está autenticado y puede crear posts
    const isAdmin = !!localStorage.getItem('token');

    // Clases dinámicas para el contenedor principal
    const containerClasses = `min-h-screen pt-12 pb-20 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`;
    
    // Clases dinámicas para el encabezado
    const headerClasses = `text-4xl font-extrabold flex items-center gap-3 ${
        darkMode ? 'text-white' : 'text-gray-900'
    }`;

    // Estado de carga: mostrar mensaje mientras se cargan los posts
    if (loading) {
        return (
            <div className={containerClasses}>
                <div className="container mx-auto px-4 text-center">
                    <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Cargando posts... ⏳</p>
                </div>
            </div>
        );
    }

    // Estado de error: mostrar mensaje si falla la conexión con el backend
    if (error) {
        return (
            <div className={containerClasses}>
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xl text-red-500 mb-4">Error al cargar el blog ❌</p>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                        Verifica que el servidor de Node.js esté corriendo en el puerto 5000.
                    </p>
                </div>
            </div>
        );
    }

    // Renderizado normal: mostrar posts
    return (
        <div className={containerClasses}>
            <div className="container mx-auto px-4">
                
                {/* ENCABEZADO CON BOTÓN PARA CREAR POST (solo admin) */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    {/* Título de la página */}
                    <h1 className={headerClasses}>
                        <Rss size={32} className="text-blue-500" /> 
                        Mi Blog Técnico
                    </h1>

                    {/* BOTÓN CREAR POST: Solo visible si el usuario es administrador */}
                    {isAdmin && (
                        <Link 
                            to="/admin/posts/nuevo" 
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform hover:scale-105"
                        >
                            <PlusCircle size={20} />
                            Nuevo Post Técnico
                        </Link>
                    )}
                </div>

                {/* Mostrar mensaje si no hay posts, o grid de posts si existen */}
                {posts.length === 0 ? (
                    // Mensaje cuando la lista de posts está vacía
                    <div className="text-center py-20 bg-gray-800/20 rounded-2xl border-2 border-dashed border-gray-700">
                        <p className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            ⚠️ Todavía no hay publicaciones. ¡Crea la primera!
                        </p>
                    </div>
                ) : (
                    // Grid de tarjetas de posts (responsive: 1 columna en móvil, 2 en tablet, 3 en desktop)
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Mapear cada post a una tarjeta PostCard */}
                        {posts.map(post => (
                            <PostCard key={post._id} post={post} darkMode={darkMode} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Exportar el componente para usarlo en el routing principal
export default BlogPage;