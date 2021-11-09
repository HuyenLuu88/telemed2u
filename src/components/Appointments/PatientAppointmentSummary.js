import React from 'react'
import { useHistory } from 'react-router-dom'
import './Appointment.scss'
import { Button } from '@material-ui/core'
import SummaryRow from './SummaryRow'

const PatientAppointmentSummary = ({
    handleClick,
    dummyAppointmentData,
    btnType,
    onCancelAppointment
}) => {
    const history = useHistory()
    return (
        <div className="apt-main-container">
            <div className="apt-container">
                <div className="apt-heading-box">
                    <span className="apt-heading-txt">Appointments</span>
                </div>
                <div className="apt-btn">
                    <Button id="auto-book-apt-btn" className="new-apt-btn" onClick={() => { history.push('/patient/appointments/search-provider') }}>Book Appointment</Button>
                </div>
            </div>
            <div className="table-container">
                <div className="btn-display-type">
                    <div
                        id="auto-book-apt-upcoming-btn"
                        className={btnType === 'u' ? "btn-type-active btn-type" : "btn-type"}
                        onClick={e => handleClick(e, "u")}
                    ><span className="btn-txt">Upcoming</span></div>
                    <div
                        id="auto-book-apt-past-btn"
                        className={btnType === 'p' ? "btn-type-active btn-type" : "btn-type"}
                        onClick={e => handleClick(e, "p")}
                    ><span className="btn-txt">Past</span></div>
                    <div
                        id="auto-book-apt-all-btn"
                        className={btnType === 'a' ? "btn-type-active btn-type" : "btn-type"}
                        onClick={e => handleClick(e, "a")}
                    ><span className="btn-txt">All</span></div>
                    {/* <div className="left-space"></div> */}
                </div>
                <div className="table-wrap">
                {
                    dummyAppointmentData.map((data, key) => {
                        return (
                            <div className="apt-table-row" key={key}>
                                <SummaryRow data={data} key={key} onCancelAppointment={onCancelAppointment} />
                                {/* <div className="empty-space"></div> */}
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    );
}

export default PatientAppointmentSummary;