import * as actionType from "../actionType";

const initialState = {
  specialities: [],
  clinicList: [],
  selectedProviderDetails: {
    firstName: '',
    lastName: '',
    speciality: '',
    selectedDate: '',
    selectedTimeSlot: ''
  }
};

const appointments = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_SPECIALITIES:
      return {
        ...state,
        specialities: action.value,
      };
    case actionType.SET_SELECTED_PROVIDER_DETAILS:
      return {
        ...state,
        selectedProviderDetails: action.value
      };
    case actionType.SET_CLINIC_LIST:
      return {
        ...state,
        clinicList: action.value
      }
    default:
      return state;
  };
};
export default appointments;
