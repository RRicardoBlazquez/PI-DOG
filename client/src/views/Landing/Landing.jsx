import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={style.container}>
      <NavLink to={"/home"}>
        <button>ingresar</button>
      </NavLink>
    </div>
  );
}
