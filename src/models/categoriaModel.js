import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Category = sequelize.define('Category', {
    idCategoriaProductos: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
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
    }
}, {
    tableName: 'CategoriaProductos',
    timestamps: false,
});

export default Category;
