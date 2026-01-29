// Importar mongoose para crear esquemas y modelos de MongoDB
const mongoose = require('mongoose');

// Definir el esquema de Education que estructura los datos de formación académica
// Un esquema establece qué campos tendrá cada documento y sus tipos de datos
const EducationSchema = new mongoose.Schema({
    // Campo institution: nombre de la institución educativa
    // required: true significa que este campo es obligatorio
    institution: { type: String, required: true },
    
    // Campo degree: título o grado académico obtenido (Licenciatura, Máster, etc.)
    // required: true indica que siempre debe proporcionarse
    degree: { type: String, required: true },
    
    // Campo fieldOfStudy: área o especialidad de estudio
    // No es obligatorio, el usuario puede dejarlo vacío si lo desea
    fieldOfStudy: { type: String },
    
    // Campo startDate: fecha de inicio de los estudios
    // Usamos String en lugar de Date para permitir formatos flexibles como "Enero 2020"
    startDate: { type: String },
    
    // Campo endDate: fecha de finalización de los estudios
    // También es String para mantener consistencia con startDate
    endDate: { type: String },
    
    // Campo description: descripción adicional sobre los estudios o logros
    // Opcional para que el usuario pueda añadir información extra
    description: { type: String }
}, 
// Opciones del esquema: { timestamps: true } añade automáticamente createdAt y updatedAt
// Estos campos registran cuándo se creó y modificó el documento por última vez
{ timestamps: true });

// Exportar el modelo Education basado en el esquema definido
// Esto permite usar el modelo en otros archivos para hacer operaciones CRUD en la BD
module.exports = mongoose.model('Education', EducationSchema);