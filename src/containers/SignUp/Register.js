import React, { Component } from "react";
import RegisterForm from "../../components/SignUp/register";
import Footer from "../../components/Footer/Footer";
// import Header from "../../components/Header/Header";
import OtherHeader from "../../components/Header/OtherHeader";
// import { toast } from "react-toastify";
// import Toast from "../../utilities/toast";
import { connect } from "react-redux";
import * as actions from "../../store/actions/register";
import * as loaderActions from "../../store/actions/loader";
import { mobileRegex, emailRegex, charRegex } from "../../utilities/regex";
import Modal from "../../utilities/modal/modal";
import moment from "moment";

class Register extends Component {
  state = {
    errorFlag: {
      firstName: false,
      lastName: false,
      dob: false,
      email: false,
      phone: false,
      gender: false,
    },
    dob: null,
    gender: null,
    isError: false,
    otpErrMsg: "Please enter a valid otp",
    showModal: false,
    errMsgContent: "",
    errMsgHeader: "",
    resendButtonDisabledTime: 30,
    intervalID:null
  };
  componentDidMount() {
    this.props.setNewUser(false);
    this.props.setError(false);
    let date = new Date();
    date.setFullYear(new Date().getFullYear() - 18);
    this.setState({ startDate: date });
  }

  componentDidUpdate(nextProps) {
    const { isExistingUser, error, patientData, isNewUser, errorMessage } = this.props;
    console.log('=======================', this.props);
    if (nextProps.isExistingUser !== isExistingUser && isExistingUser) {
      this.setState({
        buttonType: "Login",
        showModal: true,
        errMsgContent: "You already have an account please login.",
      });
    }
    if (nextProps.isNewUser !== isNewUser && isNewUser) {
      if (this.state.intervalID) {
        clearInterval(this.state.intervalID);
      }
      this.setState({ timmerRunning: false },()=>{
        this.startResendOtpTimer();
      });
      // this.startResendOtpTimer();
    }
    if (error && (nextProps.error !== error || nextProps.errorMessage !== errorMessage)) {
      this.setState({
        buttonType: "Close",
        showModal: true,
        errMsgContent: errorMessage || "Something went wrong please try after sometime!!",
      });
    }
    if (nextProps.patientData !== patientData) {
      if (patientData.isUserExist) {
        this.setState({
          buttonType: "Login",
          showModal: true,
          errMsgContent: "Email already used please try another.",
        });
      } else {
        localStorage.setItem("token", patientData.accessToken);
        this.props.history.push("/patientDetail");
      }
    }
  }

  registerWithOtp = (phone) => {
    const data = {
      phoneNumber: `+91${this.state.phone}`,
      fname: this.state.firstName.trim(),
      lname: this.state.lastName.trim(),
      dob: this.state.dob,
      gender: this.state.gender,
      otp: this.state.otp,
    };
    if (this.state.email !== "") {
      data.email = this.state.email;
    }
    this.props.registerPatient(data);
  };

  sendOtp = () => {
    if (this.props.isNewUser) {
      this.startResendOtpTimer();
    }
    this.props.sendOtpRegister({
      phoneNumber: `+91${this.state.phone}`,
      channel: "sms",
      type: "r",
    });
  };

  goBack = () => {
    this.props.setNewUser(false);
  };

