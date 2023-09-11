const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { URL_BASE } = process.env;

const setTemperament = async (listTemperaments) => {
  if (!listTemperaments) return [];
  let newListTemperament = await Promise.all(
    listTemperaments.split(",").map(async (nameTemp) => {
      let temperamentName = nameTemp.trim();
      const [temperament, created] = await Temperament.findOrCreate({
        where: { name: temperamentName },
      });
      return temperament;
    })
  );
  return newListTemperament;
};

const getTemperaments = async () => {
  return (await Temperament.findAll()).map((t) => t.name);
};

module.exports = {
  setTemperament,
  getTemperaments,
};
