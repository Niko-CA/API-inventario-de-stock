const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productoSchema = new Schema(
    {
        nombre: { 
            type: String, 
            required: true,
        },
        descripcion: { 
            type: String,
        },
        precio: { 
            type: Number, 
            required: true,
        },
        cantidad: { 
            type: Number, 
            required: true,
        },
        categoria: { 
            type: String,
        },
        fechaIngreso: { 
            type: Date, 
            default: Date.now,
        },
        
        },
    {
        timestamps: true,
    }
);


const ModelProducto = mongoose.model('producto', productoSchema);
module.exports = ModelProducto;