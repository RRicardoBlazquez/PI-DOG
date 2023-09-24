import { useDispatch, useSelector } from "react-redux";
import { ALL, FILTER_TEMPERAMENTS } from "../../constantes/constantes";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { getTemperaments } from "../../redux/actions";

function Temperament({ handlerTemperament }) {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperament);
  const loading = (temperaments) => {
    return temperaments.length === 0 ? true : false;
  };

  useMemo(() => {
    temperaments.length === 0 && dispatch(getTemperaments());
  }, [temperaments.length, dispatch]);

  const listTemperament = temperaments?.map((name, index) => {
    return (
      <option key={index} value={name}>
        {name}
      </option>
    );
  });

  return (
    <select name={FILTER_TEMPERAMENTS} onChange={handlerTemperament}>
      <option value={ALL}>Default</option>
      {loading(temperaments) ? "Loading..." : listTemperament}
    </select>
  );
}

Temperament.propTypes = {
  handlerTemperament: PropTypes.func,
};

export default Temperament;
