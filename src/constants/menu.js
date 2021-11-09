import { userRoles } from './'
import dashboardIcon from '../assests/sidebar/icon_dashboard.svg'
import activeDashboardIcon from '../assests/sidebar/icon_dashboard_pressed.svg'
import scheduleIcon from '../assests/sidebar/icon_schedule_normal.svg'
import activeScheduleIcon from '../assests/sidebar/icon_schedule_pressed.svg'
import healthReportIcon from '../assests/sidebar/icon_report_normal.svg'
import activeHealthReportIcon from '../assests/sidebar/icon_report_pressed.svg'
import appointmentsIcon from '../assests/sidebar/icon_appointments.svg'
import activeAppointmentsIcon from '../assests/sidebar/icon_appointments_pressed.svg'

//header menu icons
import profileIcon from '../assests/images/icon_profile.svg'
import logoutIcon from '../assests/images/icon_logout.svg'

export const menu = [
	{
		role: userRoles.PATIENT,
		name: 'Dashboard',
		path: '/patient/dashboard',
		icon: dashboardIcon,
		activeIcon: activeDashboardIcon
	},
	{
		role: userRoles.PATIENT,
		name: 'Schedule',
		path: '/patient/schedule',
		icon: scheduleIcon,
		activeIcon: activeScheduleIcon
	},
	{
		role: userRoles.PATIENT,
		name: 'Health Report',
		path: '/patient/health-report',
		icon: healthReportIcon,
		activeIcon: activeHealthReportIcon
	},
	{
		role: userRoles.PATIENT,
		name: 'Appointments',
		path: '/patient/appointments',
		icon: appointmentsIcon,
		activeIcon: activeAppointmentsIcon
	}
]

export const userMenus = [
	{
		name: 'Profile',
		icon: profileIcon,
		action: 'onProfileClick'
	},
	{
		name: 'Logout',
		icon: logoutIcon,
		action: 'onLogoutClick'
	}
]

export const MENUS = {
	DASHBOARD: 'Dashboard',
	SCHEDULE: 'Schedule',
	HEALTH_REPORT: 'Health Report',
	APPOINTMENTS: 'Appointments'
}
