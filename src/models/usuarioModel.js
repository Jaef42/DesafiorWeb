import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'

const User = sequelize.define('User', {
    idUsuarios: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'Usuarios',
    timestamps: false,
});

export default User;
