import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Theme } from '@material-ui/core';
import {
  LocalAudioTrack,
  LocalVideoTrack,
  Participant,
  RemoteAudioTrack,
  RemoteVideoTrack,
} from "twilio-video";

import AvatarIcon from "../../icons/AvatarIcon";
import Typography from "@material-ui/core/Typography";

import useIsTrackSwitchedOff from "../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff";
import usePublications from "../../hooks/usePublications/usePublications";
import useScreenShareParticipant from "../../hooks/useScreenShareParticipant/useScreenShareParticipant";
import useTrack from "../../hooks/useTrack/useTrack";
import useVideoContext from "../../hooks/useVideoContext/useVideoContext";
import useParticipantIsReconnecting from "../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting";
import AudioLevelIndicator from "../AudioLevelIndicator/AudioLevelIndicator";
import NetworkQualityLevel from "../NetworkQualityLevel/NetworkQualityLevel";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  identity: {
    background: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "0.1em 0.3em 0.1em 0",
    display: "inline-flex",
    "& svg": {
      marginLeft: "0.3em",
    },
    marginRight: "0.4em",
    alignItems: "center",
  },
  infoContainer: {
    position: "absolute",
    zIndex: 2,
    height: "100%",
    width: "100%",
  },
  reconnectingContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(40, 42, 43, 0.75)",
    zIndex: 1,
  },
  fullWidth: {
    gridArea: "1 / 1 / 2 / 3",
    [theme.breakpoints.down("sm")]: {
      gridArea: "1 / 1 / 3 / 3",
    },
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    "& svg": {
      transform: "scale(2)",
    },
  },

  BtnContainer: {
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "rgba(177, 175, 175 ,0.5)",
    margin: "1rem",
    borderRadius: "0.4rem",
    position: "absolute",
    left: "1.5rem",
    bottom: "1.5rem",
    zIndex: 100,

    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      marginBottom: "3rem",
      position: "static",
      display: "flex",
      alignSelf: "center",
    },
  },
  textStyling: {
    fontSize: "1.5rem",
    color: "white",
    margin: 0,
    marginLeft: "0.5rem",

    "&:hover": {
      color: "white",
    },
  },
}));

interface MainParticipantInfoProps {
  participant: Participant;
  children: React.ReactNode;
}

export default function MainParticipantInfo({
  participant,
  children,
}: MainParticipantInfoProps) {
  const classes = useStyles();
  const { room } = useVideoContext();
  const localParticipant = room!.localParticipant;
  const isLocal = localParticipant === participant;
 // console.log({participant});
  const screenShareParticipant = useScreenShareParticipant();
  const isRemoteParticipantScreenSharing =
    screenShareParticipant && screenShareParticipant !== localParticipant;

  const publications = usePublications(participant);
  const videoPublication = publications.find((p) =>
    p.trackName.includes("camera")
  );
  const screenSharePublication = publications.find((p) =>
    p.trackName.includes("screen")
  );

  const videoTrack = useTrack(screenSharePublication || videoPublication);
  const isVideoEnabled = Boolean(videoTrack);

  const audioPublication = publications.find((p) => p.kind === "audio");
  const audioTrack = useTrack(audioPublication) as
    | LocalAudioTrack
    | RemoteAudioTrack
    | undefined;

  const isVideoSwitchedOff = useIsTrackSwitchedOff(
    videoTrack as LocalVideoTrack | RemoteVideoTrack
  );
  const isParticipantReconnecting = useParticipantIsReconnecting(participant);

  return (
    <div
      data-cy-main-participant
      data-cy-participant={participant.identity}
      className={clsx(classes.container, {
        [classes.fullWidth]: !isRemoteParticipantScreenSharing,
      })}
    >
     {/* <AudioLevelIndicator audioTrack={audioTrack} />  */}

      <div className={classes.BtnContainer}>
        <NetworkQualityLevel participant={localParticipant} />
        <p className={classes.textStyling}>
          {participant.identity}
          {isLocal && " (You)"}
        </p>
      </div>

      {(!isVideoEnabled || isVideoSwitchedOff) && (
        <div className={classes.avatarContainer}>
          <AvatarIcon />
        </div>
      )}
      {isParticipantReconnecting && (
        <div className={classes.reconnectingContainer}>
          <Typography variant="body1" style={{ color: "white" }}>
            Reconnecting...
          </Typography>
        </div>
      )}
      {children}
    </div>
  );
}
