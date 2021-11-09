import loginAnotherWay from "../containers/Login/LoginAnotherWay";
import login from "../containers/Login/Login";
import Register from "../containers/SignUp/Register";
import register from "../containers/SignUp/Register";
import { authNotRequired } from '../utilities/guards';
import MainIndex from "../components/Consultation/MainIndex";

const meta = {
  auth: false,
  guards: [authNotRequired]
}

export default [
  {
    path: "/",
    component: login,
    meta
  },
  {
    path: "/register",
    component: register,
    meta
  },
  {
    path: "/signup",
    component: Register,
    meta
  },
  {
    path: "/loginAnotherWay",
    component: loginAnotherWay,
    meta
  },
  {
    path: "/video/:iv/:data",
    component: MainIndex,
    meta,
  },
  {
    path: "/video",
    component: MainIndex,
    meta,
  },
];
