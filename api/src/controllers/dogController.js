const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { setTemperament } = require("./temperamentController");
const { URL_BASE, URL_IMAGE } = process.env;
let loadTemperament = true;
//const weightFormatRegex = /^\d+\s*-\s*\d+$/;

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
    ...cleanInformation(listDogApiRaw),
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
  if (loadTemperament) {
    loadTemperament = false;
    await dogsApi.map(async (r) => await setTemperament(r.temperament));
  }

  return [...cleanInformationBase(dogsBase), ...cleanInformation(dogsApi)];
};

const createDog = async ({
  weight,
  height,
  name,
  life_span,
  image,
  temperament,
}) => {
  if (
    !(await dogValidate({
      weight,
      height,
      name,
      life_span,
      image,
    }))
  )
    throw new Error("Error date invalid");
  const newDog = await Dog.create({
    weight,
    height,
    name,
    life_span,
    image,
  });
  let temperaments = await setTemperament(temperament);
  if (temperaments) {
    const listTemperamentId = temperaments.map((t) => t.id);
    newDog.addTemperaments(listTemperamentId);
  }
  return newDog;
};

const dogValidate = async ({ weight, height, name, life_span, image }) => {
  let valido = true;
  const dog = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `${name}`,
      },
    },
  });
  if (dog.length) return false;
  return valido;
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

const cleanInformation = (list) => {
  let image = "";
  return list.map(
    ({
      id,
      weight,
      height,
      name,
      life_span,
      reference_image_id,
      temperament,
    }) => {
      //15, 125 y 212
      id === 15 || id === 125 || id === 212
        ? (image = `${URL_IMAGE}/${reference_image_id}.png`)
        : (image = `${URL_IMAGE}/${reference_image_id}.jpg`);

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
