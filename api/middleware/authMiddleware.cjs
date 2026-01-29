// Importar jsonwebtoken para verificar y decodificar tokens JWT
const jwt = require('jsonwebtoken');

// Middleware de autenticación que protege las rutas privadas
// Se ejecuta antes de llegar al controlador si la ruta está protegida
module.exports = (req, res, next) => {
    // Extraer el token del encabezado Authorization
    // El formato esperado es: "Bearer <token>"
    // split(' ')[1] obtiene solo la parte del token después de "Bearer "
    const token = req.header('Authorization')?.split(' ')[1];
    
    // Si no hay token en el encabezado, rechaza la solicitud con error 401 (Unauthorized)
    // El usuario debe estar autenticado para acceder a esta ruta
    if (!token) return res.status(401).json({ message: 'No hay token, permiso denegado' });

    try {
        // Verificar que el token sea válido usando la clave secreta JWT almacenada en variables de entorno
        // jwt.verify() decodifica el token y valida su firma
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Si el token es válido, almacena los datos decodificados en req.user
        // Estos datos (como el ID del usuario) estarán disponibles en los controladores posteriores
        req.user = decoded;
        
        // Llama a next() para continuar hacia el siguiente middleware o controlador
        next();
    } catch (error) {
        // Si el token es inválido, expirado o está corrompido, rechaza con error 401
        // Esto protege las rutas de accesos no autorizados
        res.status(401).json({ message: 'Token no válido' });
    }
};