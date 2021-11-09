import {makeStyles, Theme} from "@material-ui/core";

export const ChatsStyle = makeStyles((theme: Theme) => ({
        chats: {
            display: "flex",
            justifyContent: "flex-start",
            gap: '1rem',
            marginTop: "0.2rem",
            marginRight: '1rem',
        },
        chatMessage: {
            maxWidth: '70%',
            display: "flex",
            flexDirection: "column"
        },
        chatText: {
            overflowX: 'hidden',
            borderRadius: '5px',
            padding: '0.5rem',
            paddingRight: '1rem',
            fontSize: '0.8rem',
            fontWeight: 400
        },
        chatValue: {
            margin: 0,
            opacity: 1
        },
        chatTime: {
            paddingLeft:'4px',
            fontSize: '0.7rem',
            fontWeight:600,
            marginTop: 0,
            color: 'gray',
            textAlign: 'right',
            float:'right',
        },
        chatAvatar: {
            width: 'auto',
            fontSize:'1rem',
            fontWeight:500,
            
        }
    })
)