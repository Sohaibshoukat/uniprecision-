const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate a random token
const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

// Send reset password email
router.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    // Check if the user exists in the database
    const userQuery = 'SELECT * FROM Users WHERE email = ?';
    db.query(userQuery, [email], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a unique token
        const token = generateToken();

        // Store the token in the database
        const insertTokenQuery = 'INSERT INTO PasswordResetTokens (email, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))';
        db.query(insertTokenQuery, [email, token], (err) => {
            if (err) {
                console.error('Error inserting token:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Send reset password email
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'inzamamyousaf11111@gmail.com',
                    pass: ''
                }
            });

            const mailOptions = {
                from: 'inzamamyousaf11111@gmail.com',
                to: email,
                subject: 'Reset Your Password',
                text: `To reset your password, click on the following link: http://localhost:3000/reset-password?token=${token}`
            };

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                return res.status(200).json({ message: 'Reset password email sent successfully' });
            });
        });
    });
});

module.exports = router;
