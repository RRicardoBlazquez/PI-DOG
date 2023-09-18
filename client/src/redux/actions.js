import axios from "axios";
import { GET_DOGS, GET_NAME_DOGS } from "./constantesRedux";
const BASE_URL = import.meta.env.VITE_URL_BASE;

export const getDogs = () => {
  return async function (dispatch) {
    const apiData = await axios(`${BASE_URL}dog/`);
    let dogsList = apiData.data;
    dispatch({ type: GET_DOGS, payload: dogsList });
  };
};

export const getDogsByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios(`${BASE_URL}dog/?name=${name}`);
    let dogsList = apiData.data;
    dispatch({ type: GET_NAME_DOGS, payload: dogsList });
  };
};

export const getTemperaments = () => {};

export const orderDogs = () => {};

export const dogFilter = (filter) => {};
