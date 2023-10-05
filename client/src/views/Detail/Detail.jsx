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
        <div className={style.detail}>
          <picture className={style.picture}>
            <img className={style.imagen} src={character.image} alt="" />
          </picture>
          <div className={style.info}>
            <h1 className={style.name}>{character.name}</h1>
            <h2>Date</h2>
            <div className={style.containerRange}>
              <div className={style.range}>
                <span>Weight</span>
                <span>{character.weight} kg</span>
              </div>
              <div className={style.range}>
                <span>Height</span>
                <span>{character.height} cm</span>
              </div>
              <div className={style.range}>
                <span>Life span</span>
                <span>{character.life_span}</span>
              </div>
            </div>

            <h2>Temperament</h2>

            <div className={style.containerTemperament}>
              {character.temperament &&
                character.temperament.split(",").map((temp, index) => {
                  return (
                    <span className={style.temperament} key={index}>
                      {temp.trim()}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
