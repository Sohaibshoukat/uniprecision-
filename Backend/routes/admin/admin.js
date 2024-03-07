// routes/admin/admin.js

// Import required modules
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// Admin Login API
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password match in the Users table
    const loginQuery = 'SELECT * FROM Users WHERE email = ? AND password = ? AND role = ?';
    db.query(loginQuery, [email, password, 'Admin'], (err, results) => {
        if (err) {
            console.error('Error logging in admin:', err);
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
