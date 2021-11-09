import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import useChatContext from "../../../hooks/useChatContext/useChatContext";
import Grid from "@material-ui/core/Grid";
import { Badge, Card, Button, Box, CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CloseSmallIcon from "../../../icons/CloseSmallIcon";
import { ScheduleWindowHeader as useStyles } from "./styles";
import listWaitingQueue from "../../../apis/listWaitingQueue";
import { WaitingQueue } from "../../../apis/createWaitingQueue";
import useProviderContext from "../../../hooks/useProviderContext/useProviderContext";
import removeUserFromWaitingQueue from "../../../apis/deleteFromWaitingQueue";
export default function ScheduleWindowHeader() {
  const classes = useStyles();
  const { setIsScheduleWindowOpen } = useChatContext();
  const {
    socket,
    currentUser,
    setCountWaitingUser,
    setListWaiting,
    waitingCount,
    listWaiting,
  } = useProviderContext();

  const [disable, setDisable] = useState(false);
  const [admittingIndex, setAdmittingIndex] = useState(-1)
  const [removingIndex, setRemovingIndex] = useState(-1)

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

  // useEffect(() => {
  //   //Check need to added for provider
  //   socket.on("get_waiting_list_user", (data: any) => { 
  //     console.log("Sockeet got called-------",data);

  //     // if (data["client-Message"].roomId == currentUser?.room_id) {   
  //     //   fetchWaitingList();
  //     // }
  //   });
  // }, []);

  const handleAdmitUser = async (patient: WaitingQueue,index = -1) => {
    setDisable(true);
    setAdmittingIndex(index)
    const message = patient;
    socket.emit("admit_user", message);
    //Not requrired herer
    if (patient.id) await removeUserFromWaitingQueue(patient.id);
    fetchWaitingList();
    setAdmittingIndex(-1)
    setDisable(false);
  };

  const admitAll = () => {
    listWaiting.forEach(async (element:any) => {
      await handleAdmitUser(element);
    });
  }

  const handleRemoveUser = async (patient: WaitingQueue,index = -1) => {
    setDisable(true);
    socket.emit("remove_from_waiting_list", patient);
    if (patient.id) await removeUserFromWaitingQueue(patient.id);
    fetchWaitingList();
    setRemovingIndex(-1)
    setDisable(false);
  };

  return (
    <div className={classes.container}>
      <Grid container className={classes.mainProfileContainer}>
        <Grid item xs={6} className={classes.mt4}>
          <span className={classes.font18}>{waitingCount} Waiting</span>
        </Grid>
        <Grid
          item
          xs={5}
          className={[classes.textRight, classes.mt4].join(" ")}
        >
          <Button onClick={() => admitAll()} className={[classes.font18, classes.primaryColor].join(" ")}>
            Admit all
          </Button>
        </Grid>
        <Grid item xs={1}>
          <button
            className={classes.closeChatWindow}
            onClick={() => setIsScheduleWindowOpen(false)}
          >
            <CloseSmallIcon />
          </button>
        </Grid>
      </Grid>

      <hr className={classes.horizontalLine} />
      {listWaiting?.length > 0 ? (
        <>
          {listWaiting.map((patient: any, index: number) => {
            return (
              <Grid
                key={index}
                container
                className={[
                  classes.mainProfileContainer,
                  classes.mt8,
                  classes.pr8,
                ].join(" ")}
              >
                <Grid item xs={6}>
                  <Typography className={[classes.font16].join(" ")}>
                    <b>
                      {`${patient.first_name} ${patient.last_name}`}
                    </b>
                  </Typography>
                  <Typography
                    className={[classes.greyColor, classes.font14].join(" ")}
                  >
                    {patient.relationship}
                  </Typography>
                </Grid>
                <Grid item xs={6} container className={[classes.mt2, classes.buttonWrapper].join(" ")}>
                  <Grid item xs={5}>
                  {admittingIndex == index ? (
                      <CircularProgress />
                    ) : (
                    <Button
                      disabled={disable}
                      onClick={() => handleAdmitUser(patient,index)}
                      className={[classes.AdmitButton, classes.w100].join(" ")}
                    >
                      Admit
                    </Button>
                      )}
                  </Grid>
                  <Grid item xs={5}>
                  {removingIndex == index ? (
                      <CircularProgress />
                    ) : (
                    <Button
                      disabled={disable}
                      className={[classes.removeButton, classes.w100].join(" ")}
                      onClick={() => handleRemoveUser(patient,index)}
                    >
                      Remove
                    </Button>
                      )}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </>
      ) : (
        <>
          <Box component="span">
            {" "}
            <b></b>No Patients{" "}
          </Box>
        </>
      )}

      <Card className={classes.mainProfileContainer}>
        <Grid item xs={12} className={classes.m4}>
          <Grid container className={[classes.mainProfileContainer].join(" ")}>
            <Grid item xs={8} className={classes.mt4}>
              <span className={classes.font18}>Upcoming event: 11:00 am</span>
            </Grid>
            <Grid
              item
              xs={4}
              className={[classes.textRight, classes.mt4].join(" ")}
            >
              <Button
                className={[classes.font18, classes.primaryColor].join(" ")}
              >
                Admit all
              </Button>
            </Grid>
          </Grid>

          <hr className={classes.horizontalLine} />
          <Grid
            container
            className={[
              classes.mainProfileContainer,
              classes.mt8,
              classes.pr8,
            ].join(" ")}
          >
            <Grid item xs={6}>
              <Typography className={[classes.font16].join(" ")}>
                <b>Ria Martin</b>
              </Typography>
              <Badge
                className={[
                  classes.greyColor,
                  classes.pl2,
                  classes.pr2,
                  classes.font11,
                  classes.badge,
                  classes.p1,
                  classes.borderR5,
                ].join(" ")}
              >
                Wife
              </Badge>
            </Grid>
            <Grid item xs={6} container className={[classes.mt2, classes.buttonWrapper].join(" ")}>
              <Grid item xs={5}>
                <Button
                  className={[classes.AdmitButton, classes.w100].join(" ")}
                >
                  Admit
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button className={[classes.removeButton, classes.w100].join(" ")}>Remove</Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            className={[
              classes.mainProfileContainer,
              classes.mt8,
              classes.mb8,
              classes.pr8,
            ].join(" ")}
          >
            <Grid item xs={6}>
              <Typography className={[classes.font16].join(" ")}>
                <b>Joslin Rodgers</b>
              </Typography>
              <Typography
                className={[classes.greyColor, classes.font11].join(" ")}
              >
                Mother
              </Typography>
            </Grid>
            <Grid item xs={6} container className={[classes.mt2, classes.buttonWrapper].join(" ")}>
              <Grid item xs={5}>
                <Button
                  className={[classes.AdmitButton, classes.w100].join(" ")}
                >
                  Admit
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button className={[classes.removeButton, classes.w100].join(" ")}>Remove</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
