export const validate = ({ name, weight, height, life_span, image }) => {
  const regex = /^\d{2}$|^\d{1,2}\s-\s\d{1,2}$/;
  //const yearsFormat = /^(\d{1,2}(\s-\s\d{1,2})?\syears)$/;
  const errors = {};
  if (name.length < 5 || name.length > 100) {
    errors.name = "The name must have more than 5 characters and less than 100";
  } else {
    name.split(/[ ,]+/).forEach((element) => {
      if (element.length > 23)
        errors.name = "words cannot be longer than 23 characters";
    });
  }

  if (!regex.test(weight)) {
    errors.weight =
      "The weight must be a 2-digit number, example: 25 or 25 - 30";
  }

  if (!regex.test(height)) {
    errors.height =
      "The height must be a 2-digit number, example: 45 or 40 - 50";
  }

  if (!regex.test(life_span)) {
    errors.life_span =
      "The life_span must be a 2-digit number, example: 15 or 13 - 18";
  }

  if (!/.(gif|jpeg|jpg|png)$/i.test(image))
    errors.image = "Check that the formats are .gif, .jpeg, .jpg y .png";

  return errors;
};
