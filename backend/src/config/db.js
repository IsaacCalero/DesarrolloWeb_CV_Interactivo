// Importar la librería mongoose para trabajar con MongoDB
const mongoose = require('mongoose');

// Función asincrónica que establece la conexión con la base de datos MongoDB
const connectDB = async () => {
    try {
        // Intenta conectarse a MongoDB usando la URI almacenada en variables de entorno
        // La URI contiene los datos de autenticación y ubicación del servidor de BD
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Si la conexión es exitosa, muestra un mensaje confirmando la conexión
        console.log('✅ MongoDB Conectado exitosamente');
    } catch (error) {
        // Si ocurre un error durante la conexión, lo captura en el bloque catch
        // Muestra un mensaje de error con los detalles del problema
        console.error('❌ Error de conexión a MongoDB:', error.message);
        
        // Detiene la ejecución del proceso con código de error 1
        // Esto indica que hubo un fallo crítico en la aplicación
        process.exit(1);
    }
};

// Exporta la función connectDB para que pueda ser utilizada en otros archivos del proyecto
module.exports = connectDB;