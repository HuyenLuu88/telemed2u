import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useHistory } from 'react-router-dom'
import erikaUser from '../../assests/images/erika_provider.png'
import userIcon from '../../assests/images/icon_user.svg'
import cameraIcon from '../../assests/images/icon_camera.svg'
import { calendarStyles, materialTheme } from "../../utilities/calendar/style";
import { Grid, Paper } from "@material-ui/core";
// import DateFnsUtils from "@date-io/date-fns";
import DateFnsUtils from '../../utilities/calendar/dateFns'
import SearchBox from './SearchBox'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import moment from 'moment'
import * as actions from "../../store/actions/appointments";

const slots = [{time: '10:00 AM', available: false}, {time: '10:15 AM', available: false}, {time: '10:30 AM', available: true}, {time: '10:45 AM', available: false}, {time: '11:00 AM', available: false}, {time: '11:15 AM', available: false}, {time: '11:30 AM', available: false}, {time: '11:45 AM', available: false}, {time: '12:00 PM', available: true}, {time: '12:15 PM', available: false}, {time: '12:30 PM', available: false}, {time: '12:45 PM', available: true}, {time: '01:00 PM', available: false}, {time: '01:15 PM', available: false}, {time: '01:30 PM', available: false}, {time: '01:45 PM', available: false}, {time: '2:00 PM', available: false}, {time: '02:15 PM', available: false}, {time: '02:30 PM', available: false}, {time: '02:45 PM', available: false}, {time: '03:00 PM', available: false}, {time: '03:15 PM', available: false}, {time: '03:30 PM', available: false}]
const providerData = [
  {
    id: 2,
    doctorName: 'Erika Mateo',
    profileThumbnail: erikaUser,
    type: 'Dermetologist',
    visitTypes: ['Telehealth', 'In-clinic'],
    slots
  },
  // {
  //   doctorName: 'Stephen Shaw',
  //   profileThumbnail: stephenUser,
  //   type: 'Primary Care Doctor',
  //   visitTypes: ['Telehealth', 'In-clinic'],
  //   slots
  // }
]

const dummyAvailableDates = [
  '08/23/2021', '08/25/2021', '08/28/2021', '08/29/2021', '09/12/2021', '10/10/2021', '11/09/2021', '01/09/2022', '08/07/2022', '08/08/2022', '10/08/2022'
]

const dummyNextAvailableDate = '08/23/2021'

const targetDate = new Date(dummyNextAvailableDate)

const currentAppointmentDate = '' //'07/24/2021'
const currentAppointmentSlot = '' //'10:45 am'

