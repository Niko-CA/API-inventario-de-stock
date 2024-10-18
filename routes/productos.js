const express = require(`express`);

const router = express.Router();

const ModelProducto = require(`../models/productomodel`);

const authMiddleware = require('../middlewares/authMiddleware');


// Obtener todos los productos

router.get('/productos', async (req, res) => {
    try {
        const productos = await ModelProducto.find();
        res.status(200).send(productos);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los productos', error });
    }
});

// Obtener un producto por ID

router.get('/productos/:id', async (req, res) => {
    try {
        const producto = await ModelProducto.findById(req.params.id);
        
        if (!producto) {
            return res.status(404).send({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).send(producto);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el producto', error });
    }
});

// Crear un nuevo producto

router.post('/productos', authMiddleware, async (req, res) => {
    const body = req.body;
    try {
        const nuevoProducto = await ModelProducto.create(body);
        res.status(201).send(nuevoProducto);

    } catch (error) {
        res.status(400).send(error);
    }
});

// Actualizar un producto por ID

router.put('/productos/:id', async (req, res) => {
    try {
        const productoActualizado = await ModelProducto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!productoActualizado) {
            return res.status(404).send({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).send(productoActualizado);

    } catch (error) {
        res.status(400).send({ mensaje: 'Error al actualizar el producto', error });
    }
});

// Eliminar un producto por ID

router.delete('/productos/:id', async (req, res) => {
    try {
        const productoEliminado = await ModelProducto.findByIdAndDelete(req.params.id);

        if (!productoEliminado) {
            return res.status(404).send({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).send({ mensaje: 'Producto eliminado correctamente' });

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el producto', error });
    }
});



//--------------- ENDPOINTS DE NEGOCIO ---------------//

// Obtener productos por categoría

router.get('/productos/categoria/:categoria', async (req, res) => {
    const { categoria } = req.params;

    try {
        const productos = await ModelProducto.find({ categoria }); 

        if (!productos.length) {
        return res.status(404).send({ mensaje: 'No se encontraron productos en esta categoría' });
        }

        res.status(200).send(productos);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar productos', error });
    }
});


// Obtener productos con bajo stock

router.get('/productos/bajo-stock/:cantidad', async (req, res) => {
    const cantidad = parseInt(req.params.cantidad, 10 ); 

    if (isNaN(cantidad) || cantidad < 0) {
    return res.status(400).send({ mensaje: 'La cantidad debe ser un número positivo' });
    }

    try {
    
        const productosBajoStock = await ModelProducto.find({ cantidad: { $lt: cantidad } });

        if (productosBajoStock.length > 0) {
        res.status(200).send(productosBajoStock);

        } else {
        res.status(204).send();
        }
        } catch (error) {    
    res.status(500).send({ mensaje: 'Error al obtener los productos', error});
    }
});



module.exports = router;