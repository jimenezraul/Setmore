const { formattedDate } = require('./utils/dateFormat');

class Appointments {
  constructor(client) {
    this.client = client;
  }

  async getAppointments(user) {
    const today = new Date();
    const twoMonthsFromToday = new Date();
    twoMonthsFromToday.setMonth(today.getMonth() + 2);

    const start_time_formatted = formattedDate(today);
    const end_time_formatted = formattedDate(twoMonthsFromToday);

    const appointments = await this.client.fetchData(
      `/api/v2/bookingapi/appointments?startDate=${start_time_formatted}&endDate=${end_time_formatted}&customerDetails=true`
    );
      
    return appointments;
  }

  async createAppointment(userId, appointment) {
    return this.client.fetchData(
      `/api/v2/bookingapi/appointments?user_id=${userId}`,
      {
        method: 'POST',
        body: JSON.stringify(appointment),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  async updateAppointment(userId, appointmentId, appointment) {
    return this.client.fetchData(
      `/api/v2/bookingapi/appointments/${appointmentId}?user_id=${userId}`,
      {
        method: 'PUT',
        body: JSON.stringify(appointment),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  async deleteAppointment(userId, appointmentId) {
    return this.client.fetchData(
      `/api/v2/bookingapi/appointments/${appointmentId}?user_id=${userId}`,
      {
        method: 'DELETE',
      }
    );
  }
}

module.exports = Appointments;
