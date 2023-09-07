const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { URL_BASE } = process.env;

const getDogId = async (isApi, id) => {
  const dogId = isApi
    ? (await axios.get(`${URL_BASE}/breeds/${id}`)).data
    : await Dog.findBypk(id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

  const { weight, height, name, life_span, reference_image_id } = dogId;
  const image = isApi
    ? (await axios.get(`${URL_BASE}/images/${reference_image_id}`)).data.url
    : dogId.image;

  return { id, weight, height, name, life_span, image };
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
