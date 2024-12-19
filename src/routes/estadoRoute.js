import express from 'express';
import State from '../models/estadoModel.js';

const router = express.Router();

// Crear un nuevo estado
router.post('/', async (req, res) => {
    const { nombre } = req.body;
    try {
        const newState = await State.create({ nombre });
        res.status(201).json(newState);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los estados
router.get('/', async (req, res) => {
    try {
        const states = await State.findAll();
        res.status(200).json(states);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener un estado por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const state = await State.findByPk(id);
        if (!state) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }
        res.status(200).json(state);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar un estado por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const state = await State.findByPk(id);
        if (!state) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }
        await state.update({ nombre });
        res.status(200).json(state);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un estado por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const state = await State.findByPk(id);
        if (!state) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }
        await state.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
