import express from 'express';
import Order from '../models/ordenModel.js';
import User from '../models/usuarioModel.js';
import State from '../models/estadoModel.js';
import sequelize from '../config/db.js';  

const router = express.Router();

// Crear una nueva orden y llamar al procedimiento almacenado
router.post('/', async (req, res) => {
    const { nombre_usuario, nombre_estado, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, detalles_json } = req.body;
    try {
        const usuario = await User.findOne({ where: { nombre_completo: nombre_usuario } });
        const estado = await State.findOne({ where: { nombre: nombre_estado } });

        if (!usuario || !estado) {
            return res.status(400).json({ error: 'Usuario o estado no encontrado' });
        }

        const newOrder = await Order.create({
            usuarios_idUsuarios: usuario.idUsuarios,
            estados_idEstados: estado.idEstados,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
            total_orden,
            detalles_json  // Almacenar el JSON de detalles
        });

        // Llamar al procedimiento almacenado
        await sequelize.query('EXEC InsertarDetalleOrden :idOrden, :detalles_json', {
            replacements: { idOrden: newOrder.idOrden, detalles_json }
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(400).json({ error: error.message || 'Se produjo un error al crear la orden' });
    }
});

// Obtener todas las órdenes
router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener una orden por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar una orden por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, nombre_estado, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, detalles_json } = req.body;

    try {
        const usuario = await User.findOne({ where: { nombre_completo: nombre_usuario } });
        const estado = await State.findOne({ where: { nombre: nombre_estado } });

        if (!usuario || !estado) {
            return res.status(400).json({ error: 'Usuario o estado no encontrado' });
        }

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        await order.update({
            usuarios_idUsuarios: usuario.idUsuarios,
            estados_idEstados: estado.idEstados,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
            total_orden,
            detalles_json  // Actualizar el JSON de detalles
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Inactivar una orden por ID
router.put('/:id/inactivar', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        await order.update({ activo: false });
        res.status(200).json({ message: 'Orden inactivada exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
