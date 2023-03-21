import moment from "moment";

const convertTimeToUTC = (time) => {
  const date = new Date(time);
  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return utcDate.toISOString().slice(0, 16);
};
const convertTimeToDMY = (time) => {
  return moment(time).format("Do MMMM YYYY, h:mm a");
};
const countTimeAgo = (time) => {
  return moment(`${convertTimeToDMY(time)}`,"Do MMMM YYYY,h:mm a").fromNow();
}
export { convertTimeToUTC, convertTimeToDMY, countTimeAgo };
