import authRoutes from './auth'
import PatientRoutes from './patient'


export const routes = [
  ...authRoutes,
  ...PatientRoutes
];
