const getDogHandler = async (req, res) => {
  res.status(200).send("Estoy en get dog handler");
};
const getDogsHandler = async (req, res) => {
  res.status(200).send("Estoy en get dogs handler");
};

const postDogHandler = async (req, res) => {
  res.status(200).send("Estoy en post dog handler");
};

module.exports = {
  getDogHandler,
  getDogsHandler,
  postDogHandler,
};
