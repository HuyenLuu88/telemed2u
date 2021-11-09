import React, { Component } from 'react';
import CancelModal from '../../components/Appointments/CancelModal';
import PatientAppointmentSummary from '../../components/Appointments/PatientAppointmentSummary'
import MainLayout from '../../components/MainLayout'
import { dummyAptData } from '../../constants/dummyAptData'

class PatientAppointmentSummaryPage extends Component {
    state = {
        btnType: 'u',
        appointmentDetails: dummyAptData,
        showCancelModal: false
    }

    handleClick = (event , type) => {
        let buttonType;
        console.log("event.target.name",type);
        type === 'u' ? buttonType = 'u' : type === 'p' ? buttonType = 'p' : buttonType = 'a';
        this.setState({btnType: buttonType});
    }

    toggleCancelModal = (showCancelModal) => {
        this.setState({ showCancelModal })
    }

    onCancelAppointment = () => {
        this.setState({ showCancelModal: true })
    }

    render() {
        return (
            <MainLayout>
                <PatientAppointmentSummary
                    handleClick={this.handleClick}
                    dummyAppointmentData={this.state.appointmentDetails}
                    btnType={this.state.btnType}
                    onCancelAppointment={this.onCancelAppointment}
                />
                <CancelModal open={this.state.showCancelModal} toggleOpen={this.toggleCancelModal} />
            </MainLayout>
        )
    }
}

export default PatientAppointmentSummaryPage;