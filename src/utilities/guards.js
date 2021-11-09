import { getIsLoggedIn } from './index'

export const authRequired = (to, from, next) => {
	if (to.meta.auth) {
		if (getIsLoggedIn()) {
			next();
		}
		next.redirect('/');
	} else {
		next();
	}
};

export const authNotRequired = (to, from, next) => {
	if (!to.meta.auth && getIsLoggedIn() && localStorage.getItem('isProfileComplete')) {
		next.redirect('/patient/appointments');
	} else if (localStorage.getItem('isProfileComplete') == false) {
		next.redirect("/patientDetail");
	} else {
		next();
	}
};