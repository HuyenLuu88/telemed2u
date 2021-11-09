import React from "react";
import "./Login.scss";
import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
  FormLabel,
  TextField,
  Grid,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import backIcon from "../../assests/images/icon_back.png";

const phoneError = "Please enter correct phone number";
const emailError = "Please enter valid email Id";
const loginTypeError = "Please select login type";
const emailTypeError = "Email is not available please try another way";
const securityTypeError =
  "Security Question is not available please try another way";
const requiredanswer = "Please enter correct answer";
const getResetDetailsErrorMsg = "Please enter registered phone number";
// const requiredSA2 = "Please enter your answer 2";
// const requiredSA3 = "Please enter your answer 3";

const LoginAnotherWayForm = ({
  errorFlag,
  handleChange,
  handleSubmit,
  showEmail,
  isEmailValid,
  showSecurityQuestions,
  maskedEmail,
  sendOtpToEmail,
  verifyEmailOtp,
  verifySecurityQuestions,
  handleStateChange,
  securityQuestions,
  otpError,
  resendButtonDisabledTime,
  getResetDetailsError,
  loading,
  isEmailExist,
  securityError,
  isSecurityQusExist,
  handleBack,
  showAnotherWayOtpField,
  setShowAnotherWayOtpField,
  setOtpError,
  setError
}) => {
  const otpErrMsg = otpError ? "Please enter the valid OTP" : "";
  const errorFlagArray = Object.entries(errorFlag);
  let validationError = false;
  errorFlagArray.filter(([key, value]) => {
    console.log(key, value);
    if (value) {
      validationError = true;
    }
  });
  return (
    <Container className="container">
      <Grid container className="form-wrapper">
        <Grid item xs={6} className="" span={12}>
          <img
            className="form-img"
            src="http://source.unsplash.com/645x480/?medical"
            alt="spaceship"
          />
        </Grid>
        <Grid item xs={6} className="" span={12} ml={2}>
          <form onSubmit={handleSubmit} className="form" noValidate>
            <h1 className="align-item-center">
              {!showEmail && !showSecurityQuestions ? (
                <Link id="auto-law-back" to="/">
                  <img
                    className="ba-back-icon"
                    src={backIcon}
                    alt=""
                  />
                </Link>
              ) : (
                <img
                  id="auto-law-back"
                  onClick={handleBack}
                  className="ba-back-icon"
                  src={backIcon}
                  alt=""
                />
              )}
              <span class="main-header">Login to your account</span>
            </h1>
            <FormLabel className="input-label" component="legend">
              Cellphone<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-law-phone"
              required
              error={errorFlag.phone}
              helperText={
                errorFlag.phone
                  ? phoneError
                  : getResetDetailsError
                  ? getResetDetailsErrorMsg
                  : null
              }
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              type="tel"
              name="phone"
              placeholder="Enter your Cell Phone"
              inputProps={{ maxLength: 10 }}
              onChange={e => { 
                setError(false)
                handleChange(e)
              }}
              disabled={showEmail || showSecurityQuestions}
            />
            <div className="m-container">
              <div className="r-container">
                <FormControl component="fieldset" error={errorFlag.loginType}>
                  <RadioGroup
                    id="auto-law-loginType"
                    aria-label="loginType"
                    name="loginType"
                    onChange={e => { 
                      handleChange(e);
                      setShowAnotherWayOtpField(false)
                      setOtpError(false)
                    }}
                    row={true}
                  >
                    <FormControlLabel
                      value={"email"}
                      control={<Radio color="primary" />}
                      label="Email"
                    />
                    <FormControlLabel
                      value={"security"}
                      control={<Radio color="primary" />}
                      label="Security Questions"
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {errorFlag.loginType ? loginTypeError : null}
                  </FormHelperText>
                  <FormHelperText>
                    {!isEmailExist ? emailTypeError : null}
                  </FormHelperText>
                  <FormHelperText>
                    {!isSecurityQusExist ? securityTypeError : null}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            {showEmail ? (
              <>
                <FormLabel className="input-label" component="legend">
                Please re-enter your email<span className="astrik">*</span>: {maskedEmail}
                </FormLabel>
                <TextField
                  id="auto-law-maskedEmailInput"
                  required
                  error={errorFlag.maskedEmailInput}
                  helperText={errorFlag.maskedEmailInput ? emailError : null}
                  id="filled-required"
                  variant="outlined"
                  size="small"
                  className="text-input"
                  type="input"
                  name="maskedEmailInput"
                  placeholder="Enter your Email"
                  onChange={handleStateChange}
                  disabled={isEmailValid && showAnotherWayOtpField}
                />
                {isEmailValid && showAnotherWayOtpField ? (
                  <>
                    <FormLabel className="input-label" component="legend">
                      Enter your one-time password sent to your email
                      <span className="astrik">*</span>
                    </FormLabel>
                    <TextField
                      id="auto-law-otp"
                      required
                      id="filled-required"
                      variant="outlined"
                      size="small"
                      className="text-input"
                      inputProps={{ maxLength: 6 }}
                      name="otp"
                      placeholder=""
                      onChange={e => {
                        setOtpError(false)
                        handleStateChange(e)
                      }}
                      error={otpError}
                      helperText={
                        resendButtonDisabledTime > 0 ? (
                          <div className="dbl-error">
                            {otpErrMsg + " "}
                            <span className="resendotp-grayed">
                              Resend one-time password(
                              {resendButtonDisabledTime})
                            </span>
                          </div>
                        ) : (
                          <div className="dbl-error">
                            {otpErrMsg + " "}
                            <span id="auto-law-resend-otp" className="link-blue" onClick={sendOtpToEmail}>
                              Resend one-time password
                            </span>
                          </div>
                        )
                      }
                    />
                  </>
                ) : null}
              </>
            ) : null}
            {showSecurityQuestions ? (
              <>
                {securityQuestions &&
                  Object.keys(securityQuestions).map((key, value) => {
                    return (
                      <div key={key}>
                        <FormLabel className="input-label" component="legend">
                          Security question {value + 1}
                          <span className="astrik">*</span>:{" "}
                          {securityQuestions[key]}
                        </FormLabel>
                        <TextField
                          id={`auto-law-${key}-${value}`}
                          required
                          error={errorFlag["securityAnswer" + (value + 1)]}
                          helperText={
                            errorFlag["securityAnswer" + (value + 1)]
                              ? requiredanswer
                              : null
                          }
                          id="filled-required"
                          variant="outlined"
                          size="small"
                          className="text-input"
                          name={"securityAnswer" + (value + 1)}
                          placeholder="Answer"
                          onChange={handleStateChange}
                        />
                      </div>
                    );
                  })}
                <FormHelperText>
                  {securityError ? requiredanswer : null}
                </FormHelperText>
              </>
            ) : null}
            {loading ? (
              <div className="center-align">
                <CircularProgress className="loader" />
              </div>
            ) : null}
            <div className="center-align">
              {showEmail ? (
                isEmailValid && showAnotherWayOtpField ? (
                  <Button
                    id="auto-law-login-btn"
                    variant="contained"
                    disabled={validationError}
                    className={validationError ? "btn-error" : "btn-primary"}
                    onClick={verifyEmailOtp}
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    id="auto-law-submit-btn"
                    variant="contained"
                    disabled={validationError}
                    className={validationError ? "btn-error" : "btn-primary"}
                    onClick={sendOtpToEmail}
                  >
                    Submit
                  </Button>
                )
              ) : showSecurityQuestions ? (
                <Button
                  id="auto-law-login-btn"
                  variant="contained"
                  disabled={validationError}
                  className={validationError ? "btn-error" : "btn-primary"}
                  onClick={verifySecurityQuestions}
                >
                  Login
                </Button>
              ) : (
                <Button
                  id="auto-law-submit-btn"
                  type="submit"
                  variant="contained"
                  disabled={validationError}
                  className={validationError ? "btn-error" : "btn-primary"}
                >
                  Submit
                </Button>
              )}
            </div>
            <div className="contact-us">Still facing issues?<a id="auto-law-contact-link">Contact us</a></div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginAnotherWayForm;
