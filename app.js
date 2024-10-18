const express = require(`express`);

const app = express();

const dbconnect = require(`./config/db`);

const productosRoutes = require(`./routes/productos`);

const loggingMiddleware = require('./middlewares/loggingMiddleware');


app.use(loggingMiddleware);

app.use(express.json());
app.use(productosRoutes);

dbconnect().then(() => {
    app.listen(3000, () => {
        console.log("El servidor esta corriendo en el puerto 3000");
    });

}).catch(err => {
    console.log("No se pudo iniciar el servidor debido a un error en la base de datos");
});


