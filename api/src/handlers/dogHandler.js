const {
  getDogId,
  getDogName,
  getAllDogs,
  createDog,
} = require("../controllers/dogController");

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
  const { name } = req.query;

  try {
    let listRecipes = name ? await getDogName(name) : await getAllDogs();
    res.status(200).json(listRecipes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postDogHandler = async (req, res) => {
  let { weight, height, name, life_span, image, temperament } = req.body;

  try {
    const newDog = await createDog({
      weight,
      height,
      name,
      life_span,
      image,
      temperament,
    });
    res.status(200).json(newDog);
  } catch (error) {}
};

module.exports = {
  getDogHandler,
  getDogsHandler,
  postDogHandler,
};
