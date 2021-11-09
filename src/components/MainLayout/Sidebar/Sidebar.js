import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { userRoles } from "../../../constants";
import { menu } from "../../../constants/menu";
import { setActiveMenu } from "../../../store/actions/menu";

const currentUser = userRoles.PATIENT;

const Sidebar = () => {
  const activeMenu = useSelector (state => state.menu.activeMenu)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const filteredActiveMenu = menu.find(m => m.path === location.pathname)
    if (filteredActiveMenu) {
      dispatch(setActiveMenu(filteredActiveMenu.name))
    } 
  }, [location.pathname])

  return (
    <div className="dashboard-sidebar">
      {menu
        .filter((m) => m.role === currentUser)
        .map((m) => (
          <Link
            className="nav-wrap"
            key={m.name}
            to={m.path}
            id={`auto-menu-${m.name}`}
          >
		        <img src={activeMenu === m.name ? m.activeIcon : m.icon} alt=""></img>
            <span className={`menu ${activeMenu === m.name ? 'active-menu' : ''}`}>
              {m.name}
            </span>
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
