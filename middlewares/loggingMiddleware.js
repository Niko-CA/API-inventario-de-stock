// middlewares/loggingMiddleware.js

const loggingMiddleware = (req, res, next) => {
    const method = req.method; 
    const url = req.url; 
    const time = new Date().toLocaleString(); 

    console.log(`[${time}] ${method} ${url}`); 

    next();
};

module.exports = loggingMiddleware;