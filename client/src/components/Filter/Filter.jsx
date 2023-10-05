import { useEffect, useState } from "react";
import {
  ALL,
  API,
  BASE,
  FILTER_CREATE,
  FILTER_TEMPERAMENTS,
} from "../../constantes/constantes";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilterTemperament,
  deleteAllFilterTemperament,
  dogFilter,
} from "../../redux/actions";
import Temperament from "../Temperament/Temperament";
import style from "./Filter.module.css";

export default function Filter() {
  const dispatch = useDispatch();
  const filterTemperament = useSelector((state) => state.filterTemperament);
  const [filter, setFilter] = useState({
    created: ALL,
    temperament: ALL,
  });

  useEffect(() => {
    return () => {
      dispatch(deleteAllFilterTemperament());
    };
  }, []);

  const handlerChange = (eventFilter) => {
    const { name, value } = eventFilter.target;
    switch (name) {
      case FILTER_CREATE:
        setFilter({ ...filter, created: value });
        break;
      case FILTER_TEMPERAMENTS:
        setFilter({ ...filter, temperament: value });
        if (value !== ALL) dispatch(addFilterTemperament(value));
        break;
      default:
        break;
    }
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(dogFilter({ ...filter }));
  };
  const handlerDelete = () => {
    setFilter({ ...filter, created: ALL, temperament: ALL });
    dispatch(deleteAllFilterTemperament());
    dispatch(
      dogFilter({
        created: ALL,
        temperament: ALL,
      })
    );
  };

  let listSelect = filterTemperament.map((temp, index) => {
    return <li key={index}>{temp}</li>;
  });

  return (
    <form className={style.containerGeneral}>
      <section className={style.container}>
        <h2>Filter</h2>
        <label>
          Origin Dogs :
          <select name={FILTER_CREATE} onChange={handlerChange}>
            <option value={ALL}>All </option>
            <option value={BASE}>Created </option>
            <option value={API}>Api </option>
          </select>
        </label>
        <label>
          {" "}
          Temperament :
          <Temperament handlerTemperament={handlerChange} />
        </label>
        <div className={style.containerButton}>
          <button type="submit" onClick={handlerSubmit}>
            Filter
          </button>
          <button onClick={handlerDelete}>Cancel</button>
        </div>
        <ul className={style.listTemperament}>
          {listSelect.length !== 0 && listSelect}
        </ul>
      </section>
    </form>
  );
}
