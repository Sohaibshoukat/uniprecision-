const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload directory
const uploadDirectory = 'uploads/';

// Check if the upload directory exists, create it if not
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/order', upload.single('file'), (req, res) => {
    const { doctor_id, category_id, date_generated, Examination_Date, patient_name, dob, nric_passport_no, clinical_summary_title, age, gender, previous_study, price } = req.body;

    // Extract file path
    const filePath = req.file ? req.file.path : null;

    // Insert data into orders table
    const orderInsertQuery = 'INSERT INTO orders (doctor_id, file_path, category_id, date_generated, Examination_Date, patient_name, dob, nric_passport_no, clinical_summary_title, age, gender, previous_study, status, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(orderInsertQuery, [doctor_id, filePath, category_id, date_generated, Examination_Date, patient_name, dob, nric_passport_no, clinical_summary_title, age, gender, previous_study, 'UnPaid', price], (err, result) => {
        if (err) {
            console.error('Error inserting order:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const orderId = result.insertId;

        // Insert data into report table
        const reportInsertQuery = 'INSERT INTO report (doctor_id, Examination_Date, patient_name, dob, nric_passport_no, order_id,age,gender,report_status,previous_study,clinical_diagnostic_center,price) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(reportInsertQuery, [doctor_id, Examination_Date, patient_name, dob, nric_passport_no, orderId, age, gender, "UnPaid", previous_study, clinical_summary_title, price], (err) => {
            if (err) {
                console.error('Error inserting report:', err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'Order created successfully' });
        });
    });
});

