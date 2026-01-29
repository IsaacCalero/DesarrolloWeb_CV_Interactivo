// Importar el modelo de Usuario para interactuar con la base de datos
const User = require('../models/User.cjs');
// Importar jsonwebtoken para crear y verificar tokens JWT de autenticación
const jwt = require('jsonwebtoken');
// Importar bcryptjs para encriptar y comparar contraseñas de forma segura
const bcrypt = require('bcryptjs');

// Función para registrar un nuevo usuario (puede eliminarse después de crear la primera cuenta)
exports.register = async (req, res) => {
    try {
        // Extraer el nombre de usuario y contraseña del cuerpo de la solicitud
        const { username, password } = req.body;
        
        // Buscar si ya existe un usuario con ese nombre de usuario en la BD
        const userExists = await User.findOne({ username });
        // Si el usuario ya existe, retorna un error 400 (Bad Request)
        if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

        // Crear una nueva instancia del modelo User con los datos proporcionados
        const user = new User({ username, password });
        // Guardar el nuevo usuario en la base de datos
        await user.save();
        // Retorna un mensaje de éxito con código 201 (Created)
        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        // Si ocurre algún error durante el registro, retorna un error 500 (Server Error)
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Función para autenticar un usuario existente y generar su token JWT
exports.login = async (req, res) => {
    try {
        // Extraer el nombre de usuario y contraseña del cuerpo de la solicitud
        const { username, password } = req.body;
        
        // Buscar el usuario en la base de datos por su nombre de usuario
        const user = await User.findOne({ username });
        // Si el usuario no existe, retorna un error 400 (credenciales inválidas)
        if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

        // Comparar la contraseña ingresada con la contraseña encriptada almacenada en la BD
        const isMatch = await bcrypt.compare(password, user.password);
        // Si las contraseñas no coinciden, retorna un error 400
        if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

        // Crear un token JWT firmado con el ID del usuario y una clave secreta
        // El token expira en 1 día (24 horas)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        // Retorna el token JWT y el nombre de usuario al cliente para futuros accesos autenticados
        res.json({ token, username: user.username });
    } catch (error) {
        // Si ocurre un error durante el login, retorna un error 500 (Server Error)
        res.status(500).json({ message: 'Error en el login' });
    }
};