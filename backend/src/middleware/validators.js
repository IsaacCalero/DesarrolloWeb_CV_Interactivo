// Importar las funciones check y validationResult de express-validator
// check() valida campos específicos del request
// validationResult() recopila los errores de validación encontrados
const { check, validationResult } = require('express-validator');

// Exportar un middleware que valida los datos de un post antes de guardarlo en la BD
exports.validatePost = [
    // Validar que el campo 'title' no esté vacío
    // Si está vacío, retorna el mensaje de error especificado
    check('title', 'El título es obligatorio').not().isEmpty(),
    
    // Validar que el campo 'content' tenga un mínimo de 100 caracteres
    // Esto asegura que el contenido del post sea suficientemente detallado
    check('content', 'El contenido debe tener al menos 100 caracteres').isLength({ min: 100 }),
    
    // Función middleware que verifica si hay errores de validación
    (req, res, next) => {
        // Recopila todos los errores de validación encontrados en la solicitud
        const errors = validationResult(req);
        
        // Si hay errores de validación, retorna un error 400 (Bad Request)
        // con un array de todos los errores encontrados
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Si no hay errores, continúa al siguiente middleware o controlador
        next();
    }
];