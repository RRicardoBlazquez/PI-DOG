import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";
import { useState } from "react";
import { getDogsByName } from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [nameDog, setNameDog] = useState("");

  const handlerKeyUp = (e) => {
    const { value, keyCode } = e.target;
    if (keyCode === 13) {
      setNameDog(value);
      dispatch(getDogsByName(value));
    }
  };
  const handlerChange = (e) => {
    const { value } = e.target;
    setNameDog(value);
  };

  const handlerButton = (e) => {
    e.preventDefault();
    nameDog && dispatch(getDogsByName(nameDog));
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search"
        onChange={handlerChange}
        onKeyUp={handlerKeyUp}
        className={style.input}
      ></input>
      <button className={style.button} onClick={handlerButton}>
        <i className={style.search}>Buscar</i>
      </button>
    </form>
  );
}
