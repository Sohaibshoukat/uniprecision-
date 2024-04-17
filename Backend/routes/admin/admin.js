const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const transporter = nodemailer.createTransport({
    host: "mail.uniprecision.com.my",
    port: 465,
    secure: true,
    auth: {
        user: "uniprecisionsupport@uniprecision.com.my",
        pass: "uniprecision1234",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendEmailApprove = async (email, name) => {
    try {
        const mailOptions = {
            from: "uniprecisionsupport@uniprecision.com.my",
            to: email,
            subject: "Congratulation! Your Account has been Approved",
            text: `Hi ${name},
  Your new account request has been approved.
  Please login via https://telerad.uniprecision.com.my/login 
  Thank you!
  If you have any urgent enquiry, please do not hesitate to contact our team directly at admin@uniprecision.com.my or +6010-3837828.
  
  
  This is an automated email. Do not reply to this email.`,
        };
        await transporter.sendMail(mailOptions);
        return { status: true };
    } catch (error) {
        return { status: "Failed", message: error.message };
    }
};



router.get('/allTransactions', (req, res) => {

    // Query transactions for the specified doctor
    const transactionsQuery = `
    SELECT t.*, u.name, u.email
    FROM transactions t
    INNER JOIN doctor d ON t.doctor_id = d.doctor_id
    INNER JOIN user u ON d.user_id = u.user_id
    ORDER BY t.transaction_id DESC
    `;
    db.query(transactionsQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving transactions:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if there are no transactions for the specified doctor
        if (results.length === 0) {
            return res.status(404).json({ error: 'No transactions found for the specified doctor' });
        }

        // Return transactions
        return res.status(200).json({ transactions: results });
    });
});

router.get('/getAllRadiologists', (req, res) => {
    // Query to fetch all radiologists with their names
    const radiologistsQuery = 'SELECT r.*, u.name AS radiologist_name FROM radiologist r INNER JOIN user u ON r.user_id = u.user_id Where status= "Approved" ORDER BY r.radiologist_id DESC';

    db.query(radiologistsQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving radiologists:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Return the list of radiologists with their names
        return res.status(200).json({ radiologists: results });
    });
});

router.get('/getPendingReports', (req, res) => {
    // Query to fetch all pending reports
    const pendingReportsQuery = `    
    SELECT r.*, c.price, c.category_name, o.*
    FROM report r
    INNER JOIN orders o ON r.order_id = o.order_id
    INNER JOIN category c ON o.category_id = c.category_id
    WHERE report_status = 'Pending'
    ORDER BY r.report_id DESC
    `;


    db.query(pendingReportsQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving pending reports:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Return the list of pending reports
        return res.status(200).json({ pending_reports: results });
    });
});

router.post('/assignReport', (req, res) => {
    const { report_id, radiologist_id } = req.body;

    // Update data in the report table
    const updateReportQuery = 'UPDATE report SET radiologist_id = ?, report_status = "Assigned" WHERE report_id = ?';
    db.query(updateReportQuery, [radiologist_id, report_id], (err, result) => {
        if (err) {
            console.error('Error updating report:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'report not found' });
        }

        return res.status(200).json({ message: 'report assigned successfully' });
    });
});

router.post('/adddoctor', (req, res) => {
    const { name, organization, mobile_number, email, password, address_line_1, address_line_2, postcode, city, state, country } = req.body;
    const role = 'Doctor';
    const status = 'Approved';

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
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // Insert data into user table
            const userInsertQuery = 'INSERT INTO user (name, organization, mobile_number, email, password, role, address_line_1, address_line_2, postcode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(userInsertQuery, [name, organization, mobile_number, email, hashedPassword, role, address_line_1, address_line_2, postcode, city, state, country], (err, result) => {
                if (err) {
                    console.error('Error signing up doctor:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const userId = result.insertId;

                // Insert data into doctor table
                const doctorInsertQuery = 'INSERT INTO doctor (user_id, status) VALUES (?, ?)';
                db.query(doctorInsertQuery, [userId, status], (err, result) => {
                    if (err) {
                        console.error('Error signing up doctor:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    return res.status(200).json({ message: 'doctor signed up successfully' });
                });
            });
        })
    })
});

