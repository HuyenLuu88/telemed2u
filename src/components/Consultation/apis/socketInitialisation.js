import io from "socket.io-client";

import { config } from "../../../constants";

const socket = io(config.dev.baseURL, {
  path: "/login-service/socket.io"
});

export const initiateSocket = () => {
    // socket = io(baseUrl);
  socket.on("connect", () => {
    console.log("connected socket");
  });
  return socket;
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};