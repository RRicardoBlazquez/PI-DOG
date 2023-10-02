import PropTypes from "prop-types";
import style from "./Formulario.module.css";

function Formulario({ newDog, changeHandler, errors }) {
  let listForm = Object.keys(newDog)
    .map((prop, index) => {
      if (prop === "name" || prop === "image") {
        return (
          <li key={index}>
            <h3>{prop.charAt(0).toUpperCase() + prop.slice(1)}</h3>
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
      } else {
        return (
          <li key={index}>
            <h3>{prop.charAt(0).toUpperCase() + prop.slice(1)}</h3>
            <span>Min</span>
            <input
              className={style.range}
              type={"text"}
              name={`${prop}.min`}
              value={newDog[prop].min}
              placeholder={`${prop}...`}
              onChange={changeHandler}
            />
            <span>Max</span>
            <input
              className={style.range}
              type={"text"}
              name={`${prop}.max`}
              value={newDog[prop].max}
              placeholder={`${prop}...`}
              onChange={changeHandler}
            />
            {errors[prop] && <span>{errors[prop]}</span>}
          </li>
        );
      }
    })
    .slice(0, 5);
  return <ul>{listForm}</ul>;
}

Formulario.propTypes = {
  newDog: PropTypes.object,
  changeHandler: PropTypes.func,
  errors: PropTypes.object,
};

export default Formulario;
