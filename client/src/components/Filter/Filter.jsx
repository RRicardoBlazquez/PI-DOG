import { useState } from "react";
import { useTemperament } from "../../hooks/useTemperament";
import {
  ALL,
  API,
  BASE,
  FILTER_CREATE,
  FILTER_TEMPERAMENTS,
} from "../../constantes/constantes";
import { useDispatch } from "react-redux";
import { dogFilter } from "../../redux/actions";
const BASE_URL = import.meta.env.VITE_URL_BASE;

export default function Filter() {
  const dispatch = useDispatch();
  const { temperament, loading } = useTemperament(BASE_URL);
  const [filter, setFilter] = useState({
    filterCreated: ALL,
    filterTemperament: ALL,
  });
  const handlerChange = (eventFilter) => {
    const { name, value } = eventFilter.target;
    switch (name) {
      case FILTER_CREATE:
        value === ALL
          ? setFilter({ ...filter, filterCreated: ALL })
          : setFilter({ ...filter, filterCreated: value });
        break;
      case FILTER_TEMPERAMENTS:
        value === ALL
          ? setFilter({ ...filter, filterTemperament: ALL })
          : setFilter({
              ...filter,
              filterTemperament: value,
            });
        break;
      default:
        break;
    }
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(dogFilter({ ...filter }));
  };

  return (
    <form>
      <fieldset>
        <legend>Filter</legend>
        <label>
          Origin Dogs :
          <select name={FILTER_CREATE} onChange={handlerChange}>
            <option value={ALL}>All </option>
            <option value={BASE}>Created </option>
            <option value={API}>Api </option>
          </select>
        </label>
        <label> Temperament : </label>
        <select name={FILTER_TEMPERAMENTS} onChange={handlerChange}>
          <option value={ALL}>All</option>
          {loading
            ? "Loading..."
            : temperament.map((t, index) => (
                <option key={index} value={t}>
                  {t}
                </option>
              ))}
        </select>
        <button type="submit" onClick={handlerSubmit}>
          Filter
        </button>
        <button>Cancel</button>
      </fieldset>
    </form>
  );
}
