const mongoose = require(`mongoose`);

const dbconnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/dbInventarioStock');
        console.log('Conexion a la base de datos fue exitosa');
    } catch (error) {
        console.error('Error en la conexion a la base de datos', error);
        process.exit(1);
    }
};

module.exports = dbconnect;
