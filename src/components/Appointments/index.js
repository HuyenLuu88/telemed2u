import React, { useState } from 'react'
import Search from './Search'
import CancelModal from './CancelModal'
import SuccessModal from './AppointmentSuccessModal.js'
import "./Appointment.scss"

export default ({
  specialities,
  speciality,
  visitType,
  clinic,
  searchDate,
  onChangeInput,
  onSearchClick,
  patientDetails,
  handlePatientDetailsChange,
  handleAddPatientClick,
  patientList,
  zipCode,
  role,
  getClinicListBySpeciality,
  clinicList
}) => {
  const [showCancelModal, toggleCancelModal] = useState(false)
  const [showSuccessModal, toggleSuccessModal] = useState(false)

  return (
    <div className="appointments-container">
      <Search
        specialities={specialities}
        speciality={speciality}
        visitType={visitType}
        clinic={clinic}
        searchDate={searchDate}
        onChangeInput={onChangeInput}
        onSearchClick={onSearchClick}
        patientDetails={patientDetails}
        handlePatientDetailsChange={handlePatientDetailsChange}
        handleAddPatientClick={handleAddPatientClick}
        patientList={patientList}
        zipCode={zipCode}
        role={role}
        getClinicListBySpeciality={getClinicListBySpeciality}
        clinicList={clinicList}
      /> 
    <CancelModal open={showCancelModal} toggleOpen={toggleCancelModal}/>
    <SuccessModal open={showSuccessModal} toggleOpen={toggleSuccessModal}/>
    </div>
  )
}