import React, { useState } from "react";
import SearchBox from './SearchBox'
import { FormControl, Modal,
  Button,
  FormLabel,
  TextField,
	MenuItem,
	Select,
 } from "@material-ui/core";
import closeIcon from "../../assests/images/close_icon.png";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/styles";
import { materialTheme } from "../../utilities/calendar/style";
import editIcon from '../../assests/images/icon_edit.svg'
import cancelIcon from '../../assests/images/icon_cancel.png'
import checkIcon from '../../assests/images/icon_checkmark.svg'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const userRole = 'patient'
const pateintList = ['Ana Jean', 'Billie Jean']

const formFields = [
  {
    label: 'First name',
    name: 'firstName',
    placeHolder: 'First name',
    inputType: 'textField',
    id: 'auto-search-firstName'
  },
  {
    label: 'Last name',
    name: 'lastName',
    placeHolder: 'Last name',
    inputType: 'textField',
    id: 'auto-search-lastName'
  },
  {
    label: 'Address 1',
    name: 'address1',
    placeHolder: 'Address',
    inputType: 'textField',
    id: 'auto-search-address1'
  },
  {
    label: 'City',
    name: 'city1',
    placeHolder: 'City',
    inputType: 'textField',
    id: 'auto-search-city'
  },
  {
    label: 'Zipcode',
    name: 'zipCode1',
    placeHolder: 'Zipcode',
    inputType: 'textField',
    id: 'auto-search-zipcode'
  },
  {
    label: 'Date of birth',
    name: 'dob',
    placeHolder: '',
    inputType: 'dateField',
    id: 'auto-search-dob'
  },
  {
    label: 'Cellphone',
    name: 'phoneNumber',
    placeHolder: '(xxx) xxx-xxxx',
    inputType: 'textField',
    id: 'auto-search-phone'
  },
  {
    label: 'Address 2',
    name: 'address2',
    placeHolder: 'Address',
    inputType: 'textField',
    id: 'auto-search-address2'
  },
  {
    label: 'State',
    name: 'state',
    placeHolder: 'Select state',
    inputType: 'dropdown',
    options: [
        {name: 'state1', value: 'state2'},
        {name: 'state2', value: 'state1'},
    ],
    id: 'auto-search-state'
},  
  {
    label: 'Email',
    name: 'email',
    placeHolder: 'Email',
    inputType: 'textField',
    id: 'auto-search-email'
  },
]

