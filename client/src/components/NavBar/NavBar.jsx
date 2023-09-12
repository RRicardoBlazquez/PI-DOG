import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <NavLink to="/">BACK</NavLink>
      <NavLink to="/home">HOME</NavLink>
      <NavLink to="/form">CREATE DOG</NavLink>
    </div>
  );
}
