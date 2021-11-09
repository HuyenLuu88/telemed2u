import React, { useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Button from "@material-ui/core/Button";

import NetworkQualityLevel from "../NetworkQualityLevel/NetworkQualityLevel";
import useRoomState from "../../hooks/useRoomState/useRoomState";
import useVideoContext from "../../hooks/useVideoContext/useVideoContext";
import DeviceSelectionDialog from "../DeviceSelectionDialog/DeviceSelectionDialog";
import ToggleAudioButton from "../Buttons/ToggleAudioButton/ToggleAudioButton";
import DisconnectButton from "../Buttons/DisconnectButton/DisconnectButton";
import ToggleChatButton from "../Buttons/ToggleChatButton/ToggleChatButton";
import AddPersonButton from "../Buttons/AddPersonButton/AddPersonButton";
import ToggleScheduleButton from "../Buttons/ToggleScheduleButton/ToggleScheduleButton";
import ToggleVideoButton from "../Buttons/ToggleVideoButton/ToggleVideoButton";
import AddParticipantDialog from "../AddParticipantDialog/AddParticipantDialog";
import AboutDialog from "../AboutDialog/AboutDialog";
import listWaitingQueue from "../../apis/listWaitingQueue";
import useChatContext from "../../hooks/useChatContext/useChatContext";
import useProviderContext from "../../hooks/useProviderContext/useProviderContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: `white`,
      bottom: 0,
      left: 0,
      right: 0,
      height: `${theme.footerHeight}px`,
      position: "fixed",
      display: "flex",
      padding: "0 1.43em",
      zIndex: 10,
      [theme.breakpoints.down("sm")]: {
        height: `${theme.mobileFooterHeight}px`,
        padding: 0,
      },
    },
    iconContainer: {
      color: "white",
      display: "flex",
      justifyContent: "center",
      marginRight: "1rem",
      cursor: "pointer",
    },
    footer: {
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: "3rem",
      zIndex: 100,

      [theme.breakpoints.down("sm")]: {
        position: "static",
        marginBottom: "3rem",
      },
    },
    screenShareBanner: {
      position: "fixed",
      zIndex: 10,
      bottom: `${theme.footerHeight}px`,
      left: 0,
      right: 0,
      height: "104px",
      background: "rgba(0, 0, 0, 0.5)",
      "& h6": {
        color: "white",
      },
      "& button": {
        background: "white",
        color: theme.brand,
        border: `2px solid ${theme.brand}`,
        margin: "0 2em",
        "&:hover": {
          color: "#600101",
          border: `2px solid #600101`,
          background: "#FFE9E7",
        },
      },
    },
    audioVideoTestBtnContainer: {
      position: "absolute",
      bottom: "3rem",
      right: "3rem",
      zIndex: 110,
      display: "flex",
      alignItems: "center",

      [theme.breakpoints.down("sm")]: {
        margin: "auto",
        marginBottom: "3rem",
        position: "static",
        display: "flex",
        alignSelf: "center",
      },
    },
    buttons: {
      margin: "0 1rem",
      padding: "0.8em 0",
      background: "rgba(34,43,55,0.5)",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      minWidth: '50px',
      display: "flex",
      alignItems: "center",
      paddingLeft: "0.7rem",
      "&:hover": {
        background: "rgba(34,43,55,0.5) !important",
      },
    },

    blueIconButton: {
      margin: "0 1rem",
      padding: "0.8em 0",
      background: "#5571C6",
      width: "50px",
      height: "50px",
      borderRadius: "2rem",
      minWidth: '50px',
      display: "flex",
      alignItems: "center",
      paddingLeft: "0.7rem",
      "&:hover": {
        background: "#5571C6 !important",
      },
    },

    durationInfoContainer: {
      color: "white",
      display: "flex",
      padding: "1rem 2rem",
      background: "rgba(19,25,31,0.2)",
      flexDirection: "column",
      margin: "1rem",
      borderRadius: "0.4rem",
      position: "absolute",
      left: "1.5rem",
      top: "1.5rem",
      zIndex: 100,

      [theme.breakpoints.down("sm")]: {
        margin: "auto",
        marginBottom: "3rem",
        position: "static",
        display: "flex",
        alignSelf: "center",
      },
    },
    disconnectButton: {
      margin: "0 1rem",
      padding: "0.8em 0",
      background: "#da3026",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      minWidth: '50px',
      display: "flex",
      alignItems: "center",
      paddingLeft: "0.7rem",
    },
    roomNameContainer: {
      zIndex: 100,
      padding: "0 2rem",
      borderRadius: "0.2rem",
      position: "absolute",
      bottom: "0",
      left: "0",
      color: "#fff",
      background: "rgba(177, 175, 175 ,0.5)",
    },

    textStyling: {
      fontSize: "1.2rem",
      color: "white",
      margin: 0,

      "&:hover": {
        color: "white",
      },
    },
    textWhite: {
      color: "#fff",
    },
    testAudiVideoBtn: {
      borderColor: "#fff",
      color: "#fff",
      borderRadius: "1.4rem",
      padding: "0.4rem 2rem",
    },
    hideMobile: {
      display: "initial",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  })
);

