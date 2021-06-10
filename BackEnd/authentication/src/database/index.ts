import { Sequelize } from "sequelize";
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
        dialect: "mysql"
    }
);

export default sequelize;