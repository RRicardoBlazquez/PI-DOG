//import { useDispatch } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
//import Filter from "../../components/Filter/Filter";

//import { useEffect } from "react";
//import { getDogs } from "../../redux/actions";
import style from "./Home.module.css";
//import Order from "../../components/Order/Order";

export default function Home() {
  return (
    <div className={style.container}>
      <CardsContainer />
    </div>
  );
}
