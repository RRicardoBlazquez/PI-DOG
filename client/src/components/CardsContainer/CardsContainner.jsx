import Paginated from "../Paginated/Paginated";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import style from "./CardsContainner.module.css";
export default function CardsContainer() {
  const dogFilter = useSelector((state) => state.dogFilter);

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
    .slice(0, 8);
  return (
    <div>
      <Paginated />
      {dogFilter ? (
        <ul className={style.conteiner}>{listDogs}</ul>
      ) : (
        <h1>cargando...</h1>
      )}
      <Paginated />
    </div>
  );
}
