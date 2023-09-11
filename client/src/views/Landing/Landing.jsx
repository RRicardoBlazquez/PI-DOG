import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <NavLink to={"/home"}>
        <button>ingresar</button>
      </NavLink>
    </div>
  );
}
