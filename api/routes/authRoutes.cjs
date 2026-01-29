// Importar express para crear el router de rutas
const express = require('express');
// Crear una instancia del router para definir las rutas de autenticación
const router = express.Router();
// Importar el controlador de autenticación que contiene la lógica de login y registro
const authController = require('../controllers/authController.cjs');

// Definir ruta POST para el registro de nuevos usuarios
// Cuando se hace una solicitud POST a /register, se ejecuta authController.register
// Esta función crea un nuevo usuario en la base de datos
router.post('/register', authController.register);

// Definir ruta POST para el login de usuarios existentes
// Cuando se hace una solicitud POST a /login, se ejecuta authController.login
// Esta función verifica las credenciales y retorna un token JWT si son válidas
router.post('/login', authController.login);

// Exportar el router para que pueda ser utilizado en el archivo principal de la aplicación (app.js o server.js)
module.exports = router;