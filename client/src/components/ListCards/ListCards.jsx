import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./ListCards.module.css";
import Loading from "../Loading/Loading";

function ListCards(params) {
  const { index } = params;
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
    .slice(index.firt, index.last);

  return (
    <>
      {dogFilter.length !== 0 ? (
        <ul className={style.containerCards}>{listDogs}</ul>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ListCards;
