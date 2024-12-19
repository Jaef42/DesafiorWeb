import express from 'express';
import Product from '../models/productoModel.js';
import User from '../models/usuarioModel.js';
import Category from '../models/categoriaModel.js';
import State from '../models/estadoModel.js';

const router = express.Router();

// Create
router.post('/', async (req, res) => {
    const { nombre_usuario, nombre_categoria, nombre, marca, codigo, stock, nombre_estado, precio, fecha_creacion, foto } = req.body;
    try {
        const usuario = await User.findOne({ where: { nombre_completo: nombre_usuario } });
        const categoria = await Category.findOne({ where: { nombre: nombre_categoria } });
        const estado = await State.findOne({ where: { nombre: nombre_estado } });

        if (!usuario || !categoria || !estado) {
            return res.status(400).json({ error: 'Usuario, Categoría o estado no encontrados' });
        }

        const newProducto = await Product.create({
            categoriaProductos_idCategoriaProductos: categoria.idCategoriaProductos,
            usuarios_idUsuarios: usuario.idUsuarios,
            nombre,
            marca,
            codigo,
            stock,
            estados_idEstados: estado.idEstados,
            precio,
            fecha_creacion,
            foto,
        });
        res.status(201).json(newProducto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los productos 
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener por nombre o por código
router.get('/search', async (req, res) => {
    const { nombre, codigo } = req.query;
    try {
        let product;
        if (nombre) {
            product = await Product.findOne({ where: { nombre } });
        } else if (codigo) {
            product = await Product.findOne({ where: { codigo } });
        }
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, nombre_categoria, nombre, marca, codigo, stock, nombre_estado, precio, fecha_creacion, foto } = req.body;

    try {
        const usuario = await User.findOne({ where: { nombre_completo: nombre_usuario } });
        const categoria = await Category.findOne({ where: { nombre: nombre_categoria } });
        const estado = await State.findOne({ where: { nombre: nombre_estado } });

        if (!usuario || !categoria || !estado) {
            return res.status(400).json({ error: 'Usuario, categoría o estado no encontrados' });
        }

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await product.update({
            categoriaProductos_idCategoriaProductos: categoria.idCategoriaProductos,
            usuarios_idUsuarios: usuario.idUsuarios,
            nombre,
            marca,
            codigo,
            stock,
            estados_idEstados: estado.idEstados,
            precio,
            fecha_creacion,
            foto,
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await product.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
