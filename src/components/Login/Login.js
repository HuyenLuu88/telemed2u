import React from "react";
import "./Login.scss";
import Container from "@material-ui/core/Container";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { Button, CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import backIcon from "../../assests/images/icon_back.png";

const LoginForm = ({
  loading,
  handleSubmit,
  handleChange,
  validationError,
  errorMsg,
  isValidUser,
  handleBack,
  verifyLogin,
  setOtp,
  otpError,
  otpErrMsg,
  resendButtonDisabledTime,
  setOtpError
}) => {
  console.log("sdfsd", resendButtonDisabledTime);
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
              {isValidUser ? (
                <img
                  id="auto-login-back"
                  onClick={() => handleBack()}
                  className="ba-back-icon"
                  src={backIcon}
                  alt=""
                />
              ) : null}
              Login to your account
            </h1>
            <FormLabel className="input-label" component="legend">
              Cellphone<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-login-phone"
              required
              error={validationError}
              helperText={validationError ? errorMsg : null}
              id="filled-required"
              variant="outlined"
              size="small"
              inputProps={{ maxLength: 10 }}
              className="text-input"
              type="tel"
              name="phone"
              placeholder="Enter your cellphone"
              maxLength="10"
              onChange={handleChange}
              disabled={isValidUser}
            />
            {isValidUser ? (
              <div className="form-inputs">
                <FormLabel className="input-label" component="legend">
                  Enter your one-time password sent to your phone number
                </FormLabel>
                <TextField
                  id="auto-login-otp"
                  required
                  id="filled-required"
                  variant="outlined"
                  size="small"
                  className="text-input"
                  inputProps={{ maxLength: 6 }}
                  onChange={e => {
                    setOtp(e)
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
                        <span id="auto-login-reset-otp" className="link-blue" onClick={handleSubmit}>
                          Resend one-time password
                        </span>
                      </div>
                    )
                  }
                />
              </div>
            ) : null}
            <div className="submit">
              {loading ? <CircularProgress className="loader" /> : null}
              {isValidUser ? (
                <Button
                  id="auto-login-btn"
                  variant="contained"
                  className="btn-primary"
                  onClick={verifyLogin}
                >
                  Login
                </Button>
              ) : (
                <Button
                  id="auto-submit-btn"
                  disabled={validationError}
                  type="submit"
                  variant="contained"
                  className={validationError ? "btn-error" : "btn-primary"}
                >
                  Submit
                </Button>
              )}
              {!isValidUser ? (
                <h5>
                  Don’t have an account? <Link id="auto-register-link" to="/Register">Register</Link>
                </h5>
              ) : null}
            </div>
            <h5 className="error-login">
              Trouble logging in?{" "}
              <Link id="auto-login-another-way-link" to="/LoginAnotherWay">Try different way</Link>
            </h5>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
