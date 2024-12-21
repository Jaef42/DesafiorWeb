import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cliente = sequelize.define('Cliente', {
    idCliente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    razon_social: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre_comercial: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion_entrega: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Clientes',
    timestamps: false,
});

export default Cliente;
