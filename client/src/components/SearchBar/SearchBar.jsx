import style from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div>
      <input className={style.input} type="text" placeholder="Search"></input>
      <div>
        <i className={style.search}></i>
      </div>
    </div>
  );
}