const renderAddNewPatientModal = (open, toggleOpen, patientDetails, handlePatientDetailsChange, handleAddPatientClick) => (
  <Modal
    open={open}
    onClose={() => {
      toggleOpen(false);
    }}
  >
    <div className="ba-add-patient-modal-container">
      <div className="ba-add-patient-modal-heading">
        <span>Add new patient</span>
      </div>
      <img
        id="auto-search-modal-close"
        className="apt-cancel-close-icn"
        src={closeIcon}
        onClick={() => {
          toggleOpen(false);
        }}
        alt=""
      />
      <div className="ba-add-patient-fields-wrap">
      {formFields.map((pd, index) => (
					<>
					 <div key={index} style={{ width: 424 }} className="ba-input-box">
						{pd.inputType === 'textField' && (
						<>
              <FormLabel className="ba-input-label" component="legend">
						    {pd.label}<span className="astrik">*</span>
						  </FormLabel>
              <TextField
                id={pd.id}
                required
                // error={errorFlag.firstName}
                // helperText={errorFlag.firstName ? requiredFirstname : null}
                // id="filled-required"
                variant="outlined"
                size="small"
                className="ba-input-fields"
                name={pd.name}
                inputProps={{ maxLength: 40 }}
                placeholder={pd.placeHolder}
                onChange={e => {
                  const { name, value } = e.target
                  handlePatientDetailsChange(name, value)
                }}
                multiline={pd.isMultiline}
                rows={pd.isMultiline ? 3 : 1}
                disabled={pd.readOnly}
                value={patientDetails[pd.name]}
						  />
            </>)}
						{pd.inputType === 'dateField' && (
							<>
								<FormLabel className="ba-input-label" component="legend">
									{pd.label}<span className="astrik">*</span>
								</FormLabel>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<ThemeProvider theme={materialTheme}>
										<KeyboardDatePicker
                      id={pd.id}
											disableToolbar
											className="ba-input-fields ba-date-input"
											// clearable
											onChange={date => {
                        handlePatientDetailsChange(pd.name, date)
                      }}
											inputVariant="outlined"
											variant="inline"
											format="mm/dd/yyyy"
											name={pd.name}
											placeholder={pd.placeHolder}
                      value={patientDetails[pd.name]}
										/>
									</ThemeProvider>
								</MuiPickersUtilsProvider>
							</>
						)}
						{pd.inputType === 'dropdown' && (
								<>
									<FormLabel className="ba-input-label" component="legend">
										{pd.label}<span className="astrik">*</span>
									</FormLabel>
									<FormControl
										style={{ width: '100%' }}
										variant="outlined"
									>
										<Select
                      id={pd.id}
											className="ba-input-fields"
                      onChange={e => {
                        const { name, value } = e.target
                        handlePatientDetailsChange(name, value)
                      }}
											name={pd.name}
											disableUnderline
											placeholder={pd.placeHolder}
											defaultValue='none'
                      value={patientDetails[pd.name]}
                      IconComponent={ExpandMoreIcon}
										>
											<MenuItem className="pl-select-option" disabled value='none'>
												{pd.placeHolder}
											</MenuItem>
											{pd.options.map(el => (
												<MenuItem className="pl-select-option" value={el.value} key={el.value}>
													{el.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</>
						)}
					</div></>
				))}
      </div>
      <div className="ba-add-patient-btn">
					<Button
            id="auto-add-patient-submit"
						type="submit"
						variant="contained"
						className="ba-btn-submit"
            onClick={() => {
              handleAddPatientClick()
              toggleOpen(false)
            }}
					>
						<span>Add Patient</span>
					</Button>
				</div>
    </div>
  </Modal>
)

const Search = ({ 
  specialities,
  speciality, 
  visitType, 
  clinic,
  searchDate, 
  onChangeInput, 
  onSearchClick, 
  patientDetails, 
  handlePatientDetailsChange, 
  handleAddPatientClick, 
  patientList, 
  zipCode,
  role,
  getClinicListBySpeciality,
  clinicList
}) => {
  const [ showAddPatientModal, toggleAddPatientModal ] = useState(false)
  localStorage.setItem('selectedDate', '')
  localStorage.setItem('selectedSlot', '')
  return (
    <div className="pl-search-container">
      <div className="apt-heading">Book an appointment</div>
      {userRole === 'clinic-admin' && (
        <div>
          <span className="ba-select-patient-heading">Select patient to book new appointment</span>     
          <div>
            <FormControl className="ba-src-person-input">
              <Autocomplete
                  id="auto-search-patient-name"
                  value={''}
                  options={pateintList}
                  getOptionLabel={(states) => states}
                  // onChange={(event, value) => handleStateChange(value)}
                  className="text-input"
                  renderInput={(params) =>
                    <TextField
                      required
                      // error={errorFlag.state}
                      // helperText={errorFlag.state ? requiredState : null}
                      name="Textname"
                      {...params}
                      placeholder="Enter patient name"
                      variant="outlined" />}
                />
            </FormControl>
            <span id="auto-search-add-patient-btn" className="ba-add-patient" onClick={() => toggleAddPatientModal(true)}>+ Add new patient</span>
          </div> 
          {patientList.map((pl, index) => (
            <div className="ba-patient-list-wrp">
              <img style={{ width: 24, height: 24}} className="ba-green-check-icon" src={checkIcon} alt=""/>
              <div className="ba-patient-list-detail">
                <span>{pl.firstName} {pl.lastName}</span>
                <span>Cellphone: {pl.phoneNumber}</span>
              </div>
              <img id="auto-add-patient-edit" className="ba-edit-icon cursor-pointer" src={editIcon}  alt=""/>
              <img id="auto-add-patient-delete" className="ba-delete-icon cursor-pointer" src={cancelIcon} alt=""/>
            </div>
          ))}
          {renderAddNewPatientModal(showAddPatientModal, toggleAddPatientModal, patientDetails, handlePatientDetailsChange, handleAddPatientClick)}  
        </div>
      )}  
      <SearchBox 
        specialities={specialities}
        speciality={speciality}
        visitType={visitType}
        clinic={clinic}
        searchDate={searchDate}
        onChangeInput={onChangeInput}
        onSearchClick={onSearchClick}
        zipCode={zipCode}
        role={role}
        getClinicListBySpeciality={getClinicListBySpeciality}
        clinicList={clinicList}
      />
    </div>
  );
};

export default Search;
