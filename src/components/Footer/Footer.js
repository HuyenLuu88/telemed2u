import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="inner-container">
        <div className="items">
          <div style={{ fontWeight: "bold", fontSize: 22,paddingBottom: 10 }}>TELEMED2U</div>
          <div style={{ width: 250 }}>
            <p>Phone: (855) 446-TM2U (8628)</p>

            <p>3400 Douglas Blvd., Suite 225 Roseville, CA 95661</p>
          </div>
        </div>
        <div className="items">
          <div style={{ fontWeight: "bold", fontSize: 22,paddingBottom: 10 }}>About Us</div>
          <div>
            <p id="auto-footer-wwt">What we Treat</p>

            <p id="auto-footer-meet-doc">Meet Our Doctors</p>

            <p id="auto-footer-our-team">Our Team</p>

            <p id="auto-footer-career">Careers</p>

            <p id="auto-footer-contact-us">Contact Us</p>
          </div>
        </div>
        <div className="items">
          <div style={{ fontWeight: "bold", fontSize: 22,paddingBottom: 10 }}>Providers</div>
          <div>
            <p id="auto-footer-provider-login">Provider Login</p>

            <p id="auto-footer-join-team">Join Our Team</p>

            <p id="auto-footer-platform-login">eConsult Platform Login</p>
          </div>
        </div>
        <div className="items">
          <div style={{ fontWeight: "bold", fontSize: 22,paddingBottom: 10 }}>Health Systems</div>
          <div>
            <p id="auto-footer-platform-login">eConsult Platform</p>

            <p id="auto-footer-correct-medicine">Correctional Medicine</p>

            <p id="auto-footer-health-plans">Health Plans</p>

            <p id="auto-footer-impatient-med">Inpatient Medicine</p>

            <p id="auto-footer-anit-stewardship">Antimicrobial Stewardship</p>

            <p id="auto-footer-out-med">Outpatient Medicine</p>
          </div>
        </div>
        <div className="items">
          <div style={{ fontWeight: "bold", fontSize: 22,paddingBottom: 10 }}>Support</div>
          <div>
            <p id="auto-footer-faq">FAQs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
