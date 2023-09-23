import { ALL, FILTER_TEMPERAMENTS } from "../../constantes/constantes";
import { useTemperament } from "../../hooks/useTemperament";
const BASE_URL = import.meta.env.VITE_URL_BASE;
import PropTypes from "prop-types";

function Temperament({ handlerTemperament }) {
  const { temperament, loading } = useTemperament(BASE_URL);
  const listTemperament = temperament?.map((name, index) => {
    return (
      <option key={index} value={name}>
        {name}
      </option>
    );
  });

  return (
    <select name={FILTER_TEMPERAMENTS} onChange={handlerTemperament}>
      <option value={ALL}>Default</option>
      {loading ? "Loading..." : listTemperament}
    </select>
  );
}

Temperament.propTypes = {
  handlerTemperament: PropTypes.func,
};

export default Temperament;
