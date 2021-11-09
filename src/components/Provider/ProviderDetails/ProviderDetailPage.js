import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ProviderDetailPage.scss";
import erika_provider from "../../../assests/images/erika_provider.png";
import insuranceLogoDummy from '../../../assests/Provider detail/Logo_1.png';
import Speciality from "../../../assests/Provider detail/icon_speciality.svg";
import Education from "../../../assests/Provider detail/icon_education2.svg";
import Languages from "../../../assests/Provider detail/icon_language.svg";
import Gender from "../../../assests/Provider detail/icon_gender.svg";
import dummyProviderData from "../../../constants/dummyProviderData";
import Grid from "@material-ui/core/Grid";
import { appointmentTypes } from "../../../constants/appointments";
import { capitalizeFirstLetter } from "../../../utilities"

const ProviderDetailPage = ({ providerDetails }) => {
  const [minInsuranceCount, setMinInsuranceCount ] = useState(5)
  const history = useHistory()
  const descriptionRef = useRef(null)
  const [descMaxLength, setDescMaxLength] = useState(78)

  const {
    first_name,
    last_name,
    dob,
    gender,
    photo,
    appointment_type,
    appointment_duration,
    followup_appointment_duration,
    desc,
    faq,
    speciality,
    education,
    certification,
    in_network_insurances,
    practice_name,
    languages
  } = providerDetails;

  useEffect(() => {
    if (descriptionRef && descriptionRef.current) {
      const wordCount = (desc || '').split(' ').length
      const showMoreLink = document.getElementById('pr-show-more')
      if (wordCount === descMaxLength) {
        descriptionRef.current.innerText = desc
        showMoreLink.style.display = "none"
      } else if (wordCount > descMaxLength) {
        const trimmedText = desc.split(" ").splice(0, descMaxLength).join(" ")
        descriptionRef.current.innerText = trimmedText
        if (showMoreLink) {
          showMoreLink.style.display = "inline"
        }
      }
    }
  }, [desc, descMaxLength])

  const insurance = [...in_network_insurances]

  const providerAppointmentTypes = (appointment_type || "").split(",");

  return (
    <div className="pr-main-container">
      <div className="pr-inner-container">
        <Grid container className="form-wrapper pr-detail-box">
          <Grid item xs={6} className="" span={12}>
            {/* <div className="pr-detail-box-left"> */}
            <div className="pr-detail-inner-box">
              <div className="pr-detail-img-box">
                <img src={photo || erika_provider} alt="" />
              </div>
              <div className="pr-detail-name-box">
                <span className="pr-name">{`${first_name} ${last_name}`}</span>
                <span className="pr-splty">{speciality.name}</span>
                <div className="pr-visit-typ">
                  {providerAppointmentTypes.map((at, index) => (
                    <div key={index} className="pr-televisit-box">
                      <img
                        className="pr-visit-svg"
                        src={appointmentTypes[at.trim()].icon}
                        alt=""
                      />
                      <span className="pr-tele-txt">
                        {appointmentTypes[at.trim()].label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* </div> */}
          </Grid>
          <Grid item xs={6} className="" span={12}>
            {/* <div className="pr-detail-box-right"> */}
            <div className="pr-detail-decs">
              <div className="pr-desc-head">
                <span className="">{`About ${first_name} ${last_name}`}</span>
              </div>
              <div className="pr-desc-body">
                <span className="abc" ref={descriptionRef}>{desc}</span>
                <span
                  id="pr-show-more" 
                  className="pr-desc-show-more"
                  onClick={() => setDescMaxLength((desc || '').split(' ').length)}
                >... Show More</span>
              </div>
            </div>
            {/* </div> */}
          </Grid>
        </Grid>

        <div
          className="pr-apt-booking-btn-box"
          onClick={() => {
            history.goBack();
          }}
        >
          <div className="pr-apt-booking-btn">
            <span className="pr-apt-btn-txt">Continue Booking</span>
          </div>
        </div>
        <div className="pr-seperater"></div>
        <div className="pr-insurence-box">
          <div className="pr-insurance-head">In-network insurances</div>
          <Grid
            container
            className="form-wrapper pr-insurance-container"
            spacing={2}
          >
            {insurance.map((ins, key) => {
              if (key <= minInsuranceCount) {
                return (
                  <Grid item xs={6} md={4} className="" span={12}>
                    <div key={key} className="pr-insurance">
                      <div className="pr-insurance-img">
                        <img src={ins.image || insuranceLogoDummy} alt="ins" />
                      </div>
                      <span className="pr-insurance-txt">{ins.insurance}</span>
                    </div>
                  </Grid>
                );
              }
            })}
          </Grid>
          {minInsuranceCount  !== insurance.length && insurance.length > 6  && 
            <div
              className="pr-insurance-viewAll" 
              onClick={() => setMinInsuranceCount(insurance.length)}
            >View all
            </div>
          }
        </div>
        <div className="pr-seperater-short"></div>
        <div className="pr-otherDetails-box">
          <div className="pr-insurance-head">Education and background</div>
          <div className="pr-otherDetails-inner-box">
            <div className="pr-otherDetails-splty">
              <span className="pr-splty-svg">
                <img src={Speciality} alt="" />
              </span>
              <div className="pr-splty-content">
                <span className="pr-splty-head">Specialities</span>
                <div className="pr-splty-desc-box">
                  <span className="pr-splty-desc">{speciality.name}</span>
                </div>
              </div>
            </div>
            <div className="pr-otherDetails-splty">
              <span className="pr-splty-svg"></span>
              <div className="pr-splty-content">
                <span className="pr-splty-head">Practice name</span>
                <div className="pr-splty-desc-box">
                  <span className="pr-splty-desc">{practice_name}</span>
                </div>
              </div>
            </div>
            <div className="pr-otherDetails-splty">
              <span className="pr-splty-svg">
                <img src={Education} alt="" />
              </span>
              <div className="pr-splty-content">
                <span className="pr-splty-head">Education and training</span>
                <div className="pr-splty-desc-box">
                  {education.map((edu, index) => (
                    <span key={index} className="pr-splty-desc">
                      {edu.Education}
                      {edu.Univercity ? ` - ${edu.Univercity}` : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="pr-otherDetails-splty">
              <span className="pr-splty-svg"></span>
              <div className="pr-splty-content">
                <span className="pr-splty-head">Board certification</span>
                <div className="pr-splty-desc-box">
                  {certification.map((cert, index) => (
                    <span key={index} className="pr-splty-desc">
                      {cert.certified}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="pr-otherDetails-splty">
              <span className="pr-splty-svg">
                <img src={Languages} alt="" />
              </span>
              <div className="pr-splty-content">
                <span className="pr-splty-head">Languages spoken</span>
                <div className="pr-splty-desc-box">
                  {[languages || []].map((lang) => {
                    return <span className="pr-splty-desc">{lang}</span>;
                  })}
                </div>
              </div>
            </div>
            <div className="pr-otherDetails-splty">
              <span className="pr-splty-svg">
                <img src={Gender} alt="" />
              </span>
              <div className="pr-splty-content">
                <span className="pr-splty-head">Provider's gender</span>
                <div className="pr-splty-desc-box">
                  <span className="pr-splty-desc">{capitalizeFirstLetter(gender)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pr-seperater-short"></div>
        <div className="pr-otherDetails-box">
          <div className="pr-insurance-head">Frequently asked questions</div>
          <div className="pr-otherDetails-inner-box">
            {faq.map((f, index) => (
              <div className="pr-freq-ques-box">
                <span className="pr-freq-ques">{f.qus}</span>
                <span className="pr-freq-ans">{f.ans}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailPage;
