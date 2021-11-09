import React from "react";
import {
  Button,
  FormLabel,
  TextField,
  MenuItem,
  Select,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
	FormHelperText
} from "@material-ui/core";
import mainLogo from "../../assests/Logos/tm2u_logo_150.png";
import "./PatientSurvey.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Formik, Form } from "formik";

const formFields = [
  {
    id: "auto-ps-appointmentType",
    label: "Was this your initial appointment or a follow-up appointment?",
    name: "appointmentType",
    placeHolder: "",
    inputType: "radio",
    options: [
      { label: "Initial", name: "initial", value: "initial" },
      { label: "Follow-up", name: "follow_up", value: "follow_up" },
    ],
  },
  {
    id: "auto-ps-priorExperience",
    label:
      "Did you experience any problems connecting to your appointment today?",
    name: "priorExperience",
    placeHolder: "",
    inputType: "radio",
    options: [
      { label: "Yes", name: "yes", value: "yes" },
      { label: "No", name: "no", value: "no" },
    ],
  },
  {
    id: "auto-ps-provider",
    label: "Please select your provider",
    name: "provider",
    placeHolder: "Select",
    inputType: "dropdown",
    options: [{ name: "Laquita Elliott", value: "Laquita Elliott" }],
  },
  {
    id: "auto-ps-satisfied",
    label: `Were you satisfied with the provider's responses?`,
    name: "satisfied",
    placeHolder: "",
    inputType: "radio",
    options: [
      { label: "Yes", name: "yes", value: "yes" },
      { label: "No", name: "no", value: "no" },
      { label: "N/A", name: "na", value: "na" },
    ],
  },
  {
    id: "auto-ps-providerRating",
    label: `Rate your overall experience with your healthcare provider today.`,
    name: "providerRating",
    placeHolder: "",
    inputType: "radio",
    options: [
      { label: "1 (low)", name: 1, value: 1 },
      { label: "2", name: 2, value: 2 },
      { label: "3", name: 3, value: 3 },
      { label: "4", name: 4, value: 4 },
      { label: "5 (high)", name: 5, value: 5 },
      { label: "N/A", name: "na", value: "na" },
    ],
  },
  {
    id: "auto-ps-staffRating",
    label: `Rate your overall experience with the scheduling staff.`,
    name: "staffRating",
    placeHolder: "",
    inputType: "radio",
    options: [
      { label: "1 (low)", name: 1, value: 1 },
      { label: "2", name: 2, value: 2 },
      { label: "3", name: 3, value: 3 },
      { label: "4", name: 4, value: 4 },
      { label: "5 (high)", name: 5, value: 5 },
      { label: "N/A", name: "na", value: "na" },
    ],
  },
  {
    id: "auto-ps-feedback",
    label: `Please provide any other feedback that might help us improve and offer you a better experience.`,
    name: "feedback",
    placeHolder: "Type",
    inputType: "textField",
    isMultiline: true,
  },
];

const PatientSurvey = ({ initialValues, surveySchema, handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={surveySchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, values, setFieldValue }) => {
        return (
          <Form>
            <div className="ba-header">
              <img className="ba-logo" src={mainLogo} alt="TeleMed2U"></img>
            </div>
            <div className="ps-main-container">
              <div className="ps-form-box">
                <div className="ps-heading-txt">
                  Patient Satisfaction Survey
                </div>
                <div className="ps-subheading-txt">
                  TeleMed2U considers it a privilege to be of service to you. We
                  appreciate any feedback you may have from your recent visit by
                  answering the questions below.
                </div>

                <div>
                  {formFields.map((field, index) => (
                    <div key={index}>
                      {field.inputType === "radio" && (
                        <>
                          <FormLabel
                            className="ps-input-label"
                            component="legend"
                          >
                            {index + 1}. {field.label}
                          </FormLabel>
                          <FormControl className="ps-input-opt-wrap">
                            <RadioGroup
                              id={field.id}
                              aria-label={field.name}
                              name={field.name}
                              row={true}
															onChange={(e) => {
																const { name, value } = e.target
																setFieldValue(name, value)
															}}
                            >
                              {field.options.map((el, index) => (
                                <FormControlLabel
                                  className="ps-input-opt"
                                  key={index}
                                  value={el.value}
                                  control={
                                    <Radio className="abc" color="primary" />
                                  }
                                  label={el.label}
                                  checked={values[field.name] == el.value}
                                />
                              ))}
                            </RadioGroup>
														{errors[field.name] && touched[field.name] && <FormHelperText error>{errors[field.name]}</FormHelperText>}
                          </FormControl>
                        </>
                      )}
                      {field.inputType === "dropdown" && (
                        <>
                          <FormLabel
                            className="ps-input-label"
                            component="legend"
                          >
                            {index + 1}. {field.label}
                          </FormLabel>
                          <FormControl
                            style={{ width: "100%" }}
                            variant="outlined"
                          >
                            <Select
                              id={field.id}
                              className="ps-input-fields"
                              name={field.name}
                              disableUnderline
                              placeholder={field.placeHolder}
															defaultValue={values[field.name]}
															displayEmpty
															renderValue={
																values[field.name] === "" ? () => <span className="dropdown-placeholder">Select</span> : undefined
															}
															MenuProps={{
																anchorOrigin: {
																	vertical: "bottom",
																	horizontal: 'left'
																},
																getContentAnchorEl: null
															}}
                              IconComponent={ExpandMoreIcon}
															onChange={e => { 
																const { name, value } = e.target
																setFieldValue(name, value)
															}}
                            >
                              {field.options.map((el) => (
                                <MenuItem
                                  className="pl-select-option"
                                  value={el.value}
                                  key={el.value}
                                >
                                  {el.name}
                                </MenuItem>
                              ))}
                            </Select>
														{errors[field.name] && touched[field.name] && <FormHelperText style={{marginLeft: 0}} error>{errors[field.name]}</FormHelperText>}
                          </FormControl>
                        </>
                      )}
                      {field.inputType === "textField" && (
                        <FormControl>
                          <FormLabel
                            className="ps-input-label"
                            component="legend"
                          >
                            {index + 1}. {field.label}
                          </FormLabel>
                          <TextField
                            id={field.id}
                            variant="outlined"
                            size="small"
                            className="ps-input-fields"
                            name={field.name}
                            placeholder={field.placeHolder}
                            multiline={field.isMultiline}
                            rows={field.isMultiline ? 5 : 1}
                            disabled={field.readOnly}
														value={values[field.name]}
														onChange={e => { 
															const { name, value } = e.target
															setFieldValue(name, value)
														}}
                          />
													{errors[field.name] && touched[field.name] && <FormHelperText error>{errors[field.name]}</FormHelperText>}
                        </FormControl>
                      )}
                    </div>
                  ))}
                </div>
                <div className="ps-btn-wrp">
                  <Button
                    id="auto-ps-submit-btn"
                    type="submit"
                    variant="contained"
                    className="ps-btn-submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PatientSurvey;
