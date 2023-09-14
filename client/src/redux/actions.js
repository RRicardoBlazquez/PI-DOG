//import { URL_BASE } from "dotenv";
import axios from "axios";
import { GET_DOGS } from "./constantesRedux";

export const getDogs = () => {
  return async function (dispatch) {
    const apiData = await axios(`http://localhost:3001/dog/`);
    let dogsList = apiData.data;
    dispatch({ type: GET_DOGS, payload: dogsList });
  };
};

export const getDogsByName = () => {};

export const getTemperaments = () => {};

export const orderDogs = () => {};

export const dogFilter = () => {};
