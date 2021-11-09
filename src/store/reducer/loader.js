import * as actionType from "../actionType";

const initialState = {
  error: false,
  loading: false,
  errorMsg: ''
};

const loader = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_LOADER: {
      return {
        ...state,
        loading: action.value,
      };
    }
    case actionType.SET_ERROR: {
      console.log(action.value);
      return {
        ...state,
        error: action.value,
      };
    }
    case actionType.SET_ERROR_MSG: {
      return {
        ...state,
        errorMsg: action.value
      }
    }
    default:
      return state;
  }
};
export default loader;
