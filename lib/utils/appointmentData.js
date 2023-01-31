function appointmentData(appointment) {
  const data = JSON.stringify({
    staff_key: appointment.staff_key,
    service_key: appointment.service_key,
    customer_key: appointment.customer_key,
    start_time: appointment.start_time,
    end_time: appointment.end_time,
    cost: appointment.cost,
  });

  return data;
}

module.exports = {
  appointmentData,
};
