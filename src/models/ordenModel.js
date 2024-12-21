import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define('Order', {
    idOrden: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuarios_idUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estados_idEstados: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    total_orden: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    detalles_json: {
        type: DataTypes.TEXT,  // Campo para almacenar los detalles en formato JSON
        allowNull: false,
    }
}, {
    tableName: 'Orden',
    timestamps: false,
});

export default Order;
