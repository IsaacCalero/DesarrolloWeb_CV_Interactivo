// Importar el modelo de Post para realizar operaciones en la base de datos
const Post = require('../models/Post');

// Función para obtener todos los posts ordenados por fecha de creación (más recientes primero)
exports.getPosts = async (req, res) => {
    try {
        // Buscar todos los posts en la BD y ordenarlos por fecha de creación en orden descendente (-1)
        // -1 indica orden descendente: los posts más recientes aparecerán primero
        const posts = await Post.find().sort({ createdAt: -1 });
        // Retorna el array de posts en formato JSON al cliente
        res.json(posts);
    } catch (error) {
        // Si ocurre un error al obtener los posts (problemas de conexión BD, etc)
        // Retorna un error 500 (Server Error) con un mensaje descriptivo
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
};

// Función para obtener un post específico por su ID (utilizado en páginas de detalle)
exports.getPostById = async (req, res) => {
    try {
        // Buscar un post por su ID único usando el parámetro recibido en la URL (req.params.id)
        // findById() busca directamente en el índice _id de MongoDB
        const post = await Post.findById(req.params.id);
        // Si el post no existe en la BD, retorna un error 404 (Not Found)
        // indicando que el recurso solicitado no fue encontrado
        if (!post) return res.status(404).json({ message: 'Post no encontrado' });
        // Si el post existe, retorna sus datos en formato JSON
        res.json(post);
    } catch (error) {
        // Si ocurre un error al buscar el post (ID inválido, problemas de conexión)
        // Retorna un error 500 (Server Error) con un mensaje descriptivo
        res.status(500).json({ message: 'Error al obtener el post' });
    }
};

// Función para crear un nuevo post (solo accesible por administradores)
exports.createPost = async (req, res) => {
    try {
        // Crear una nueva instancia del modelo Post con los datos recibidos en el cuerpo de la solicitud
        // req.body contiene los campos: título, contenido, autor, etc.
        const newPost = new Post(req.body);
        // Guardar el nuevo post en la base de datos MongoDB
        // save() ejecuta validaciones del esquema antes de insertar
        await newPost.save();
        // Retorna el post creado (con su ID asignado por MongoDB) con código 201 (Created)
        res.status(201).json(newPost);
    } catch (error) {
        // Si ocurre un error al crear el post (validación fallida, datos inválidos)
        // Retorna un error 400 (Bad Request) indicando que los datos son incorrectos
        res.status(400).json({ message: 'Error al crear el post' });
    }
};