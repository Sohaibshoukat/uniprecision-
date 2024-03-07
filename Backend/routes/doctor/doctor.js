// routes/doctor/doctor.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// Doctor Signup API
router.post('/signup', (req, res) => {
    const { name, organisation, mobile_number, email, password, address_line1, address_line2, postcode, city, state, country } = req.body;
    const role = 'Doctor'; // Assuming doctor role
    const status = 'Not Approved'; // Initial status

    // Insert data into Users table
    const userInsertQuery = 'INSERT INTO Users (name, organisation, mobile_number, email, password, role, address_line1, address_line2, postcode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(userInsertQuery, [name, organisation, mobile_number, email, password, role, address_line1, address_line2, postcode, city, state, country], (err, result) => {
        if (err) {
            console.error('Error signing up doctor:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const userId = result.insertId;

        // Insert data into Doctor table
        const doctorInsertQuery = 'INSERT INTO Doctor (user_id, status) VALUES (?, ?)';
        db.query(doctorInsertQuery, [userId, status], (err, result) => {
            if (err) {
                console.error('Error signing up doctor:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'Doctor signed up successfully' });
        });
    });
});

module.exports = router;
