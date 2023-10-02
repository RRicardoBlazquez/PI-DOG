export const validate = ({
  name,
  weight,
  height,
  life_span,
  image,
  temperament,
}) => {
  let errors = {};
  if (name.length < 5 || name.length > 100) {
    errors.name = "The name must have more than 5 characters and less than 100";
  } else {
    name.split(/[ ,]+/).forEach((element) => {
      if (element.length > 23)
        errors.name = "words cannot be longer than 23 characters";
    });
  }
  let newError = "";
  newError = verificarPropRange(weight);
  newError !== "" && (errors.weight = newError);
  newError = verificarPropRange(height);
  newError !== "" && (errors.height = newError);
  newError = verificarPropRange(life_span);
  newError !== "" && (errors.life_span = newError);

  if (!/.(gif|jpeg|jpg|png)$/i.test(image))
    errors.image = "Check that the formats are .gif, .jpeg, .jpg y .png";

  if (temperament === "")
    errors.temperament = "select at least one temperament";

  if (temperament !== "" && temperament.split(",").length > 6)
    errors.temperament = "You can only select up to 6 temperaments";

  return errors;
};
function verificarPropRange(prop) {
  let newError = "";
  if (!prop.min || !prop.max) {
    return "Fields must not be empty";
  }
  if (parseInt(prop.min, 10) > parseInt(prop.max, 10)) {
    newError =
      "The minimum and maximum weight must be a 2-digit number and min must be less than max.";
  }
  if (!verificarString(prop.min) || !verificarString(prop.max)) {
    newError =
      "The weight must be a 2-digit number and min must be less than max.";
  }
  return newError;
}

function verificarString(string) {
  if (
    typeof string !== "undefined" &&
    string.length <= 2 &&
    /^[0-9]+$/.test(string)
  ) {
    return true; // El string cumple con las condiciones
  }
  return false; // El string no cumple con las condiciones
}

export const cleanNewDog = (dog) => {
  let newDog = {
    name: dog.name,
    weight: `${dog.weight.min} - ${dog.weight.max}`,
    height: `${dog.height.min} - ${dog.height.max}`,
    life_span: `${dog.life_span.min} - ${dog.life_span.max}`,
    image: dog.image,
    temperament: dog.temperament,
  };
  return { ...newDog };
};
