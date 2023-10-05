import style from "./Card.module.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function Card({ id, name, image, temperament, weight }) {
  return (
    <div className={style.container}>
      <picture className={style.containerImage}>
        <NavLink to={`/detail/${id}`}>
          <img className={style.imagen} src={image} alt="" />
        </NavLink>
      </picture>
      <h3 className={style.name}>{name}</h3>
      <div className={style.info}>
        <div className={style.containerTemperament}>
          {temperament &&
            temperament.split(",").map((temp, index) => {
              return (
                <span className={style.temperament} key={index}>
                  {temp.trim()}
                </span>
              );
            })}
        </div>
        <p className={style.weight}>Weight: {weight} kg</p>
      </div>
    </div>
  );
}
Card.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  image: PropTypes.string,
  temperament: PropTypes.string,
  weight: PropTypes.string,
};

export default Card;
