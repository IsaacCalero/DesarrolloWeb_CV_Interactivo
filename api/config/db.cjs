const mongoose = require('mongoose');

const connectDB = async () => {
    // Si ya estamos conectados, no lo intentes de nuevo
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Conectado exitosamente');
    } catch (error) {
        console.error('❌ Error de conexión a MongoDB:', error.message);
        // NO usamos process.exit(1) en Vercel
        throw error; // Lanzamos el error para que index.cjs lo capture
    }
};

module.exports = connectDB;