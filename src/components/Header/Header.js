import React from "react";
import "./Header.scss";
import { Button } from "@material-ui/core";
import  logo  from "../../assests/Logos/tm2u_logo_150.png";

const Header = ({handleClick}) => {
  return (
    <div className="header-container">
      <div className="navTextContainer">
        <p>
          {" "}
          Everyone is facing new challenges.
          <span id="sp">Our doctors are here to help.</span>
        </p>
      </div>
      {/* <header> */}
      <nav className="navbar">
        <ul className="ulContainer">
          <li>
            <a id="auto-header-what-we-treat" href="/">What We Treat</a>
          </li>
          <li>
            <a id="auto-header-about-us" href="/">About Us</a>
          </li>
          <li>
            <a id="auto-header-meet-our-doc" href="/">Meet Our Doctors</a>
          </li>
          <li>
            <img src={logo} alt="TeleMed2U" ></img>
          </li>
          <li>
            <a id="auto-header-organization" href="/">Organization</a>
          </li>
          <li>
            <a id="auto-header-providers" href="/">Providers</a>
          </li>
          <li>
            <Button id="auto-header-book-apt-btn" variant="contained" className="btn-primary" onClick={handleClick}>
              Book Appointment
            </Button>
          </li>
        </ul>
      </nav>
      {/* </header> */}
    </div>
  );
};
export default Header;
