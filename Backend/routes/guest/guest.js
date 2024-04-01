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
    const userQuery = 'SELECT * FROM user WHERE email = ?';
    db.query(userQuery, [email], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'user not found' });
        }

        // Generate a unique token
        const token = generateToken();

        bcrypt.hash(token, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // Store the token in the database
            const insertTokenQuery = 'UPDATE user SET password = ? WHERE email = ?';
            db.query(insertTokenQuery, [hashedPassword, email], (err) => {
                if (err) {
                    console.error('Error inserting token:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                // Send reset password email
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'inzamamyousaf11111@gmail.com',
                        pass: 'jmon otld jzhx xohs'
                    }
                });

                const mailOptions = {
                    from: 'inzamamyousaf11111@gmail.com',
                    to: email,
                    subject: 'Your temporary Password',
                    text: `This is your temporary password login with it. Then You can reset your password from account setting ${token}`
                };

                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    return res.status(200).json({ message: 'Reset password email sent successfully' });
                });
            });
        })
    });
});

router.post('/signup', (req, res) => {
    const { name, organization, guest_type, mobile_number, email, password, address_line1, address_line2, postcode, city, state, country, role } = req.body;
    const status = 'Not Approved';

    // Check if the email already exists in the database
    const emailCheckQuery = 'SELECT COUNT(*) AS count FROM user WHERE email = ?';
    db.query(emailCheckQuery, [email], (err, result) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const emailCount = result[0].count;

        if (emailCount > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Insert data into user table
            const userInsertQuery = 'INSERT INTO user (name, organization, guest_type, mobile_number, email, password, role, address_line_1, address_line_2, postcode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(userInsertQuery, [name, organization, guest_type, mobile_number, email, hashedPassword, role, address_line1, address_line2, postcode, city, state, country], (err, result) => {
                if (err) {
                    console.error('Error signing up User:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const userId = result.insertId;

                // Insert data into doctor table if the role is Doctor
                if (role.toLowerCase() === 'doctor') {
                    const doctorInsertQuery = 'INSERT INTO doctor (user_id, status) VALUES (?, ?)';
                    db.query(doctorInsertQuery, [userId, status], (err) => {
                        if (err) {
                            console.error('Error signing up doctor:', err);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }

                        return res.status(200).json({ message: 'doctor signed up successfully' });
                    });
                }
                // Insert data into radiologist table if the role is Radiologist
                else if (role.toLowerCase() === 'radiologist') {
                    const radiologistInsertQuery = 'INSERT INTO radiologist (user_id, status) VALUES (?, ?)';
                    db.query(radiologistInsertQuery, [userId, status], (err) => {
                        if (err) {
                            console.error('Error signing up radiologist:', err);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }

                        return res.status(200).json({ message: 'radiologist signed up successfully' });
                    });
                }
                // Handle other roles here
                else {
                    return res.status(400).json({ error: 'Invalid role' });
                }
            });
        });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const userQuery = 'SELECT * FROM user WHERE email = ?';
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

            // Check if the user's status is approved
            const statusQuery = user.role.toLowerCase() === 'doctor' ? 'SELECT status FROM doctor WHERE user_id = ?' :
                user.role.toLowerCase() === 'radiologist' ? 'SELECT status FROM radiologist WHERE user_id = ?' :
                    '';
            db.query(statusQuery, [user.user_id], (err, statusResult) => {
                if (err) {
                    console.error('Error retrieving user status:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (statusResult.length === 0 || statusResult[0].status !== 'Approved') {
                    return res.status(403).json({ error: 'user status not approved' });
                }

                // Create a JWT token with a secret key and 2 days expiry
                const secretKey = 'uniprecisionYHU';
                const token = jwt.sign({ userId: user.user_id, email: user.email, role: user.role }, secretKey, { expiresIn: '2d' });

                // Return the token and user role
                return res.status(200).json({ token, role: user.role, userid: user.user_id });
            });
        });
    });
});

router.get('/getUser/:id', (req, res) => {
    const userId = req.params.id;

    // Query the database to get the doctor ID based on the user ID
    const doctorIdQuery = 'SELECT * FROM user WHERE user_id = ?';
    db.query(doctorIdQuery, [userId], (err, result) => {
        if (err) {
            console.error('Error retrieving doctor ID:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const user = result[0];
        return res.status(200).json({ user: user });
    });
});


router.put('/update/:userId', (req, res) => {
    const userId = req.params.userId;
    const { name, organization, guest_type, mobile_number, email, address_line1, address_line2, postcode, city, state, country } = req.body;

    const userUpdateQuery = `
            UPDATE user 
            SET name = ?, organization = ?, guest_type = ?, mobile_number = ?, email = ?, address_line_1 = ?, address_line_2 = ?, postcode = ?, city = ?, state = ?, country = ?
            WHERE user_id = ?
        `;
    db.query(userUpdateQuery, [name, organization, guest_type, mobile_number, email, address_line1, address_line2, postcode, city, state, country, userId], (err, result) => {
        if (err) {
            console.error('Error updating User:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'user not found' });
        }

        return res.status(200).json({ message: 'user updated successfully' });
    });
});


router.put('/update-password/:userId', (req, res) => {
    const userId = req.params.userId;
    const { password } = req.body;

    let hashedPassword = password;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        hashedPassword = hash;

        const userUpdateQuery = `
            UPDATE user 
            SET  password = ?
            WHERE user_id = ?
        `;
        db.query(userUpdateQuery, [hashedPassword, userId], (err, result) => {
            if (err) {
                console.error('Error updating User:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'user not found' });
            }

            return res.status(200).json({ message: 'Password updated successfully' });
        });
    })
});



module.exports = router;
