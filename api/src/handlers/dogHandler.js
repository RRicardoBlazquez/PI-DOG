const { getDogId } = require("../controllers/dogController");

const getDogHandler = async (req, res) => {
  const { id } = req.params;
  const isApi = isNaN(id) ? false : true;

  try {
    const detail = await getDogId(isApi, id);
    res.status(200).json(detail);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
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
