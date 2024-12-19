import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/usuarioModel.js';
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();
const secretKey = 'your_secret_key';

// Registro de usuario
router.post('/register', async (req, res) => {
    const { correo_electronico, nombre_completo, password, telefono, fecha_nacimiento } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({
            correo_electronico,
            nombre_completo,
            password: hashedPassword,
            telefono,
            fecha_nacimiento,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Inicio de sesión de usuario
router.post('/login', async (req, res) => {
    const { correo_electronico, password } = req.body;
    try {
        const user = await User.findOne({ where: { correo_electronico } });
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ userId: user.idUsuarios }, secretKey, { expiresIn: '24h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta protegida 
router.get('/protected-route', authMiddleware, (req, res) => {
     res.status(200).json({ message: 'Ruta protegida accedida con éxito' }); 
    });

export default router;
