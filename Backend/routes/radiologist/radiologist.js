// routes/radiologist/radiologist.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// Radiologist Signup API
router.post('/signup', (req, res) => {
    const { name, organisation, mobile_number, email, password, address_line1, address_line2, postcode, city, state, country } = req.body;
    const role = 'Radiologist';
    const status = 'Not Approved';

    // Insert data into Users table
    const userInsertQuery = 'INSERT INTO Users (name, organisation, mobile_number, email, password, role, address_line1, address_line2, postcode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(userInsertQuery, [name, organisation, mobile_number, email, password, role, address_line1, address_line2, postcode, city, state, country], (err, result) => {
        if (err) {
            console.error('Error signing up radiologist:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const userId = result.insertId;

        // Insert data into Radiologist table
        const radiologistInsertQuery = 'INSERT INTO Radiologist (user_id, status) VALUES (?, ?)';
        db.query(radiologistInsertQuery, [userId, status], (err, result) => {
            if (err) {
                console.error('Error signing up radiologist:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'Radiologist signed up successfully' });
        });
    });
});

// Radiologist Login API
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password match in the Users table
    const loginQuery = 'SELECT * FROM Users WHERE email = ? AND password = ? AND role = ?';
    db.query(loginQuery, [email, password, 'Radiologist'], (err, results) => {
        if (err) {
            console.error('Error logging in radiologist:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Return the user data if login is successful
        const user = results[0];
        return res.status(200).json({ user });
    });
});

module.exports = router;
