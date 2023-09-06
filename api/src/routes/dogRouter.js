const { Router } = require("express");

const { getDogHandler } = require("../handlers/dogHandler");
const dogRouter = Router();

dogRouter.get("/", getDogHandler);

module.exports = dogRouter;
