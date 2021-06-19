require("dotenv").config();

const cors = require("cors");
const express = require("express");
const routes = require("./src/routes/index");

// Create server
const app = express();

// Config
app.set('servicename', process.env.APP_NAME)

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(`/api/${app.get('servicename')}`, routes);

// Listen
app.listen(process.env.PORT || 4000, async () => {
  console.log(`Servidor ${app.get('servicename')} levantado en el puerto ${process.env.APP_PORT}`);
});
