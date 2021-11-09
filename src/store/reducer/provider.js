import * as actionType from "../actionType";

const initialState = {
  provider: null,
  providerList: []
};

const provider = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PROVIDER_DETAILS: {
      return {
        ...state,
        providerDetails: action.value,
      };
    }
    case actionType.SET_PROVIDER_LIST:
      return {
        ...state,
        providerList: action.value
      }
    default:
      return state;
  }
};

export default provider;
