import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define('Product' , {
    idProducto: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoriaProductos_idCategoriaProductos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    usuarios_idUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    stock:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    estados_idEstados: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fecha_creacion:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    foto: {
        type: DataTypes.BLOB,
        allowNull: true,
     } 
}, {
    tableName: 'Productos',
    timestamps: false,
    
});

export default Product;