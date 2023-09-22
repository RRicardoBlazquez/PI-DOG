//import { useDispatch } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
//import Filter from "../../components/Filter/Filter";
import SearchBar from "../../components/SearchBar/SearchBar";
//import { useEffect } from "react";
//import { getDogs } from "../../redux/actions";
import style from "./Home.module.css";
//import Order from "../../components/Order/Order";

export default function Home() {
  return (
    <div className={style.container}>
      <h1>Titulo: Pi Dog</h1>
      <SearchBar />
      <CardsContainer />
    </div>
  );
}
