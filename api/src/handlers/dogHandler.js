const getDogHandler = async (req, res) => {
  res.status(200).send("Estoy en get dog handler");
};

module.exports = {
  getDogHandler,
};
