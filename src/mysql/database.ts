import { Sequelize, Model } from 'sequelize';

export const db = new Sequelize('musicians', 'root', 'root', {
    host: 'database', // should resolve to the container name
    port: 3306,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});

db.authenticate();
