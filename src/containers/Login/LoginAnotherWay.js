import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer/Footer";
// import Header from "../../components/Header/Header";
import OtherHeader from "../../components/Header/OtherHeader";
// import Toast from "../../utilities/toast";
// import { toast } from "react-toastify";
import * as actions from "../../store/actions/login";
import * as loaderActions from "../../store/actions/loader";
import LoginAnotherWayForm from "../../components/Login/LoginAnotherWay";
import { emailRegex, mobileRegex } from "../../utilities/regex";
import Modal from "../../utilities/modal/modal";
class LoginAnotherWay extends Component {
  state = {
    errorFlag: {
      phone: false,
      loginType: false,
      securityAnswer1: false,
      securityAnswer2: false,
      securityAnswer3: false,
      maskedEmailInput: false,
    },
    showEmail: false,
    isEmailExist: true,
    maskedEmail: "",
    errorMsg: null,
    isError: false,
    validateOtp: false,
    showSecurityQuestions: false,
    isSecurityQusExist: true,
    errMsgContent: "Something went wrong please try after sometime!!",
    errMsgHeader: "",
    showModal: false,
    intervalID: null
  };

  componentDidMount() {
    this.props.setError(false);
    this.props.setResetData(null);
  }

  componentDidUpdate(nextProps, prevState) {
    const { resetData, patientData, emailData, maxAttempt } = this.props;
    if (nextProps.resetData !== resetData) {
      // console.log("-----", resetData);
      if (resetData) {
        switch (this.state.loginType) {
          case "email":
            if (resetData.isEmailExist) {
              localStorage.setItem("tempToken", resetData.maskedEmail.accessToken);
              this.setState({
                showEmail: true,
                showSecurityQuestions: false,
                maskedEmail: resetData.maskedEmail.MaskedEmail,
                isEmailExist: true,
                isSecurityQusExist: true,
              });
            } else {
              this.setState({
                showEmail: false,
                showSecurityQuestions: false,
                isEmailExist: false,
                isSecurityQusExist: true,
              });
            }
            break;
          case "security":
            if (resetData.isSecurityQusExist) {
              let { securityQus } = resetData;
              localStorage.setItem("tempToken", securityQus.accessToken);
              let securityQuestions = {
                securityQestion1: securityQus.securityQestion1,
                securityQestion2: securityQus.securityQestion2,
                securityQestion3: securityQus.securityQestion3,
              };
              this.setState({
                showSecurityQuestions: true,
                showEmail: false,
                securityQuestions,
                isEmailExist: true,
                isSecurityQusExist: true,
                securityError: false,
              });
            } else {
              this.setState({
                showEmail: false,
                showSecurityQuestions: false,
                isEmailExist: true,
                isSecurityQusExist: false,
              });
            }
            break;
          default:
            break;
        }
      }
    }
    if (nextProps.emailData !== emailData) {
      if (!emailData.isValidEmail) {
        let errorFlag = this.state.errorFlag;
        errorFlag.maskedEmailInput = true;
        this.setState({ errorFlag });
      } else {
        this.startResendOtpTimer();
      }
    }
    if (nextProps.patientData !== patientData) {
      if (
        !patientData.isValidSecurityQus &&
        patientData.isValidSecurityQus !== undefined
      ) {
        this.setState({ securityError: true });
      } else {
        console.log("resposne-----", patientData);
        if (patientData.response && patientData.response.accessToken) {
          localStorage.setItem("token", patientData.response.accessToken);
          localStorage.setItem("role", patientData.response.role);
          localStorage.setItem("isProfileComplete", true);
          localStorage.removeItem("tempToken");
        } else if (patientData && patientData.accessToken) {
          localStorage.setItem("token", patientData.accessToken);
          localStorage.setItem("role", patientData.role);
          localStorage.setItem("isProfileComplete", patientData.isProfileComplete);
          localStorage.removeItem("tempToken");
        }
        this.props.history.push("/patient/appointments");
      }
    }
    if (nextProps.maxAttempt !== maxAttempt && maxAttempt) {
      this.setState({
        buttonType: "Close",
        showModal: true,
        errMsgContent: "You have reached max attempts please try tomorrow",
      });
    }
    if (prevState.intervalID !== this.state.intervalID) {
      clearInterval(prevState.intervalID)
    }
  }

