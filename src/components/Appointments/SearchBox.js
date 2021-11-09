import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from "yup";
import { FormControl, Select, Button, MenuItem, Input, FormHelperText } from "@material-ui/core";
import searchIcon from '../../assests/images/icon_search_searchbar.svg';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { numberRegex } from '../../utilities/regex';
import { appointmentTypes, userRoles } from '../../constants'; 

const visitTypes = [
  { key: 'tele-consultant', value: 'Telehealth Visit' },
  { key: 'in-clinic', value: 'Clinic Visit' }
]

const clinics = [
  { id: 1, clinic_name: 'UCSF Primary Care 1', "zip":232323, "city":"New York", "state":"New Jersey" },
  { id: 2, clinic_name: 'UCSF Primary Care 2', "zip":232323, "city":"New York", "state":"New Jersey" },
  { id: 3, clinic_name: 'UCSF Primary Care 3', "zip":232323, "city":"New York", "state":"New Jersey" },
]

const initialValues = {
  speciality: '',
  visitType: '',
  zipCode: '',
  clinic: ''
}

const validateSchema =Yup.object().shape({
  speciality: Yup.string().required('Please select speciality.'),
  visitType: Yup.string().required('Please select appointment type.'),
  zipCode: Yup.number().when('visitType', {
    is: visitType => visitType === appointmentTypes.IN_CLINIC,
    then: Yup.number().required('Please enter zip code.')
  }),
  clinic: Yup.string().when('visitType', {
    is: visitType => visitType === appointmentTypes.IN_CLINIC,
    then: Yup.string().required('Please select clinic.')
  }),
})

export default ({ 
  specialities, 
  speciality, 
  visitType, 
  clinic,
  searchDate, 
  onChangeInput, 
  onSearchClick, 
  zipCode, 
  role,
  getClinicListBySpeciality,
  clinicList
}) => {
  const tempClinicList = role !== userRoles.ADMIN ? clinics : clinicList
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={onSearchClick}
    >
      {({errors, touched, isValid, values, setFieldValue}) => {
        Object.assign(values, {
          speciality,
          visitType,
          clinic,
          zipCode
        });
        console.log('======values======', values)
        return (
          <Form>
            <div style={{ display: 'flex' }}>
                <div className="pl-search-bar">
                  <div style={{ width: visitType === appointmentTypes.IN_CLINIC ? role === userRoles.ADMIN ? '60%' : '40%' : '80%' }}>
                    <FormControl style={{ width: '100%' }}>
                      <Select
                        id="auto-search-specialities"
                        className="splt"
                        onChange={e => { 
                          const { name, value } = e.target
                          onChangeInput(name, value)
                          setFieldValue(name, value)
                          if (role === userRoles.ADMIN) {
                            getClinicListBySpeciality(value)
                          }
                        }}
                        name="speciality"
                        disableUnderline
                        defaultValue={values.speciality}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                          },
                          getContentAnchorEl: null,
                        }}
                        IconComponent={ExpandMoreIcon}
                        displayEmpty
                        renderValue={
                          values.speciality === "" ? () => <span className="dropdown-placeholder">Select speciality</span> : undefined
                        }
                      >
                        {specialities.map(el => (
                          <MenuItem className="pl-select-option" value={el.id} key={el.id}>
                            {el.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.speciality && touched.speciality && <FormHelperText error>{errors.speciality}</FormHelperText>}
                    </FormControl>
                  </div>
                  <span className="seperator"></span>
                  <div style={{ width: '20%' }}>
                    <FormControl style={{ width: '100%' }}>
                      <Select
                        id="auto-search-visitType"
                        className="visitType"
                        onChange={e => { 
                          const { name, value } = e.target
                          onChangeInput(name, value)
                          setFieldValue(name, value)
                        }}
                        name="visitType"
                        disableUnderline
                        defaultValue={values.visitType}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                          },
                          getContentAnchorEl: null
                        }}
                        IconComponent={ExpandMoreIcon}
                        displayEmpty
                        renderValue={
                          values.visitType === "" ? () => <span className="dropdown-placeholder">Select Visit</span> : undefined
                        }
                      >
                        {visitTypes.map(vt => (
                          <MenuItem key={vt.key} className="pl-select-option" value={vt.key}>
                            {vt.value}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.visitType && touched.visitType && <FormHelperText error>{errors.visitType}</FormHelperText>}
                    </FormControl>
                  </div>
                  {values.visitType === appointmentTypes.IN_CLINIC && role !== userRoles.ADMIN && <span className="seperator"></span>}

                  {values.visitType === appointmentTypes.IN_CLINIC && role !== userRoles.ADMIN &&
                    <>
                      <div style={{ width: '15%' }}>
                        <FormControl style={{ width: '100%' }}>
                          <Input
                            style={{ width: '100%' }}
                            id="auto-search-zipcode"
                            disableUnderline
                            placeholder="Enter ZIP Code" 
                            className="pin-code" 
                            inputProps={{ inputMode: 'numeric', maxLength: 5 }}
                            value={values.zipCode}
                            name="zipCode"
                            onChange={e => {
                                if(numberRegex.test(e.target.value) || e.target.value === "") {
                                  onChangeInput(e.target.name, e.target.value) }}
                                }
                          ></Input>
                          {errors.zipCode && touched.zipCode && <FormHelperText error>{errors.zipCode}</FormHelperText>}
                        </FormControl>
                      </div>
                      <span className="seperator"></span>
                    </>
                  }
                  {values.visitType === appointmentTypes.IN_CLINIC &&
                    <>
                      <div style={{ width: '25%' }}>
                        <FormControl style={{ width: '100%' }}>
                          <Select
                            id="auto-search-aptType"
                            className={values.clinic ? 'apt-clinic' : 'visitType'}
                            onChange={() => { }}
                            name="clinic"
                            disableUnderline
                            defaultValue={values.clinic}
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                              },
                              getContentAnchorEl: null
                            }}
                            IconComponent={ExpandMoreIcon}
                            displayEmpty
                            renderValue={
                              values.clinic === "" ? () => <span className="dropdown-placeholder">Select Clinic</span> : undefined
                            }
                            onChange={e => { 
                              const { name, value } = e.target
                              onChangeInput(name, value)
                              setFieldValue(name, value)
                            }}
                          >
                            {tempClinicList.map(vt => (
                              <MenuItem key={vt.id} className="pl-select-option" value={vt.id}>
                                <div className="pl-location-container">
                                  <span className="pl-search-clinic-txt">{vt.clinic_name}</span>
                                  <br />
                                  <span className="pl-search-clinic-addrs-txt">{`${vt.city}, ${vt.state} ${vt.zip}`}</span>
                                </div>
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.clinic && touched.clinic && <FormHelperText error>{errors.clinic}</FormHelperText>}
                        </FormControl>
                      </div>
                    </>
                  }
                </div>
                <Button
                  id="auto-search-btn"
                  className="btn-search"
                  type="submit"
                >
                  <img src={searchIcon} />
                  <span>Search</span>
                </Button>
            </div>
          </Form>
        )
      }}
      
    </Formik>
  )
}