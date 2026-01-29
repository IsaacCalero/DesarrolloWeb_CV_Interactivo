// Importar express para crear el router de rutas
const express = require('express');
// Crear una instancia del router para definir las rutas de posts
const router = express.Router();
// Importar el controlador de posts que contiene la lógica de negocio
const postController = require('../controllers/postController.cjs');
// Importar el middleware de autenticación para proteger rutas privadas
const auth = require('../middleware/authMiddleware.cjs');
// Importar el validador de posts para verificar que los datos sean correctos
const { validatePost } = require('../middleware/validators.cjs');

// GET: Obtener todos los posts (Ruta pública - sin autenticación requerida)
router.get('/', postController.getPosts);

// GET: Obtener un post específico por su ID (Ruta pública - sin autenticación requerida)
// El parámetro :id en la URL especifica qué post obtener
router.get('/:id', postController.getPostById);

// POST: Crear un nuevo post (Ruta privada - requiere autenticación y validación)
// [auth, validatePost] es un array de middlewares que se ejecutan antes del controlador
// 1. auth: verifica que el usuario tenga un token JWT válido
// 2. validatePost: verifica que los datos del post cumplan con las reglas de validación
// Si alguno falla, la solicitud se rechaza antes de llegar al controlador
router.post('/', [auth, validatePost], postController.createPost);

// Exportar el router para que pueda ser utilizado en el archivo principal de la aplicación
module.exports = router;