// middlewares/authMiddleware.js

const TOKEN_SECRETO = 'miTokenSecreto';

const authMiddleware = (req, res, next) => {
const token = req.headers['authorization']; 

if (token === TOKEN_SECRETO) {
    next(); 
} else {
    res.status(403).send({ mensaje: 'Acceso prohibido: Token inválido o ausente' }); 
}
};

module.exports = authMiddleware;