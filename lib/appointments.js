const Customers = require('./customers');
const { formattedDate } = require('./utils/dateFormat');
const { appointmentData } = require('./utils/appointmentData');

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
    console.log(customer);
    const appointments = res.appointments.filter((appointment) => {
      return appointment.customer.key === customer[0]?.key;
    });

    return appointments;
  }

  async createAppointment(appointment) {
    const data = appointmentData(appointment)

    const res = await this.client.fetchData(
      '/api/v2/bookingapi/appointment/create',
      {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res;
  }

  async updateAppointment(appointment) {
    const data = appointmentData(appointment)

    const res = await this.client.fetchData(
      `/api/v2/bookingapi/appointments/${appointment.appointment_key}`,
      {
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res;
  }

  async deleteAppointment(appointment_key) {
    const res = await this.client.fetchData(
      `/api/v2/bookingapi/appointments/${appointment_key}`,
      {
        method: 'DELETE',
      }
    );

    return res;
  }
}

module.exports = Appointments;
