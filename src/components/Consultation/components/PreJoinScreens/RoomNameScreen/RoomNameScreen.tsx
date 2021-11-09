import React, { ChangeEvent, FormEvent } from 'react';
import { Typography, makeStyles, TextField, Grid, Button, InputLabel, Theme,FormControlLabel,Switch } from '@material-ui/core';

import { useAppState } from '../../../state';

const useStyles = makeStyles((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1em 0 2.5em',
    '& div:not(:last-child)': {
      marginRight: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '1.5em 0 2em',
    },
  },
  textFieldContainer: {
    width: '100%',
  },
  continueButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

interface RoomNameScreenProps {
  name: string;
  roomName: string;
  userId:string;
  roomId:string;
  isProvider:boolean;
  setIsProvider:(isProvider:boolean) => void;
  setName: (name: string) => void;
  setRoomName: (roomName: string) => void;
  setUserId: (userId: string) => void;
  setRoomId: (roomId: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function RoomNameScreen({ name, roomName,userId,roomId, setName, setRoomName,setUserId,setRoomId, handleSubmit,isProvider,setIsProvider }: RoomNameScreenProps) {
  const classes = useStyles();
  const { user } = useAppState();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const hasUsername = !window.location.search.includes('customIdentity=true') && user?.displayName;

  return (
    <>
      <Typography variant="h5" className={classes.gutterBottom}>
       Create/Join a Room
      </Typography>
      <Typography variant="body1">
        {hasUsername
          ? "Enter the name of a room you'd like to join."
          : "Enter your name and the name of a room you'd like to join"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          {!hasUsername && (
            <div className={classes.textFieldContainer}>
              <InputLabel shrink htmlFor="input-user-name">
                Your Name
              </InputLabel>
              <TextField
                id="input-user-name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          )}
          <div className={classes.textFieldContainer}>
            <InputLabel shrink htmlFor="input-room-name">
              Room Name
            </InputLabel>
            <TextField
              autoCapitalize="false"
              id="input-room-name"
              variant="outlined"
              fullWidth
              size="small"
              value={roomName}
              onChange={handleRoomNameChange}
            />
          </div>
        </div>
        <div className={classes.inputContainer}>
        <div className={classes.textFieldContainer}>
            <InputLabel shrink htmlFor="input-user-id">
              User Id
            </InputLabel>
            <TextField
              autoCapitalize="false"
              id="input-user-id"
              variant="outlined"
              fullWidth
              size="small"
              value={userId}
              onChange={(e)=>{setUserId(e.target.value)}}
            />
          </div>
          <div className={classes.textFieldContainer}>
            <InputLabel shrink htmlFor="input-room-id">
              Room Id
            </InputLabel>
            <TextField
              autoCapitalize="false"
              id="input-room-id"
              variant="outlined"
              fullWidth
              size="small"
              value={roomId}
              onChange={(e)=>{setRoomId(e.target.value)}}
            />
          </div>
        </div>
        <Grid container justify="space-between">
        <FormControlLabel
          control={<Switch checked={isProvider} color="primary" onChange={()=> setIsProvider(!isProvider)} name="Provider" />}
          label="Provider"
        />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={!name || !roomName || !userId || !roomId}
            className={classes.continueButton}
          >
            Continue
          </Button>
        </Grid>
      </form>
    </>
  );
}