const ProviderList = ({
  handleViewAvailabilityClick,
  handleProviderClick,
  specialities,
  speciality,
  visitType,
  zipCode,
  clinic,
  searchDate,
  onChangeInput,
  onSearchClick,
  providerList,
  role,
  getClinicListBySpeciality,
  clinicList
}) => {
  const selectedProviderDetails = useSelector(state => state.appointments.selectedProviderDetails)
  const selectedLocalDate = selectedProviderDetails.selectedDate
  const selectedTime = selectedProviderDetails.selectedTimeSlot
  const selectedUserId = selectedProviderDetails.providerId
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  // const [isReschedule, setReschedule] = useState(location.pathname.includes('reschedule'))
  const [showMore, setShowMore] = useState(false)
  const [showCalendar, setShowCalendar] = useState(!!selectedLocalDate)
  const [showSlots, setShowSlots] = useState(!!selectedTime)
  const [selectedProviderId, setSelectedProviderId] = useState(selectedUserId || '')
  const [selectedDate, handleDateChange] = useState(selectedLocalDate ? selectedLocalDate : '');


  const nextAvailibilityClick = (selectedDate, userId) => {
    handleDateChange(moment(selectedDate).toDate())
    setShowCalendar(true)
    setSelectedProviderId(userId)
  }

  const classes = calendarStyles(); // import those CSS
  const today = new Date(); // just Date object of today
  const sunnyDays = dummyAvailableDates; // array of sunny days 1st,6th etc
  function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
    const isSunny = sunnyDays.includes(moment(day).format('MM/DD/YYYY'))
    const isSelected = moment(day).format('MM/DD/YYYY') === moment(selectedDate).format('MM/DD/YYYY');
    const isToday =
      day.getDate() === today.getDate() && day.getMonth() === today.getMonth();
    const isCurrentAppointmentDate = currentAppointmentDate && new Date(currentAppointmentDate).getDate() === day.getDate()

    let dateTile;
    if (isInCurrentMonth) {
      //conditionally return appropriate Element of date tile.
      if (isSunny) {
        dateTile = (
          <Paper
            className={
              isSelected ? classes.selectedDayPaper : classes.bookedDayPaper
            }
          >
            <Grid
              item
            >
              {day.getDate()}
            </Grid>
          </Paper>
        );
      } else {
        dateTile = (
          <Paper
            className={
              isSelected
                ? classes.selectedDayPaper
                : isCurrentAppointmentDate 
                ? classes.currentAppointmentDayPaper
                : isToday
                ? classes.todayPaper
                : classes.normalDayPaper
            }
          >
            <Grid item> {day.getDate()}</Grid>
          </Paper>
        );
      }
    } else {
      dateTile = (
        <Paper className={classes.notInThisMonthDayPaper}>
          <Grid
            item
          >
            {day.getDate()}
          </Grid>
        </Paper>
      );
    }
    return dateTile;
  }

  return (
    (
      <div className="appointments-container">
        <SearchBox 
          specialities={specialities}
          speciality={speciality}
          visitType={visitType}
          zipCode={zipCode}
          clinic={clinic}
          searchDate={searchDate}
          onChangeInput={onChangeInput}
          onSearchClick={onSearchClick}
          role={role}
          getClinicListBySpeciality={getClinicListBySpeciality}
          clinicList={clinicList}
        />
        <div className="provider-list-container" style={{ display: 'flex'}}>
          <div style={{width: '35%'}}>
            <span className="pl-count-txt">{`${providerList.length} ${providerList.length > 1 ? 'Providers' : 'Provider'}`}</span>
          </div>
        </div>
        <div className="pl-separator-up"></div>
        {providerList.map((pd, index) => (
          <div key={index}>
            <div className="provider-list-container">
              <div id="auto-provider-detail-link" className="provider-detail-outer" onClick={() => handleProviderClick(pd.user_id)} >
                <div className="provider-detail-inner">
                  <img className="pl-thumbnail" src={pd.photo || erikaUser} alt=""/>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="pl-name-txt"> {pd.first_name} {pd.last_name} </span>
                      <span className="pl-type-txt"> {pd.speciality.name}</span>

                      {[...(pd.appointment_type || '').split(',')].map((vt, index) => (
                        <div key={index} style={{ marginTop: `${index === 0 ? '10px' : '0px'}`, display: 'flex'}}>
                          <img className="pl-visit-type-icon" src={(vt || '').trim() === 'tele-consultant' ? cameraIcon : userIcon} alt=""/><span className="pl-visit-type-txt"> {(vt || '').trim()} visit</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div style={{width: '25%'}}>
                <div
                  id="auto-next-avail-btn"
                  className="pl-view-avail-btn"
                  onClick={() => {
                    nextAvailibilityClick(pd.next_availability || targetDate, pd.user_id)
                  }}
                >
                  <span>Next availability is {moment(pd.next_availability || targetDate).format('ddd, MMM DD')}</span>
                </div>
              </div>

              {showCalendar && selectedProviderId == pd.user_id && <div style={{width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <div className="pl-calendar-container">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={materialTheme}>
                      <KeyboardDatePicker
                        id="auto-provider-calendar"
                        disableToolbar
                        value={selectedDate}
                        onChange={(date) => { setShowSlots(true); handleDateChange(date)} }
                        inputVariant="outlined"
                        variant="static"
                        minDate={new Date()}
                        maxDate={moment().add(1, 'year').toDate()}
                        shouldDisableDate={(date) => {
                            return !dummyAvailableDates.includes(moment(date).format('MM/DD/YYYY'))
                          }
                        }
                        renderDay={(
                          day,
                          selectedDate,
                          isInCurrentMonth,
                          dayComponent
                        ) =>
                          getDayElement(
                            day,
                            selectedDate,
                            isInCurrentMonth,
                            dayComponent
                          )
                        }
                      />
                    </ThemeProvider>
                    {currentAppointmentDate && (
                      <>
                        <div className="calendar-separator"></div>
                        <div className="legend-wrap">
                          <div className="legend-container"><div className="available legend"></div><span className="legend-txt">Available</span></div>
                          <div className="legend-container"><div className="unavailable legend"></div><span className="legend-txt">Unavailable</span></div>
                          <div className="legend-container"><div className="current-apt legend"></div><span className="legend-txt">Current Appt</span></div>
                        </div>
                      </>
                    )}
                  </MuiPickersUtilsProvider>
                </div>
                {showSlots && selectedProviderId == pd.user_id && <div style={{ width: 180 }}>
                  {slots.map((slot, index) => (
                    <div id="auto-slot-btn" key={index} className={slot.available ? 'cursor-pointer' : ''} onClick={() => {
                      if (slot.available) {
                        dispatch(actions.setSelectedProviderDetails({
                          ...selectedProviderDetails,
                          firstName: pd.first_name,
                          lastName: pd.last_name,
                          selectedDate,
                          selectedTimeSlot: slot.time,
                          providerId: pd.user_id,
                          speciality: pd.speciality.name
                        }))
                        history.push('/patient/appointments/book-appointment')
                      }
                    }}>
                      {!showMore && index < 5 && <div key={index} className={`pl-slot-box ${slot.time === currentAppointmentSlot ? 'pl-slot-box-current-apt' : slot.available ? 'pl-slot-box-active' : ''}`}>
                        <span>{slot.time}</span>
                      </div>}
                      {showMore && <div key={index} className={`pl-slot-box ${slot.time === currentAppointmentSlot ? 'pl-slot-box-current-apt' : slot.available ? 'pl-slot-box-active' : ''}`}>
                        <span>{slot.time}</span>
                      </div>}
                    </div>
                  ))}
                  {
                    <div id="auto-slot-more-less-btn" onClick={() => {setShowMore(!showMore)}} className="pl-more-less-btn">
                        <span>{showMore ? 'Less' : 'More'}</span>
                    </div>
                  }
                </div>}

              </div>}
            </div>
            {index < providerData.length - 1 && <div className="pl-provider-divider" ></div>}
          </div>
        ))}
        
      </div>
    )
  )
}

export default ProviderList