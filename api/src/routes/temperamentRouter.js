const { Router } = require("express");

const temperamentRouter = Router();

temperamentRouter.get("/", gettemperamentHandler);

module.exports = temperamentRouter;
