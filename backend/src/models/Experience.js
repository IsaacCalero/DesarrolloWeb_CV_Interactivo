// Importar mongoose para crear esquemas y modelos de MongoDB
const mongoose = require('mongoose');

// Definir el esquema de Experience que estructura los datos de experiencia laboral
// Un esquema establece qué campos tendrá cada documento y sus tipos de datos
const ExperienceSchema = new mongoose.Schema({
    // Campo company: nombre de la empresa donde se trabajó
    // required: true significa que este campo es obligatorio
    company: { type: String, required: true },
    
    // Campo position: puesto o cargo desempeñado en la empresa
    // required: true indica que siempre debe proporcionarse
    position: { type: String, required: true },
    
    // Campo startDate: fecha de inicio del trabajo en la empresa
    // Se almacena como String para permitir formatos flexibles como "Enero 2020"
    // required: true indica que es obligatorio especificar cuándo comenzó
    startDate: { type: String, required: true },
    
    // Campo endDate: fecha de finalización del trabajo en la empresa
    // Opcional (no required) para empleos actuales que aún están en progreso
    // Se deja vacío si la persona aún trabaja en la empresa
    endDate: { type: String },
    
    // Campo description: descripción detallada de las responsabilidades y logros
    // required: true asegura que el usuario proporcione detalles del trabajo realizado
    description: { type: String, required: true }
}, 
// Opciones del esquema: { timestamps: true } añade automáticamente createdAt y updatedAt
// Estos campos registran cuándo se creó y modificó el documento por última vez
{ timestamps: true });
    
// Exportar el modelo Experience basado en el esquema definido
// Esto permite usar el modelo en otros archivos para hacer operaciones CRUD en la BD
module.exports = mongoose.model('Experience', ExperienceSchema);