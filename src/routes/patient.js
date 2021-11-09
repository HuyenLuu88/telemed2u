import AppointmentsPage from "../containers/Appointments";
import BookAppointment from "../containers/Appointments/BookAppointment";
import PatientAppointmentSummaryPage from "../containers/Appointments/PatientAppointmentSummaryPage";
import ProviderDetail from "../containers/Provider/ProviderDetail/ProviderDetail";
import ProviderList from "../containers/Appointments/ProviderList"
import Dashboard from "../containers/Dashboard"
import patientDetail from "../containers/SignUp/PatientDetail";
import { authRequired } from '../utilities/guards'

//Patient Survey
import PatientSurvey from "../containers/PatientSurvey";

const meta = {
  auth: true,
  guards: [authRequired],
};

export default [
  {
    path: "/patientDetail",
    component: patientDetail,
    meta
  },
  {
    path: '/patient/dashboard',
    component: Dashboard,
    meta
  },
  {
    path: '/patient/appointments/search-provider',
    component: AppointmentsPage,
    meta,
  },
  {
    path: "/patient/appointments/book-appointment",
    component: BookAppointment,
    meta,
  },
  {
    path: "/patient/appointments",
    component: PatientAppointmentSummaryPage,
    meta,
  },
  {
    path: "/patient/appointments/providerDetail/:providerId",
    component: ProviderDetail,
    meta,
  },
  {
    path: "/patient/appointments/provider-list/:visitType/:speciality/:zipCode?/:clinic?",
    component: ProviderList,
    meta,
  },
  {
    path: "/patient-survey",
    component: PatientSurvey,
    meta: { auth: false },
  },
];
