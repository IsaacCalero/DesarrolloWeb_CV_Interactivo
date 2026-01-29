// Importar express para crear el router de rutas
const express = require('express');
// Crear una instancia del router para definir las rutas de experiencia
const router = express.Router();
// Importar el modelo Experience para realizar operaciones en la base de datos
const Experience = require('../models/Experience.cjs');
// Importar el middleware de autenticación para proteger rutas privadas
const auth = require('../middleware/authMiddleware.cjs');

// GET: Obtener todas las experiencias (Ruta pública - sin autenticación requerida)
router.get('/', async (req, res) => {
    try {
        // Buscar todos los registros de experiencia y ordenarlos por fecha de creación descendente
        // Las experiencias más recientes aparecerán primero
        const experiences = await Experience.find().sort({ createdAt: -1 });
        // Retorna el array de experiencias en formato JSON al cliente
        res.json(experiences);
    } catch (err) {
        // Si ocurre un error al obtener los datos, retorna un error 500 (Server Error)
        res.status(500).json({ message: err.message });
    }
});

// POST: Agregar nueva experiencia (Ruta privada - requiere autenticación con token JWT)
// El middleware 'auth' valida que el usuario tenga un token válido antes de proceder
router.post('/', auth, async (req, res) => {
    try {
        // Crear una nueva instancia del modelo Experience con los datos recibidos en el cuerpo de la solicitud
        const newExperience = new Experience(req.body);
        // Guardar el nuevo registro de experiencia en la base de datos
        const savedExperience = await newExperience.save();
        // Retorna el registro creado con código 201 (Created)
        res.status(201).json(savedExperience);
    } catch (err) {
        // Si ocurre un error al guardar (validación fallida, datos inválidos)
        // Retorna un error 400 (Bad Request) con el mensaje de error
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Eliminar una experiencia (Ruta privada - requiere autenticación con token JWT)
// El parámetro :id en la URL especifica qué experiencia eliminar
router.delete('/:id', auth, async (req, res) => {
    try {
        // Buscar el registro de experiencia por su ID y eliminarlo de la base de datos
        await Experience.findByIdAndDelete(req.params.id);
        // Retorna un mensaje de éxito confirmando la eliminación
        res.json({ message: "Experiencia eliminada con éxito" });
    } catch (err) {
        // Si ocurre un error al eliminar, retorna un error 500 (Server Error)
        res.status(500).json({ message: err.message });
    }
});

// Exportar el router para que pueda ser utilizado en el archivo principal de la aplicación
module.exports = router;