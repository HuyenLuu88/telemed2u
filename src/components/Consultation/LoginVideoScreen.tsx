import React, { FormEvent, useCallback, useEffect, useState } from "react";
import RoomNameScreen from "./components/PreJoinScreens/RoomNameScreen/RoomNameScreen";
import { useAppState } from "./state";
import useVideoContext from "./hooks/useVideoContext/useVideoContext";
import useProviderContext from "./hooks/useProviderContext/useProviderContext";
import useChatContext from "./hooks/useChatContext/useChatContext";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { useHistory, useLocation,useParams } from "react-router";
import IntroContainer from "./components/IntroContainer/IntroContainer";
import MediaErrorSnackbar from "./components/PreJoinScreens/MediaErrorSnackbar/MediaErrorSnackbar";
import createWaitingQueue, { WaitingQueue } from "./apis/createWaitingQueue";
import listWaitingQueue from "./apis/listWaitingQueue";
import { createDecipheriv } from "crypto";
import {config} from '../../constants';
interface DecryptedData {
  firstName: string;
  lastName: string;
  isProvider: boolean;
  roomId: string;
  patient: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LoginVideoScreen(props:any) {
let query = useQuery();

let iv = query.get("iv");
let data =query.get("data");

 // let {iv, data}:{iv:any, data:any} = useParams();
 

  const { user, getToken, isFetching } = useAppState();
  const {
    room,
    getAudioAndVideoTracks,
    connect: videoConnect,
    isAcquiringLocalTracks,
    isConnecting,
    localTracks
  } = useVideoContext();
  const {
    socket,
    setAccessAdmit,
    setCurrentUser,
    setListWaiting,
    setCountWaitingUser,
  } = useProviderContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [isProvider, setIsProvider] = useState<boolean>(false);
  const [name, setName] = useState<string>(user?.displayName || "");
  const [roomName, setRoomName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const { connect: chatConnect } = useChatContext();
  const [mediaError, setMediaError] = useState<Error>();

  let history = useHistory();

  useEffect(()=>{
    if (!mediaError) {
      getAudioAndVideoTracks().catch(error => {
        console.log('Error acquiring local media:');
        console.dir(error);
        setMediaError(error);
      });
    }

    if(localTracks.length>0){
         history.push(`/join/${iv}/${data}`);
    }

    
  },[getAudioAndVideoTracks, mediaError])

  return (
    <>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          style={{ height: "100%", marginTop: "20%" }}
        >
          <div>
            <CircularProgress variant="indeterminate" />
          </div>
          <div>
            <Typography
              variant="body2"
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              Joining Meeting
            </Typography>
          </div>
        </Grid>
    </>
  );
}
