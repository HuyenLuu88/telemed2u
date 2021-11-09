//@ts-ignore
import axios from "axios";
import { config } from "../../../constants";

const methods = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

async function getCurrentupcoming(id: any) {
  try {
    return await axios.get(
      `${config.dev.baseURL}/providers/getCurrenctUpcomingAppointment/${id}`
    );
  } catch (err) {
    throw err;
  }
}


export default getCurrentupcoming;
