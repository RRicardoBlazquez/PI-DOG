import style from "./Detail.module.css";
import { useParams } from "react-router-dom";
import useDogById from "../../hooks/useDogById";

export default function Detail() {
  const { id } = useParams();

  const { character, loading } = useDogById(id);

  return (
    <div className={style.container}>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <picture className={style.containerImage}>
            <img className={style.imagen} src={character.image} alt="" />
          </picture>
          <h1 className={style.name}>{character.name}</h1>
          <p>{character.height} CM</p>
          <p>{character.weight} kg</p>
          <p>{character.temperament} </p>
          <p>{character.life_span}</p>
        </>
      )}
    </div>
  );
}
