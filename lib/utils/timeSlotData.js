function timeSlotData(timeSlot) {
    const data = JSON.stringify({
      staff_key: timeSlot.staff_key,
      service_key: timeSlot.service_key,
      selected_date: timeSlot.selected_date,
      slot_limit: timeSlot.slot_limit,
    });
  
    return data;
  }
  
  function timeSlotFormattedDate(date) {
    date = date.split('/');
    if (date[0] < 10) {
      date[0] = '0' + date[0];
    }
    if (date[1] < 10) {
      date[1] = '0' + date[1];
    }
    return `${date[1]}/${date[0]}/${date[2]}`;
  }

module.exports = {
    timeSlotData,
    timeSlotFormattedDate
};