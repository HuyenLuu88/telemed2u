import axios from "axios";
import { config } from "../../../constants";

const methods = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

async function getProvidersDetails(id: any) {
  try {
    //dev.telemed2u.com/login-service/providers/findById/1
    https: return await axios.get(
      `${config.dev.baseURL}/providers/findById/${id}`
    );
  } catch (err) {
    throw err;
  }
}
async function getAppointmentDetails(id: any) {
  try {
    //dev.telemed2u.com/login-service/providers/findById/1
    console.log("config",config.dev)
    https: return await axios.get(
      `${config.dev.baseURL}/appointment/details/${id}`
    );
  } catch (err) {
    throw err;
  }
}
async function getPatientDetails(id: any) {
  try {
    //dev.telemed2u.com/login-service/providers/findById/1
    https: return await axios.get(
      `${config.dev.baseURL}/patient/findByUserId/${id}`
    );
  } catch (err) {
    throw err;
  }
}
async function getParticipantDetails(id: any) {
  try {
    //dev.telemed2u.com/login-service/providers/findById/1
    https: return await axios.get(
      `${config.dev.baseURL}/participants/${id}`
    );
  } catch (err) {
    throw err;
  }
}

export {
  getPatientDetails,
  getProvidersDetails,
  getParticipantDetails,
  getAppointmentDetails,
};
