const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { setTemperament } = require("./temperamentController");
const { URL_BASE } = process.env;

const getDogId = async (isApi, id) => {
  const dogId = isApi
    ? (await axios.get(`${URL_BASE}/breeds/${id}`)).data
    : await Dog.findByPk(id, {
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
  const temperament = isApi ? dogId.temperament : dogId?.map((t) => t.name);

  return { id, weight, height, name, life_span, image, temperament };
};

const getDogName = async (name) => {
  let listDog = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  let listDogApiRaw = (await axios.get(`${URL_BASE}/breeds/search?q=${name}`))
    .data;

  let listDogApi = await cleanInformation(listDogApiRaw);

  return [...listDogApi, ...listDog];
};

const getAllDogs = async () => {};

const createDog = async ({
  weight,
  height,
  name,
  life_span,
  image,
  temperament,
}) => {
  const newDog = await Dog.create({
    weight,
    height,
    name,
    life_span,
    image,
    created: true,
  });
  let temperaments = await setTemperament(temperament);

  const listTemperamentId = temperaments.map((t) => t.id);
  newDog.addTemperaments(listTemperamentId);
  return newDog;
};

const cleanInformation = async (list) => {
  const newListDog = await Promise.all(
    list.map(
      async ({ id, weight, height, name, life_span, reference_image_id }) => {
        const image = (
          await axios.get(`${URL_BASE}/images/${reference_image_id}`)
        ).data.url;
        return {
          id,
          weight: weight.metric,
          height: height.metric,
          name,
          life_span,
          image: image,
        };
      }
    )
  );
  return newListDog;
};

module.exports = {
  getDogId,
  getDogName,
  getAllDogs,
  createDog,
};
