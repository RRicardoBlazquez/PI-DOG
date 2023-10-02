import axios from "axios";
import {
  ADD_FILTER_TEMPERAMENT,
  DELETE_ALL_FILTER_TEMPERAMENT,
  DELETE_FILTER_TEMPERAMENT,
  FILTER_DOG,
  GET_DOGS,
  GET_NAME_DOGS,
  GET_TEMPERAMENTS,
  ORDER_ALPHABET,
  ORDER_WEIGHT,
} from "./constantesRedux";
import { ALPHABET } from "../constantes/constantes";
const BASE_URL = import.meta.env.VITE_URL_BASE;

export const getDogs = () => {
  return async function (dispatch) {
    const apiData = await axios(`${BASE_URL}dog/`);
    let dogsList = apiData.data;
    dispatch({ type: GET_DOGS, payload: [...dogsList] });
  };
};

export const getDogsByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios(`${BASE_URL}dog/?name=${name}`);
    let dogsList = apiData.data;
    dispatch({ type: GET_NAME_DOGS, payload: [...dogsList] });
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    const apiData = await axios(`${BASE_URL}temperament/`);
    let temperamentList = apiData.data;
    dispatch({ type: GET_TEMPERAMENTS, payload: [...temperamentList] });
  };
};

export const orderDogs = (order, typeOrder) => {
  return {
    type: order === ALPHABET ? ORDER_ALPHABET : ORDER_WEIGHT,
    payload: typeOrder,
  };
};

export const dogFilter = (filter) => {
  return { type: FILTER_DOG, payload: filter };
};

export const addFilterTemperament = (temperament) => {
  return { type: ADD_FILTER_TEMPERAMENT, payload: temperament };
};

export const deleteFilterTemperament = (temperament) => {
  return { type: DELETE_FILTER_TEMPERAMENT, payload: temperament };
};

export const deleteAllFilterTemperament = () => {
  return { type: DELETE_ALL_FILTER_TEMPERAMENT, payload: [] };
};
