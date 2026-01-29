const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// ACTUALIZADO: Agregamos .cjs a la ruta
const connectDB = require('./config/db.cjs');

// ACTUALIZADO: Importar rutas con extensión .cjs
const authRoutes = require('./routes/authRoutes.cjs');
const postRoutes = require('./routes/postRoutes.cjs');
const educationRoutes = require('./routes/educationRoutes.cjs');
const experienceRoutes = require('./routes/experienceRoutes.cjs');

const app = express();

// 1. Conectar a MongoDB Atlas
connectDB();

// --- MIDDLEWARES ---
app.use(helmet({ contentSecurityPolicy: false }));

app.use(cors({
    origin: process.env.FRONTEND_URL || '*', 
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
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/estudios', educationRoutes);
app.use('/experiencia', experienceRoutes); 
app.use('/experience', experienceRoutes);

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
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor local en puerto ${PORT}`);
    });
}

module.exports = app;