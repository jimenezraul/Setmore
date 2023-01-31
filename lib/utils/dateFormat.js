function formattedDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}

function formatDateTime(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minute = d.getMinutes(),
    dayOfWeekName = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][d.getDay()],
    monthName = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ][d.getMonth()];

  (hourFormatted = hour % 12 || 12),
    (minuteFormatted = minute < 10 ? '0' + minute : minute),
    (morning = hour < 12 ? 'AM' : 'PM');

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return {
    date: `${dayOfWeekName} ${monthName} ${day}, ${year}`,
    time: [hourFormatted, minuteFormatted].join(':') + ` ${morning}`,
  };
}

function formatDateToSetmore(date) {
  let d = new Date(date);
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let hour = d.getHours();
  let minute = d.getMinutes();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  let newDate = `${year}-${month}-${day}T${hour}:${minute}:00.000Z`;
  let start_time = new Date(newDate);
  start_time = start_time.toISOString();
  let end_time = new Date(start_time);
  // add 30 minutes to the end time
  end_time.setMinutes(end_time.getMinutes() + 30);
  end_time = end_time.toISOString();
  return [start_time, end_time];
}

module.exports = {
  formattedDate,
  formatDateTime,
  formatDateToSetmore
};
