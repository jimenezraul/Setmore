const Customers = require('./customers');
const { formattedDate } = require('./utils/dateFormat');

class Appointments extends Customers {
  constructor(client) {
    super(client);
    this.client = client;
  }

  async getAppointments(user, months = 2) {
    const today = new Date();
    const futureFromToday = new Date();
    futureFromToday.setMonth(today.getMonth() + months);

    const start_time_formatted = formattedDate(today);
    const end_time_formatted = formattedDate(futureFromToday);

    const res = await this.client.fetchData(
      `/api/v2/bookingapi/appointments?startDate=${start_time_formatted}&endDate=${end_time_formatted}&customerDetails=true`
    );

      const customer = await this.getCustomer(user);
      console.log(customer)
    const appointments = res.appointments.filter((appointment) => {
      return appointment.customer.key === customer[0]?.key;
    });

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
