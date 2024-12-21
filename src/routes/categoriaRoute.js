import express from 'express';
import Category from '../models/categoriaModel.js';
import State from '../models/estadoModel.js';
import User from '../models/usuarioModel.js';

const router = express.Router();

//Crear Categoria
router.post('/', async (req, res) => {
    const { nombre_usuario, nombre, nombre_estado } = req.body
    try {
        const usuario = await User.findOne({ where: { nombre_completo: nombre_usuario } });
        const estado = await State.findOne({ where: { nombre: nombre_estado } });

        if (!usuario || !estado) {
            return res.status(400).json({ error: "Usuario o estado no encotrados" })
        }

        const newCategory = await Category.create({
            usuarios_idUsuarios: usuario.idUsuarios,
            nombre,
            estados_idEstados: estado.idEstados,
         
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
});


//Obtener todas las Categorias

router.get('/', async (req, res) => {
    try {
        const categorias = await Category.findAll();
        res.status(200).json(categorias)
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
});

//Actualizar
router.put('/actualizar', async (req, res) => {
    const { nombre_categoria, nombre_usuario, nuevo_nombre, nombre_estado } = req.body;
    try {
        const usuario = await User.findOne({ where: { nombre_completo: nombre_usuario } });
        const estado = await State.findOne({ where: { nombre: nombre_estado } });

        if (!usuario || !estado) {
            return res.status(400).json({ error: 'Usuario o estado no encontrados' });
        }

        const categoria = await Category.findOne({ where: { nombre: nombre_categoria } });
        if (!categoria) {
            return res.status(400).json({ error: 'Categoria no encontrada' })
        }

        await categoria.update({
            usuario_idUsuarios: usuario.idUsuarios,
            nombre: nuevo_nombre,
            estados_idEstados: estado.idEstados,
           

        });
        res.status(200).json(categoria);

    } catch (error) {
        res.status(400).json({ error: error.message });

    }
});

// Eliminar 
router.delete('/delete', async (req, res) => {
    const { nombre_categoria } = req.body;
    try {
        const category = await Category.findOne({ where: { nombre: nombre_categoria } });
        if (!category) {
            return res.status(404).json({
                error: 'Categoría no encontrada'

            });
        }
        await category.destroy(); res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export default router;