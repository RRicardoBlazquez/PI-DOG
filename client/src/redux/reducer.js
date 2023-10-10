import { ALL, ALPHABET, API, DEFAULT, WEIGHT } from "../constantes/constantes";
import {
  GET_DOGS,
  GET_NAME_DOGS,
  GET_TEMPERAMENTS,
  FILTER_DOG,
  ADD_FILTER_TEMPERAMENT,
  DELETE_FILTER_TEMPERAMENT,
  ORDER_ALPHABET,
  ORDER_WEIGHT,
  DELETE_ALL_FILTER_TEMPERAMENT,
} from "./constantesRedux";
const initialState = {
  dogAll: [],
  dogFilter: [],
  temperament: [],
  filterTemperament: [],
  filterOrigin: "ALL",
  showFilter: [],
  orderDogs: { order: DEFAULT, typeOrder: ALL },
};
function getPeso(peso) {
  if (peso === "NaN" || peso === undefined) {
    return 0;
  }
  const pesos = peso.split(" - ");
  if (pesos.length === 1) {
    return parseInt(pesos[0]);
  }
  const minPeso = parseInt(pesos[0]);
  const maxPeso = parseInt(pesos[1]);
  return (minPeso + maxPeso) / 2;
}

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogFilter: [...payload],
        dogAll: [...payload],
      };

    case GET_NAME_DOGS:
      return { ...state, dogFilter: payload };

    case GET_TEMPERAMENTS:
      return { ...state, temperament: payload };

    case FILTER_DOG: {
      let dogsList =
        payload.created === ALL
          ? [...state.dogAll]
          : state.dogAll.filter((dog) => {
              return payload.created === API
                ? dog.create === false
                : dog.create === true;
            });

      dogsList = getDogsFilterByTemperament(state, payload, dogsList);

      return {
        ...state,
        dogFilter: [...dogsList],
        filterTemperament:
          payload.temperament === ALL ? [] : [...state.filterTemperament],
        showFilter:
          payload.temperament === ALL ? [] : [...state.filterTemperament],
        filterOrigin: payload.created,
      };
    }
    case ADD_FILTER_TEMPERAMENT:
      return {
        ...state,
        filterTemperament: state.filterTemperament.includes(payload)
          ? [...state.filterTemperament]
          : [...state.filterTemperament, payload],
      };
    case DELETE_FILTER_TEMPERAMENT: {
      let listTemperament = state.filterTemperament.filter(
        (temp) => temp !== payload
      );
      return {
        ...state,
        filterTemperament: [...listTemperament],
        showFilter: [...listTemperament],
      };
    }
    case DELETE_ALL_FILTER_TEMPERAMENT: {
      return {
        ...state,
        filterTemperament: [],
      };
    }
    case ORDER_ALPHABET: {
      let listOrder = state.dogFilter.sort((a, b) =>
        payload === "A"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      return {
        ...state,
        dogFilter: [...listOrder],
        orderDogs: { ...state.orderDogs, order: ALPHABET, typeOrder: payload },
      };
    }
    case ORDER_WEIGHT: {
      let listOrder = state.dogFilter.sort((a, b) =>
        payload === "A"
          ? getPeso(a.weight) - getPeso(b.weight)
          : getPeso(b.weight) - getPeso(a.weight)
      );
      return {
        ...state,
        dogFilter: [...listOrder],
        orderDogs: { ...state.orderDogs, order: WEIGHT, typeOrder: payload },
      };
    }

    default:
      return { ...state };
  }
};

function getDogsFilterByTemperament(state, payload, dogsList) {
  if (payload.temperament === ALL) return dogsList;
  let newListDog;
  newListDog = dogsList.filter((dog) => {
    //compruebo temperamentos para no tener un error acceso
    if (dog.temperament === undefined) return false;
    //preparo los temperamentos en un array
    const dogTemperamentos = dog.temperament
      .split(",")
      .map((temp) => temp.trim());
    //utilizo every para devolver true si todos los temp. estan incluidos
    return state.filterTemperament.every((temperamento) =>
      dogTemperamentos.includes(temperamento)
    );
  });

  return [...newListDog];
}

export default rootReducer;
