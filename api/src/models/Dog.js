const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      image: { type: DataTypes.STRING },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 100],
        },
      },
      weight: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 10],
        },
      },
      height: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 10],
        },
      },
      life_span: {
        type: DataTypes.STRING,
        validate: {
          len: [6, 15],
        },
      },
      create: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { timestamps: false }
  );
};

/* iD.*
Imagen.*
Nombre.*
Peso.*
Altura.*
Años de vida.* */
