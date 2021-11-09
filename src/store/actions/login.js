import * as actionType from "../actionType";
import { setLoading, setError } from "./loader";
import {
  sendOtpService,
  verifyOtpService,
  getDetailsService,
  sendOtpToEmailService,
  verifyQuestionsService,
} from "../../services/Login/login";

export const sendOtp = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    sendOtpService(data)
      .then((res) => {
        dispatch(setLoading(false));
        // dispatch(setError(false));
        if (res && res.data) {
          dispatch(setUser(res.data.isUserExist));
        } else {
          dispatch(setError(true));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        if (err && err.data) {
          dispatch(setError(err.data));
        } else {
          dispatch(setError(true));
        }
      });
  };
};

export const verifyLogin = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    verifyOtpService(data)
    .then((res) => {
      dispatch(setLoading(false));
      let { data } = res;
      if (!data.isOtpValid && data.isOtpValid !== undefined) {
        dispatch(setOtpError(true));
      } else {
        dispatch(setPatientData(data.response));
        dispatch(setError(false));
        dispatch(setOtpError(false));
      }
    })
      .catch((err) => {
        dispatch(setLoading(false));
        if (
          err &&
          err.data
        ) {
          if (err.data.isMaxAttempts) {
            dispatch(setMaxAttempt(true));
          } else {
            dispatch(setError(err.data));
          }
          // dispatch(setError(err.response.data));
        } else {
          dispatch(setError(true));
        }
      });
  };
};

export const getDetails = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getDetailsService(data)
      .then((res) => {
        let { data } = res;
        dispatch(setLoading(false));
        dispatch(setError(false));
        dispatch(setResetData(data));
      })
      .catch((err) => {
        dispatch(setError(true));
        dispatch(setLoading(false));
      });
  };
};

export const sendOtpToEmail = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    sendOtpToEmailService(data)
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setIsValidEmail(res.data));
        dispatch(setShowAnotherWayOtpField(true))
      })
      .catch((err) => {
        dispatch(setLoading(false));
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.isMaxAttempts
        ) {
          dispatch(setMaxAttempt(true));
        } else {
          dispatch(setError(true));
        }
      });
  };
};
export const verifyQuestions = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    verifyQuestionsService(data)
      .then((res) => {
        console.log("sds", res);
        let { data } = res;
        dispatch(setLoading(false));
        dispatch(setPatientData(data));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        if (
          err &&
          err.data &&
          err.data.isMaxAttempts
        ) {
          dispatch(setMaxAttempt(true));
        } else {
          dispatch(setMaxAttempt(false));
          dispatch(setError(true));
        }
      });
  };
};

export const setMaxAttempt = (value) => {
  return {
    type: actionType.SET_MAX_ATTEMPT,
    value: value,
  };
};
export const setIsUserExist = (value) => {
  return {
    type: actionType.SET_IS_USER_EXSIST,
    value: value,
  };
};
export const setIsValidEmail = (value) => {
  return {
    type: actionType.SET_EMAIL_VALID,
    value: value,
  };
};

export const setResetData = (value) => {
  return {
    type: actionType.SET_RESET_DATA,
    value: value,
  };
};
export const setUser = (value) => {
  return {
    type: actionType.SET_USER,
    value: value,
  };
};
export const setNewUser = (value) => {
  return {
    type: actionType.SET_NEW_USER,
    value: value,
  };
};

export const setPatientData = (value) => {
  return {
    type: actionType.SET_PATIENT_DATA,
    value: value,
  };
};
export const setOtpError = (value) => {
  return {
    type: actionType.SET_OTP_ERROR,
    value: value,
  };
};

export const setShowAnotherWayOtpField = value => ({
  type: actionType.SET_ANOTHER_WAY_OTP_FIELD,
  value
})
