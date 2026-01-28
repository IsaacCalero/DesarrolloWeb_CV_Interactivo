const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/db');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const educationRoutes = require('./routes/educationRoutes');
const experienceRoutes = require('./routes/experienceRoutes');

const app = express();

// 1. Conectar a MongoDB Atlas
connectDB();

// --- MIDDLEWARES ---
app.use(helmet({ contentSecurityPolicy: false }));

app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // En producción puedes usar '*' o la URL de Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: 'Demasiadas peticiones, intenta más tarde.' }
});
app.use('/api/', limiter);
app.use(express.json());

// --- DEFINICIÓN DE RUTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/estudios', educationRoutes);

// CORREGIDO: Ahora experiencia apunta a experienceRoutes
app.use('/api/experiencia', experienceRoutes); 
app.use('/api/experience', experienceRoutes);

app.get('/', (req, res) => {
    res.send('🚀 Servidor del Portafolio Online en Vercel listo');
});

// --- MANEJO DE ERRORES ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

// --- CONFIGURACIÓN PARA VERCEL ---
// IMPORTANTE: Solo hacemos listen si NO estamos en Vercel (entorno local)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor local en puerto ${PORT}`);
    });
}

// Exportar la app para que Vercel la use como Serverless Function
module.exports = app;