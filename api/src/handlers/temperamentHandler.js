const { getTemperaments } = require("../controllers/temperamentController");

const temperamentHandler = async (req, res) => {
  try {
    const listTemperaments = await getTemperaments();
    res.status(200).json(listTemperaments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  temperamentHandler,
};
