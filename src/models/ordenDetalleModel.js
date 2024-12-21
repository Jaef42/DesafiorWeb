import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderDetail = sequelize.define('OrderDetail', {
    idOrdenDetalle: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orden_idOrden: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Productos_idProductos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    tableName: 'OrdenDetalles',
    timestamps: false,
});

export default OrderDetail;
