import { makeStyles, Theme } from "@material-ui/core"
import { relative } from "path"

export const deviceSelectionScreenStyles = makeStyles((theme: Theme) => ({
    gutterBottom: {
        marginBottom: "1em",
    },
    marginTop: {
        marginTop: "1em",
    },
    deviceButton: {
        width: "100%",
        border: "2px solid #aaa",
        margin: "1em 0",
    },
    localPreviewContainer: {
        paddingRight: "2em",
        [theme.breakpoints.down("sm")]: {
            padding: "0 2.5em",
        },
    },
    bodyContainer: {
        display: "flex",
        alignItems: "center",
        fontFamily: "Lato",
        flexDirection: "column",
    },
    meetingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "7%",
        [theme.breakpoints.down("sm")]: {
            margin: "25%",
        },
    },
    startTime: {
        display: "flex",
        justifyContent: "flex-start",
        padding: "2% 5% 0% 5%",
        left: "0",
        position: "absolute",
    },
    contentStyling: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    doctorNameStyling: {
        fontSize: "1.6rem",
        color: "white",
        margin: "0px 5px",
        fontWeight: 600,

        "&:hover": {
            color: "white",
        },
    },
    content: {
        fontSize: "28px",
        color: "white",
        marginBottom: 0,
        margin: "10px 15%",
        textAlign: "center",

        "&:hover": {
            color: "white",
        },
    },
    captionStyling: {
        fontSize: "1rem",
        color: "#fff",
        margin: "0px 5px",
        textAlign: "center",

        "&:hover": {
            color: "white",
        },
    },
    buttonsContainer: {
        position: "relative",
        // bottom: "3rem",
        display: "flex",
        justifyContent: "center",
        borderRadius: "2rem",

        [theme.breakpoints.down("sm")]: {
            marginBottom: "2rem",
            marginTop: "1rem",
        },
    },
    // waitButtons:{
    //   minWidth: '50px',
    //   height: '50px',
    //   background: "rgba(0, 0, 0, 0.2)",
    //   width: '50px',
    //   borderRadius: '50%',
    //   margin: '0px 10px'
    // },
    startIcon: {
        margin: "0 !important",
    },
    audioVideoTestBtnContainer: {
        zIndex: 110,
        position: "absolute",
        display: "flex",
        positionLeft: "0.5rem",
        alignItems: "center",
        right: 20,
        paddingTop: "4px",
        [theme.breakpoints.down("sm")]: {
            bottom: "-14%",
            right: "30%",
        },
    },

    iconContainer: {
        color: "white",
        display: "flex",
        justifyContent: "center",
        marginRight: "1rem",
        cursor: "pointer",
    },

    joinButtons: {
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column-reverse",
            width: "100%",
            "& button": {
                margin: "0.5em 0",
            },
        },
    },
    mobileButtonBar: {
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "space-between",
            margin: "1.5em 0 1em",
        },
    },
    buttons: {
        margin: "0 1rem",
        padding: "0.8em 0",
        background: "rgba(0, 0, 0, 0.2)",
        width: "50px",
        height: "50px",
        minWidth: "50px",
        borderRadius: "2rem",
        display: "flex",
        alignItems: "center",
        paddingLeft: "0.7rem",
    },
    testAudiVideoBtn: {
        borderColor: "#fff",
        color: "#fff",
        borderRadius: "1.4rem",
        padding: "0.4rem 1rem",
        width: "200px",
    },
    disconnectButton: {
        margin: "0 1rem",
        padding: "0.8em 0",
        background: "#da3026",
        width: "50px",
        height: "50px",
        minWidth: "50px",
        borderRadius: "2rem",
        display: "flex",
        alignItems: "center",
        paddingLeft: "0.7rem",
    },
    timer: {
        fontSize: "48px",
        fontWeight: "bold",
        marginTop: 0,
        color: "white",
        marginBottom: "2%",

        "&:hover": {
            color: "white",
        },
    },
    textOrange: {
        color: "orange",

        "&:hover": {
            color: "orange",
        },
    },
    durationInfoContainer: {
        color: "white",
        display: "flex",
        padding: "20px",
        background: "rgba(19,25,31,0.2)",
        flexDirection: "column",
        borderRadius: "0.4rem",

        [theme.breakpoints.down("sm")]: {
            margin: "auto",
            marginBottom: "3rem",
            position: "static",
            display: "flex",
            alignSelf: "center",
        },
    },
    textStyling: {
        color: "white",
        margin: 0,
        fontFamily: "Lato",
        fontSize: "22px",
        lineHeight: "29px",

        "&:hover": {
            color: "white",
        },
    },
    miniText: {
        fontSize: "0.8rem",
        color: "white",
        textAlign: "left",
        fontWeight: 300,
        margin: "0",

        "&:hover": {
            color: "white",
        },
    },
    timerMiniText: {
        margin: "0",
        display: "flex",
        justifyContent: "space-around",
    },
    icons: {
        display: "inline",
        bottom: "3.5rem",
        position: "absolute",
        left: "8rem",
    },
    close: {
        marginLeft: "95%",
    },
    renderaction: {
        marginTop: "1%",
        display: "flex",
        marginBottom: "4%",
        width: "100%",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
        //alignItems: "baseline",
    },
    iconswifi: {
        position: "absolute",
        left: 70,
        [theme.breakpoints.down("sm")]: {
            bottom: "-14%",
            left: "8%",
        },
    },
    helpPopper: {
        marginLeft: "2%",
    },
    popperArrow: {
        position: "absolute",
        width: 0,
        height: 0,
        bottom: "-5%",
        marginLeft: "12%",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",

        borderTop: "10px solid #fff",
    },
}))
