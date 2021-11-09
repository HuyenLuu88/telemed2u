import React from 'react'
import { mobileRegex, emailRegex, charRegex, numberRegex } from "../../utilities/regex";
import BookAppointmentPage from '../../components/Appointments/BookAppointment'
import MainLayout from '../../components/MainLayout'
import { connect } from "react-redux";
import * as actions from "../../store/actions/appointments";
import * as loaderActions from "../../store/actions/loader";
import SuccessModal from '../../components/Appointments/AppointmentSuccessModal';
import RescheduleSuccessModal from '../../components/Appointments/AppointmentRescheduleSuccessModal';

const SCREENS = {
  APPOINTMENT_FORM: 'appointmentForm',
  ADD_ANOTHER_PERSON_FORM: 'addAnotherPersonForm'
}

const patientTypes = {
  ADULT: 'adult',
  CHILD: 'child'
}

class BookAppointment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      patientType: patientTypes.ADULT,
      activeScreen: SCREENS.APPOINTMENT_FORM,
      showSuccessModal: false,
      showRescheduleSuccessModal: false,
      appointmenFormtErrorFlags: {
        parentName: false,
        maritalStatus: false,
        firstName: false,
        lastName: false,
        dob: false,
        gender: false,
        phoneNumber: false,
        emailId: false,
        docType: false,
        uploadedDoc: [],
        speciality: false,
        haveSuicidalThought: false,
        haveSuicidalIntent: false,
        isAdvisedMentalCare: false,
        haveExperiencedAny: false,
        reason: false,
        otherDetails: false
      },
      appointmentFormFields: {
        parentName: 'Ana Jean (Myself)',
        maritalStatus: '',
        firstName: 'Ana',
        lastName: 'Jean',
        dob: '12/06/1980',
        gender: 'Female',
        phoneNumber: '(123) 456-7890',
        emailId: 'ana.jean@gmail.com',
        docType: '',
        uploadedDoc: [],
        speciality: 'Primary Care',
        haveSuicidalThought: 'no',
        haveSuicidalIntent: 'no',
        isAdvisedMentalCare: 'no',
        haveExperiencedAny: 'none',
        reason: '',
        otherDetails: '',
        preferredLocation: 'ABC Clinic'
      },
      addAnotherPersonFormErrorFlags: {
        firstName: false,
        lastName: false,
        phoneNumber: false,
        emailAddress: false,
        relationship: false,
        primaryInsurance: false,
        primaryPolicyNumber: false
      },
      addAnotherPersonFormFields: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        relationship: '',
        primaryInsurance: '',
        primaryPolicyNumber: '',
        primaryInsuranceCardPhoto: [],
        secondaryInsurance: '',
        secondaryPolicyNumber: '',
        secondaryInsuranceCardPhoto: [],
        isAgreedTnC: false
      },
      personList: [],
      wantToAddSomeone: 'no',
      isInsured: 'no'
    }
  }

  onChangeRadioInput = (name, value) => {
    this.setState({ [name]: value })
  }

  changePatientType = (patientType) => {
    this.setState({ patientType })
  }

  changeActiveScreen = (activeScreen) => {
    this.setState({ activeScreen })
  }

  toggleSuccessModal = (showSuccessModal) => {
    this.setState({ showSuccessModal })
  }

  toggleRescheduleSuccessModal = (showRescheduleSuccessModal) => {
    this.setState({ showRescheduleSuccessModal })
  }

  onBookAppointmentClick = (appointmentType) => {
    const { addAnotherPersonFormErrorFlags, addAnotherPersonFormFields, wantToAddSomeone, isInsured, personList } = this.state

    if (wantToAddSomeone === 'yes' && personList.length === 0) {
      const fields = ["firstName", "lastName", "phoneNumber", "relationship"]
      fields.forEach(field => {
        addAnotherPersonFormErrorFlags[field] = addAnotherPersonFormFields[field] ? false : true
      })
    }
    if (isInsured === 'yes') {
      const fields = ["primaryInsurance", "primaryPolicyNumber"]
      fields.forEach(field => {
        addAnotherPersonFormErrorFlags[field] = addAnotherPersonFormFields[field] ? false : true
      })
    }
    this.setState({ addAnotherPersonFormErrorFlags })
    if (Object.values(addAnotherPersonFormErrorFlags).includes(true)) {
      return
    } else {
      this.setState({ [appointmentType === 'reschedule' ? 'showRescheduleSuccessModal' : 'showSuccessModal']: true })
    }
  }

  handleAppointmentFormInputChange = (name, value) => {
    const appointmentFormFields = { ...this.state.appointmentFormFields }
    const { appointmenFormtErrorFlags, patientType } = this.state
    appointmentFormFields[name] = value
    appointmenFormtErrorFlags[name] = appointmentFormFields[name] ? false : true
    if (name === 'maritalStatus' && patientType === patientTypes.ADULT) {
      appointmenFormtErrorFlags[name] = false
    }
    this.setState({ appointmentFormFields, appointmenFormtErrorFlags })
  }

  handleAddAnotherPersonInputChange = (name, value) => {
    let eFlags = this.validate(name, value);
    const addAnotherPersonFormFields = { ...this.state.addAnotherPersonFormFields }
    addAnotherPersonFormFields[name] = value
    this.setState({ addAnotherPersonFormFields, addAnotherPersonFormErrorFlags: eFlags })
  }

  handleNextClick = () => {
    const { appointmentFormFields, appointmenFormtErrorFlags, patientType } = this.state
    const fields = Object.keys(appointmentFormFields)
    fields.forEach(field => {
      appointmenFormtErrorFlags[field] = appointmentFormFields[field] ? false : true
      if (field === 'maritalStatus' && patientType === patientTypes.ADULT) {
        appointmenFormtErrorFlags[field] = false
      }
    })
    this.setState({ appointmenFormtErrorFlags })
    if (Object.values(appointmenFormtErrorFlags).includes(true)) {
      return
    } else {
      this.changeActiveScreen(SCREENS.ADD_ANOTHER_PERSON_FORM)
    }
  }

  handleBackClick = () => {
    const { activeScreen } = this.state
    if (activeScreen === SCREENS.APPOINTMENT_FORM) {
      this.props.history.goBack()
    } else if (activeScreen === SCREENS.ADD_ANOTHER_PERSON_FORM) {
      this.changeActiveScreen(SCREENS.APPOINTMENT_FORM)
    }
  }

  onAddaAnotherPersonClick = () => {
    const { addAnotherPersonFormFields, personList, addAnotherPersonFormErrorFlags } = this.state
    const fields = ["firstName", "lastName", "phoneNumber", "emailAddress", "relationship"]
    let eFlags = {}
    fields.forEach(field => {
      eFlags = this.validate(field, addAnotherPersonFormFields[field]);
    })
    this.setState({ addAnotherPersonFormErrorFlags: eFlags })
    if (Object.values(addAnotherPersonFormErrorFlags).includes(true)) {
      return
    } else {
      this.setState({ personList: [...personList, addAnotherPersonFormFields] }, () => {
        this.setState({
          addAnotherPersonFormFields: {
            ...addAnotherPersonFormFields,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailAddress: '',
            relationship: '',
          }
        })
      })
    }
  }

  validate = (field, value) => {
    const { addAnotherPersonFormFields } = this.state
    let eFlags = this.state.addAnotherPersonFormErrorFlags;
    console.log(field,value);
    switch (field) {
      case "firstName":
      case "lastName":
      case "relationship":
        eFlags[field] = value === "" || !charRegex.test(value) ? true : false;
        break;
      case "emailAddress":
        eFlags[field] = value !== "" && !emailRegex.test(value.trim()) ? true : false;
        break;
      case "phoneNumber":
        eFlags[field] = value === "" || !mobileRegex.test(value) ? true : false;
        break; 
      case "primaryInsurance":
        eFlags[field] = value === ""
        break;
      case "primaryPolicyNumber":
        eFlags[field] = value === "" || !numberRegex.test(value) ? true : false;
        break;
      default:
    }
    return eFlags;
  };

  onClickEditIcon = (id) => {
    const { personList, addAnotherPersonFormFields } = this.state
    const personDetails = personList.find((pl, index) => index === id) || {}
    this.setState({
      addAnotherPersonFormFields: {
        ...addAnotherPersonFormFields,
        ...personDetails
      }
    })
  }

  handleEditPerson = (index) => {
    const { personList, addAnotherPersonFormFields } = this.state
    this.setState({
      personList: personList.map((p, i) => i === index ? { firstName: addAnotherPersonFormFields.firstName, lastName: addAnotherPersonFormFields.lastName, phoneNumber: addAnotherPersonFormFields.phoneNumber, emailAddress: addAnotherPersonFormFields.emailAddress, relationship: addAnotherPersonFormFields.relationship } : p),
      addAnotherPersonFormFields: {
        ...addAnotherPersonFormFields,
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        relationship: ''
      }
    })
  }

  handleRemovePerson = (index) => {
    const { personList } = this.state
    this.setState({
      personList: personList.filter((p, i) => i !== index)
    })
  }

  resetAddAnotherPersonErrorFlag = () => {
    const addAnotherPersonFormErrorFlags = {
      firstName: false,
      lastName: false,
      phoneNumber: false,
      emailAddress: false,
      relationship: false,
      primaryInsurance: false,
      primaryPolicyNumber: false
    }

    this.setState({ addAnotherPersonFormErrorFlags })
  }

  render() {
    return (
      <>
        <MainLayout>
          <BookAppointmentPage
            appointmentFormErrorFlags={this.state.appointmenFormtErrorFlags}
            appointmentFormFields={this.state.appointmentFormFields}
            handleAppointmentFormInputChange={this.handleAppointmentFormInputChange}
            onBookAppointmentClick={this.onBookAppointmentClick}
            handleNextClick={this.handleNextClick}
            activeScreen={this.state.activeScreen}
            screens={SCREENS}
            patientType={this.state.patientType}
            changePatientType={this.changePatientType}
            handleBackClick={this.handleBackClick}
            addAnotherPersonFormErrorFlags={this.state.addAnotherPersonFormErrorFlags}
            addAnotherPersonFormFields={this.state.addAnotherPersonFormFields}
            handleAddAnotherPersonInputChange={this.handleAddAnotherPersonInputChange}
            onAddaAnotherPersonClick={this.onAddaAnotherPersonClick}
            personList={this.state.personList}
            onClickEditIcon={this.onClickEditIcon}
            handleEditPerson={this.handleEditPerson}
            handleRemovePerson={this.handleRemovePerson}
            wantToAddSomeone={this.state.wantToAddSomeone}
            isInsured={this.state.isInsured}
            onChangeRadioInput={this.onChangeRadioInput}
            resetAddAnotherPersonErrorFlag={this.resetAddAnotherPersonErrorFlag}
          />
          <SuccessModal open={this.state.showSuccessModal} toggleOpen={this.toggleSuccessModal} />
          <RescheduleSuccessModal open={this.state.showRescheduleSuccessModal} toggleOpen={this.toggleRescheduleSuccessModal} />
        </MainLayout>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
    error: state.loader.error,
    specialities: state.appointments.specialities,
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    getAllSpecialities: () => dispatch(actions.getAllSpecialities()),
    setError: (val) => dispatch(loaderActions.setError(val)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(BookAppointment);