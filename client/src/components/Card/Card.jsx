export default function Card({ name, image, temperament }) {
  return (
    <div>
      <picture>
        <img src={image} alt="" />
      </picture>
      <h1>{name}</h1>
    </div>
  );
}
