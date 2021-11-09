
export const docTypes = [
    "Inbound Referral",
    "Outbound Referral",
    "Medical Record",
    "Medical Records Request",
    "Imaging",
    "Lab Result",
    "Prescription",
    "RX Pre-Auth",
    "Insurance Card",
    "Eligibility",
    "Clinical Note",
    "Education / Informational Material",
    "Amendment",
    "Ketamine / SPRAVATO Monitoring",
    "Disability/FMLA",
    "Cambridge Result",
    "Prior Auth",
    "RCM Report",
    "Accommodation Letter",
    "Other (User can free type in a single line field)"
] 

export const appointmentInputFields = [
    {
        id: 'auto-appointment-parentName',
        label: 'Parent name',
        name: 'parentName',
        placeHolder: 'Parent name',
        inputType: 'textField',
        patientType: ['child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        readOnly: true,
        value: 'Ana Jean (Myself)',
        required: true
    },
    {
        id: 'auto-appointment-maritalStatus',
        label: `Parent's marital status`,
        name: 'maritalStatus',
        placeHolder: `Parent's marital status`,
        inputType: 'dropdown',
        patientType: ['child'],
        options: [
            {name: 'Married', value: 'married'},
            {name: 'Single', value: 'single'}
        ],
        mindsetType: ['behavioural', 'non-behavioural'],
        required: true
    },
    {
        id: 'auto-appointment-firstName',
        label: 'Patient first name',
        name: 'firstName',
        placeHolder: 'Patient first name',
        inputType: 'textField',
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        readOnly: true,
        value: 'Ana',
        required: true
    },
    {
        id: 'auto-appointment-lastName',
        label: 'Patient last name',
        name: 'lastName',
        placeHolder: 'Patient last name',
        inputType: 'textField',
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        readOnly: true,
        value: 'Jean',
        required: true
    },
    {
        id: 'auto-appointment-dob',
        label: 'Date of birth(mm/dd/yyyy)',
        name: 'dob',
        placeHolder: 'mm/dd/yyyy',
        inputType: 'textField',
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        readOnly: true,
        value: '12/06/1980',
        required: true
    },
    {
        id: 'auto-appointment-gender',
        label: 'Gender at birth',
        name: 'gender',
        placeHolder: 'Gender',
        inputType: 'textField',
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        readOnly: true,
        value: 'Female',
        required: true
    },
    {
        id: 'auto-appointment-phoneNumber',
        label: 'Cellphone',
        name: 'phoneNumber',
        placeHolder: '(xxx) xxx-xxxx',
        inputType: 'textField',
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        readOnly: true,
        value: '(xxx) xxx-xxxx',
        required: true
    },
    {
        id: 'auto-appointment-emailId',
        label: 'Email address',
        name: 'emailId',
        placeHolder: 'Email address',
        inputType: 'textField',
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        readOnly: true,
        value: 'ana.jean@gmail.com',
        required: false
    },
    {
        id: 'auto-appointment-docType',
        label: 'Upload document',
        name: 'docType',
        placeHolder: 'Select document',
        inputType: 'dropdown',
        patientType: ['adult', 'child'],
        options: docTypes.map(dt => ({
            name: dt, value: dt
        })),
        mindsetType: ['behavioural', 'non-behavioural'],
        required: true
    },  
    {
        id: 'auto-appointment-uploadedDoc',
        label: 'Please upload the photo or document.',
        subLabel: 'PNG of JPEG format, not larger than 3MB',
        name: 'uploadedDoc',
        placeHolder: 'Upload',
        inputType: 'file_upload',
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        required: false
    },  
    {
        id: 'auto-appointment-speciality',
        label: 'The speciality you have chosen for this appointment',
        name: 'speciality',
        placeHolder: 'Select',
        inputType: 'textField',
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        value: 'Primary Care',
        readOnly: true,
        required: true
    },
    // {
    //     label: 'Choose the type of appointment',
    //     name: 'appointmentType',
    //     placeHolder: '',
    //     inputType: 'radio',
    //     patientType: ['adult', 'child'],
    //     options: [
    //         {label: 'Telehealth visit', name: 'teleHealth', value: 'tele-health'},
    //         {label: 'In-clinic visit', name: 'inClinic', value: 'in-clinic'},
    //     ],
    //     onChange: 'setAppointmentType',
    //     mindsetType: ['behavioural', 'non-behavioural']
    // },
    // {
    //     label: 'Is this an initial or a follow-up appointment?',
    //     name: 'appointmentStartType',
    //     placeHolder: '',
    //     inputType: 'radio',
    //     patientType: ['adult', 'child'],
    //     options: [
    //         {label: 'Initial', name: 'initial', value: 'initial'},
    //         {label: 'Follow-up', name: 'followUp', value: 'followUp'},
    //     ],
    //     onChange: 'setAppointmentStartType',
    //     mindsetType: ['behavioural', 'non-behavioural']
    // },
    // {
    //     label: 'Select your preferred provider',
    //     name: 'provider',
    //     placeHolder: 'Select your preferred provider',
    //     inputType: 'dropdown',
    //     patientType: ['adult', 'child'],
    //     options: [
    //         {name: 'Laquita Elliott', value: 'Laquita Elliott'},
    //     ],
    //     mindsetType: ['behavioural', 'non-behavioural']
    // },
    // {
    //     label: 'Appointment Time',
    //     name: 'appintmentTime',
    //     placeHolder: '',
    //     inputType: 'dateTimeField',
    //     patientType: ['adult', 'child'],
    //     mindsetType: ['behavioural', 'non-behavioural']
    // },
    {
        id: 'auto-appointment-haveSuicidalThought',
        label: 'Do you currently have suicidal thoughts or thoughts of harming others?',
        name: 'haveSuicidalThought',
        placeHolder: '',
        inputType: 'radio',
        patientType: ['adult', 'child'],
        options: [
            {label: 'Yes', name: 'yes', value: 'yes'},
            {label: 'No', name: 'no', value: 'no'},
        ],
        onChange: 'setHaveSuicidalThought',
        mindsetType: ['behavioural'],
        required: true
    },
    {
        id: 'auto-appointment-haveSuicidalIntent',
        label: 'Do you have any intent or plan?',
        name: 'haveSuicidalIntent',
        placeHolder: '',
        inputType: 'radio',
        patientType: ['adult', 'child'],
        options: [
            {label: 'Yes', name: 'yes', value: 'yes'},
            {label: 'No', name: 'no', value: 'no'},
        ],
        onChange: 'setHaveSuicidalIntent',
        mindsetType: ['behavioural'],
        required: true
    },
    {
        id: 'auto-appointment-preferredLocation',
        label: 'Select your preferred location for this appointment',
        name: 'preferredLocation',
        placeHolder: 'Select your preferred location',
        inputType: 'textField',
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural'],
        disabledOn: ['haveSuicidalIntent'],
        readOnly: true,
        required: true
    },
    {
        id: 'auto-appointment-isAdvisedMentalCare',
        label: 'Do you have any current or pending legal issues or are you being advised by a court judge, parole officer or CPS to seek mental health care or assesment?',
        name: 'isAdvisedMentalCare',
        placeHolder: '',
        inputType: 'radio',
        patientType: ['adult', 'child'],
        options: [
            {label: 'Yes', name: 'yes', value: 'yes'},
            {label: 'No', name: 'no', value: 'no'},
        ],
        onChange: 'setIsAdvisedMentalCare',
        mindsetType: ['behavioural'],
        disabledOn: ['haveSuicidalIntent'],
        required: true
    },
    {
        id: 'auto-appointment-haveExperiencedAny',
        label: 'Please select if you have ever experienced or suffered from any of the following in the past or present?',
        name: 'haveExperiencedAny',
        placeHolder: '',
        inputType: 'radio',
        patientType: ['adult', 'child'],
        options: [
            {label: 'Alcohol abuse', name: 'alcoholAbuse', value: 'alcoholAbuse'},
            {label: 'Substance abuse', name: 'substanceAbuse', value: 'substanceAbuse'},
            {label: 'None of these', name: 'none', value: 'none'},
        ],
        onChange: 'setHaveExperiencedAny',
        mindsetType: ['behavioural'],
        disabledOn: ['haveSuicidalIntent', 'isAdvisedMentalCare'],
        required: true
    },
    {
        id: 'auto-appointment-reason',
        label: `What's the reason for your appointment?`,
        name: 'reason',
        placeHolder: 'Type',
        inputType: 'textField',
        isMultiline: true,
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        disabledOn: ['haveSuicidalIntent', 'isAdvisedMentalCare'],
        required: true
    },
    {
        id: 'auto-appointment-otherDetails',
        label: `Is there anything else you would like our team to know so we can provide you with the best service possible?`,
        name: 'otherDetails',
        placeHolder: 'Type',
        inputType: 'textField',
        isMultiline: true,
        patientType: ['adult', 'child'],
        mindsetType: ['behavioural', 'non-behavioural'],
        disabledOn: ['haveSuicidalIntent', 'isAdvisedMentalCare'],
        required: true
    },
]

export const AddAnotherPersonFields = {
    personDetails: [
        {
            id: 'auto-aap-firstName',
            label: 'First name',
            name: 'firstName',
            placeHolder: 'First name',
            inputType: 'textField',
            required: true
        },
        {
            id: 'auto-aap-lastName',
            label: 'Last name',
            name: 'lastName',
            placeHolder: 'Last name',
            inputType: 'textField',
            required: true
        },
        {
            id: 'auto-aap-phoneNumber',
            label: 'Cellphone',
            name: 'phoneNumber',
            placeHolder: '(xxx) xxx-xxxx',
            inputType: 'textField',
            required: true
        },
        {
            id: 'auto-aap-emailAddress',
            label: 'Email address',
            name: 'emailAddress',
            placeHolder: 'Email address',
            inputType: 'textField',
        },
        {
            id: 'auto-aap-relationship',
            label: 'Relationship',
            name: 'relationship',
            placeHolder: 'Relationship',
            inputType: 'textField',
            required: true
        },
    ],
    insuranceDetails: [
        {
            id: 'auto-aap-primaryInsurance',
            label: 'Select primary insurance',
            name: 'primaryInsurance',
            placeHolder: 'Select primary insurance',
            inputType: 'dropdown',
            options: [
                {name: 'Insurance 1', value: 'insurance1'},
                {name: 'Insurance 2', value: 'insurance2'},
                {name: 'Insurance 3', value: 'insurance3'},
            ],
            required: true
        },
        {
            id: 'auto-aap-primaryPolicyNumber',
            label: 'Policy number',
            name: 'primaryPolicyNumber',
            placeHolder: 'Policy number',
            inputType: 'textField',
            required: true
        },
        {
            id: 'auto-aap-primaryInsuranceCardPhoto',
            label: 'Please upload a photo of the front and back of your insurance card or document.',
            subLabel: 'PNG of JPEG format, not larger than 3MB',
            name: 'primaryInsuranceCardPhoto',
            placeHolder: 'Choose Images',
            inputType: 'file_upload',
        },
        {
            id: 'auto-aap-secondaryInsurance',
            label: 'Select secondary insurance',
            name: 'secondaryInsurance',
            placeHolder: 'Select secondary insurance',
            inputType: 'dropdown',
            options: [
                {name: 'Insurance 1', value: 'insurance1'},
                {name: 'Insurance 2', value: 'insurance2'},
                {name: 'Insurance 3', value: 'insurance3'},
            ]
        },
        {
            id: 'auto-aap-secondaryPolicyNumber',
            label: 'Policy number',
            name: 'secondaryPolicyNumber',
            placeHolder: 'Policy number',
            inputType: 'textField',
        },
        {
            id: 'auto-aap-secondaryInsuranceCardPhoto',
            label: 'Please upload a photo of the front and back of your insurance card or document.',
            subLabel: 'PNG of JPEG format, not larger than 3MB',
            name: 'secondaryInsuranceCardPhoto',
            placeHolder: 'Choose Images',
            inputType: 'file_upload',
        },
    ]
}
