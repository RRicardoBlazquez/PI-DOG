const { Router } = require("express");

const {
  getDogsHandler,
  getDogHandler,
  postDogHandler,
} = require("../handlers/dogHandler");
const dogRouter = Router();

dogRouter.get("/", getDogsHandler);
dogRouter.get("/:id", getDogHandler);
dogRouter.post("/", postDogHandler);

module.exports = dogRouter;
