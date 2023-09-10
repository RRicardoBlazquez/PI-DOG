const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { setTemperament } = require("./temperamentController");
const { URL_BASE, API_KEY } = process.env;

const getDogId = async (isApi, id) => {
  const dogId = isApi ? await getDogIdApi(id) : await getDogIdBase(id);
  return { ...dogId };
};

const getDogIdBase = async (id) => {
  const dogId = await Dog.findByPk(id, {
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  return cleanInformationBase([dogId]).pop();
};

const getDogIdApi = async (id) => {
  const dogIdRaw = (await axios.get(`${URL_BASE}/breeds/${id}`)).data;
  return { ...(await cleanInformation([dogIdRaw])).pop() };
};

const getDogName = async (name) => {
  const listDogBaseRaw = await Dog.findAll({
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
  const listDogApiRaw = (await axios.get(`${URL_BASE}/breeds/search?q=${name}`))
    .data;

  return [
    ...cleanInformationBase(listDogBaseRaw),
    ...(await cleanInformation(listDogApiRaw)),
  ];
};

const getAllDogs = async () => {
  const dogsBase = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  const dogsApi = (await axios.get(`${URL_BASE}/breeds`)).data;
  const listDogsApi = await cleanInformation(dogsApi);

  return [...cleanInformationBase(dogsBase), ...listDogsApi];
};

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

const getImageApi = async (reference_image_id) => {
  return (await axios.get(`${URL_BASE}/images/${reference_image_id}`)).data.url;
};

const cleanInformationBase = (list) => {
  return list.map(
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
};

const cleanInformation = async (list) => {
  return list.map(
    async ({
      id,
      weight,
      height,
      name,
      life_span,
      reference_image_id,
      temperament,
    }) => {
      const image = `${URL_BASE}/images/${reference_image_id}.jpg`;
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
