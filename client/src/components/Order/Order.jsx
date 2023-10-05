import { useDispatch } from "react-redux";
import { ALL, ALPHABET, DEFAULT, WEIGHT } from "../../constantes/constantes";
import PropTypes from "prop-types";
import { orderDogs } from "../../redux/actions";
import { useState } from "react";
import style from "./Order.module.css";

function Order({ aux, setAux }) {
  const [order, setOrder] = useState(DEFAULT);
  const dispatch = useDispatch();

  const handlerChange = (eventOrder) => {
    const { name, value } = eventOrder.target;
    switch (name) {
      case "order":
        setOrder(value);
        break;
      case "typeOrder":
        if (value !== ALL) {
          dispatch(orderDogs(order, value));
          setAux(!aux);
        }
        break;

      default:
        break;
    }
  };
  return (
    <form>
      <section className={style.container}>
        <h2>Order</h2>
        <select onChange={handlerChange} name="order">
          <option value={DEFAULT}>Default</option>
          <option value={ALPHABET}>Alphabet</option>
          <option value={WEIGHT}>Weight</option>
        </select>
        {order !== DEFAULT && (
          <select onChange={handlerChange} name="typeOrder">
            <option value={ALL}>Default</option>
            <option value={"A"}>
              {order === ALPHABET ? "Aa...Zz" : "ASCENDING"}
            </option>
            <option value={"D"}>
              {order === ALPHABET ? "Zz...Aa" : "DECENDING"}
            </option>
          </select>
        )}
      </section>
    </form>
  );
}

Order.propTypes = {
  aux: PropTypes.any,
  setAux: PropTypes.func,
};

export default Order;
