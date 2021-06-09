import express from 'express';
import cors from 'cors';
import { config } from "dotenv";
config();
import routes from './routes';

// Create server
const app = express();

// Config
app.set('port', process.env.PORT || 4000);
app.set('servicename', 'authentication')
app.set('json spaces', 2);

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(`/api/${app.get('servicename')}`, routes);

// Listen
app.listen(app.get('port'), () => {
    console.log(`Servidor ${app.get('servicename')}: levantado en el puerto ${app.get('port')}`)
});