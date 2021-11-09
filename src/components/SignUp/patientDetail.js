import React from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  MenuItem,
  Select,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import RegisterCaptcha from "../../containers/SignUp/RegisterCaptcha";
// import InputLabel from '@material-ui/core/InputLabel';
import "./patientDetail.scss";
import { securityQuestions } from "../../constants/securityQuestions";
import { states } from "../../constants/states";

const requiredAdd1 = "Please enter your address";
const requiredCity = "Please enter your city";
const requiredState = "Please enter your state";
const requiredZipCode = "Please enter proper zipcode";
const requiredSQ1 = "Please select security question 1";
const requiredSA1 = "Please enter your answer 1";
const requiredSQ2 = "Please select security question 2";
const requiredSA2 = "Please enter your answer 2";
const requiredSQ3 = "Please select security question 3";
const requiredSA3 = "Please enter your answer 3";
const captchaErrorMsg = "Please click to verify the Captcha before register.";
// const BootstrapInput = withStyles((theme) => ({
//   input: {
//     borderRadius: 4,
//     position: "relative",
//     backgroundColor: theme.palette.background.paper,
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     padding: "10px 26px 10px 12px",
//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//   },
// }))(InputBase);

const PatientForm = ({
  handleSubmit,
  handleChange,
  handleStateChange,
  securityQestion1,
  securityQestion2,
  securityQestion3,
  errorFlag,
  stateValue,
}) => {
  const [captchaVerified, setCaptchaVerified] = React.useState(true);
  const [captchaError, setCaptchaError] = React.useState(false);

  const verifyCallback = (response) => {
    if (response) {
      setCaptchaVerified(true);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (captchaVerified) {
      handleSubmit(event);
    } else {
      setCaptchaError(true);
    }
  };
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
          <form onSubmit={onSubmit} className="form" noValidate>
            <h1>Create your patient account</h1>
            <FormLabel className="input-label" component="legend">
              Address line 1<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-pd-address1"
              required
              error={errorFlag.address1}
              helperText={errorFlag.address1 ? requiredAdd1 : null}
              id="filled-required"
              variant="outlined"
              inputProps={{ maxLength: 60 }}
              size="small"
              className="text-input"
              name="address1"
              placeholder="Enter your Address 1"
              onChange={handleChange}
            />
            <FormLabel className="input-label" component="legend">
              Address line 2
            </FormLabel>
            <TextField
              id="auto-pd-address2"
              required
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              inputProps={{ maxLength: 60 }}
              name="address2"
              placeholder="Enter your Address 2"
              onChange={handleChange}
            />
            <FormLabel className="input-label" component="legend">
              City<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-pd-city"
              required
              error={errorFlag.city}
              helperText={errorFlag.city ? requiredCity : null}
              id="filled-required"
              variant="outlined"
              inputProps={{ maxLength: 15 }}
              size="small"
              className="text-input"
              name="city"
              placeholder="Enter your City"
              onChange={handleChange}
            />
            <FormLabel className="input-label" component="legend">
              State<span className="astrik">*</span>
            </FormLabel>
            <Autocomplete
              id="auto-pd-state"
              value={stateValue}
              options={states}
              getOptionLabel={(states) => states}
              onChange={(event, value) => handleStateChange(value)}
              className="text-input"
              popupIcon={<ExpandMoreIcon />}
              renderInput={(params) => (
                <TextField
                  required
                  error={errorFlag.state}
                  helperText={errorFlag.state ? requiredState : null}
                  name="Textname"
                  {...params}
                  placeholder="Enter your state"
                  variant="outlined"
                />
              )}
            />
            {/* <FormControl
              variant="outlined"
              name="state"
              className="text-input"
              error={errorFlag.state}
            >
              <Select
                onChange={handleChange}
                name="state"
                displayEmpty
                defaultValue=""
              >
                <MenuItem value="" disabled>Please select your State</MenuItem>
                {states.map((el, key) => {
                  // if(el ===securityQestion2 || el === securityQestion3) return
                  return (
                    <MenuItem value={el} key={key}>
                      {el}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {errorFlag.state ? requiredState : null}
              </FormHelperText>
            </FormControl> */}
            <FormLabel className="input-label" component="legend">
              Zip code<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-pd-zipcode"
              required
              error={errorFlag.zipcode}
              helperText={errorFlag.zipcode ? requiredZipCode : null}
              id="filled-required"
              variant="outlined"
              size="small"
              inputProps={{ maxLength: 5 }}
              className="text-input"
              name="zipcode"
              placeholder="Enter your Zip code"
              onChange={handleChange}
            />
            <FormLabel className="input-label" component="legend">
              Security question 1<span className="astrik">*</span>
            </FormLabel>
            <FormControl
              variant="outlined"
              name="securityQestion1"
              className="text-input"
              error={errorFlag.securityQestion1}
            >
              <Select
                id="auto-pd-securityQestion1"
                onChange={handleChange}
                name="securityQestion1"
                displayEmpty
                defaultValue=""
                IconComponent={ExpandMoreIcon}
              >
                <MenuItem value="" disabled>
                  Please select your question 1
                </MenuItem>
                {securityQuestions.map((el, key) => {
                  if (el === securityQestion2 || el === securityQestion3)
                    return;
                  return (
                    <MenuItem value={el} key={key}>
                      {el}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {errorFlag.securityQestion1 ? requiredSQ1 : null}
              </FormHelperText>
            </FormControl>
            <FormLabel className="input-label" component="legend">
              Answer<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-pd-securityAnswer1"
              required
              error={errorFlag.securityAnswer1}
              helperText={errorFlag.securityAnswer1 ? requiredSA1 : null}
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              name="securityAnswer1"
              inputProps={{ maxLength: 30 }}
              placeholder="Enter your answer"
              onChange={handleChange}
            />

            <FormLabel className="input-label" component="legend">
              Security question 2<span className="astrik">*</span>
            </FormLabel>
            <FormControl
              variant="outlined"
              name="securityQestion2"
              className="text-input"
              error={errorFlag.securityQestion2}
            >
              <Select
                id="auto-pd-securityQestion2"
                name="securityQestion2"
                onChange={handleChange}
                displayEmpty
                defaultValue=""
                IconComponent={ExpandMoreIcon}
              >
                <MenuItem value="" disabled>
                  Please select your question 2
                </MenuItem>
                {securityQuestions.map((el, key) => {
                  if (el === securityQestion1 || el === securityQestion3)
                    return;
                  return (
                    <MenuItem value={el} key={key}>
                      {el}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {errorFlag.securityQestion2 ? requiredSQ2 : null}
              </FormHelperText>
            </FormControl>
            <FormLabel className="input-label" component="legend">
              Answer<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-pd-securityAnswer2"
              required
              error={errorFlag.securityAnswer2}
              helperText={errorFlag.securityAnswer2 ? requiredSA2 : null}
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              name="securityAnswer2"
              inputProps={{ maxLength: 30 }}
              placeholder="Enter your answer"
              onChange={handleChange}
            />
            <FormLabel className="input-label" component="legend">
              Security question 3<span className="astrik">*</span>
            </FormLabel>
            <FormControl
              variant="outlined"
              className="text-input"
              name="securityQestion3"
              error={errorFlag.securityQestion3}
            >
              <Select
                id="auto-pd-securityQestion3"
                name="securityQestion3"
                onChange={handleChange}
                displayEmpty
                defaultValue=""
                IconComponent={ExpandMoreIcon}
              >
                <MenuItem value="" disabled>
                  Please select your question 3
                </MenuItem>
                {securityQuestions.map((el, key) => {
                  if (el === securityQestion1 || el === securityQestion2)
                    return;
                  return (
                    <MenuItem value={el} key={key}>
                      {el}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {errorFlag.securityQestion3 ? requiredSQ3 : null}
              </FormHelperText>
            </FormControl>
            <FormLabel className="input-label" component="legend">
              Answer<span className="astrik">*</span>
            </FormLabel>
            <TextField
              id="auto-pd-securityAnswer3"
              required
              error={errorFlag.securityAnswer3}
              helperText={errorFlag.securityAnswer3 ? requiredSA3 : null}
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              name="securityAnswer3"
              inputProps={{ maxLength: 30 }}
              placeholder="Enter your answer"
              onChange={handleChange}
            />
            <Grid style={{ position: "relative", top: -30, left: 0, right: 0 }}>
              <FormControlLabel className="term-check"
                control={
                  <Checkbox
                    id="auto-pd-tnc-check"
                    name="checkedB"
                    color="primary"
                    onChange={handleChange}
                  />
                }
              />
              <FormLabel className="term-condition">
                I agree to the <a id="auto-pd-tnc-link">Terms and Conditions</a> and the <a id="auto-pd-policy-link">Privacy Policy</a><span className="astrik">*</span>
              </FormLabel>
              <RegisterCaptcha verifyCallback={verifyCallback} />
              <FormHelperText className="captcha-error">
                {captchaError ? captchaErrorMsg : null}
              </FormHelperText>
            </Grid>
            <div className="submit">
              <Button
                id="auto-pd-submit-btn"
                type="submit"
                variant="contained"
                className={
                  !captchaVerified || validationError
                    ? "btn-error"
                    : "btn-primary"
                }
                disabled={!captchaVerified || validationError}
              >
                Register
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientForm;