router.get('/getDoctorId/:id', (req, res) => {
    const userId = req.params.id;

    // Query the database to get the doctor ID based on the user ID
    const doctorIdQuery = 'SELECT doctor_id FROM doctor WHERE user_id = ?';
    db.query(doctorIdQuery, [userId], (err, result) => {
        if (err) {
            console.error('Error retrieving doctor ID:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'doctor ID not found for the given user ID' });
        }

        const doctorId = result[0].doctor_id;
        return res.status(200).json({ doctorId });
    });
});

router.get('/getAllOrders/:doctorId', (req, res) => {
    const doctorId = req.params.doctorId;

    const ordersQuery = `
        SELECT o.*, c.price, c.category_name
        FROM orders o
        INNER JOIN category c ON o.category_id = c.category_id
        WHERE o.doctor_id = ?
    `;

    db.query(ordersQuery, [doctorId], (err, results) => {
        if (err) {
            console.error('Error retrieving orders:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const ordersWithFilesAndCategory = results.map(order => {
            const filePath = order.file_path;
            const fileUrl = filePath ? `${req.protocol}://${req.get('host')}/${filePath}` : null;
            return { ...order, file_url: fileUrl };
        });

        return res.status(200).json({ orders: ordersWithFilesAndCategory });
    });
});

router.get('/getAllReports/:doctorId', (req, res) => {
    const doctorId = req.params.doctorId;

    const ordersQuery = `
    SELECT r.*, c.price, c.category_name, o.*
    FROM report r
    INNER JOIN orders o ON r.order_id = o.order_id
    INNER JOIN category c ON o.category_id = c.category_id
    WHERE r.doctor_id = ? AND r.report_status != 'UnPaid'
    
    `;

    db.query(ordersQuery, [doctorId], (err, results) => {
        if (err) {
            console.error('Error retrieving orders:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const ordersWithFilesAndCategory = results.map(order => {
            const filePath = order.file_path;
            const fileUrl = filePath ? `${req.protocol}://${req.get('host')}/${filePath}` : null;
            return { ...order, file_url: fileUrl };
        });

        return res.status(200).json({ orders: ordersWithFilesAndCategory });
    });
});

router.get('/getSingleReprte/:docid/:reportid', (req, res) => {
    const docid = req.params.docid;
    const reportid = req.params.reportid;

    const reportQuery = `
    SELECT r.*, c.price, c.category_name, o.*
    FROM report r
    INNER JOIN orders o ON r.order_id = o.order_id
    INNER JOIN category c ON o.category_id = c.category_id
    WHERE r.doctor_id = ? AND report_status = 'Complete' AND report_id = ?
    LIMIT 1
    `;

    db.query(reportQuery, [docid, reportid], (err, results) => {
        if (err) {
            console.error('Error retrieving report:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'report not found' });
        }

        const report = results[0];

        const doctorQuery = `
        SELECT d.*, u.name AS doctor_name
        FROM doctor d
        INNER JOIN user u ON d.user_id = u.user_id
        WHERE d.doctor_id = ? AND d.status = 'Approved'
        `;

        db.query(doctorQuery, [report.doctor_id], (err, doctorResults) => {
            if (err) {
                console.error('Error retrieving doctor data:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (doctorResults.length === 0) {
                return res.status(404).json({ error: 'doctor not found' });
            }

            const doctor = doctorResults[0];

            const radioQuery = `
            SELECT r.*, u.name AS radio_name, u.organization AS organization
            FROM radiologist r
            INNER JOIN user u ON r.user_id = u.user_id
            WHERE r.radiologist_id = ? AND r.status = 'Approved'
            `;

            db.query(radioQuery, [report.radiologist_id], (err, radioResults) => {
                if (err) {
                    console.error('Error retrieving doctor data:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (doctorResults.length === 0) {
                    return res.status(404).json({ error: 'doctor not found' });
                }

                const filePath = report.file_path;
                const fileUrl = filePath ? `${req.protocol}://${req.get('host')}/${filePath}` : null;
                const reportWithFileUrl = { ...report, file_url: fileUrl };

                const radio = radioResults[0];

                return res.status(200).json({ report: reportWithFileUrl, doctor: doctor, radio: radio });
            })
        });
    });
});

router.put('/payorder/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    // Update status in orders table
    const orderUpdateQuery = 'UPDATE orders SET status = ? WHERE order_id = ?';
    db.query(orderUpdateQuery, ['Paid', orderId], (err, orderResult) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Update status in Reports table
        const reportUpdateQuery = 'UPDATE report SET report_status = ? WHERE order_id = ?';
        db.query(reportUpdateQuery, ['Pending', orderId], (err) => {
            if (err) {
                console.error('Error updating report status:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'Status updated successfully' });
        });
    });
});



router.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = `uploads/${fileName}`;

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing file:', err);
            return res.status(404).json({ error: 'File not found' });
        }

        // Stream the file to the response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

router.post('/editDoctorDetails', (req, res) => {
    const { userId, name, organization, mobile_number, email, address_line1, address_line2, postcode, city, state, country } = req.body;

    // Check if the user exists in the database
    const userQuery = 'SELECT * FROM user WHERE user_id = ?';
    db.query(userQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'user not found' });
        }

        const user = results[0];

        // Update user details
        const updateUserQuery = 'UPDATE user SET name = ?, organization = ?, mobile_number = ?, email = ?, address_line_1 = ?, address_line_2 = ?, postcode = ?, city = ?, state = ?, country = ? WHERE user_id = ?';
        db.query(updateUserQuery, [name, organization, mobile_number, email, address_line1, address_line2, postcode, city, state, country, userId], (err, result) => {
            if (err) {
                console.error('Error updating user details:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'doctor details updated successfully' });
        });
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


router.get('/getorganization/:id', (req, res) => {
    const userId = req.params.id;

    // Query the database to get the doctor ID based on the user ID
    const doctorIdQuery = 'SELECT * FROM user WHERE user_id = ?';
    db.query(doctorIdQuery, [userId], (err, result) => {
        if (err) {
            console.error('Error retrieving doctor ID:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const user = result[0];
        return res.status(200).json({ organization: user });
    });
});


router.post('/addtransaction/:doctorId', (req, res) => {
    const { amount, date, txnref } = req.body;
    const doctorId = req.params.doctorId;

    // Insert data into category table
    const addCategoryQuery = 'INSERT INTO transactions (transaction_ref , amount, doctor_id, date_generated ) VALUES (?, ?, ?, ?)';
    db.query(addCategoryQuery, [txnref, amount, doctorId, date], (err, result) => {
        if (err) {
            console.error('Error adding category:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(200).json({ message: 'Transaction added successfully' });
    });
});

router.get('/doctorTransactions/:doctorId', (req, res) => {
    const doctorId = req.params.doctorId;

    // Query transactions for the specified doctor
    const transactionsQuery = 'SELECT * FROM transactions WHERE doctor_id = ?';
    db.query(transactionsQuery, [doctorId], (err, results) => {
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


module.exports = router;
