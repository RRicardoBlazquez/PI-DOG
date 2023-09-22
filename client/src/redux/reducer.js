import { ALL, API } from "../constantes/constantes";
import {
  GET_DOGS,
  GET_NAME_DOGS,
  GET_TEMPERAMENTS,
  FILTER_DOG,
} from "./constantesRedux";
const initialState = {
  dogAll: [],
  dogFilter: [],
  temperament: [],
};

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
      return { ...state, dogFilter: payload, dogAll: payload };

    case FILTER_DOG: {
      let dogsList =
        payload.filterCreated === ALL
          ? [...state.dogAll]
          : state.dogAll.filter((dog) => {
              return payload.filterCreated === API
                ? dog.create === false
                : dog.create === true;
            });

      if (payload.filterTemperament !== ALL)
        dogsList = dogsList.filter((dog) => {
          return (
            dog.temperament &&
            dog.temperament.includes(payload.filterTemperament)
          );
        });

      return { ...state, dogFilter: [...dogsList] };
    }

    default:
      return { ...state };
  }
};

export default rootReducer;