router.post('/addradiologist', (req, res) => {
    const { name, organization, mobile_number, email, password, address_line_1, address_line_2, postcode, city, state, country } = req.body;
    const role = 'Radiologist';
    const status = 'Approved';

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
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // Insert data into user table
            const userInsertQuery = 'INSERT INTO user (name, organization, mobile_number, email, password, role, address_line_1, address_line_2, postcode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(userInsertQuery, [name, organization, mobile_number, email, hashedPassword, role, address_line_1, address_line_2, postcode, city, state, country], (err, result) => {
                if (err) {
                    console.error('Error signing up radiologist:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const userId = result.insertId;

                // Insert data into radiologist table
                const radiologistInsertQuery = 'INSERT INTO radiologist (user_id, status) VALUES (?, ?)';
                db.query(radiologistInsertQuery, [userId, status], (err, result) => {
                    if (err) {
                        console.error('Error signing up radiologist:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    return res.status(200).json({ message: 'radiologist signed up successfully' });
                });
            });
        })
    })
});

router.post('/updateUserStatus', (req, res) => {
    const { user_id } = req.body;

    // Query to get the role of the user
    const roleQuery = 'SELECT * FROM user WHERE user_id = ?';
    db.query(roleQuery, [user_id], (err, results) => {
        if (err) {
            console.error('Error retrieving user role:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'user not found' });
        }

        const role = results[0].role.toLowerCase();
        const email = results[0].email
        const name = results[0].name

        // Update status based on the role
        let updateQuery = '';
        switch (role) {
            case 'radiologist':
                updateQuery = 'UPDATE radiologist SET status = "Approved" WHERE user_id = ?';
                break;
            case 'doctor':
                updateQuery = 'UPDATE doctor SET status = "Approved" WHERE user_id = ?';
                break;
            // Add more cases for other roles if needed

            default:
                return res.status(400).json({ error: 'Invalid role' });
        }

        // Execute the update query
        db.query(updateQuery, [user_id], async (err, result) => {
            if (err) {
                console.error('Error updating user status:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'user not found in respective table' });
            }

            try {
                const mailOptions = {
                    from: "uniprecisionsupport@uniprecision.com.my",
                    to: email,
                    subject: "Congratulation! Your Account has been Approved",
                    text: `Hi ${name},
Your new account request has been approved.
Please login via https://telerad.uniprecision.com.my/login 
Thank you!
If you have any urgent enquiry, please do not hesitate to contact our team directly at admin@uniprecision.com.my or +6010-3837828.
          
          
This is an automated email. Do not reply to this email.`,
                };
                await transporter.sendMail(mailOptions);
                return res.json({ success: true });
            } catch (error) {
                return res.json({ success: false,message:error.message });
            }
        });
    });
});

router.get('/getAllUsers', (req, res) => {
    // Query to retrieve all users
    const getUsersQuery = 'SELECT * FROM user ORDER BY user_id DESC';

    // Execute the query
    db.query(getUsersQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // If no users found
        if (results.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // Return the users
        return res.status(200).json({ users: results });
    });
});

router.get('/getAllApprovedDoctors', (req, res) => {
    // Query to retrieve all approved doctors
    const getApprovedDoctorsQuery = `
        SELECT u.*
        FROM user u
        INNER JOIN doctor d ON u.user_id = d.user_id
        WHERE u.role = 'Doctor' AND d.status = 'Approved'
        ORDER BY u.user_id DESC
    `;

    // Execute the query
    db.query(getApprovedDoctorsQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving approved doctors:', err);
            return res.status(500).json({ error: err });
        }

        // Return the approved doctors
        return res.status(200).json({ approvedDoctors: results });
    });
});

router.get('/getAllApprovedRadiologist', (req, res) => {
    // Query to retrieve all approved doctors
    const getApprovedDoctorsQuery = `
        SELECT u.*
        FROM user u
        INNER JOIN radiologist r ON u.user_id = r.user_id
        WHERE u.role = 'Radiologist' AND r.status = 'Approved'
        ORDER BY u.user_id DESC
    `;

    // Execute the query
    db.query(getApprovedDoctorsQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving approved doctors:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }


        // Return the approved doctors
        return res.status(200).json({ approvedRadio: results });
    });
});


router.get('/getNewDoctors', (req, res) => {
    // Query to retrieve all approved doctors
    const getApprovedDoctorsQuery = `
        SELECT u.*
        FROM user u
        INNER JOIN doctor d ON u.user_id = d.user_id
        WHERE u.role = 'Doctor' AND d.status = 'Not Approved'
        ORDER BY u.user_id DESC
    `;

    // Execute the query
    db.query(getApprovedDoctorsQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving approved doctors:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Return the approved doctors
        return res.status(200).json({ approvedDoctors: results });
    });
});

