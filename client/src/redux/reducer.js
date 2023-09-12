import {
  GET_DOGS,
  GET_NAME_DOGS,
  GET_FILTER_CREATE,
  GET_FILTER_TEMPERAMENTS,
  GET_TEMPERAMENTS,
} from "./constantesRedux";
const initialState = {
  dogAll: [],
  dogFilter: [],
  temperament: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DOGS:
      return { ...state, dogFilter: payload, dogAll: payload };

    case GET_NAME_DOGS:
      return { ...state, dogFilter: payload, dogAll: payload };

    case GET_TEMPERAMENTS:
      return { ...state, dogFilter: payload, dogAll: payload };

    case GET_FILTER_CREATE:
      return { ...state, dogFilter: payload, dogAll: payload };

    case GET_FILTER_TEMPERAMENTS:
      return { ...state, dogFilter: payload, dogAll: payload };

    default:
      break;
  }
};

export default rootReducer;
