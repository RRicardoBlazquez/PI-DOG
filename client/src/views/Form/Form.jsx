import { useState } from "react";
import { validate } from "./validation";
import Temperament from "../../components/Temperament/Temperament";
import axios from "axios";
import Card from "../../components/Card/Card";
const BASE_URL = import.meta.env.VITE_URL_BASE;

export default function Form() {
  const [ready, setReady] = useState(false);
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
    let { name, value } = event.target;
    setErrors(validate({ ...newDog, [name]: value }));
    setNewDog({ ...newDog, [name]: value });
  };
  const handlerTemperament = (event) => {
    const { value } = event.target;
    if (!includesTemperament(value))
      newDog.temperament.length === 0
        ? setNewDog({ ...newDog, temperament: value })
        : setNewDog({
            ...newDog,
            temperament: newDog.temperament + "," + value,
          });
  };
  function includesTemperament(newTemperament) {
    let listTemperaments = newDog.temperament.split(",").map((t) => t.trim());
    return listTemperaments.includes(newTemperament);
  }

  const handlerSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(newDog));
    if (Object.keys(validate(newDog)).length === 0) {
      axios
        .post(`${BASE_URL}dog`, { ...newDog })
        .then((response) => {
          alert("The breed was successfully created");
          setReady(true);
          setErrors({});
        })
        .catch((error) => alert(error));
    } else alert("Error complete the form correctly");
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
      <ul>{listForm}</ul>
      <Temperament handlerTemperament={handlerTemperament} />
      <button type="submit" onClick={handlerSubmit}>
        Create
      </button>
      <Card
        name={newDog.name}
        image={newDog.image}
        weight={"00"}
        temperament={newDog.temperament}
      />
    </form>
  );
}
