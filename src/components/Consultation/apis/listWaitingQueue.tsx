import Axios from "axios";
import { config } from "../../../constants";

const methods = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};



async function listWaitingQueue(roomid: number) {
  try {
    return await Axios.get(
      `${config.dev.baseURL}/waiting-queue/list?room_id=${roomid}`,
      methods,
    );
  } catch (err) {
    throw err;
  }
}

export default listWaitingQueue;


// async function listWaitingQueue(roomid: string) {
//   try {
//     let room_id = "24";
//     if (roomid) room_id = roomid;
//     return await Axios.get(
//       `${config.dev.baseURL}/waiting-queue/list?room_id=${room_id}`,
    
//       methods,
//     );
//   } catch (err) {
//     throw err;
//   }
// }

// export default listWaitingQueue;