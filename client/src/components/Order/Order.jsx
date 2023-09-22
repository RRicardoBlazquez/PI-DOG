import { ALPHABET, DEFAULT, WEIGHT } from "../../constantes/constantes";

export default function Order() {
  return (
    <form>
      <fieldset>
        <legend>Order</legend>
        <select name="order">
          <option value={DEFAULT}>Default</option>
          <option value={ALPHABET}>Alphabet</option>
          <option value={WEIGHT}>Weight</option>
        </select>
      </fieldset>
    </form>
  );
}
