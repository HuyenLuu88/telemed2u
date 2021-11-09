import React from 'react'
import { useSelector } from 'react-redux'
import erikaUser from '../../assests/images/erika_provider.png'
import AppointmentForm from './AppointmentForm'
import AddAnotherPersonForm from './AddAnotherPersonForm'
import moment from 'moment';
import './BookAppointment.scss'

const BookAppointment = ({ 
    onBookAppointmentClick,
    appointmentFormFields, 
    handleAppointmentFormInputChange, 
    appointmentFormErrorFlags, 
    handleNextClick, 
    activeScreen,
    screens,
    patientType,
    changePatientType,
    handleBackClick,
    addAnotherPersonFormErrorFlags,
    addAnotherPersonFormFields,
    handleAddAnotherPersonInputChange,
    handleBookAppointmentClick,
    onAddaAnotherPersonClick,
    personList,
    onClickEditIcon,
    handleEditPerson,
    handleRemovePerson,
    wantToAddSomeone,
    isInsured,
    onChangeRadioInput,
    resetAddAnotherPersonErrorFlag
}) => {
    const selectedProviderDetails = useSelector(state => state.appointments.selectedProviderDetails)

    const provider = {
        doctorName: `${selectedProviderDetails.firstName} ${selectedProviderDetails.lastName}`,
        profileThumbnail: erikaUser,
        type: selectedProviderDetails.speciality,
        address: 'Medical Offices of Manhattan Midtown',
        address2: '211 51st St New York NY 10022',
        appointmentTime: `${moment(new Date(selectedProviderDetails.selectedDate)).format('MMM DD, YYYY')} | ${selectedProviderDetails.selectedTimeSlot}`,
        appointmentType: 'Follow-up appointment',
        visitType: 'Telehealth visit'
    }
    return (
        <div className="ba-page">
            {/* <div className="ba-header">
                <img className="ba-logo" src={mainLogo} alt="TeleMed2U" ></img>
            </div> */}
            <div className="ba-main-container">
                <div className="ba-form-box">
                    <div className="ba-provider-detail-box ">
                        <img className="pl-thumbnail" src={provider.profileThumbnail} alt=""/>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '325px' }}>
                            <span className="pl-name-txt"> {provider.doctorName} </span>
                            <span className="pl-type-txt"> {provider.type}</span>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                                <span className="ba-provider-address"> {provider.address} </span>
                                <span className="ba-provider-address"> {provider.address2} </span>
                                <div className="ba-provider-separator"></div>
                                <span className="pl-type-txt">Appointment Time  {provider.appointmentTime} </span>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <div className="ba-ptovider-types-wrp">
                                        <span className="ba-provider-types"> {provider.appointmentType} </span>
                                    </div>
                                    <div className="ba-ptovider-types-wrp">
                                        <span className="ba-provider-types"> {provider.visitType} </span>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                <div className="ba-separator"></div>
                {activeScreen === screens.ADD_ANOTHER_PERSON_FORM &&
                    <AddAnotherPersonForm 
                        onBookAppointmentClick={onBookAppointmentClick}
                        handleBackClick={handleBackClick}
                        addAnotherPersonFormErrorFlags={addAnotherPersonFormErrorFlags}
                        addAnotherPersonFormFields={addAnotherPersonFormFields}
                        handleAddAnotherPersonInputChange={handleAddAnotherPersonInputChange}
                        handleBookAppointmentClick={handleBookAppointmentClick}
                        onAddaAnotherPersonClick={onAddaAnotherPersonClick}
                        personList={personList}
                        onClickEditIcon={onClickEditIcon}
                        handleEditPerson={handleEditPerson}
                        handleRemovePerson={handleRemovePerson}
                        wantToAddSomeone={wantToAddSomeone}
                        isInsured={isInsured}
                        onChangeRadioInput={onChangeRadioInput}
                        resetAddAnotherPersonErrorFlag={resetAddAnotherPersonErrorFlag}
                    />
                }
                {activeScreen === screens.APPOINTMENT_FORM &&
                    <AppointmentForm 
                        appointmentFormErrorFlags={appointmentFormErrorFlags}
                        handleAppointmentFormInputChange={handleAppointmentFormInputChange}
                        appointmentFormFields={appointmentFormFields}
                        onNextClick={handleNextClick}
                        patientType={patientType}
                        changePatientType={changePatientType}
                        handleBackClick={handleBackClick}
                    />
                }
                </div>
            </div>
        </div>
    )
}

export default BookAppointment