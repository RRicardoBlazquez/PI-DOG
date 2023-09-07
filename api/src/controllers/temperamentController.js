const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { URL_BASE } = process.env;

const setTemperament = async (listTemperaments) => {
  let newListTemperament = await Promise.all(
    listTemperaments.map(async (nameTemp) => {
      const [temperament, created] = await Temperament.findOrCreate({
        where: { name: nameTemp },
      });
      return temperament;
    })
  );
  return newListTemperament;
};

module.exports = {
  setTemperament,
};
