const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/db.cjs');

// Importar rutas
const authRoutes = require('./routes/authRoutes.cjs');
const postRoutes = require('./routes/postRoutes.cjs');
const educationRoutes = require('./routes/educationRoutes.cjs');
const experienceRoutes = require('./routes/experienceRoutes.cjs');

const app = express();

// Conectar a MongoDB
connectDB();

// --- MIDDLEWARES ---
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
    origin: '*', // En desarrollo es más seguro dejarlo así hasta que funcione
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// --- DEFINICIÓN DE RUTAS (Ajustadas para Vercel) ---
// Agregamos /api a las rutas para que coincidan con lo que envía vercel.json
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/estudios', educationRoutes);
app.use('/api/experiencia', experienceRoutes);
app.use('/api/experience', experienceRoutes);

// Ruta raíz para probar si el servidor responde
app.get('/api', (req, res) => {
    res.send('🚀 Servidor del Portafolio Online en Vercel listo');
});

// --- MANEJO DE ERRORES ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    });
});

module.exports = app;