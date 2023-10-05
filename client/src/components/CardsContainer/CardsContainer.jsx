import Paginated from "../Paginated/Paginated";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import style from "./CardsContainer.module.css";
import { useEffect, useState } from "react";
import { getDogs } from "../../redux/actions";
import Filter from "../Filter/Filter";
import Order from "../Order/Order";
import ShowFilter from "../ShowFilter/ShowFilter";
export default function CardsContainer() {
  const dogFilter = useSelector((state) => state.dogFilter);
  const [index, setIndex] = useState({ firt: 0, last: 8 });
  const [current, setCurrent] = useState(1);
  const [aux, setAux] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dogFilter.length === 0 && dispatch(getDogs());
  }, [dispatch, dogFilter.length]);

  let listDogs = dogFilter
    .map((dog) => {
      return (
        <li key={dog.id}>
          <Card
            id={dog.id}
            name={dog.name}
            image={dog.image}
            weight={dog.weight}
            temperament={dog.temperament}
          />
        </li>
      );
    })
    .slice(index.firt, index.last);
  return (
    <div className={style.container}>
      <Filter />
      <Order aux={aux} setAux={setAux} />
      <ShowFilter />
      {dogFilter ? (
        <ul className={style.containerCards}>{listDogs}</ul>
      ) : (
        <h1>Loading...</h1>
      )}
      <Paginated
        nPerPage={8}
        index={index}
        setIndex={setIndex}
        current={current}
        setCurrent={setCurrent}
      />
    </div>
  );
}
