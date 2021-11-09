import React from 'react'
import PatientSurveyPage from '../../components/PatientSurvey'
import { connect } from "react-redux";
import * as actions from "../../store/actions/appointments";
import * as loaderActions from "../../store/actions/loader";
import * as Yup from "yup";

const initialValues = {
  appointmentType: '',
  priorExperience: '',
  provider: '',
  satisfied: '',
  providerRating: '',
  staffRating: '',
  feedback: ''
}

const surveySchema = Yup.object().shape({
  appointmentType: Yup.string().required('Please select at least 1 option.'),
  priorExperience: Yup.string().required('Please select at least 1 option.'),
  provider: Yup.string().required('Please select at least 1 option.'),
  satisfied: Yup.string().required('Please select at least 1 option.'),
  providerRating: Yup.string().required('Please select at least 1 option.'),
  staffRating: Yup.string().required('Please select at least 1 option.'),
  feedback: Yup.string()
})

class PatientSurvey extends React.Component {

    handleSubmit = () => {

    }

    render () {
        return (
            <PatientSurveyPage
              handleSubmit={this.handleSubmit}
              initialValues={initialValues}
              surveySchema={surveySchema}
            />
        )
    }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
    error: state.loader.error,
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    getAllSpecialities: () => dispatch(actions.getAllSpecialities()),
    setError: (val) => dispatch(loaderActions.setError(val)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(PatientSurvey);