import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Category = sequelize.define('Category',{
    idCategoriaProductos:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'CategoriaProductos',
    timestamps: false,
})
export default Category;