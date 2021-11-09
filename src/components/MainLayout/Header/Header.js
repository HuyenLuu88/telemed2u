import React, { useState } from 'react'
import { Menu, MenuItem, Button } from "@material-ui/core"
import { userMenus } from '../../../constants/menu'
import "./Header.scss";
import  logo  from "../../../assests/Logos/tm2u_logo_150.png";
import dummyProfileImg from "../../../assests/images/erika_provider.png"
import dropdownArrow from "../../../assests/images/icon_dropdown.svg"

const Header = ({ onLogout }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

	const handleFunc = {
		onLogoutClick: onLogout
	}

	return (
		<div className="dashboard-header">
			<img className="dashboard-logo" src={logo} alt="TeleMed2U" ></img>
			<div id="auto-header-profile-drp" className="user-menu-wrapper" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
					<img className="user-img" src={dummyProfileImg}/>
					<span className="user-name">John Doe</span>
					<img className="dropdown-img" src={dropdownArrow} />
				</div>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center"
					}}
					PaperProps={{  
						style: {  
							width: 239,  
						}
					}}
					getContentAnchorEl={null}
				>
						{userMenus.map((menu, index) => (
							<MenuItem id={`auto-header-${menu.name}`} key={index} onClick={handleFunc[menu.action]}>
								<img className="user-menu-icon" src={menu.icon} />
								{menu.name}
							</MenuItem>
						))}
				</Menu>
		</div>
	)
}

export default Header