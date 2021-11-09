import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import createWaitingQueue, { WaitingQueue } from "./apis/createWaitingQueue";
import listWaitingQueue from "./apis/listWaitingQueue";
import {
  getAppointmentDetails,
  getParticipantDetails,
  getPatientDetails,
  getProvidersDetails,
} from "./apis/fetchDetails";
import { createDecipheriv } from "crypto";
import { config } from "../../constants";
import useVideoContext from "./hooks/useVideoContext/useVideoContext";
import { useAppState } from "./state";
import useProviderContext from "./hooks/useProviderContext/useProviderContext";
import { useHistory, useParams } from "react-router-dom";
import useChatContext from "./hooks/useChatContext/useChatContext";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import getCurrentupcoming from "./apis/getCurrentUpcoming";

function JoinMainRoom() {
  let { iv, data }: { iv: any; data: any } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const { user, getToken, isFetching } = useAppState();
  const {
    connect: videoConnect,
    isAcquiringLocalTracks,
    isConnecting,
    localTracks,
  } = useVideoContext();
  const { connect: chatConnect } = useChatContext();
  const {
    socket,
    setAccessAdmit,
    setCurrentUser,
    setListWaiting,
    setCountWaitingUser,
    setAppointmentInfo,
    setupcoming
  } = useProviderContext();
  let history = useHistory();

  useEffect(() => {
    if (iv && data) {
      handleDirectLink(iv, data);
    }
  }, []);

  const modalClose = () => {
    setIsModalOpen(false);
    history.push('/')
  }

  const AlertModal = () => {
    return (
      <Dialog open={isModalOpen} onClose={() => modalClose()}>
        <Alert variant="outlined" severity="info">
          <DialogTitle id="alert-modal-title">{modalMessage}</DialogTitle>
          <DialogActions>
            <Button onClick={() => modalClose()} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Alert>
      </Dialog>
    );
  };

  const decrypt = (encryptediv: any, encryptedData: any) => {
    if (config.KEY) {
      let iv = Buffer.from(encryptediv, "hex");
      let encryptedText = Buffer.from(encryptedData, "hex");
      let decipher = createDecipheriv(
        "aes-256-cbc",
        Buffer.from(config.KEY),
        iv
      );
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      console.log("decrypted-------", decrypted.toString());
      return decrypted.toString();
    }
  };

  const handleDirectLink = async (iv: any, data: any) => {

    const fetchWaitingList = async (roomid: number) => {
      try {
        const res = await listWaitingQueue(roomid);
        setListWaiting(res.data);
        if (res.data) setCountWaitingUser(res.data.length);
      } catch (error) {
        console.log({ Errorwaitinglist: error });
      }
    };

    const handleForProvider = async (
      first_name: string,
      last_name: string,
      roomName: string,
      roomId: number
    ) => {
      console.log("handle provider join main room ---------");
      getToken(`${first_name} ${last_name}`, roomName)
        .then(async (token) => {
          await videoConnect(token);
          process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== "true" &&
            (await chatConnect(token));
          await fetchWaitingList(Number(roomId));
          history.push(`/room/${roomName}`);
        })
        .catch((err) => {
          console.log(err);
          history.push(`/`);
        });
    };
    const handleForPatient = async (
      first_name: string,
      last_name: string,
      userId: number,
      roomId: number,
      isProvider: boolean,
      roomName: string,
      appointmentId: number,
      relationShip: string
    ) => {
      const data: WaitingQueue = {
        first_name,
        last_name,
        user_id: Number(userId),
        room_id: Number(roomId),
        is_patient: !isProvider,
        appointment_id: Number(appointmentId),
        relationShip
      };

      try {
        const res = await createWaitingQueue(data);
        if (res) {
          // setCurrentUser(res.data);
          await socket.emit("get_waiting_list_user", { roomId });
          history.push(`/prejoinscreen/${first_name} ${last_name}/${roomName}`);
        }
      } catch (err) {
        console.log(err);
        history.push(`/`);
      }
    };

    const checkAppointmentTime = (appointmentData: any) => {
      // let appointmentDate = moment(appointmentData.date).format('YYYY-MM-DD');
      // let now = moment().format('YYYY-MM-DD');
      // console.log(appointmentDate, "-------------", now);
      // let startTime = moment(appointmentData.start, "HH:mm:ss a").subtract(30, 'minutes').format("HH:mm a");
      // let currentTime = moment().format("HH:mm a");
      // let endTime = moment(appointmentData.end, "HH:mm:ss a").add(30, 'minutes').format("HH:mm a");
      // console.log(startTime, "---", endTime, "---", currentTime);
      // if (appointmentDate > now || currentTime < startTime) return 1;
      // else if (appointmentDate < now || currentTime > endTime) return -1;
      // else return 0;
      return 0;
    }

    const setCurrentUserData = (first_name: string, last_name: string, room_id: number, room_name: string, paitent_id: number, participant_id: number, provider_id: number, is_patient: boolean) => {
      let currentUser = {
        first_name: first_name,
        last_name: last_name,
        room_id: room_id,
        room_name: room_name,
        paitent_id: paitent_id,
        participant_id: participant_id,
        provider_id: provider_id,
        is_patient: is_patient,
      }
      setCurrentUser(currentUser);
    }

    const decryptedData = await decrypt(iv, data);
    if (decryptedData) {
      const arraydecrypt = decryptedData.split("&");

      const decrypt = arraydecrypt.reduce((acc, key) => {
        const detail = key.split("=");
        //@ts-ignore
        acc[detail[0]] = detail[1];
        return acc;
      }, {});

      console.log("decrypt------", decrypt);
      //@ts-ignore
      let { clinic, provider, isProvider, speciality, patient, appointment, roomName, participant, roomId
      } = decrypt;
      // {\"clinic\":\"1\",\"provider\":\"1\",\"speciality\":\"1\",\"patient\":\"1\",\"appointment\":\"5\",\"roomId\":\"room-06\",\"isProvider\":\"false\",\"roomName\":\"room1\"}

      let first_name;
      let last_name;
      isProvider = Boolean(JSON.parse(isProvider));
      patient = Number(patient);
      clinic = Number(clinic);
      provider = Number(provider);
      speciality = Number(speciality);
      roomId = Number(roomId.split("-")[1]);
      appointment = Number(appointment);
      participant = Number(participant);
      if (appointment) {
        let appointmentDetails: any = await getAppointmentDetails(appointment);
        if (appointmentDetails) {
          let checkTime = checkAppointmentTime(appointmentDetails.data);
          if (checkTime === 1) {
            setModalMessage(`Link will enable 30 min prior to appointment`);
            setIsModalOpen(true);
            return;
          } else if (checkTime === -1) {
            setModalMessage(`Your appointment has ended`);
            setIsModalOpen(true);
            return;
          } else {
            let provideDetails: any = await getProvidersDetails(appointmentDetails.data.provider_id)
            appointmentDetails.data.first_name = provideDetails.data.first_name;
            appointmentDetails.data.last_name = provideDetails.data.last_name;
            setAppointmentInfo(appointmentDetails.data);

          }
        }

      }
      if (isProvider) {
        let providerDetails: any = await getProvidersDetails(provider);
        let upcomingAppDetails: any = await getCurrentupcoming(1);
        if (upcomingAppDetails && upcomingAppDetails.status == 200) {
          setupcoming(upcomingAppDetails.data);
        }
        if (providerDetails && providerDetails.status == 200) {
          first_name = providerDetails.data.first_name;
          last_name = providerDetails.data.last_name;
          handleForProvider(first_name, last_name, roomName, roomId);
          setCurrentUserData(
            first_name,
            last_name,
            roomId,
            roomName,
            patient,
            participant,
            provider,
            isProvider,
          );
          setAccessAdmit(isProvider);
        }
      } else {
        if (participant) {
          let participantDetails: any = await getParticipantDetails(participant);
          if (participantDetails && participantDetails.status == 200) {
            console.log("participantDetails-------", participantDetails.data);
            first_name = participantDetails.data.first_name;
            last_name = participantDetails.data.last_name;
            handleForPatient(
              first_name,
              last_name,
              participant,
              roomId,
              isProvider,
              roomName,
              appointment,
              participantDetails.data.relationship
            );
            setCurrentUserData(
              first_name,
              last_name,
              roomId,
              roomName,
              patient,
              participant,
              provider,
              isProvider,
            );
          }
        } else {
          let patientDetails: any = await getPatientDetails(patient);
          if (patientDetails && patientDetails.status == 200) {
            console.log("patientDetails-------", patientDetails);
            first_name = patientDetails.data.first_name;
            last_name = patientDetails.data.last_name;
            handleForPatient(
              first_name,
              last_name,
              patient,
              roomId,
              isProvider,
              roomName,
              appointment,
              "Patient"
            );
            setCurrentUserData(
              first_name,
              last_name,
              roomId,
              roomName,
              patient,
              participant,
              provider,
              isProvider,
            );
          }
        }
      }
    } else {
      history.push(`/`);
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      style={{ height: "100%", marginTop: "20%" }}
    >
      <AlertModal />
      <div>
        <CircularProgress variant="indeterminate" />
      </div>
      <div>
        <Typography
          variant="body2"
          style={{ fontWeight: "bold", fontSize: "16px" }}
        >
          Redirecting To Meeting
        </Typography>
      </div>
    </Grid>
  );
}


export default JoinMainRoom;