  handleSubmit = (event) => {
    this.props.setOtpError(false);
    event.preventDefault();
    let errField = ["firstName", "lastName", "dob", "phone", "gender"];
    let errFlag = this.state.errorFlag;
    errField.map((field) => {
      if (field === "dob") {
        errFlag[field] = this.calculateAge(this.state.dob);
      }
      if (!this.state[field]) {
        errFlag[field] = true;
      }
    });
    const { firstName, lastName, dob, phone, gender } = this.state;
    console.log(this.state, "saasdad");
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !gender ||
      this.calculateAge(dob)
    ) {
      this.setState({ errorFlag: errFlag });
    } else {
      this.sendOtp();
    }
  };

  handleChangeAll = (event) => {
    // event.preventDefault();
    let eFlags = this.validate(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
      errorFlag: eFlags,
    });
  };

  handleDateChange = (date) => {
    let errFlag = this.state.errorFlag;
    let dob = this.state.dob;
    if (moment(date).diff(moment(), "years") * -1 >= 18) {
      dob = date;
      errFlag.dob = false;
    } else {
      dob = date;
      errFlag.dob = true;
    }
    this.setState({ dob: dob, errorFlag: errFlag });
  };

  calculateAge = (value) => {
    return moment().diff(moment(value), "years") >= 18 ? false : true;
  };

  setNewUserChange = () => {
    let user = {
      isUserExist: false,
      message: "",
    };
    this.props.setNewUser(user);
  };

  handleClose = () => {
    this.props.setNewUser(false);
    this.setState({ showModal: false });
  };

  handleModalChange = (type) => {
    switch (type) {
      case "Close":
        this.handleClose();
        break;
      case "Login":
        this.props.history.push("/");
        break;
      default:
        break;
    }
  };

  validate = (field, value) => {
    let eFlags = this.state.errorFlag;
    switch (field) {
      case "firstName":
      case "lastName":
        eFlags[field] = value === "" || !charRegex.test(value) ? true : false;
        break;
      case "email":
        eFlags[field] = value !== "" && !emailRegex.test(value) ? true : false;
        break;
      case "phone":
        eFlags[field] = value === "" || !mobileRegex.test(value) ? true : false;
        break;
      case "gender":
        eFlags[field] = false;
        break;
      default:
    }
    return eFlags;
  };

  handleModalClose = () => {
    return false;
  };

  startResendOtpTimer = () => {
    if (!this.state.timmerRunning) {
      var timesRun = 30;
      this.state.intervalID = setInterval(() => {
        if (timesRun === 0) {
          clearInterval(this.state.intervalID);
        }
        timesRun -= 1;
        this.setResendButtonDisabledTime(timesRun);
      }, 1000);
    } else {
      return;
    }
  };

  setResendButtonDisabledTime = (time) => {
    this.setState({ resendButtonDisabledTime: time, timmerRunning: true });
    if (time === -1) {
      this.setState({ timmerRunning: false });
    }
  };

  render() {
    const { isNewUser, patientData } = this.props;
    // if (loading) {
    //   toast.dark("Hey 👋, its Loading");
    // }

    return (
      <div>
        <Modal
          openModal={this.state.showModal}
          content={this.state.errMsgContent}
          buttonType={this.state.buttonType}
          handleModalChange={this.handleModalChange}
          handleClose={this.handleClose}
        ></Modal>
        {/* <Toast position={"top-right"}></Toast> */}
        {/* <Header /> */}
        <OtherHeader />
        <RegisterForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChangeAll}
          errorFlag={this.state.errorFlag}
          isNewUser={isNewUser}
          registerPatient={this.registerWithOtp}
          goBack={this.goBack}
          otpError={this.props.otpError}
          otpErrMsg={this.props.otpError ? this.state.otpErrMsg : ""}
          handleDateChange={this.handleDateChange}
          dateValue={this.state.dob}
          genderValue={this.state.gender}
          startDate={this.state.startDate}
          resendButtonDisabledTime={this.state.resendButtonDisabledTime}
          loading={this.props.loading}
          setOtpError={this.props.setOtpError}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
    isNewUser: state.register.isNewUser,
    isExistingUser: state.register.isExistingUser,
    errorMsg: state.register.errorMsg,
    error: state.loader.error,
    errorMessage: state.loader.errorMsg,
    otpError: state.register.otpError,
    patientData: state.login.patientData,
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    sendOtpRegister: (data) => dispatch(actions.sendOtpRegister(data)),
    setNewUser: (val) => dispatch(actions.handleBack(val)),
    registerPatient: (data) => dispatch(actions.register(data)),
    setError: (val) => dispatch(loaderActions.setError(val)),
    setOtpError: (val) => dispatch(actions.setOtpError(val)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(Register);