  handleBack = () => {
    let errorFlag = {
      phone: false,
      loginType: false,
      securityAnswer1: false,
      securityAnswer2: false,
      securityAnswer3: false,
      maskedEmailInput: false,
    };
    this.setState({
      showEmail: false,
      showSecurityQuestions: false,
      isEmailExist: true,
      isSecurityQusExist: true,
      errorFlag: errorFlag,
    });
    this.props.setShowAnotherWayOtpField(false)
    this.resetOtpTimer()
  };

  handleChange = (event) => {
    event.preventDefault();
    let eFlags = {
      phone: false,
      loginType: false,
      securityAnswer1: false,
      securityAnswer2: false,
      securityAnswer3: false,
      maskedEmailInput: false,
    };
    if (
      this.props.resetData &&
      event.target.name !== "phone" &&
      event.target.value !== this.state.loginType
    ) {
      this.setState(
        {
          showSecurityQuestions: false,
          showEmail: false,
          [event.target.name]: event.target.value,
          errorFlag: eFlags,
        },
        () => {
          this.getResetDetails();
        }
      );
    } else {
      let eFlags = this.validate(event.target.name, event.target.value);
      this.setState({
        [event.target.name]: event.target.value,
        errorFlag: eFlags,
      });
    }
  };

  handleClose = () => {
    this.props.setMaxAttempt(false);
    this.setState({ showModal: false });
  };
  handleModalChange = (type) => {
    switch (type) {
      case "Close":
        this.handleClose();
        break;
      default:
        break;
    }
  };

  validate = (field, value) => {
    let eFlags = this.state.errorFlag;
    switch (field) {
      case "loginType":
      case "securityAnswer1":
      case "securityAnswer2":
      case "securityAnswer3":
        eFlags[field] = value === "" ? true : false;
        break;
      case "phone":
        eFlags[field] = value === "" && !mobileRegex.test(value) ? true : false;
        break;
      case "maskedEmailInput":
        eFlags[field] = value === "" || !emailRegex.test(value) ? true : false;
        break;
      default:
        // eFlags = true;
        break;
    }
    return eFlags;
  };

  getResetDetails = () => {
    let data = {
      phoneNumber: `+91${this.state.phone}`,
      option: this.state.loginType,
    };
    this.props.getDetails(data);
  };

  sendOtpToEmail = (e) => {
    e.preventDefault();
    let errField = ["maskedEmailInput"];
    let errFlag = this.state.errorFlag;
    errField.map((field) => {
      if (!this.state[field]) {
        errFlag[field] = true;
      }
    });
    if (!this.state.maskedEmailInput) {
      this.setState({ errorFlag: errFlag });
    } else {
      if (this.props.emailData.isValidEmail) {
        this.startResendOtpTimer();
      }
      this.props.sendOtpToEmail({ email: this.state.maskedEmailInput });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let errField = ["phone", "loginType"];
    let errFlag = this.state.errorFlag;
    errField.map((field) => {
      if (!this.state[field]) {
        errFlag[field] = true;
      }
    });
    if (!this.state.loginType || !this.state.phone) {
      this.setState({ errorFlag: errFlag });
    } else {
      this.getResetDetails();
    }
  };

  verifyEmailOtp = () => {
    this.props.verifyLogin({
      cmmunicationMedium: this.state.maskedEmailInput,
      otp: this.state.otp,
    });
  };

  handleStateChange = (event) => {
    let eFlags = this.validate(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
      errorFlag: eFlags,
    });
  };

