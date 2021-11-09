import DateFnsUtils from "@date-io/date-fns";

class OverrideDateFnsUtils extends DateFnsUtils {
    getWeekdays() {
        return ["S", "M", "T", "W", "T", "F", "S"]
    }
}

export default OverrideDateFnsUtils