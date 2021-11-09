import React, { useEffect, useState } from "react";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppStateProvider, { useAppState } from "./state";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ErrorDialog from "./components/ErrorDialog/ErrorDialog";
import LoginPage from "./components/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import theme from "./theme";
import "./types";
import { ChatProvider } from "./components/ChatProvider";
import { VideoProvider } from "./components/VideoProvider";
import useConnectionOptions from "./utilities/useConnectionOptions/useConnectionOptions";
import UnsupportedBrowserWarning from "./components/UnsupportedBrowserWarning/UnsupportedBrowserWarning";
import Consultation from "./Consultation";
import { ProviderDetail } from "./components/ProviderDetail";
import { initiateSocket, disconnectSocket } from "./apis/socketInitialisation";
import LoginVideoScreen from "./LoginVideoScreen";
import PreJoinscreen from "./components/PreJoinScreens/PreJoinScreen";
import JoinMainRoom from "./JoinMainRoom";
const MainIndex = () => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(initiateSocket());

    return () => {
      disconnectSocket();
    };
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <UnsupportedBrowserWarning>
          <Router>
          <VideoProvider options={connectionOptions} onError={setError}>
            <ErrorDialog dismissError={() => setError(null)} error={error} />
            <ChatProvider>
              <ProviderDetail socket={socket}>
                <AppStateProvider>
                  <Switch>
                     <Route path="/video/:iv/:data" exact>
                    <LoginVideoScreen />
                      </Route>
                     <Route path="/join/:iv/:data" exact>
                    <JoinMainRoom />
                      </Route>
                    <PrivateRoute path="/video" >
                      <LoginVideoScreen />
                    </PrivateRoute>
                    <PrivateRoute path="/room/:URLRoomName">
                      <Consultation />
                    </PrivateRoute>
                    <PrivateRoute path="/prejoinscreen/:name/:roomName">
                      <PreJoinscreen />
                    </PrivateRoute>
                    <Route path="/login">
                      <LoginPage />
                    </Route>
                    {/* <Redirect to="/"/> */}
                  </Switch>
                </AppStateProvider>
              </ProviderDetail>
            </ChatProvider>
          </VideoProvider>
                  </Router>
      </UnsupportedBrowserWarning>
    </MuiThemeProvider>
  );
};

export default MainIndex;
