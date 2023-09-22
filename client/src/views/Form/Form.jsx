import { useState } from "react";
import { validate } from "./validation";

export default function Form() {
  const [newDog, setNewDog] = useState({
    name: "",
    weight: "",
    height: "",
    life_span: "",
    image: "",
    temperament: "",
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setErrors(validate({ ...newDog, [name]: value }));
    setNewDog({ ...newDog, [name]: value });
  };

  let listForm = Object.keys(newDog)
    .map((prop, index) => {
      return (
        <li key={index}>
          <label>{prop.charAt(0).toUpperCase() + prop.slice(1)}</label>
          <input
            type={"text"}
            name={prop}
            value={newDog[prop]}
            placeholder={`${prop}...`}
            onChange={changeHandler}
          />
          {errors[prop] && <span>{errors[prop]}</span>}
        </li>
      );
    })
    .slice(0, 5);

  return (
    <form>
      <fieldset>
        <ul>{listForm}</ul>
      </fieldset>
    </form>
  );
}
