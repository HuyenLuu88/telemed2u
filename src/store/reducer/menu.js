import { SET_ACTIVE_MENU } from "../actionType"
import { MENUS } from "../../constants/menu"

const initialState = {
  activeMenu: MENUS.APPOINTMENTS
}

const menu = (state = initialState, action) => {
  switch(action.type) {
    case SET_ACTIVE_MENU: 
      return {
        ...state,
        activeMenu: action.activeMenu
      }
    default:
      return state
  }
}

export default menu;