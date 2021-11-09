import { getService } from "../../utilities/request/restClient";
import { config } from "../../constants";

export const getProviderDetail = (id) => {
  return getService(`/providers/details/${id}`);
};

export const getProviderList = (speciality, visitType, patient = 0) => {
  return getService(`/providers/search-provider?speciality=${speciality}&patient=${patient}&appointmentType=${visitType}`);
};
