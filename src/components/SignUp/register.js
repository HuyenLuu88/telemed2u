import React from "react";
import {
  Button,
  Container,
  FormLabel,
  Grid,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  CircularProgress
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./register.scss";
import { Link } from "react-router-dom";
import backIcon from "../../assests/images/icon_back.png";

const requiredFirstname = "Please enter valid first name";
const requiredlastname = "Please enter valid last name";
const requireddob = "Age should be 18 years and above";
const requiredgender = "Please select your gender";
const emailError = "Please enter correct email";
const phoneError = "Please enter correct phone number";

const RegisterForm = ({
  handleSubmit,
  handleDateChange,
  dateValue,
  startDate,
  isNewUser,
  handleChange,
  errorFlag,
  registerPatient,
  goBack,
  otpError,
  otpErrMsg,
  resendButtonDisabledTime,
  genderValue,
  loading,
  setOtpError
}) => {
  const errorFlagArray = Object.entries(errorFlag);
  let validationError = false;
  errorFlagArray.filter(([key, value]) => {
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
            src="http://source.unsplash.com/620x700/?medical"
            alt="spaceship"
          />
        </Grid>
        <Grid item xs={6} className="" span={12} ml={2}>
          <form className="form" onSubmit={handleSubmit} noValidate>
            <h1 className="align-item-center">
              {isNewUser ? (
                <img
                  id="auto-register-back"
                  onClick={goBack}
                  className="ba-back-icon"
                  src={backIcon}
                  alt=""
                />
              ) : null}
              Register to book appointment
            </h1>
            <FormLabel className="input-label" component="legend">
              First name<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-reg-firstname"
              required
              error={errorFlag.firstName}
              helperText={errorFlag.firstName ? requiredFirstname : null}
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              name="firstName"
              inputProps={{ maxLength: 40 }}
              placeholder="Enter your first name"
              onChange={handleChange}
            />
            <FormLabel className="input-label" component="legend">
              Last name<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-reg-lastname"
              required
              error={errorFlag.lastName}
              helperText={errorFlag.lastName ? requiredlastname : null}
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              name="lastName"
              inputProps={{ maxLength: 40 }}
              placeholder="Enter your last name"
              onChange={handleChange}
            />
            <FormLabel className="input-label" component="legend">
              Date of birth<span className="astrik">*</span>
            </FormLabel>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container justify="flex-start">
                <KeyboardDatePicker
                  id="auto-reg-dob"
                  // disableToolbar
                  error={errorFlag.dob}
                  helperText={errorFlag.dob ? requireddob : null}
                  inputVariant="outlined"
                  variant="inline"
                  format="MM/DD/YYYY"
                  margin="normal"
                  name="dob"
                  autoOk={true}
                  placeholder={"Please select date of birth"}
                  value={dateValue}
                  maxDate={startDate}
                  onChange={handleDateChange}
                  className="date-picker"
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <FormLabel component="legend" className="input-label">
              Gender at birth<span className="astrik">*</span>
            </FormLabel>
            <FormControl component="fieldset" className="form-gender" error={errorFlag.gender}>
              <RadioGroup
                id="auto-reg-gender"
                row
                aria-label="gender"
                name="gender"
                value={genderValue}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio color="primary" />}
                  label="Other"
                />
              </RadioGroup>
              <FormHelperText>
                {errorFlag.gender ? requiredgender : null}
              </FormHelperText>
            </FormControl>
            <FormLabel className="input-label" component="legend">
              Email
            </FormLabel>
            <TextField
              id="auto-reg-email"
              required
              error={errorFlag.email}
              helperText={errorFlag.email ? emailError : null}
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <FormLabel className="input-label" component="legend">
              Cellphone<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-reg-phone"
              required
              error={errorFlag.phone}
              helperText={errorFlag.phone ? phoneError : null}
              id="filled-required"
              variant="outlined"
              size="small"
              inputProps={{ maxLength: 10 }}
              className="text-input"
              name="phone"
              placeholder="Enter your cellphone"
              onChange={handleChange}
              disabled={isNewUser}
            />
            {isNewUser ? (
              <div className="form-inputs">
                <FormLabel className="input-label" component="legend">
                  Enter your one-time password sent to your phone number
                </FormLabel>
                <TextField
                  id="auto-reg-otp"
                  required
                  id="filled-required"
                  variant="outlined"
                  size="small"
                  name="otp"
                  inputProps={{ maxLength: 6 }}
                  className="text-input"
                  // helperText="Get one-time password"
                  onChange={e => {
                    handleChange(e)
                    setOtpError(false)
                  }}
                  error={otpError}
                  helperText={
                    resendButtonDisabledTime > 0 ? (
                      <div className="dbl-error">
                        {otpErrMsg + " "}
                        <span className="resendotp-grayed">
                          Resend one-time password({resendButtonDisabledTime})
                        </span>
                      </div>
                    ) : (
                      <div className="dbl-error">
                        {otpErrMsg + " "}
                        <span id="auto-reg-reset-otp" className="link-blue" onClick={handleSubmit}>
                          Resend one-time password
                        </span>
                      </div>
                    )
                  }
                />
              </div>
            ) : null}
            <div className="submit">
              {loading && <CircularProgress className="loader" />}
              {isNewUser ? (
                <Button
                  id="auto-reg-next-btn"
                  variant="contained"
                  className="btn-primary"
                  onClick={registerPatient}
                  disabled={validationError}
                >
                  Next
                </Button>
              ) : (
                <Button
                  id="auto-reg-submit-btn"
                  type="submit"
                  variant="contained"
                  className={validationError ? "btn-error" : "btn-primary"}
                  disabled={validationError}
                >
                  Submit
                </Button>
              )}
              <h5>
                Already have an account? <Link id="auto-login-link" to="/">Log in</Link>
              </h5>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterForm;
