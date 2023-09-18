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

  const handlerButton = () => {
    nameDog && dispatch(getDogsByName(nameDog));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={handlerChange}
        onKeyUp={handlerKeyUp}
      ></input>
      <div onClick={handlerButton}>
        <i className={style.search}>buscar</i>
      </div>
    </div>
  );
}
