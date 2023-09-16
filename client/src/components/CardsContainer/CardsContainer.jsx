import Paginated from "../Paginated/Paginated";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import style from "./CardsContainer.module.css";
import { useState } from "react";
export default function CardsContainer() {
  const dogFilter = useSelector((state) => state.dogFilter);
  const [index, setIndex] = useState({ firt: 0, last: 8 });

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
    <div>
      <Paginated nPerPage={8} index={index} setIndex={setIndex} />
      {dogFilter ? (
        <ul className={style.container}>{listDogs}</ul>
      ) : (
        <h1>cargando...</h1>
      )}
    </div>
  );
}
