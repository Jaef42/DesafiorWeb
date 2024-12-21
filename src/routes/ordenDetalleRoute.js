import express from 'express';
import OrderDetail from '../models/ordenDetalleModel.js';
import Order from '../models/ordenModel.js';
import Product from '../models/productoModel.js';

const router = express.Router();

// Crear Detalle de Orden
router.post('/', async (req, res) => {
    const { orden_idOrden, Productos_idProductos, cantidad, precio, subtotal } = req.body;
    try {
        const order = await Order.findByPk(orden_idOrden);
        const product = await Product.findByPk(Productos_idProductos);

        if (!order || !product) {
            return res.status(400).json({ error: 'Orden o producto no encontrado' });
        }

        const newOrderDetail = await OrderDetail.create({
            orden_idOrden,
            Productos_idProductos,
            cantidad,
            precio,
            subtotal
        });
        res.status(201).json(newOrderDetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los detalles de orden
router.get('/', async (req, res) => {
    try {
        const orderDetails = await OrderDetail.findAll();
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener detalle de orden por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ error: 'Detalle de orden no encontrado' });
        }
        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar detalle de orden por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { orden_idOrden, Productos_idProductos, cantidad, precio, subtotal } = req.body;

    try {
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ error: 'Detalle de orden no encontrado' });
        }

        await orderDetail.update({
            orden_idOrden,
            Productos_idProductos,
            cantidad,
            precio,
            subtotal
        });
        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar detalle de orden por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ error: 'Detalle de orden no encontrado' });
        }
        await orderDetail.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
