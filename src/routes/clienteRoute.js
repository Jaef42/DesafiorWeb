import express from 'express';
import Cliente from '../models/clienteModel.js';

const router = express.Router();

// Crear Cliente
router.post('/', async (req, res) => {
    const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;
    try {
        const newCliente = await Cliente.create({
            razon_social,
            nombre_comercial,
            direccion_entrega,
            telefono,
            email,
        });
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar un cliente por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        await cliente.update({
            razon_social,
            nombre_comercial,
            direccion_entrega,
            telefono,
            email,
        });
        res.status(200).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un cliente por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        await cliente.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
