const { timeSlotData, timeSlotFormattedDate } = require('./utils/timeSlotData');

class TimeSlot {
  constructor(client) {
    this.client = client;
  }

  async get_slots_available(data) {
    const d = timeSlotFormattedDate(data.selected_date);
    const body = timeSlotData({
      ...data,
      selected_date: d,
    });

    const res = await this.client.fetchData(
      `/api/v2/bookingapi/appointments/slots`,
      {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res;
  }
}

module.exports = TimeSlot;
