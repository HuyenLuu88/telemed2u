import React, {} from "react";
import {ChatsStyle as useStyles} from "./styles";

// @ts-ignore
export default function Chats({client, msg, time, author}) {
    const classes = useStyles();
    return (
        <div className={classes.chats} style={{justifyContent: client==='global'? "flex-start":'flex-end'}}>
            <div className={classes.chatMessage}>
            {client=='global' ? <span className={classes.chatAvatar}> {author}</span> : <></>}
                <div className={classes.chatText} style={{backgroundColor: client==="global" ? '#ffffff': '#4C8080'}}>
                    <p className={classes.chatValue} style={{color: client==="global" ? 'black': '#ffffff'}}>
                        {msg}
                    </p>
                </div>
                <p className={classes.chatTime}>
                    {time < 5 ? 'Just now': `${time} secs ago`}
                </p>
            </div>
        </div>
    )
}