import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={style.container}>
      <div className={style.containerButton}>
        <h1>Many Dogs</h1>
        <NavLink to={"/home"}>
          <button className={style.button}>Start</button>
        </NavLink>
      </div>
    </div>
  );
}
