import * as actionType from "../actionType";
import { setLoading, setError, setErrorMessage } from "./loader";
import { setPatientData } from "./login";
import {
  sendOtpService,
  registerService,
  completeProfileService,
} from "../../services/Login/login";

export const sendOtpRegister = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(false));
    dispatch(setErrorMessage(""))
    sendOtpService(data)
    .then((res) => {
      let { data } = res;
      console.log("sds", data);
      dispatch(setLoading(false));
      dispatch(setError(false));
      if (data) {
        dispatch(setNewUser(data.isUserExist));
      } else {
        dispatch(setError(true));
      }
    })
    .catch((err) => {
      const { data } = err
      dispatch(setLoading(false));
      dispatch(setError(true));
      if (data && data.message) {
        dispatch(setErrorMessage(data.message))
      }
    });
  };
};
export const register = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    registerService(data)
      .then((res) => {
        dispatch(setLoading(false));
        console.log("sds", res);
        let { data } = res;
        if (data) {
          if (!data.isOtpValid && data.isOtpValid !== undefined) {
            dispatch(setOtpError(true));
          } else {
            dispatch(setPatientData(data));
            dispatch(setOtpError(false));
          }
        }  else {
          setError(true)
        }
      })
      .catch((err) => {
        dispatch(setOtpError(true));
        dispatch(setLoading(false));
      });
  };
};
export const completeProfile = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    completeProfileService(data)
      .then((res) => {
        console.log("sds", res);
        let { data } = res;
        dispatch(setLoading(false));
        dispatch(setOtpError(false));
        dispatch(setPatientData(data));
      })
      .catch((err) => {
        dispatch(setOtpError(true));
        dispatch(setLoading(false));
      });
  };
};
export const setNewUser = (value) => {
  return {
    type: actionType.SET_NEW_USER,
    value: value,
  };
};
export const handleBack = (value) => {
  return {
    type: actionType.HANDLE_BACK,
    value: value,
  };
};
export const setOtpError = (value) => {
  return {
    type: actionType.SET_OTP_ERROR,
    value: value,
  };
};
