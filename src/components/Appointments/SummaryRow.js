import { Link } from "react-router-dom";
import moment from "moment";

const SummaryRow = ({ data, onCancelAppointment }) => { 
    return (
        <table className="apt-table">
            <tbody>
                <tr className="content-area">
                    <td className={`table-col-link ${data.isAppointmentDone ? 'disabled-row' : ''}`}>{ moment(data.date).format('MM/DD/YYYY')}</td>
                    <td className={`table-col ${data.isAppointmentDone ? 'disabled-row' : ''}`}>{data.time}</td>
                    <td className={`table-col ${data.isAppointmentDone ? 'disabled-row' : ''}`}>{data.speciality}</td>
                    <td className="table-col-provider">
                        <div className="apt-provider-thumbnail-box">
                            <img className="apt-provider-thumbnail" src={data.profileThumbnail} alt="Provider" />
                        </div>
                        <div className={`apt-provider-name-box ${data.isAppointmentDone ? 'disabled-row' : ''}`}>
                            <span className="">{data.provider}</span>
                        </div>
                    </td>
                    <td className="table-col-link">
                    {!data.isAppointmentDone ? <Link id="auto-book-apt-reschedule-link" to="/patient/appointments/reschedule/provider-list" className="appt-action-link">Reschedule</Link>: null}
                    </td> 
                    <td className="table-col-link">
                    {!data.isAppointmentDone ? <a id="auto-book-apt-cancel-link" onClick={() => onCancelAppointment()} className="appt-action-link">Cancel</a>: null}
                    </td>
                    {!data.isAppointmentDone ? <td className="table-col-start">
                        <Link id="auto-book-apt-start-link" to="/" className="link-start">Start Appointment</Link>
                    </td> : null}
                    {data.isAppointmentDone ? <td colSpan={3} className="table-colspan3">
                        <Link id="auto-book-apt-follow-up-link" to="/" className="appt-action-link">Follow-up</Link>
                    </td> : null}
                </tr>
            </tbody>
        </table>
    )
}

export default SummaryRow;