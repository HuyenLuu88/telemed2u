import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
export const calendarStyles = makeStyles(() => ({
  //define CSS for different date types
  notInThisMonthDayPaper: {
    width: "35px",
    // padding: 0,
    height: "35px",
    // backgroundColor: "#eeeeee",
    margin: "0 2px",
    boxShadow: "none",
    borderRadius: 4,
    fontSize: '15px',
    padding: "1px",
    color: "#A2B7CD",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalDayPaper: {
    width: "35px",
    // padding: 0,
    height: "35px",
    margin: "0 2px",
    // backgroundColor: "#eeeeee",
    boxShadow: "none",
    borderRadius: 4,
    fontSize: '15px',
    padding: "1px",
    color: "#A2B7CD",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDayPaper: {
    width: "31px",
    height: "31px",
    // backgroundColor: "#f9fbe7",
    margin: "0 2px",
    boxShadow: "none",
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: "2px",
    fontSize: '15px',
    borderColor: "#4C8080",
    padding: "1px",
    cursor: "pointer",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // color: "#A2B7CD",
  },
  todayPaper: {
    width: "35px",
    // padding: 0,
    height: "35px",
    // backgroundColor: "#eeeeee",
    margin: "0 2px",
    boxShadow: "none",
    fontSize: '15px',
    borderRadius: 4,
    padding: "1px",
    color: " lightgrey",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookedDayPaper: {
    width: "35px",
    // padding: 0,
    height: "35px",
    backgroundColor: "#4C8080",
    margin: "0 2px",
    boxShadow: "none",
    fontSize: '15px',
    borderRadius: 4,
    padding: "1px",
    cursor: "pointer",
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentAppointmentDayPaper: {
    width: "35px",
    // padding: 0,
    height: "35px",
    margin: "0 2px",
    // backgroundColor: "#eeeeee",
    boxShadow: "none",
    borderRadius: 4,
    fontSize: '15px',
    padding: "1px",
    color: "#FFBC42",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const materialTheme = createMuiTheme({
  typography: {
    fontFamily: 'Lato'
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: { backgroundColor: "#8bc34a" },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "white",
        marginBottom: 16
      },
      transitionContainer: {
        order: 1,
      },
      iconButton: {
        order: 2,
        padding: 5,
        marginRight: 12
      }
    },
    MuiTypography: {
      alignCenter: {
        textAlign: 'left',
        marginLeft: 25
      }
    }
  },
});
