const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { URL_BASE } = process.env;

const getDogId = async (isApi, id) => {
  const dogId = isApi
    ? (await axios.get(`${URL_BASE}/${id}`)).data
    : await Dog.findBypk(id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

  const { weight, height, name, life_span, reference_image_id } = dogId;

  //return { id, weight, height, name, life_span, reference_image_id };
  return { weight, height, name, life_span, reference_image_id };
};

const getDogName = async () => {};

const getAllDogs = async () => {};

const createDog = async () => {};

const cleanInformation = async (list) =>
  await list.map(({ weight, height, name, life_span, reference_image_id }) => {
    {
      weight, height, name, life_span, reference_image_id;
    }
  });

module.exports = {
  getDogId,
  getDogName,
  getAllDogs,
  createDog,
};
