import { useState } from "react";
import { cleanNewDog, validate } from "./validation";
import Temperament from "../../components/Temperament/Temperament";
import axios from "axios";
import style from "./Form.module.css";
import imagen from "../../image/huellas.png";
import Formulario from "../../components/Formulario/Formulario";
const BASE_URL = import.meta.env.VITE_URL_BASE;

export default function Form() {
  const [ready, setReady] = useState(false);
  const [newDog, setNewDog] = useState({
    name: "",
    weight: { min: "", max: "" },
    height: { min: "", max: "" },
    life_span: { min: "", max: "" },
    image: "",
    temperament: "",
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    let { name, value } = event.target;
    if (name === "name" || name === "image" || name === "temperament") {
      setErrors(validate({ ...newDog, [name]: value }));
      setNewDog({ ...newDog, [name]: value });
    } else {
      let prop = name.split(".");

      setErrors(
        validate({
          ...newDog,
          [prop[0]]: { ...newDog[prop[0]], [prop[1]]: value },
        })
      );
      setNewDog({
        ...newDog,
        [prop[0]]: { ...newDog[prop[0]], [prop[1]]: value },
      });
    }
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
    let dog = cleanNewDog(newDog);
    if (Object.keys(validate(newDog)).length === 0) {
      axios
        .post(`${BASE_URL}dog`, { ...dog })
        .then(() => {
          alert("The breed was successfully created");
          setReady(true);
          setErrors({});
        })
        .catch((error) => alert(error));
    } else alert("Error complete the form correctly");
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        <Formulario
          newDog={newDog}
          changeHandler={changeHandler}
          errors={errors}
        />
        <Temperament handlerTemperament={handlerTemperament} />
        <button disabled={ready} type="submit" onClick={handlerSubmit}>
          Create
        </button>
      </form>
      <picture className={style.picture}>
        {newDog.image.length === 0 ? (
          <img className={style.image} src={imagen} alt="Image new dog" />
        ) : (
          <img className={style.image} src={newDog.image} alt="Image new dog" />
        )}
      </picture>
    </div>
  );
}
