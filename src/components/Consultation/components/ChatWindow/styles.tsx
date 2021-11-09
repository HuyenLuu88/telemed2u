import { makeStyles, Theme } from "@material-ui/core";

export const chatWindowStyle = makeStyles((theme: Theme) => ({
    chatBox: {
        position: "absolute",
        zIndex: 400,
        top: "40vh",
        left: '3%',
    },
    chatWindowContainer: {
        backgroundColor: "#e1e1e2",
        borderRadius: "5px",
        flex: 1
    },
    chatWindowContainerTop: {
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
        backgroundColor: '#303E4E',
        padding: "0.5rem 1rem",
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.1rem',
        cursor: 'pointer'
    },
    chatWindowContainerTopName: {
        fontSize: '0.9rem',
        margin: "8px 0 8px 0",
        opacity: '1',
        fontWeight: 500
    },
    chatWindowContainerTopToggle: {
        opacity: '1',
        border: 'none',
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: 'white',
        fontSize: '1.2rem'
    },
    chatWindowBottomChats: {
        overflowY: 'scroll',
        padding: '0.5rem',
        height: "210px",
        "&::-webkit-scrollbar": {
            display: 'none'
        }
    },
    chatWindowBottomChatbox: {
        position: "relative",
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: "center",
        padding: '0.5rem',
        paddingBottom: '0.8rem',
    },
    chatWindowBottomInput: {
        width: '83%',
        height: '35px',
        border: "none",
        borderTopRightRadius: '5px',
        borderBottomLeftRadius: '5px',
        padding: '0 0.8rem',
        fontSize: '0.8rem',
        fontWeight: 500,
        "&::placeholder": {
            opacity: 0.6,
            fontSize: '0.7rem'
        }
    },
    chatWindowBottomSend: {
        position: 'absolute',
        borderRadius: '5px',
        top: '8.5px',
        right: '8px',
        padding: '0.3rem 0.7rem',
        paddingTop: '0.5rem',
        border: "none",
        backgroundColor: "#5571c6",
        cursor: "pointer"
    },
    chatWindowBottomIcon: {
        width: '20px',
        height: '20px',
        filter: "invert(100%)",
        transform: 'rotate(15deg)'
    }
})
)