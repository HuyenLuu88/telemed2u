import React, { useState } from 'react'
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
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
	KeyboardDateTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import { appointmentInputFields } from '../../constants/appointmentFormFields'
import { materialTheme } from "../../utilities/calendar/style";
import deleteIcon from '../../assests/images/icon_delete.svg'
import attachIcon from '../../assests/images/icon_attachment.svg'
import backIcon from '../../assests/images/icon_back.png'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const useStyles = makeStyles({
	radio: {
		'&$checked': {
			color: '#546FC9'
		},
		'&$disabled': {
			color: '#ccc'
		},
	},
	checked: {},
	disabled: {},
	menuPaper: {
		maxHeight: 500
	}
})

const patientTypes = {
	ADULT: 'adult',
	CHILD: 'child'
}

const mindsetTypes = {
	behavioural: 'behavioural',
	nonBehavioural: 'non-behavioural'
}

const errorFlags = {
	haveSuicidalIntent: 'If you are experiencing a crisis or emergency, please dial 911. You may also access the free 24-hour National Suicide Prevention Lifeline at 1-800-273-8255 (1-800-273-TALK)',
	isAdvisedMentalCare: 'We are unable to complete custody evaluations or parental assesments for use in determining custody or visitation, CPS evaluations or disability evaluations. You must find a forensic professional to assist you with these matters.'
}

const errorMsgs = {
	maritalStatus: 'Please select marital status.',
	docType: 'Please select document type.',
	uploadedDoc: 'Please upload valid documents.',
	reason: 'Please enter valid reason.',
	otherDetails: 'Please enter other details.'
}

