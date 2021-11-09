import * as actionType from "../actionType";
import { setLoading, setError } from "./loader";
import {
  getSpecialities,
  getClinicsBySpeciality
} from "../../services/Appointments/appointments";

export const getAllSpecialities = () => {
  return (dispatch) => {
    getSpecialities()
      .then((res) => {
        dispatch(setSpecialities(res.data));
      })
      .catch((err) => {
        dispatch(setError(true));
      });
  };
};

export const getClinicListBySpeciality = (speciality) => {
  return (dispatch) => {
    dispatch(setClinicList([]));
    getClinicsBySpeciality(speciality)
      .then((res) => {
        dispatch(setClinicList(res.data));
      })
      .catch((err) => {
        dispatch(setError(true));
      });
  };
}

export const setSpecialities = (value) => {
  return {
    type: actionType.SET_SPECIALITIES,
    value,
  };
};

export const setClinicList = (value) => ({
  type: actionType.SET_CLINIC_LIST,
  value
})

export const setSelectedProviderDetails = (value) => ({
  type: actionType.SET_SELECTED_PROVIDER_DETAILS,
  value
})
