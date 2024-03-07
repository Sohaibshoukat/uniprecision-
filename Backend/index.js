const express = require('express');
const app = express();
const db = require("./config/db");

app.use(express.json());

// Import routes
const adminRoutes = require('./routes/admin/admin');
const doctorRoutes = require('./routes/doctor/doctor');
const guestRoutes = require('./routes/guest/guest');
const radiologistRoutes = require('./routes/radiologist/radiologist');

// Define routes
app.use('/admin', adminRoutes);
app.use('/doctor', doctorRoutes);
app.use('/guest', guestRoutes);
app.use('/radiologist', radiologistRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
