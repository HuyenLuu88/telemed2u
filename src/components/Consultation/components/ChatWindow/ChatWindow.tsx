import React, { useState } from "react";
import Draggable from "react-draggable";
import useChatContext from "../../hooks/useChatContext/useChatContext";
import { chatWindowStyle as useStyles } from "./styles";
import SendIcon from "../../assets/submitchat.svg";
import ChatInput from "./ChatInput/ChatInput";
import Chats from "./Chats/Chats";
import MessageList from "./MessageList/MessageList";
import close from "../../assets/close.png";
export default function ChatWindow() {
  const classes = useStyles();
  const {
    isChatWindowOpen,
    messages,
    conversation,
    setIsChatWindowOpen,
  } = useChatContext();
  const [text, setText] = useState("");
  const patientImage =
    "https://i.pinimg.com/564x/36/60/58/366058cd421e6a981e50c6f800abbbd0.jpg";
  const doctorImage =
    "https://i.pinimg.com/736x/b4/ea/c6/b4eac6d67645f2b6e1d1a440e42cca57.jpg";

  return (
    <Draggable>
      <div className={classes.chatBox}>
        <div className={classes.chatWindowContainer}>
          <div className={classes.chatWindowContainerTop}>
            <h4 className={classes.chatWindowContainerTopName}>Chat</h4>
            <button
              onClick={() => setIsChatWindowOpen(false)}
              className={classes.chatWindowContainerTopToggle}
            >
              {
                //@ts-ignore
              }
              <img src={close} alt="close icon" width='20' height='18'/>
            </button>
          </div>

          <div className={classes.chatWindowBottomChats}>
            <MessageList messages={messages} />
          </div>

          <ChatInput
            conversation={conversation!}
            isChatWindowOpen={isChatWindowOpen}
          />
        </div>
      </div>
    </Draggable>
  );
}
