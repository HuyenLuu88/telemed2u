import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
// import Header from "../../components/Header/Header";
import OtherHeader from "../../components/Header/OtherHeader";
// import { toast } from "react-toastify";
import Toast from "../../utilities/toast";
import { connect } from "react-redux";
import * as actions from "../../store/actions/register";
import PatientForm from "../../components/SignUp/patientDetail";
import { numberRegex, charRegex } from "../../utilities/regex";
// import { securityQuestions } from "../../constants/securityQuestions";

class PatientDetail extends Component {
  state = {
    errorMsg: null,
    isError: false,
    securityQestion1: "",
    securityQestion2: "",
    securityQestion3: "",
    state: null,
    errorFlag: {
      address1: false,
      zipcode: false,
      securityQestion1: false,
      securityAnswer1: false,
      securityQestion2: false,
      securityAnswer2: false,
      securityQestion3: false,
      securityAnswer3: false,
      checkedB: true,
      city: false,
      state: false
    },
  };

  handleChangeAll = (event) => {
    event.preventDefault();
    let eFlags;
    if (event.target.name === "checkedB") {
      eFlags = this.validate(event.target.name, event.target.checked);
      this.setState({ [event.target.name]: event.target.checked, errorFlag: eFlags });
    } else {
      eFlags = this.validate(event.target.name, event.target.value);
      this.setState({ [event.target.name]: event.target.value, errorFlag: eFlags });
    }
  };

  handleStateChange = (value) => {
    console.log(value);
    let eFlags = this.validate("state", value);
    this.setState({state: value, errorFlag: eFlags});
  };

  validate = (field, value) => {
    let eFlags = this.state.errorFlag;
    switch (field) {
      case "address1":
      case "securityQestion1":
      case "securityAnswer1":
      case "securityQestion2":
      case "securityAnswer2":
      case "securityQestion3":
      case "securityAnswer3":
      case "state":
        eFlags[field] = value === "" ? true : false;
        break;
      case "zipcode":
        eFlags[field] =
          (value === "" || value.length < 5) || !numberRegex.test(value) ? true : false;
        break;
      case "checkedB":
        eFlags[field] = value === false ? true : false;
        break;
      case "city":
        eFlags[field] =
          value === "" || !charRegex.test(value) ? true : false;
        break;
      default:
    }
    return eFlags;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let errField = ["address1", "city", "state", "zipcode", "securityQestion1", "securityAnswer1", "securityQestion2", "securityAnswer2", "securityQestion3", "securityAnswer3", "checkedB"];
    let errFlag = this.state.errorFlag;
    errField.map(field => {
      if (field === "checkedB") {
        errFlag[field] = !this.state.checkedB
      }
      if (!this.state[field]) {
        errFlag[field] = true;
      }
    })
    const { address1, address2, city, state, zipcode, securityQestion1, securityAnswer1, securityQestion2, securityAnswer2, securityQestion3, securityAnswer3, checkedB } = this.state;
    if (!address1 || !city || !state || !zipcode || !securityQestion1 || !securityAnswer1 || !securityQestion2 || !securityAnswer2 || !securityQestion3 || !securityAnswer3 || !checkedB) {
      this.setState({ errorFlag: errFlag })
    } else {
      let data = {
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        securityAnswer1: securityAnswer1.toLowerCase(),
        securityAnswer2: securityAnswer2.toLowerCase(),
        securityAnswer3: securityAnswer3.toLowerCase(),
        securityQestion1: securityQestion1,
        securityQestion2: securityQestion2,
        securityQestion3: securityQestion3,
        zip: zipcode,
      };
      this.props.completeProfile(data);
    }
  };

  render() {
    console.log("this.state----->>>>>",this.state);
    const { patientData } = this.props;
    // if (loading) {
    //   toast.dark("Hey 👋, its Loading");
    // }
    if (patientData) {
      if (patientData.isProfileComplete === undefined) {
        localStorage.setItem('isProfileComplete', true)
        this.props.history.push("/patient/appointments");
      }
    }
    return (
      <div>
        <Toast position={"top-right"}></Toast>
        {/* <Header /> */}
        <OtherHeader />
        <PatientForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChangeAll}
          handleStateChange={this.handleStateChange}
          errorFlag={this.state.errorFlag}
          verifyCallback={() => {}}
          stateValue={this.state.state}
          securityQestion1={this.state.securityQestion1}
          securityQestion2={this.state.securityQestion2}
          securityQestion3={this.state.securityQestion3}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
    error: state.loader.error,
    patientData: state.login.patientData,
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    completeProfile: (data) => dispatch(actions.completeProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(PatientDetail);
