import { Button, Grid, Popover, Box, Typography } from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover ,bindToggle} from "material-ui-popup-state";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import AddPersonButton from "../Buttons/AddPersonButton/AddPersonButton";
import ChatButton from "../Buttons/ChatButton/ChatButton";
import DisconnectButton from "../Buttons/DisconnectButton/DisconnectButton";
import ToggleAudioButton from "../Buttons/ToggleAudioButton/ToggleAudioButton";
import ToggleVideoButton from "../Buttons/ToggleVideoButton/ToggleVideoButton";
import DeviceSelectionDialog from "../DeviceSelectionDialog/DeviceSelectionDialog";
import LocalVideoPreview from "./DeviceSelectionScreen/LocalVideoPreview/LocalVideoPreview";
import { deviceSelectionScreenStyles as useStyles } from "./DeviceSelectionScreen/styles";
import useChatContext from "../../hooks/useChatContext/useChatContext";
import useVideoContext from "../../hooks/useVideoContext/useVideoContext";
import AvatarIcon from "../../icons/AvatarIcon";
import { useAppState } from "../../state";
import HelpIcon from "@material-ui/icons/Help";
import { useHistory, useParams } from "react-router";
import useProviderContext from "../../hooks/useProviderContext/useProviderContext";
import erikaUser from '../../../../assests/images/erika_provider.png';
import removeUserFromWaitingQueue from "../../apis/deleteFromWaitingQueue";
import listWaitingQueue from "../../apis/listWaitingQueue";
import Popper from "@material-ui/core/Popper";
import CloseIcon from "@material-ui/icons/Close";
import icon_wifi from "../../../../assests/images/icon_wifi.svg"
import "./prejoin.css"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

