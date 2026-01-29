// Importar mongoose para crear esquemas y modelos de MongoDB
const mongoose = require('mongoose');

// Definir el esquema de Post que estructura los datos de artículos o publicaciones
// Un esquema establece qué campos tendrá cada documento y sus tipos de datos
const PostSchema = new mongoose.Schema({
    // Campo title: título del artículo o publicación
    // required: true significa que este campo es obligatorio
    title: { type: String, required: true },
    
    // Campo content: contenido principal del post (aquí irá el texto completo del artículo)
    // required: true indica que siempre debe proporcionarse contenido
    // Este campo puede contener hasta 1000 palabras o más de texto detallado
    content: { type: String, required: true },
    
    // Campo author: autor del post
    // default: 'Admin_Santiago' establece un valor por defecto si no se proporciona
    // Útil para identificar quién escribió el artículo
    author: { type: String, default: 'Admin_Santiago' },
    
    // Campo tags: etiquetas o palabras clave asociadas al post
    // [String] indica que es un array de strings (múltiples etiquetas)
    // Permite clasificar y buscar posts por categorías
    tags: [String],
    
    // Campo imageUrl: URL de la imagen destacada del post
    // Opcional, permite añadir una imagen de portada al artículo
    imageUrl: { type: String }
}, 
// Opciones del esquema: { timestamps: true } añade automáticamente createdAt y updatedAt
// Estos campos registran cuándo se creó y modificó el documento por última vez
{ timestamps: true });

// Exportar el modelo Post basado en el esquema definido
// Esto permite usar el modelo en otros archivos para hacer operaciones CRUD en la BD
module.exports = mongoose.model('Post', PostSchema);