export default function MenuBar() {
  const classes = useStyles();
  const { isSharingScreen, toggleScreenShare } = useVideoContext();
  const { isScheduleWindowOpen, isChatWindowOpen } = useChatContext();
  const { isAccessAdmit, waitingCount, socket, currentUser, setListWaiting, setCountWaitingUser,upcoming } = useProviderContext();
  const roomState = useRoomState();
  const isReconnecting = roomState === "reconnecting";
  const { room } = useVideoContext();
  const [
    addParticipantsDialogOpen,
    setAddParticipantsDialogOpen,
  ] = React.useState(false);
  const [deviceSettingsOpen, setDeviceSettingsOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);

  const localParticipant = room!.localParticipant;
  const renderDurationInfo = (): React.ReactElement => {
    return (
        <>
        {upcoming ?
          <div className={classes.durationInfoContainer}>
            <p className={classes.textStyling}>
              Current appointment: {upcoming.Current.start} to {upcoming.Current.end} 
            </p>
            <p className={classes.textStyling}>
              Upcoming event:{upcoming.Upcoming.start} to {upcoming.Upcoming.end}
            </p>
          </div>
        :
        <div className={classes.durationInfoContainer}>
        <p className={classes.textStyling}>
          No Current appointment and Upcoming event found.
        </p>
      </div>
      }
      </>
    );
  };

  const fetchWaitingList = async () => {
    try {
      console.log(currentUser, "current User")
      if (currentUser) {
        const res = await listWaitingQueue(currentUser?.room_id);
        setListWaiting(res.data);
        if (res.data) setCountWaitingUser(res.data.length);
      }
    } catch (error) {
      console.log({ Errorwaitinglist: error });
    }
  };
  useEffect(() => {
    //Check need to added for provider
    socket.on("get_waiting_list_user", (data: any) => {
      console.log("Sockeet got called-------", data);
      if (data["client-Message"].roomId == currentUser?.room_id) {
        fetchWaitingList();
      }
    });
  }, []);

  return (
    <>
      {renderDurationInfo()}

      <div className={classes.roomNameContainer}>
        <Typography variant="body1" className={classes.textWhite}>
          {room!.name}
        </Typography>
      </div>

      <div className={classes.footer}>
        <ToggleAudioButton
          className={classes.buttons}
          disabled={isReconnecting}
          hideLabel
        />

        <ToggleVideoButton
          className={classes.buttons}
          disabled={isReconnecting}
          hideLabel
        />
        {process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== "true" && (
          <ToggleChatButton className={isChatWindowOpen ? classes.blueIconButton : classes.buttons} />
        )}
        {isAccessAdmit ? <ToggleScheduleButton className={isScheduleWindowOpen ? classes.blueIconButton : classes.buttons} count={waitingCount} /> : <></>}

        <AddPersonButton
          className={classes.buttons}
          onClick={() => setAddParticipantsDialogOpen(true)}
        />
        <DisconnectButton
          className={classes.disconnectButton}
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>

      <AddParticipantDialog
        open={addParticipantsDialogOpen}
        onClose={() => {
          setAddParticipantsDialogOpen(false);
        }}
      />

      <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false);
        }}
      />

      <DeviceSelectionDialog
        open={deviceSettingsOpen}
        onClose={() => {
          setDeviceSettingsOpen(false);
        }}
      />
    </>
  );
}
