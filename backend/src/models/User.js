// Importar mongoose para crear esquemas y modelos de MongoDB
const mongoose = require('mongoose');
// Importar bcryptjs para encriptar contraseñas de forma segura
const bcrypt = require('bcryptjs');

// Definir el esquema de User que estructura los datos de usuarios del sistema
// Un esquema establece qué campos tendrá cada documento y sus tipos de datos
const UserSchema = new mongoose.Schema({
    // Campo username: nombre de usuario único para iniciar sesión
    username: { 
        type: String, 
        required: true,      // Obligatorio: siempre debe proporcionarse
        unique: true,        // Único: no puede haber dos usuarios con el mismo nombre
        trim: true           // Elimina espacios en blanco al inicio y final
    },
    
    // Campo password: contraseña del usuario (se almacenará encriptada)
    password: { 
        type: String, 
        required: true       // Obligatorio: siempre debe proporcionarse una contraseña
    }
}, 
// Opciones del esquema: { timestamps: true } añade automáticamente createdAt y updatedAt
// Estos campos registran cuándo se creó y modificó el usuario por última vez
{ timestamps: true });

// Middleware pre-save que se ejecuta antes de guardar un usuario en la BD
// Este middleware encripta la contraseña antes de almacenarla
UserSchema.pre('save', async function() {
    // Verificar si la contraseña ha sido modificada
    // Si no fue modificada (ej: al actualizar otros campos), no encriptar de nuevo
    if (!this.isModified('password')) return;
    
    // Generar un "salt" con 10 rondas de encriptación
    // El salt es un valor aleatorio que hace que el hash sea único
    const salt = await bcrypt.genSalt(10);
    
    // Encriptar la contraseña con el salt generado
    // bcrypt.hash() convierte la contraseña en una cadena irreversible
    this.password = await bcrypt.hash(this.password, salt);
    
    // En funciones async, Mongoose detecta el final cuando la promesa se resuelve
    // No es necesario llamar a next() explícitamente
});

// Exportar el modelo User basado en el esquema definido
// Esto permite usar el modelo en otros archivos para hacer operaciones CRUD en la BD
module.exports = mongoose.model('User', UserSchema);