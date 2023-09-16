import style from "./Card.module.css";

export default function Card({ name, image, temperament, weight }) {
  return (
    <div className={style.container}>
      <picture className={style.containerImage}>
        <img className={style.containerImage} src={image} alt="" />
      </picture>
      <h1>{name}</h1>
      <p>{weight} kg</p>
      <p>{temperament} </p>
    </div>
  );
}
