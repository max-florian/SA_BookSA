import { Sequelize } from "sequelize-typescript";
import User from './models/User';
import {
    DB_HOST,
    DB_DATABASE,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} from "../../env";


const sequelize = new Sequelize(
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: "mysql",
        models: [User]
    },
);

export default sequelize;