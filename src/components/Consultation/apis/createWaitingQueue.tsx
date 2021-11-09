import axios from "axios";
import { config } from "../../../constants";

const methods = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

export interface WaitingQueue {
  first_name: string;

  last_name: string;

  user_id: number;

  room_id: number;

  is_patient: boolean;

  id?: number;

  relationShip: string;

  appointment_id : number;
}
export interface CurrentUserData {
  first_name: string;
  last_name: string;
  room_id: number;
  room_name: string;
  paitent_id: number;
  participant_id: number;
  provider_id: number;
  is_patient: boolean;
}

async function createWaitingQueue(waitingQueueInfo: WaitingQueue) {
  try {
    const data = {
      ...waitingQueueInfo
    };

    return await axios.post(
      `${config.dev.baseURL}/waiting-queue/create`,

      data,
      methods,
    );
  } catch (err) {
    throw err;
  }
}

export default createWaitingQueue;
