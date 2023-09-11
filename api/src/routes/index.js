const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require("./dogRouter");
const temperamentRouter = require("./temperamentRouter");

const routes = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
routes.use("/dog", dogRouter);
routes.use("/temperament", temperamentRouter);

module.exports = routes;
