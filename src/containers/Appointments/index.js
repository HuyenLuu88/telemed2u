import React from 'react'
import AppointmentsPage from '../../components/Appointments'
import MainLayout from '../../components/MainLayout'
import { connect } from "react-redux";
import * as actions from "../../store/actions/appointments";
import { getProviderDetails } from "../../store/actions/provider";
import * as loaderActions from "../../store/actions/loader";

// const specialities = ['Cardiologist', 'Neurologist', 'Chest Physician', 'General Physician', 'Dentist', 'ENT', 'Opthelomologist']

class Appointments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      speciality: '',
      visitType: '',
      searchDate: new Date(),
      patientDetails: {},
      patientList: [],
      zipCode: '',
      clinic: ''
    }

    this.role = localStorage.getItem("role")
  }
  componentDidMount() {
    this.props.getAllSpecialities()
    this.props.setProivderDetails({})
  }

  onChangeInput = (key, value) => {
    this.setState({ [key]: value })
  }

  handleProviderClick = (providerId) => {
    this.props.getProviderDetails(providerId);
    this.props.history.push("/patient/appointments/providerDetail");
  }

  onSearchClick = () => {
    const { speciality, visitType, zipCode, clinic } = this.state
    this.props.history.push(`/patient/appointments/provider-list/${visitType}/${speciality}${zipCode ? `/${zipCode}` : ''}${clinic ? `/${clinic}` : ''}`)
  }

  handlePatientDetailsChange = (name, value) => {
    this.setState({ patientDetails: { ...this.state.patientDetails, [name]: value }  })
  }

  handleAddPatientClick = () => {
    const { patientDetails, patientList } = this.state
    patientList.push(patientDetails)
    this.setState({ patientList, patientDetails: {} })
  }

  render() {
    const { specialities, getClinicListBySpeciality, clinicList } = this.props
    const { speciality, visitType, clinic, searchDate, patientDetails, patientList, zipCode } = this.state
    return (
      <MainLayout>
        <AppointmentsPage
          specialities={specialities}
          speciality={speciality}
          visitType={visitType}
          clinic={clinic}
          searchDate={searchDate}
          onChangeInput={this.onChangeInput}
          handleProviderClick={this.handleProviderClick}
          onSearchClick={this.onSearchClick}
          patientDetails={patientDetails}
          handlePatientDetailsChange={this.handlePatientDetailsChange}
          handleAddPatientClick={this.handleAddPatientClick}
          patientList={patientList}
          zipCode={zipCode}
          role={this.role}
          getClinicListBySpeciality={getClinicListBySpeciality}
          clinicList={clinicList}
        />
      </MainLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
    error: state.loader.error,
    specialities: state.appointments.specialities,
    clinicList: state.appointments.clinicList
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    getAllSpecialities: () => dispatch(actions.getAllSpecialities()),
    getProviderDetails: (providerId) => dispatch(getProviderDetails(providerId)),
    setError: (val) => dispatch(loaderActions.setError(val)),
    setProivderDetails: (val) => dispatch(actions.setSelectedProviderDetails(val)),
    getClinicListBySpeciality: speciality => dispatch(actions.getClinicListBySpeciality(speciality))
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(Appointments);