export default function PreJoinScreen() {
  const classes = useStyles();
  let history = useHistory();
  const { name, roomName }: { name: string; roomName: string } = useParams();
  const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(1);
  let hours: string | number;
  let minutes: string | number;
  let seconds: string | number;
  const { socket, currentUser, appointmentInfo } = useProviderContext();
  const { getToken, isFetching } = useAppState();
  const { connect: chatConnect } = useChatContext();
  const {
    connect: videoConnect,
    isAcquiringLocalTracks,
    isConnecting,
  } = useVideoContext();
  const [arrowRef, setArrowRef] = useState<HTMLSpanElement | null>(null);
  // const localParticipant = room!.localParticipant;

  useEffect(() => {
    //Add room id check
    socket.on("admit_user", (data: any) => {
      console.log("Current User-------", currentUser);
      console.log("data User-------", data["client-Message"]);
      let user_id = currentUser?.participant_id ? currentUser?.participant_id : currentUser?.paitent_id
      if (
        data["client-Message"]["user_id"] == user_id &&
        data["client-Message"]["first_name"] == currentUser?.first_name
      ) {
        console.log("called from Pre join screen ----->>>>");
        getToken(name, roomName)
          .then(async (token) => {
            await videoConnect(token);
            //remove the patient from wating que
            //call fetchwating list API
            process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== "true" &&
              (await chatConnect(token));
            history.push(`/room/${roomName}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    socket.on("remove_from_waiting_list", (data: any) => {
      let user_id = currentUser?.participant_id ? currentUser?.participant_id : currentUser?.paitent_id
      if (
        data["client-Message"]["user_id"] == user_id &&
        data["client-Message"]["first_name"] == currentUser?.first_name
      ) {
        window.location.href = "/"
      }
    });
  }, []);

  const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;
  const GRADIENT_COLORS: any = [
    ["#FFCA28", 0.5],
    ["#E65100", 0.5],
  ];

  const currentDateTime = new Date();
  let futureDateTime = new Date();
  futureDateTime.setSeconds(currentDateTime.getSeconds() + 1000);

  const getDurationInMinutes = (): number => {
    let startTime = moment(appointmentInfo.start, "HH:mm:ss a");
    let endTime = moment(appointmentInfo.end, "HH:mm:ss a");
    return moment(endTime).diff(moment(startTime), "minutes");
  };

  const getDurationInSeconds = (): number => {
    let startTime = moment(moment(), "HH:mm:ss a");
    let endTime = moment(appointmentInfo.start, "HH:mm:ss a");
    if (startTime < endTime) {
      return moment(endTime).diff(moment(startTime), "seconds");
    } else {
      return 0;
    }
  };

  const doctorInfo = {
    name: `Dr ${appointmentInfo.first_name} ${appointmentInfo.last_name}`,
    duration: `${getDurationInMinutes()} Minutes`,
    startTime: moment(appointmentInfo.start, "HH:mm:ss a").format("hh:mm a"),
    endTime: moment(appointmentInfo.end, "HH:mm:ss a").format("hh:mm a"),
  };

  const getTimer = (): React.ReactElement => {
    hours = formatZeros(Math.floor((remainingTime % (3600 * 24)) / 3600));
    minutes = formatZeros(Math.floor((remainingTime % 3600) / 60));
    seconds = remainingTime === 0 ? "00" : formatZeros(remainingTime % 60);
    return (
      <p className={classes.timer}>
        <div>
          <p className={classes.captionStyling}>Meeting starts in:</p>
          <span className={hours === "00" ? "" : classes.textOrange}>
            {hours}
          </span>
          :
          <span className={minutes === "00" ? "" : classes.textOrange}>
            {minutes}
          </span>
          :
          <span className={seconds === "00" ? "" : classes.textOrange}>
            {seconds}
          </span>
        </div>
        <p className={classes.timerMiniText}>
          <p className={classes.miniText}>Hours</p>
          <p className={classes.miniText}>Minutes</p>
          <p className={classes.miniText}>Seconds</p>
        </p>
      </p>
    );
  };

  const fetchWaitingList = async () => {
    try {
      if (currentUser) {
        const res = await listWaitingQueue(currentUser?.room_id);
        let current_user_id = currentUser?.participant_id ? currentUser?.participant_id : currentUser?.paitent_id;
        let waitingUserData = res.data.filter((el: any) => {
          return el.user_id == current_user_id;
        })
        return waitingUserData[0].id
      }
    } catch (error) {
      console.log({ Errorwaitinglist: error });
    }
  };

  const handleEnd = async () => {
    let user_id = await fetchWaitingList();
    await removeUserFromWaitingQueue(user_id);
    window.location.href = "/"
  }

  const formatZeros = (number: number): string | number => {
    return number < 10 ? "0" + number : number;
  };

  const renderTimer = (): React.ReactElement => {
    return (
      <CountdownCircleTimer
        isPlaying
        duration={getDurationInSeconds()}
        strokeWidth={4}
        size={200}
        isLinearGradient
        colors={GRADIENT_COLORS as any}
        onComplete={() => {
          setRemainingTime(0);
        }}
      >
        {({ remainingTime }) => {
          remainingTime && setRemainingTime(remainingTime);
          return <img src={erikaUser} style={{ borderRadius: '50%',  width: 180, height: 180,}} />;
        }}
      </CountdownCircleTimer>
    );
  };

  const renderActions = (): React.ReactElement => {

    return (
        <>
        <div className={classes.buttonsContainer}>
        <ToggleAudioButton
          className={classes.buttons}
          disabled={disableButtons}
          hideLabel
        />
        <ToggleVideoButton
          className={classes.buttons}
          disabled={disableButtons}
          hideLabel
        />
        <ChatButton className={classes.buttons} onClick={() => {}} />
        <AddPersonButton className={classes.buttons} onClick={() => {}} />
        <DisconnectButton
          className={classes.disconnectButton}
          onClick={() => handleEnd()}
        />
      </div>
      <div className={classes.audioVideoTestBtnContainer}>
        <Grid className={classes.iconContainer}>
          <PopupState variant="popper">
            {(popupState) => (
              <div>
                <HelpOutlineIcon
                  color="inherit"
                  fontSize="large"
                  onClick={popupState.toggle}
                />

                <Popper
                  className={classes.helpPopper}
                  open={popupState.isOpen}
                  anchorEl={popupState.anchorEl}
                  placement="top"
                  modifiers={{
                    preventOverflow: {
                      enabled: true,
                      boundariesElement: "scrollParent",
                    },
                    arrow: {
                      enabled: true,
                      element: arrowRef,
                    },
                  }}
                >
                  <Box
                    p={2}
                    bgcolor="white"
                    borderRadius="0.5em"
                    alignItems="center"
                    overflow="visible"
                  >
                    <Typography>
                      <span className={classes.close}>
                        <CloseIcon
                          style={{
                            color: "black",
                            fontSize: 18,
                            cursor: "pointer",
                          }}
                          {...bindToggle(popupState)}
                        />
                      </span>
                      Having connectivity issues?{" "}
                      <a
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Click here
                      </a>
                      <br />
                      Provider will try to reach you on phone
                      <br /> number or dial in on 1800-0000-0000
                    </Typography>
                    <span
                      className={classes.popperArrow}
                      ref={(node) => setArrowRef(node)}
                    />
                  </Box>
                </Popper>
              </div>
            )}
          </PopupState>
        </Grid>
        <Button
          variant="outlined"
          onClick={() => setDeviceSettingsOpen(true)}
          className={classes.testAudiVideoBtn}
        >
          Test your audio and video
        </Button>
      </div>
    </>
    );
  };

  const renderDurationInfo = (): React.ReactElement => {
    return (
      <div className={classes.durationInfoContainer}>
        <p className={classes.textStyling}>
          Start time : <b>{doctorInfo.startTime}</b>
        </p>
        <p className={classes.textStyling}>
          Ends at : <b>{doctorInfo.endTime}</b>
        </p>
      </div>
    );
  };
  return (
    <>
      <div className={"background"}>
        <div className={classes.bodyContainer}>
          <div className={classes.startTime}>{renderDurationInfo()}</div>
          <div className={classes.meetingContainer}>
            {renderTimer()}
            <div className={classes.contentStyling}>
              <p className={classes.doctorNameStyling}>{doctorInfo.name}</p>
              <p className={classes.captionStyling}>
                Call Duration: <strong>{doctorInfo.duration}</strong>
              </p>
              <p className={classes.content}>
                Waiting for your physician to start this meeting
              </p>
              {getTimer()}
            </div>
          </div>
          <div className={classes.localPreviewContainer}>
            <LocalVideoPreview identity={name} />
          </div>
          </div>
    {renderActions()}    
      </div>
      <DeviceSelectionDialog
        open={deviceSettingsOpen}
        onClose={() => {
          setDeviceSettingsOpen(false);
        }}
      />
    </>
  );
}
