import React from "react";
import ProviderListView from "../../components/Appointments/ProviderList";
import MainLayout from "../../components/MainLayout";
import { connect } from "react-redux";
import * as actions from "../../store/actions/appointments";
import { getProvidersList } from "../../store/actions/provider"
import * as loaderActions from "../../store/actions/loader";
import LoadingPage from "../../utilities/loading-page";

// const specialities = ['Cardiologist', 'Neurologist', 'Chest Physician', 'General Physician', 'Dentist', 'ENT', 'Opthelomologist']

class ProviderList extends React.Component {
  constructor(props) {
    super(props);
    const { visitType, speciality, zipCode, clinic } = this.props.match.params
    this.state = {
      speciality,
      visitType,
      clinic,
      zipCode,
      searchDate: new Date(),
    };
    this.role = localStorage.getItem("role")
  }
  
  componentDidMount() {
    const { visitType, speciality } = this.state
    const { providerList } = this.props
    this.props.getAllSpecialities();
    if (speciality && visitType && !providerList.length) {
      this.props.getProviderList(speciality, visitType)
    }
    if (speciality) {
      this.props.getClinicListBySpeciality(speciality)
    }
  }

  onChangeInput = (key, value) => {
    this.setState({ [key]: value });
  };

  handleProviderClick = (providerId) => {
    this.props.history.push(
      `/patient/appointments/providerDetail/${providerId}`
    );
  };

  onSearchClick = () => {
    const { speciality, visitType, clinic } = this.state
    this.props.getProviderList(speciality, visitType)
    // this.props.history.push(`/patient/appointments/provider-list/${visitType}/${speciality}`)
  }

  render() {
    const { specialities, providerList, loading, getClinicListBySpeciality, clinicList } = this.props;
    const { speciality, visitType, clinic, zipCode, searchDate } = this.state;
    return (
      <MainLayout>
        <ProviderListView
          specialities={specialities}
          speciality={speciality}
          visitType={visitType}
          zipCode={zipCode}
          clinic={clinic}
          searchDate={searchDate}
          onChangeInput={this.onChangeInput}
          handleProviderClick={this.handleProviderClick}
          onSearchClick={this.onSearchClick}
          providerList={providerList}
          role={this.role}
          getClinicListBySpeciality={getClinicListBySpeciality}
          clinicList={clinicList}
        />
        {loading && <LoadingPage />}
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
    error: state.loader.error,
    specialities: state.appointments.specialities,
    providerList: state.provider.providerList,
    clinicList: state.appointments.clinicList
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    getAllSpecialities: () => dispatch(actions.getAllSpecialities()),
    getProviderList: (speciality, visitType) => dispatch(getProvidersList(speciality, visitType)),
    setError: (val) => dispatch(loaderActions.setError(val)),
    getClinicListBySpeciality: speciality => dispatch(actions.getClinicListBySpeciality(speciality))
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(ProviderList);
