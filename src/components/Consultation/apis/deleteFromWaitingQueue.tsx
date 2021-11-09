import Axios from "axios";
import { config } from "../../../constants";

const methods = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};



async function removeUserFromWaitingQueue(id:number) {
  try {

    return await Axios.delete(
      `${config.dev.baseURL}/waiting-queue/delete/${id}`,
      methods,
    );
  } catch (err) {
    throw err;
  }
}

export default removeUserFromWaitingQueue;