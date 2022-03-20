import buildDate from "./../utils/buildDate";
import dates from "./../config/dates";
const totalDates = buildDate(dates.startDate, dates.endDate);
export default JSON.stringify(totalDates);
