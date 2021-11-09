import { getService } from "../../utilities/request/restClient";
import { config } from "../../constants";

export const getSpecialities = () => {
  return getService(`/speciality/list`);
};

export const getClinicsBySpeciality = (speciality) => {
  return getService(`/clinic/list?speciality=${speciality}`);
}