const AppointmentForm = ({
	handleDateChange,
	onNextClick,
	appointmentFormFields,
	handleAppointmentFormInputChange,
	appointmentFormErrorFlags,
	patientType,
	changePatientType,
	handleBackClick
}) => {
	const classes = useStyles();
	const [uploadedDoc, setUploadedDoc] = useState([])
	const selectedMindsetType = mindsetTypes.behavioural

	const states = {
		patientType,
		...appointmentFormFields
	}

	const handleFunc = {
		uploadedDoc: setUploadedDoc
	}

	const handlePhotoUpload = (event, fileType) => {
		const { files } = event.target
		if (files && files[0]) {
			if (states[fileType].length === 2) {
				const newFileArr = [states[fileType][0], files[0]]
				handleAppointmentFormInputChange(fileType, newFileArr)
			} else if (states[fileType][0]) {
				handleAppointmentFormInputChange(fileType, [...states[fileType], files[0]])
			} else {
				handleAppointmentFormInputChange(fileType, [...files].slice(0, 2))
			}
		}
	}

	return (
		<div className="ba-form-box">
			<div style={{ display: 'flex' }}>
				<img onClick={handleBackClick} className="ba-back-icon" src={backIcon} alt="" />
				<span className="ba-form-heading">Appointment Form</span>
			</div>
			<div className="ba-input-box">
				<FormLabel className="ba-input-label" component="legend">
					Who will be seeing the doctor?
				</FormLabel>
				<RadioGroup
					id="auto-appointment-patientType"
					aria-label="patientType"
					name="patientType"
					onChange={e => { changePatientType(e.target.value) }}
					row={true}
				>
					<FormControlLabel
						value={patientTypes.ADULT}
						control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
						label="Adult"
						checked={patientType === patientTypes.ADULT}
					/>
					<FormControlLabel
						value={patientTypes.CHILD}
						control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
						label="Child"
						checked={patientType === patientTypes.CHILD}
					/>
				</RadioGroup>
			</div>
			{appointmentInputFields.map((pd, index) => {
				const isFieldDisabled = pd.disabledOn && ((states.haveSuicidalThought === 'yes' && states.haveSuicidalIntent === 'yes' && pd.disabledOn.includes('haveSuicidalIntent')) || (states.isAdvisedMentalCare === 'yes' && pd.disabledOn.includes('isAdvisedMentalCare')))
				return (
				<div key={index}>{pd.patientType.includes(patientType) &&
					pd.mindsetType.includes(selectedMindsetType) &&
					<div key={index} className="ba-input-box">
						{pd.inputType === 'textField' && (
							<><FormLabel className="ba-input-label" component="legend">
								{pd.label}{pd.required && <span className="astrik">*</span>}
							</FormLabel><TextField
									required
									id={pd.id}
									error={appointmentFormErrorFlags[pd.name]}
									helperText={appointmentFormErrorFlags[pd.name] ? errorMsgs[pd.name] : null}
									disabled={isFieldDisabled || pd.readOnly}
									variant="outlined"
									size="small"
									className="ba-input-fields"
									name={pd.name}
									inputProps={{ maxLength: 40 }}
									placeholder={pd.placeHolder}
									onChange={e => { handleAppointmentFormInputChange(e.target.name, e.target.value) }}
									multiline={pd.isMultiline}
									rows={pd.isMultiline ? 3 : 1}
									value={states[pd.name]}
								/></>)}
						{pd.inputType === 'button' && (
							<>
								<FormLabel className="ba-input-label" component="legend">
									{pd.label} {`(${pd.subLabel})`}
									{pd.required && <span className="astrik">*</span>}
								</FormLabel>
								<button className="ba-choose-img-btn">
									{pd.placeHolder}
								</button>
							</>
						)}
						{pd.inputType === 'file_upload' && (
							<>
								<FormLabel className="ba-input-label file-upload" component="legend">
									<span className="input-label">{pd.label}</span> <span className="input-subLabel">{pd.subLabel}</span>
									{pd.required && <span className="astrik">*</span>}
								</FormLabel>
								<input type="file" multiple id={pd.id} onChange={e => {
									handlePhotoUpload(e, pd.name)
								}} hidden />
								<button className="ba-choose-img-btn">
									<label for={pd.name}>{pd.placeHolder}</label>
								</button>
								<div style={{ display: 'flex' }}>
									{states[pd.name] && states[pd.name].map((im, index) => (
										<div className="ba-upload-img-wrp">
											<>
												<img className="ba-attach-icn" src={attachIcon} alt="" />
												<span className="ba-uploaded-img-txt">{im.name}</span>
												<img id={`auto-appointment-${pd.name}-del`} className="ba-delete-icn" src={deleteIcon} onClick={() => {
													handleAppointmentFormInputChange(pd.name, states[pd.name].filter((ele, i) => i !== index))
												}
												} alt="" />
											</>
										</div>
									))}
								</div>
							</>
						)}
						{pd.inputType === 'dateField' &&
							pd.mindsetType.includes(selectedMindsetType) && (
								<>
									<FormLabel className="ba-input-label" component="legend">
										{pd.label}{pd.required && <span className="astrik">*</span>}
									</FormLabel>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<ThemeProvider theme={materialTheme}>
											<KeyboardDatePicker
												id={pd.id}
												disableToolbar
												className="ba-input-fields ba-date-input"
												// clearable
												onChange={handleDateChange}
												inputVariant="outlined"
												variant="inline"
												format="mm/dd/yyyy"
												name={pd.name}
												placeholder={pd.placeHolder}
											/>
										</ThemeProvider>
									</MuiPickersUtilsProvider>
								</>
							)}
						{pd.inputType === 'dropdown' &&
							pd.mindsetType.includes(selectedMindsetType) && (
								<>
									<FormLabel className="ba-input-label" component="legend">
										{pd.label}{pd.required && <span className="astrik">*</span>}
									</FormLabel>
									<FormControl
										disabled={isFieldDisabled}
										style={{ width: '100%' }}
										variant="outlined"
									>
										<Select
											id={pd.id}
											error={appointmentFormErrorFlags[pd.name]}
											helperText={appointmentFormErrorFlags[pd.name] ? errorMsgs[pd.name] : null}
											className="ba-input-fields"
											onChange={e => { handleAppointmentFormInputChange(e.target.name, e.target.value) }}
											name={pd.name}
											disableUnderline
											placeholder={pd.placeHolder}
											value={appointmentFormFields[pd.name] ? appointmentFormFields[pd.name] : 'none'}
											MenuProps={{
												classes: { paper: classes.menuPaper },
												anchorOrigin: {
													vertical: "bottom",
												},
												getContentAnchorEl: null
											}}
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
						{(pd.name === 'haveSuicidalIntent' && states.haveSuicidalThought === 'yes') || (pd.name !== 'haveSuicidalIntent') ? pd.inputType === 'radio' &&
							pd.mindsetType.includes(selectedMindsetType) && (
								<>
									<FormLabel
										className={`ba-input-label ${pd.mindsetType.includes(selectedMindsetType) && !isFieldDisabled ? 'is-behavioural' : ''}`}
										component="legend"
									>
										{pd.label}{pd.required && <span className="astrik">*</span>}
									</FormLabel>
									<FormControl
										disabled={isFieldDisabled}
									>
										<RadioGroup
											id={pd.id}
											aria-label={pd.name}
											name={pd.name}
											onChange={e => { handleAppointmentFormInputChange(e.target.name, e.target.value) }}
											row={true}
										>
											{pd.options.map((el, index) => (
												<FormControlLabel
													className="ba-input-label"
													key={index}
													value={el.value}
													control={<Radio classes={{ root: classes.radio, disabled: classes.disabled, checked: classes.checked }} />}
													label={el.label}
													checked={states[pd.name] === el.value}
													disabled={isFieldDisabled}
												/>
											))}
										</RadioGroup>
										{pd.name === 'haveSuicidalIntent' && states.haveSuicidalThought === 'yes' && states.haveSuicidalIntent === 'yes' && (
											<FormHelperText className="ba-err-helper-txt">{errorFlags['haveSuicidalIntent']}</FormHelperText>
										)}
										{pd.name === 'isAdvisedMentalCare' && states.isAdvisedMentalCare === 'yes' && (
											<FormHelperText className="ba-err-helper-txt">{errorFlags['isAdvisedMentalCare']}</FormHelperText>
										)}
									</FormControl>
								</>
							) : ''}
						{pd.inputType === 'dateTimeField' &&
							pd.mindsetType.includes(selectedMindsetType) && (
								<>
									<FormLabel className="ba-input-label" component="legend">
										{pd.label}{pd.required && <span className="astrik">*</span>}
									</FormLabel>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<ThemeProvider theme={materialTheme}>
											<KeyboardDateTimePicker
												// disableToolbar
												id={pd.id}
												className="ba-input-fields ba-date-input"
												inputVariant="outlined"
												variant="inline"
												format="MMM dd, yyyy hh:mm"
												// value={new Date()}
												onChange={handleDateChange}
											/>
										</ThemeProvider>
									</MuiPickersUtilsProvider>
								</>
							)}
					</div>}
				</div >
			)})}
<div className="ba-btn-wrp">
	<Button
		type="submit"
		id="auto-appointment-next-btn"
		variant="contained"
		className="ba-btn-submit"
		onClick={onNextClick}
		disabled={states.isAdvisedMentalCare === 'yes' || states.haveSuicidalIntent === 'yes'}
	>
		Next
	</Button>
</div>
		</div >
	)
}

export default AppointmentForm