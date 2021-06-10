import express from 'express';
import cors from 'cors';
import { config } from "dotenv";
config();
import routes from './routes';
import sequelize from "./database";
import { APP_PORT, APP_NAME } from "../env";

// Create server
const app = express();

// Config
app.set('servicename', APP_NAME)
app.set('json spaces', 2);

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(`/api/${app.get('servicename')}`, routes);

// Listen
app.listen(APP_PORT, async () => {
    console.log(`Servidor ${app.get('servicename')}: levantado en el puerto ${APP_PORT}`);
    await sequelize.authenticate();
    console.log("Base de datos conectada");
});