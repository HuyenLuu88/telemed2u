import * as actionType from "../actionType";
import { setLoading, setError } from "./loader";

import { getProviderDetail, getProviderList } from "../../services/Provider/provider";

export const getProviderDetails = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setProviderDetails(null));
    getProviderDetail(id)
      .then((res) => {
        if (res.data) {
          dispatch(setProviderDetails(res.data));
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log("Inside getProviderDetails error", err);
        dispatch(setLoading(false));
        dispatch(setError(true));
      });
  };
};

export const getProvidersList = (speciality, visitType) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setProviderList([]))
    getProviderList(speciality, visitType)
      .then((res) => {
        if (res.data) {
          dispatch(setProviderList(res.data));
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log("Inside getProviderList error", err);
        dispatch(setLoading(false));
        dispatch(setError(true));
      });
  };
}

export const setProviderList = (value) => ({
  type: actionType.SET_PROVIDER_LIST,
  value
})

export const setProviderDetails = (value) => {
  return {
    type: actionType.SET_PROVIDER_DETAILS,
    value,
  };
};
