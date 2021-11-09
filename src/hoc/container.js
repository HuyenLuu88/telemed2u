import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "../routes";
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { getIsLoggedIn } from '../utilities'
// import axios from 'axios';

class App extends Component {
  render() {
    return (
      <GuardProvider>
        <Switch>
          {routes.map((el, index) => {
            return (
              <GuardedRoute
                path={el.path}
                exact
                strict
                component={el.component}
                key={index}
                meta={el.meta}
                guards={el.meta.guards}
              />
            );
          })}
        </Switch>
      </GuardProvider>
    );
  }
}

export default App;
