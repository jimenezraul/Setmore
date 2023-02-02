# Setmore SDK

This is a Javascript SDK for the Setmore API. Setmore is a free online appointment scheduling software for small businesses. It allows you to manage your appointments, staff, services, and customers. This SDK allows you to easily integrate Setmore into your Node.js application.

## Table of Contents

- [Setmore SDK](#setmore-sdk)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Usage](#usage)
    - [Initialize Setmore](#initialize-setmore)
    - [STAFF](#staff)
    - [CATEGORIES](#categories)
    - [SERVICES](#services)
    - [CUSTOMERS](#customers)
    - [APPOINTMENTS](#appointments)
    - [TIME SLOTS](#time-slots)
  - [Questions](#questions)
  - [My Portfolio](#my-portfolio)

## Installation

```bash
npm install setmore-sdk
```

## Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```bash
SETMORE_API_KEY=your-api-key
```

## Usage

### Initialize Setmore

```javascript
// Initialize Setmore
const { Setmore, formatDateToSetmore } = require('setmore-sdk');

const setmore = new Setmore(process.env.SETMORE_API_KEY);
```

### STAFF

```javascript
// Get Staff
setmore.staff.getStaff().then((staff) => {
  console.log(staff);
});
```

### CATEGORIES

```javascript
// Get Categories
setmore.categories.getCategories().then((categories) => {
  console.log(categories);
});
```

### SERVICES

```javascript
// Get Services
setmore.services.getServices().then((services) => {
  console.log(services);
});

// Get Services with Categories
setmore.services.getServicesWithCategories().then((services) => {
  console.log(services);
});
```

### CUSTOMERS

```javascript
// Get Customer
setmore.customers
  .getCustomer({
    given_name: 'John',
    email: 'john@example.com',
  })
  .then((customer) => {
    console.log(customer);
  });

// Create Customer
setmore.customers
  .createCustomer({
    given_name: 'John',
    family_name: 'Doe',
    email: 'johndoe@example.com',
    picture: 'https://example.com/photo.jpg',
    phone: '555-555-5555',
  })
  .then((customer) => {
    console.log(customer);
  });
```

### APPOINTMENTS

```javascript
// Get Appointments
const user = {
  given_name: 'John',
  email: 'john@example.com',
};

const months = 3;

// Months is optional and defaults to 2
// You can just pass in the user object
setmore.appointments.getAppointments(user, months).then((appointments) => {
  console.log(appointments);
});

// Create Appointment
const { formatDateToSetmore } = require('setmore-sdk');

const start = new Date('2023-02-09T15:30Z');

const [startDate, endDate] = formatDateToSetmore(start);

const appointment = {
  staff_key: staff.staffs[0].key,
  service_key: services[1].serviceIdList[1],
  customer_key: customer[0].key,
  start_time: startDate,
  end_time: endDate,
  cost: 30,
};

setmore.appointments.createAppointment(appointment).then((res) => {
  console.log(res);
});

// Update Appointment
const { formatDateToSetmore } = require('setmore-sdk');

const start = new Date('2023-02-09T15:30Z');

const [startDate, endDate] = formatDateToSetmore(start);

const appointment = {
  appointment_key: '<appointment key>',
  staff_key: '<staff key>',
  service_key: '<service key>',
  customer_key: '<customer key>',
  start_time: startDate,
  end_time: endDate,
  cost: 30,
};

setmore.appointments.createAppointment(appointment).then((res) => {
  console.log(res);
});

// Delete Appointment
setmore.appointments.deleteAppointment('<appointment key>').then((res) => {
  console.log(res);
});
```

### TIME SLOTS

```javascript
// Get Appointment Slots
setmore.appointments
  .getAppointmentSlots({
    staff_key: '<staff key>',
    service_key: '<service key>',
    selected_date: 'DD/MM/YYYY',
    slot_limit: 30,
  })
  .then((slots) => {
    console.log(slots);
  });
```

## Questions

If you have any questions, please feel free to reach out to me by email or LinkedIn.  
[Email](mailto:jimenezraul1981@gmail.com)  
[LinkedIn](https://www.linkedin.com/in/raul-jimenez-778b2a196/)

## My Portfolio

[https://raulwebdev.com](https://raulwebdev.com)
