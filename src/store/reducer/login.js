import * as actionType from "../actionType";

const initialState = {
  isValidUser: false,
  isUserExist: true,
  patientData: null,
  otpError: false,
  errorMsg: "",
  resetData: null,
  emailData: false,
  maxAttempt:false,
  showAnotherWayOtpField: false
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USER: {
      return {
        ...state,
        isValidUser: action.value,
        isUserExist: action.value,
      };
    }
    case actionType.SET_IS_USER_EXSIST: {
      return {
        ...state,
        isUserExist: action.value,
      };
    }
    case actionType.SET_PATIENT_DATA: {
      return {
        ...state,
        patientData: action.value,
      };
    }
    case actionType.SET_OTP_ERROR: {
      return {
        ...state,
        otpError: action.value,
      };
    }
    case actionType.SET_NEW_USER: {
      return {
        ...state,
        isNewUser: !action.value.isUserExist,
        errorMsg: action.value.message,
      };
    }
    case actionType.SET_RESET_DATA: {
      return {
        ...state,
        resetData: action.value,
      };
    }
    case actionType.SET_EMAIL_VALID: {
      return {
        ...state,
        emailData: action.value,
      };
    }
    case actionType.SET_MAX_ATTEMPT: {
      return {
        ...state,
        maxAttempt: action.value,
      };
    }
    case actionType.SET_ANOTHER_WAY_OTP_FIELD: {
      return {
        ...state,
        showAnotherWayOtpField: action.value
      }
    }
    default:
      return state;
  }
};
export default login;
