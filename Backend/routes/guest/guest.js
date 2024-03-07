const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

router.post('/signup', (req, res) => {
  const { name, organisation, mobile_number, email, password, address_line1, address_line2, postcode, city, state, country, role } = req.body;
  const status = 'Not Approved';

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Insert data into Users table
      const userInsertQuery = 'INSERT INTO Users (name, organisation, mobile_number, email, password, role, address_line1, address_line2, postcode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(userInsertQuery, [name, organisation, mobile_number, email, hashedPassword, role, address_line1, address_line2, postcode, city, state, country], (err, result) => {
          if (err) {
              console.error('Error signing up User:', err);
              return res.status(500).json({ error: 'Internal Server Error' });
          }

          const userId = result.insertId;

          // Insert data into Doctor table if the role is Doctor
          if (role === 'Doctor') {
              const doctorInsertQuery = 'INSERT INTO Doctor (user_id, status) VALUES (?, ?)';
              db.query(doctorInsertQuery, [userId, status], (err) => {
                  if (err) {
                      console.error('Error signing up doctor:', err);
                      return res.status(500).json({ error: 'Internal Server Error' });
                  }

                  return res.status(200).json({ message: 'Doctor signed up successfully' });
              });
          }
          // Insert data into Radiologist table if the role is Radiologist
          else if (role === 'Radiologist') {
              const radiologistInsertQuery = 'INSERT INTO Radiologist (user_id, status) VALUES (?, ?)';
              db.query(radiologistInsertQuery, [userId, status], (err) => {
                  if (err) {
                      console.error('Error signing up radiologist:', err);
                      return res.status(500).json({ error: 'Internal Server Error' });
                  }

                  return res.status(200).json({ message: 'Radiologist signed up successfully' });
              });
          }
          // Handle other roles here
          else {
              return res.status(400).json({ error: 'Invalid role' });
          }
      });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const userQuery = 'SELECT * FROM Users WHERE email = ?';
  db.query(userQuery, [email], (err, results) => {
      if (err) {
          console.error('Error retrieving user:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];

      // Compare the hashed password
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
          if (err) {
              console.error('Error comparing passwords:', err);
              return res.status(500).json({ error: 'Internal Server Error' });
          }

          if (!isValidPassword) {
              return res.status(401).json({ error: 'Invalid email or password' });
          }

          // Create a JWT token
          const token = jwt.sign({ userId: user.user_id, email: user.email, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

          // Return the token and user role
          return res.status(200).json({ token, role: user.role });
      });
  });
});



module.exports = router;
