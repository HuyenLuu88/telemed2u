import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
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
	Checkbox
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AddAnotherPersonFields } from "../../constants/appointmentFormFields";
import editIcon from '../../assests/images/icon_edit.svg'
import cancelIcon from '../../assests/images/icon_cancel.png'
import deleteIcon from '../../assests/images/icon_delete.svg'
import checkIcon from '../../assests/images/icon_checkmark.svg'
import attachIcon from '../../assests/images/icon_attachment.svg'
import backIcon from '../../assests/images/icon_back.png'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
	radio: {
		'&$checked': {
			color: '#546FC9'
		}
	},
	checked: {}
})

const errorMsgs = {
	firstName: 'Please enter a valid first name.',
	lastName: 'Please enter a valid last name.',
	phoneNumber: 'Please enter a valid phone number.',
	emailAddress: 'Please enter a valid email address.',
	relationship: 'Please enter a valid relationship.',
	primaryPolicyNumber: 'Please enter valid policy number'
}

let selectedPersonIndex = ''

const AppointmentForm = ({
	handleChange,
	onBookAppointmentClick,
	handleBackClick,
	addAnotherPersonFormErrorFlags,
	addAnotherPersonFormFields,
	handleAddAnotherPersonInputChange,
	handleBookAppointmentClick,
	onAddaAnotherPersonClick,
	personList,
	onClickEditIcon,
	handleEditPerson,
	handleRemovePerson,
	wantToAddSomeone,
	isInsured,
	onChangeRadioInput,
	resetAddAnotherPersonErrorFlag
}) => {
	const classes = useStyles();
	const location = useLocation();
	const [isReschedule, setReschdule] = useState(location.pathname.includes('reschedule'))
	const [shouldAddAnotherPerson, setShouldAddAnotherPerson] = useState(true);
	// const [personDetails, setPersonDetails] = useState({});
	const [mode, setMode] = useState('add');

	useEffect(() => {
		setShouldAddAnotherPerson(personList.length === 0 ? true : false)
	}, [personList])

	const states = { ...addAnotherPersonFormFields }

	const handleFunc = {}

	const onEditPersonClick = (index) => {
		handleEditPerson(index)
		setMode('add')
		setShouldAddAnotherPerson(false);
		selectedPersonIndex = ''
	}

	const handlePhotoUpload = (event, fileType) => {
		const { files } = event.target
		if (files && files[0]) {
			if (states[fileType].length === 2) {
				const newFileArr = [states[fileType][0], files[0]]
				handleAddAnotherPersonInputChange(fileType, newFileArr)
			} else if (states[fileType][0]) {
				handleAddAnotherPersonInputChange(fileType, [...states[fileType], files[0]])
			} else {
				handleAddAnotherPersonInputChange(fileType, [...files].slice(0, 2))
			}
		}
	}

	return (
		<div className="ba-form-box">
			<div style={{ display: 'flex' }}>
				<img onClick={handleBackClick} className="ba-back-icon" src={backIcon} alt="" />
				<span className="ba-form-heading">Add another person</span>
			</div>
			<div className="ba-input-box">
				<FormLabel className="ba-aap-input-label" component="legend">
					Would you like to add someone else to your consultation?
				</FormLabel>

				<div>
					<RadioGroup
						id="auto-aap-wantToAddSomeone"
						aria-label="wantToAdd"
						name="wantToAddSomeone"
						onChange={(e) => {
							onChangeRadioInput(e.target.name, e.target.value);
							resetAddAnotherPersonErrorFlag();
						}}
						row={true}
					>
						<FormControlLabel
							value={'yes'}
							control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
							label="Yes"
							checked={wantToAddSomeone === 'yes'}
						/>
						<FormControlLabel
							value={'no'}
							control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
							label="No"
							checked={wantToAddSomeone === 'no'}
						/>
					</RadioGroup>
					{wantToAddSomeone === 'yes' &&
						<>
							{personList.filter((pl, index) => index !== selectedPersonIndex).map((pl, index) => (
								<div key={index} className="ba-person-list-box">
									<img className="check-icon" src={checkIcon} alt="" />
									<div>
										<span><b>{pl.firstName} {pl.lastName}</b></span><br />
										<span>Cellphone: {pl.phoneNumber}</span> <br />
										<span>Email address: {pl.emailAddress}</span> <br />
										<span>Relationship: {pl.relationship}</span>
									</div>
									<img id={`auto-aap-${index}-edit`} className="edit-icon" src={editIcon} onClick={() => { selectedPersonIndex = index; setShouldAddAnotherPerson(true); onClickEditIcon(index); setMode('edit'); }} alt="" />
									<img id={`auto-aap-${index}-edit`} className="delete-icon" src={cancelIcon} onClick={() => { handleRemovePerson(index); }} alt="" />
								</div>
							))}
							{shouldAddAnotherPerson && AddAnotherPersonFields.personDetails.map((aap, index) => (
								<div key={index} className="ba-input-box">
									{aap.inputType === "textField" && (
										<>
											<FormLabel className="ba-input-label" component="legend">
												{aap.label}
												{aap.required && <span className="astrik">*</span>}
											</FormLabel>
											<TextField
												id={aap.id}
												required
												error={addAnotherPersonFormErrorFlags[aap.name]}
												helperText={addAnotherPersonFormErrorFlags[aap.name] ? errorMsgs[aap.name] : null}
												variant="outlined"
												size="small"
												className="ba-input-fields"
												name={aap.name}
												inputProps={{ maxLength: aap.name === 'phoneNumber' ? 10 : 40 }}
												placeholder={aap.placeHolder}
												multiline={aap.isMultiline}
												rows={aap.isMultiline ? 3 : 1}
												onChange={e => { handleAddAnotherPersonInputChange(e.target.name, e.target.value) }}
												value={states[aap.name]}
											/>
										</>
									)}
									{aap.inputType === "dropdown" && (
										<>
											<FormLabel className="ba-input-label" component="legend">
												{aap.label}
												{aap.required && <span className="astrik">*</span>}
											</FormLabel>
											<FormControl style={{ width: "100%" }} variant="outlined">
												<Select
													id={aap.id}
													error={addAnotherPersonFormErrorFlags[aap.name]}
													helperText={addAnotherPersonFormErrorFlags[aap.name] ? errorMsgs[aap.name] : null}
													className="ba-input-fields"
													onChange={e => { handleAddAnotherPersonInputChange(e.target.name, e.target.value) }}
													name={aap.name}
													disableUnderline
													placeholder={aap.placeHolder}
													value={states[aap.name] ? states[aap.name] : 'none'}
													MenuProps={{
														anchorOrigin: {
															vertical: "bottom",
														},
														getContentAnchorEl: null
													}}
													IconComponent={ExpandMoreIcon}
												>
													<MenuItem
														className="pl-select-option"
														disabled
														value="none"
													>
														{aap.placeHolder}
													</MenuItem>
													{aap.options.map((el) => (
														<MenuItem
															className="pl-select-option"
															value={el.value}
															key={el.value}
														>
															{el.name}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</>
									)}
								</div>
							))}
							{shouldAddAnotherPerson && <div className="ba-btn-wrp">
								<button
									id="auto-aap-add-btn"
									className="ba-choose-img-btn"
									onClick={() => {
										if (mode === 'edit') {
											onEditPersonClick(selectedPersonIndex)
										} else {
											onAddaAnotherPersonClick();
										}
									}}
								>
									{mode === 'edit' ? 'Save' : 'Add person'} 
								</button>
							</div>}
							{personList.length < 4 ? (
								<>
									{!shouldAddAnotherPerson && (
										<div
											id="auto-aap-link"
											onClick={() => setShouldAddAnotherPerson(true)}
											className="ba-add-anthr-prsn-lbl"
										>
											Add another person
										</div>
									)}
								</>
							) : ''}
						</>
					}
				</div>
			</div>
			<div className="ba-separator"></div>
			<div>
				<FormLabel className="ba-aap-input-label" component="legend">
					Are you insured?
				</FormLabel>
				<RadioGroup
					id="auto-aap-isInsured"
					aria-label="isInsured"
					name="isInsured"
					onChange={(e) => {
						onChangeRadioInput(e.target.name, e.target.value);
						resetAddAnotherPersonErrorFlag();
					}}
					row={true}
				>
					<FormControlLabel
						value={'yes'}
						control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
						label="Yes"
						checked={isInsured === 'yes'}
					/>
					<FormControlLabel
						value={'no'}
						control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
						label="No"
						checked={isInsured === 'no'}
					/>
				</RadioGroup>
				{isInsured === 'yes' && (
					<>
						{AddAnotherPersonFields.insuranceDetails.map((aap, index) => (
							<div key={index} className="ba-input-box">
								{aap.inputType === "textField" && (
									<>
										<FormLabel className="ba-input-label" component="legend">
											{aap.label}
											{aap.required && <span className="astrik">*</span>}
										</FormLabel>
										<TextField
											id={aap.id}
											error={addAnotherPersonFormErrorFlags[aap.name]}
											helperText={addAnotherPersonFormErrorFlags[aap.name] ? errorMsgs[aap.name] : null}
											required
											variant="outlined"
											size="small"
											className="ba-input-fields"
											name={aap.name}
											inputProps={{ maxLength: 40 }}
											placeholder={aap.placeHolder}
											value={states[aap.name]}
											onChange={e => { handleAddAnotherPersonInputChange(e.target.name, e.target.value) }}
											multiline={aap.isMultiline}
											rows={aap.isMultiline ? 3 : 1}
										/>
									</>
								)}
								{aap.inputType === "dropdown" && (
									<>
										<FormLabel className="ba-input-label" component="legend">
											{aap.label}
											{aap.required && <span className="astrik">*</span>}
										</FormLabel>
										<FormControl style={{ width: "100%" }} variant="outlined">
											<Select
												id={aap.id}
												error={addAnotherPersonFormErrorFlags[aap.name]}
												helperText={addAnotherPersonFormErrorFlags[aap.name] ? errorMsgs[aap.name] : null}
												className="ba-input-fields"
												onChange={e => { handleAddAnotherPersonInputChange(e.target.name, e.target.value) }}
												name={aap.name}
												disableUnderline
												placeholder={aap.placeHolder}
												value={addAnotherPersonFormFields[aap.name] ? addAnotherPersonFormFields[aap.name] : 'none'}
												MenuProps={{
													anchorOrigin: {
														vertical: "bottom",
													},
													getContentAnchorEl: null
												}}
												IconComponent={ExpandMoreIcon}
											>
												<MenuItem
													className="pl-select-option"
													disabled
													value="none"
												>
													{aap.placeHolder}
												</MenuItem>
												{aap.options.map((el) => (
													<MenuItem
														className="pl-select-option"
														value={el.value}
														key={el.value}
													>
														{el.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</>
								)}
								{aap.inputType === 'button' && (
									<>
										<FormLabel className="ba-input-label" component="legend">
											{aap.label} {`(${aap.subLabel})`}
											{aap.required && <span className="astrik">*</span>}
										</FormLabel>
										<button className="ba-choose-img-btn">
											{aap.placeHolder}
										</button>
									</>
								)}
								{aap.inputType === 'file_upload' && (
									<>
										<FormLabel className="ba-input-label" component="legend">
											<span className="input-label">{aap.label}</span> <span className="input-subLabel">{aap.subLabel}</span>
											{aap.required && <span className="astrik">*</span>}
										</FormLabel>
										<input id={aap.id} type="file" accept="image/*" multiple id={aap.name} onChange={e => {
											handlePhotoUpload(e, aap.name)
										}} hidden />
										<button className="ba-choose-img-btn">
											<label for={aap.name}>{aap.placeHolder}</label>
										</button>
										<div style={{ display: 'flex' }}>
											{states[aap.name] && states[aap.name].map((im, index) => (
												<div key={index} className="ba-upload-img-wrp">
													<>
														<img className="ba-attach-icn" src={attachIcon} alt="" />
														<span className="ba-uploaded-img-txt">{im.name}</span>
														<img id={`auto-aap-${aap.name}-del`} className="ba-delete-icn" src={deleteIcon} onClick={() => handleAddAnotherPersonInputChange(aap.name, states[aap.name].filter((ele, i) => i !== index))} alt="" />
													</>
												</div>
											))}
										</div>
									</>
								)}
							</div>
						))}

					</>
				)}
			</div>
			<div className="term-condition-form">
				<Checkbox
					id="auto-aap-isAgreedTnC-check"
					className="term-condition-form-check"
					name="isAgreedTnC"
					color="primary"
					onChange={e =>{ handleAddAnotherPersonInputChange(e.target.name, e.target.checked);}}
					checked={states.isAgreedTnC}
				/>
				<FormLabel className="term-condition-label">
					I agree to the TeleMed2U <a>Terms and Conditions</a> and the <a>Privacy Policy</a><span className="astrik">*</span>
				</FormLabel>
			</div>
			<div className="ba-btn-wrp">
				<Button
					id="auto-aap-submit-btn"
					type="submit"
					variant="contained"
					className="ba-btn-submit"
					onClick={() => { onBookAppointmentClick(isReschedule) }}
					disabled={!states.isAgreedTnC}
				>
					Book Appointment
				</Button>
			</div>
		</div>
	);
};

export default AppointmentForm;
