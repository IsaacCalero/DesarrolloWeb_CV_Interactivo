import React, { useState } from 'react'; // Importar React y hook useState para gestionar el estado del formulario
import axiosInstance from '../utils/api'; // Importar la instancia configurada de Axios para hacer solicitudes a la API
import { useNavigate } from 'react-router-dom'; // Importar hook useNavigate de react-router-dom para redirigir después de crear el post

// Componente PostForm: formulario para crear nuevos posts técnicos en el blog
// Solo accesible por usuarios autenticados (se verifica en el routing o con middleware)
const PostForm = () => {
    // Estado para almacenar el título del post
    // Se actualiza en tiempo real mientras el usuario escribe
    const [title, setTitle] = useState('');
    
    // Estado para almacenar el contenido principal del post
    // Puede contener hasta 1000 palabras o más de texto técnico
    const [content, setContent] = useState('');
    
    // Hook para redirigir a otras rutas después de crear el post exitosamente
    const navigate = useNavigate();

    // Función manejadora para el envío del formulario
    const handleSubmit = async (e) => {
        // Prevenir la recarga de página al enviar el formulario
        e.preventDefault();
        
        try {
            // Realizar solicitud POST a la API para crear un nuevo post
            // Se envían title y content en el cuerpo de la solicitud
            // El servidor agregará automáticamente: author, createdAt, updatedAt
            await axiosInstance.post('/posts', { title, content });
            
            // Si la creación es exitosa, mostrar mensaje de confirmación
            alert('¡Post creado con éxito!');
            
            // Redirigir a la página del blog para ver el post publicado
            navigate('/blog');
        } catch (error) {
            // Si hay error al crear el post, mostrar el error en la consola
            console.error(error);
            
            // Mostrar alerta al usuario indicando que algo salió mal
            alert('Error al crear el post');
        }
    };

    return (
        // Contenedor principal del formulario
        <div className="container mx-auto p-8 max-w-2xl bg-gray-800 rounded-lg mt-10">
            
            {/* Título del formulario */}
            <h2 className="text-2xl font-bold text-white mb-6">Crear Nuevo Post Técnico</h2>
            
            {/* Formulario para crear el post */}
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Campo de entrada para el título del post */}
                {/* required: valida que el campo no esté vacío antes de enviar */}
                <input 
                    type="text" 
                    placeholder="Título del Post" 
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                
                {/* Campo de texto grande para el contenido principal del post */}
                {/* h-64: altura fija para que el usuario vea cuánto espacio tiene */}
                {/* required: valida que el campo no esté vacío antes de enviar */}
                <textarea 
                    placeholder="Escribe aquí..." 
                    className="w-full p-2 h-64 rounded bg-gray-700 text-white"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                
                {/* Botón para publicar el post */}
                {/* hover:bg-blue-700: efecto visual al pasar el ratón */}
                <button 
                    type="submit" 
                    className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700"
                >
                    Publicar Post
                </button>
            </form>
        </div>
    );
};

// Exportar el componente para usarlo en el routing principal
export default PostForm;