import Axios from "axios";
import { config } from "../../../constants";

const methods = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

export interface Participant {
  first_name: string;
  last_name: string;
  mob: string;
  email: string;
  relationship: string;
  isProvider:boolean;
  appointement_id:number;
}

async function addParticipantInfo(participantInfo: Participant) {
  try {
    const data = {
      ...participantInfo,
    };

    return await Axios.post(
      `${config.dev.baseURL}/participants/create`,
      data,
      methods
    );
  } catch (err) {
    throw err;
  }
}

export default addParticipantInfo;
