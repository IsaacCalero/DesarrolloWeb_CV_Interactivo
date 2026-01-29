// Importar express para crear el router de rutas
const express = require('express');
// Crear una instancia del router para definir las rutas de educación
const router = express.Router();
// Importar el modelo Education para realizar operaciones en la base de datos
const Education = require('../models/Education.cjs');
// Importar el middleware de autenticación para proteger rutas privadas
const auth = require('../middleware/authMiddleware.cjs');

// GET: Obtener todos los estudios (Ruta pública - sin autenticación requerida)
router.get('/', async (req, res) => {
    try {
        // Buscar todos los registros de educación y ordenarlos por fecha de creación descendente
        // Los estudios más recientes aparecerán primero
        const edu = await Education.find().sort({ createdAt: -1 });
        // Retorna el array de educación en formato JSON al cliente
        res.json(edu);
    } catch (err) {
        // Si ocurre un error al obtener los datos, retorna un error 500 (Server Error)
        res.status(500).json({ message: err.message });
    }
});

// POST: Agregar un nuevo estudio (Ruta privada - requiere autenticación con token JWT)
// El middleware 'auth' valida que el usuario tenga un token válido antes de proceder
router.post('/', auth, async (req, res) => {
    // Crear una nueva instancia del modelo Education con los datos recibidos en el cuerpo de la solicitud
    const education = new Education(req.body);
    try {
        // Guardar el nuevo registro de educación en la base de datos
        const newEdu = await education.save();
        // Retorna el registro creado con código 201 (Created)
        res.status(201).json(newEdu);
    } catch (err) {
        // Si ocurre un error al guardar (validación fallida, datos inválidos)
        // Retorna un error 400 (Bad Request) con el mensaje de error
        res.status(400).json({ message: err.message });
    }
});

// Exportar el router para que pueda ser utilizado en el archivo principal de la aplicación
module.exports = router;