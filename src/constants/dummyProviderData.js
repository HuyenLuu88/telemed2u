import Logo_1 from '../assests/Provider detail/Logo_1.png';
import Logo_2 from '../assests/Provider detail/Logo_2.png';
import Logo_3 from '../assests/Provider detail/Logo_3.png';
import Logo_4 from '../assests/Provider detail/Logo_4.png';
import Logo_5 from '../assests/Provider detail/Logo_5.png';
import Logo_6 from '../assests/Provider detail/Logo_6.png';

const dummyProviderData = [
    {
        "id": 1,
        "active": true,
        "name": {
            "lastName": "Rao",
            "firstName": "Dr S Kumar"
        },
        "telecome": 423423324,
        "gender": "Male",
        "birthDate": "2021-06-16T18:48:09.000Z",
        "deceased": false,
        "roomId": null,
        "speciality": {
            "id": 9,
            "name": "Cardiologist",
            "slug": "cardiologist",
            "type": "behavioral",
            "isSpecial": true
        },
        "insurances": [
            {
                name: "Tufts health Freedom Plan",
                imagesUrl: Logo_1
            },
            {
                name: "United Health Care",
                imagesUrl: Logo_2
            },
            {
                name: "United Health Care",
                imagesUrl: Logo_3
            },
            {
                name: "BlueCross BlueShield",
                imagesUrl: Logo_4
            },
            {
                name: "Emblem Health",
                imagesUrl: Logo_5
            },
            {
                name: "Emblem Health",
                imagesUrl: Logo_6
            },
            {
                name: "Emblem Health",
                imagesUrl: Logo_6
            },
        ],
        desc: "Dr. Laquita Elliott is a board certified, highly rated thorough, and compassionate internal medicine and primary care physician in Manhattan and NYC. Dr. Laquita Elliott trained in internal medicine at the prestigious New York University of internal Medicine. She is certified by the American board of Internal Medicine... Show more",
        practiceName: "Manhattan Primary Care",
        eduAndTraining: ["Medical School - Ross University School of Medicine", "Doctor of Medicine", "New York University, Residency in Internal Medicine"],
        boardCert: ["American Board of Internal Medicine"],
        language: ["English", "Russian"]
    }
]

export default dummyProviderData;