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
  const image = isApi ? await getImageApi(reference_image_id) : dogId.image;
  const temperament = isApi ? dogId.temperament : dogId.temperament;

  return { id, weight, height, name, life_span, image, temperament };
};

const getImageApi = async (reference_image_id) => {
  return (await axios.get(`${URL_BASE}/images/${reference_image_id}`)).data.url;
};

const getDogIdBase = async (id) => {
  const dogId = await Dog.findByPk(id, {
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  dogId.temperament = dogId?.map((t) => t.name);

  return dogId;
};

const getDogIdApi = async (id) => {
  const dogIdRaw = (await axios.get(`${URL_BASE}/breeds/${id}`)).data;
  return { ...(await cleanInformation([dogIdRaw])).pop() };
};

//cambio el array de objetos temperament a uno de string
const refactorTemperament = (temperament) => {
  return temperament.map((t) => t.name).join(",");
};

const getDogName = async (name) => {
  let listDogBaseRaw = await Dog.findAll({
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

  const listDog = listDogBaseRaw.map(
    ({ id, weight, height, name, life_span, image, temperaments, create }) => {
      const newTemperaments = temperaments.map(
        (temperament) => temperament.name
      );
      return {
        id,
        weight,
        height,
        name,
        life_span,
        image,
        temperament: newTemperaments.join(","),
        create,
      };
    }
  );

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
  });
  let temperaments = await setTemperament(temperament);

  const listTemperamentId = temperaments.map((t) => t.id);
  newDog.addTemperaments(listTemperamentId);
  return newDog;
};

const cleanInformation = async (list) => {
  return await Promise.all(
    list.map(
      async ({
        id,
        weight,
        height,
        name,
        life_span,
        reference_image_id,
        temperament,
      }) => {
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
          temperament,
          create: false,
        };
      }
    )
  );
};

module.exports = {
  getDogId,
  getDogIdApi,
  getDogIdBase,
  getDogName,
  getAllDogs,
  createDog,
};
