import Paginated from "../Paginated/Paginated";
import Card from "../Card/Card";

export default function CardsContainer() {
  return (
    <div>
      <Paginated />
      <Card />
      <Paginated />
    </div>
  );
}
