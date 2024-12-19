import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const State = sequelize.define('State', {
    idEstados: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: 'Estados',
    timestamps: false,
});

export default State;