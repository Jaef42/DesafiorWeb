import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'mssql',
    host: 'localhost',
    username: 'JavierEcheverria',
    password: '123456',
    database: 'GDA0053OT-JavierEcheverria',
    server: 'SARAIDEAPAD3',
    dialectOptions: {
        trustServerCertificate: true,
        timezone: 'America/Guatemala'
    }
});

export default sequelize;

