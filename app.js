console.log('Aplicación iniciando...');
require('dotenv').config();


const express = require(`express`);

const app = express();

const dbconnect = require(`./config/db`);

const productosRoutes = require(`./routes/productos`);

const loggingMiddleware = require('./middlewares/loggingMiddleware');


app.use(loggingMiddleware);

app.use(express.json());
app.use('/api', productosRoutes);
app.get('/api/test', (req, res) => {
    res.send('La aplicación está funcionando correctamente');
});

dbconnect().then(() => {
    console.log("El servidor está corriendo.");

}).catch(err => {
    console.log("No se pudo iniciar el servidor debido a un error en la base de datos");
});

module.exports = app; 
