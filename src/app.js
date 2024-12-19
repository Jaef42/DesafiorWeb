import express from 'express';
import sequelize from '../src/config/db.js';
import userRouter from '../src/routes/usuarioRoute.js';
import productRouter from './routes/productoRoute.js';
import stateRouter from './routes/estadoRoute.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/states', stateRouter);

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión con la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
