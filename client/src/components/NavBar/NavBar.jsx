import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={style.container}>
      <NavLink to="/">BACK</NavLink>
      <NavLink to="/home">HOME</NavLink>
      <NavLink to="/form">CREATE DOG</NavLink>
    </div>
  );
}