  verifySecurityQuestions = () => {
    let errField = ["securityAnswer1", "securityAnswer2", "securityAnswer3"];
    let errFlag = this.state.errorFlag;
    errField.map((field) => {
      if (!this.state[field]) {
        errFlag[field] = true;
      }
    });
    const { securityAnswer1, securityAnswer2, securityAnswer3 } = this.state;
    if (!securityAnswer1 || !securityAnswer2 || !securityAnswer3) {
      this.setState({ errorFlag: errFlag });
    } else {
      let data = { ...this.state.securityQuestions };
      data.securityAnswer1 = this.state.securityAnswer1.toLowerCase();
      data.securityAnswer2 = this.state.securityAnswer2.toLowerCase();
      data.securityAnswer3 = this.state.securityAnswer3.toLowerCase();
      delete data.__proto__;
      this.props.verifyQuestions(data);
    }
  };

  startResendOtpTimer = () => {
    var timesRun = 30;
    const intervalID = setInterval(() => {
      if (timesRun === 0) {
        clearInterval(intervalID);
      }
      timesRun -= 1;
      this.setResendButtonDisabledTime(timesRun);
    }, 1000);

    this.setState({ intervalID })
  };

  setResendButtonDisabledTime = (time) => {
    this.setState({ resendButtonDisabledTime: time });
  };

  resetOtpTimer = () => {
    clearInterval(this.state.intervalID);
    this.setResendButtonDisabledTime(0);
  }

  render() {
    console.log("this.props------->>>>", this.props);
    console.log("this.state------->>>>", this.state);
    // const { loading } = this.props;
    // if (loading) {
    //   toast.dark("Hey 👋, its Loading");
    // }
    return (
      <div>
        {/* <Toast position={"top-right"}></Toast> */}
        {/* <Header /> */}
        <OtherHeader />
        <Modal
          openModal={this.state.showModal}
          content={this.state.errMsgContent}
          buttonType={this.state.buttonType}
          handleModalChange={this.handleModalChange}
          handleClose={this.handleClose}
        ></Modal>
        <LoginAnotherWayForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          showEmail={this.state.showEmail}
          showSecurityQuestions={this.state.showSecurityQuestions}
          maskedEmail={this.state.maskedEmail}
          isEmailValid={this.props.emailData.isValidEmail}
          handleStateChange={this.handleStateChange}
          sendOtpToEmail={this.sendOtpToEmail}
          securityQuestions={this.state.securityQuestions}
          verifySecurityQuestions={this.verifySecurityQuestions}
          verifyEmailOtp={this.verifyEmailOtp}
          errorFlag={this.state.errorFlag}
          otpError={this.props.otpError}
          resendButtonDisabledTime={this.state.resendButtonDisabledTime}
          getResetDetailsError={this.props.getResetDetailsError}
          isEmailExist={this.state.isEmailExist}
          isSecurityQusExist={this.state.isSecurityQusExist}
          securityError={this.state.securityError}
          loading={this.props.loading}
          handleBack={this.handleBack}
          showAnotherWayOtpField={this.props.showAnotherWayOtpField}
          setShowAnotherWayOtpField={this.props.setShowAnotherWayOtpField}
          setOtpError={this.props.setOtpError}
          setError={this.props.setError}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
    resetData: state.login.resetData,
    emailData: state.login.emailData,
    patientData: state.login.patientData,
    otpError: state.login.otpError,
    getResetDetailsError: state.loader.error,
    maxAttempt: state.login.maxAttempt,
    showAnotherWayOtpField: state.login.showAnotherWayOtpField
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    getDetails: (data) => dispatch(actions.getDetails(data)),
    sendOtpToEmail: (data) => dispatch(actions.sendOtpToEmail(data)),
    verifyQuestions: (data) => dispatch(actions.verifyQuestions(data)),
    verifyLogin: (data) => dispatch(actions.verifyLogin(data)),
    setError: (data) => dispatch(loaderActions.setError(data)),
    setMaxAttempt: (data) => dispatch(actions.setMaxAttempt(data)),
    setResetData: (data) => dispatch(actions.setResetData(data)),
    setShowAnotherWayOtpField: (data) => dispatch(actions.setShowAnotherWayOtpField(data)),
    setOtpError: (data) => dispatch(actions.setOtpError(data))
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(LoginAnotherWay);