router.get('/getnewRadiologist', (req, res) => {
    // Query to retrieve all approved doctors
    const getApprovedDoctorsQuery = `
        SELECT u.*
        FROM user u
        INNER JOIN radiologist r ON u.user_id = r.user_id
        WHERE u.role = 'Radiologist' AND r.status = 'Not Approved'
        ORDER BY u.user_id DESC
    `;

    // Execute the query
    db.query(getApprovedDoctorsQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving approved doctors:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Return the approved doctors
        return res.status(200).json({ approvedRadio: results });
    });
});


router.get('/getAllCategories', (req, res) => {
    // Query to retrieve all users
    const getUsersQuery = 'SELECT * FROM category WHERE status = "Active"';

    // Execute the query
    db.query(getUsersQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // If no users found
        if (results.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // Return the users
        return res.status(200).json({ users: results });
    });
});

router.post('/addCateogry', (req, res) => {
    const { price, unit, category_name } = req.body;

    // Insert data into category table
    const addCategoryQuery = 'INSERT INTO category (price, unit, category_name) VALUES (?, ?, ?)';
    db.query(addCategoryQuery, [price, unit, category_name], (err, result) => {
        if (err) {
            console.error('Error adding category:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(200).json({ message: 'category added successfully' });
    });
});

router.post('/editCategory/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const { price, unit, category_name } = req.body;

    // Update data in category table
    const editCategoryQuery = 'UPDATE category SET price = ?, unit = ?, category_name = ? WHERE category_id = ?';
    db.query(editCategoryQuery, [price, unit, category_name, categoryId], (err, result) => {
        if (err) {
            console.error('Error editing category:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'category not found' });
        }

        return res.status(200).json({ message: 'category updated successfully' });
    });
});

router.delete('/deleteCategory/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;

    // Delete category from category table
    const editCategoryQuery = 'UPDATE category SET status = ? WHERE category_id = ?';
    db.query(editCategoryQuery, ['DeActive', categoryId], (err, result) => {
        if (err) {
            console.error('Error editing category:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'category not found' });
        }

        return res.status(200).json({ message: 'category updated successfully' });
    });
});


router.post('/signup', (req, res) => {
    const { name, organization, guest_type, mobile_number, email, password, address_line1, address_line2, postcode, city, state, country, role } = req.body;
    const status = 'Approved';

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

            // Insert data into User table
            const userInsertQuery = 'INSERT INTO user (name, organization, guest_type, mobile_number, email, password, role, address_line_1, address_line_2, postcode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(userInsertQuery, [name, organization, guest_type, mobile_number, email, hashedPassword, 'Admin', address_line1, address_line2, postcode, city, state, country], (err, result) => {
                if (err) {
                    console.error('Error signing up user:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const userId = result.insertId;

                const doctorInsertQuery = 'INSERT INTO Admin (user_id) VALUES (?)';
                db.query(doctorInsertQuery, [userId], (err) => {
                    if (err) {
                        console.error('Error signing up Admin:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    return res.status(200).json({ message: 'Admin signed up successfully' });
                });

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


            // Create a JWT token with a secret key and 2 days expiry
            const secretKey = 'uniprecisionYHU';
            const token = jwt.sign({ userId: user.user_id, email: user.email, role: user.role }, secretKey, { expiresIn: '2d' });

            // Return the token and user role
            return res.status(200).json({ token, role: user.role, userid: user.user_id });

        });
    });
});

router.put('/ChangePassword', async (req, res) => {
    try {
        const { newPassword, token } = req.body;

        const secretKey = 'uniprecisionYHU'; // Use your actual secret key
        const data = jwt.verify(token, secretKey);
        const role = data.role;
        const userid = data.userId;

        if (role === 'Admin') {
            // Find the user with the given userid and role = 'Admin' in MySQL
            const query = 'SELECT * FROM user WHERE user_id = ? AND role = ?';
            db.query(query, [userid, 'Admin'], async (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send({ error: 'Error occurred' });
                }

                if (results.length === 0) {
                    return res.status(400).json({ error: 'User not found' });
                }

                const user = results[0];
                bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                    if (err) {
                        console.error('Error hashing password:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    // Update the user's password in MySQL
                    const updateQuery = 'UPDATE user SET password = ? WHERE user_id = ?';
                    db.query(updateQuery, [hashedPassword, userid], (updateError) => {
                        if (updateError) {
                            console.error(updateError);
                            return res.status(500).send({ error: 'Error occurred' });
                        }
                        res.json({ success: true });
                    });
                })
            });
        } else {
            return res.status(403).json({ error: 'Access denied. Only Admins can change passwords.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});


router.get('/getuseranalysis', async (req, res) => {
    const radiologistsQuery = 'SELECT COUNT(*) AS totalRadiologists FROM user WHERE role = "Radiologist"';

    db.query(radiologistsQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving radiologists:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Extract the total number of radiologists from the results
        const totalRadiologists = results[0].totalRadiologists;

        const doctorQuery = 'SELECT COUNT(*) AS totaldoctor FROM user WHERE role = "Doctor"';

        db.query(doctorQuery, (err, results1) => {
            if (err) {
                console.error('Error retrieving radiologists:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const totaldoctors = results1[0].totaldoctor;

            const doctorappQuery = 'SELECT COUNT(*) AS totalappdoctor FROM doctor WHERE status = "Approved"';

            db.query(doctorappQuery, (err, results2) => {
                if (err) {
                    console.error('Error retrieving radiologists:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const totalappdoctors = results2[0].totalappdoctor;

                const radioappQuery = 'SELECT COUNT(*) AS totalappradio FROM radiologist WHERE status = "Approved"';

                db.query(radioappQuery, (err, results3) => {
                    if (err) {
                        console.error('Error retrieving radiologists:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    const totalappradio = results3[0].totalappradio;

                    const radiounappQuery = 'SELECT COUNT(*) AS totalunappradio FROM radiologist WHERE status = "Not Approved"';

                    db.query(radiounappQuery, (err, results4) => {
                        if (err) {
                            console.error('Error retrieving radiologists:', err);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }

                        const totalunappradio = results4[0].totalunappradio;

                        const docunappQuery = 'SELECT COUNT(*) AS totalunappdoc FROM doctor WHERE status = "Not Approved"';

                        db.query(docunappQuery, (err, results5) => {
                            if (err) {
                                console.error('Error retrieving radiologists:', err);
                                return res.status(500).json({ error: 'Internal Server Error' });
                            }

                            const totalunappdoc = results5[0].totalunappdoc;


                            return res.status(200).json({
                                totalRadiologists,
                                totaldoctors,
                                totalappdoctors,
                                totalappradio,
                                totalunappradio,
                                totalunappdoc
                            });
                        })
                    })
                })
            })
        })
    });
})


router.get('/gettransactionanalysis', async (req, res) => {
    const transactionQuery = 'SELECT SUM(amount) AS totalEarning,COUNT(*) AS totaltransaction FROM transactions';

    db.query(transactionQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving transaction data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Extract the total earning from the results
        const totalEarning = results[0].totalEarning;
        const totaltransaction = results[0].totaltransaction

        return res.status(200).json({ totalEarning, totaltransaction });
    });
});


router.get('/gettransactionrecord', async (req, res) => {
    // Construct the SQL query to retrieve total amount and total transactions for each month over the last six months
    const transactionQuery = `
        SELECT 
            DATE_FORMAT(date_generated, '%Y-%m') AS month,
            IFNULL(SUM(amount), 0) AS Amount,
            IFNULL(COUNT(*), 0) AS Transactions
        FROM 
            transactions
        WHERE 
            date_generated >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
        GROUP BY 
            month
        ORDER BY 
            month;
    `;

    // Execute the SQL query
    db.query(transactionQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving transaction analysis data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Create an array of all months in the last six months
        const lastSixMonths = [];
        const currentDate = new Date();
        for (let i = 5; i >= 0; i--) {
            const month = currentDate.getMonth() - i + 1;
            const year = currentDate.getFullYear();
            lastSixMonths.push(`${year}-${String(month).padStart(2, '0')}`);
        }

        // Merge query results with the list of all months
        const mergedResults = lastSixMonths.map(month => {
            const foundResult = results.find(result => result.month === month);
            if (foundResult) {
                return foundResult;
            } else {
                return { month, Amount: 0, Transactions: 0 };
            }
        });

        return res.status(200).json({ transactionAnalysis: mergedResults });
    });
});



router.get('/getunassignedreport', async (req, res) => {
    const transactionQuery = 'SELECT COUNT(*) AS totalreport FROM report WHERE report_status = "Pending" ';

    db.query(transactionQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving transaction data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Extract the total earning from the results
        const UnAssignedReport = results[0].totalreport;

        return res.status(200).json({ UnAssignedReport });
    });
});




module.exports = router;