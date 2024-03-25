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
    destination: function(req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/order', upload.single('file'), (req, res) => {
    const { doctor_id, category_id, date_generated, patient_name, dob, nric_passport_no, clinical_summary_title, age, gender, previous_study } = req.body;

    // Extract file path
    const filePath = req.file ? req.file.path : null;

    // Insert data into Orders table
    const orderInsertQuery = 'INSERT INTO Orders (doctor_id, file_path, category_id, date_generated, patient_name, dob, nric_passport_no, clinical_summary_title, age, gender, previous_study) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(orderInsertQuery, [doctor_id, filePath, category_id, date_generated, patient_name, dob, nric_passport_no, clinical_summary_title, age, gender, previous_study], (err, result) => {
        if (err) {
            console.error('Error inserting order:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const orderId = result.insertId;

        // Insert data into Report table
        const reportInsertQuery = 'INSERT INTO Report (doctor_id, patient_name, dob, nric_passport_no, order_id,age,gender,report_status) VALUES (?, ?, ?, ?, ?,?,?,?)';
        db.query(reportInsertQuery, [doctor_id, patient_name, dob, nric_passport_no, orderId,age,gender,"Pending"], (err) => {
            if (err) {
                console.error('Error inserting report:', err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'Order created successfully' });
        });
    });
});

router.get('/getDoctorId', (req, res) => {
    const userId = req.body.userId;

    // Query the database to get the doctor ID based on the user ID
    const doctorIdQuery = 'SELECT doctor_id FROM Doctor WHERE user_id = ?';
    db.query(doctorIdQuery, [userId], (err, result) => {
        if (err) {
            console.error('Error retrieving doctor ID:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Doctor ID not found for the given user ID' });
        }

        const doctorId = result[0].doctor_id;
        return res.status(200).json({ doctorId });
    });
});

router.get('/getAllOrders', (req, res) => {
    const ordersQuery = `
        SELECT o.*, c.price, c.category_name
        FROM Orders o
        INNER JOIN Category c ON o.category_id = c.category_id
    `;
    db.query(ordersQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving orders:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Prepare response data with file URLs
        const ordersWithFilesAndCategory = results.map(order => {
            const filePath = order.file_path;
            const fileUrl = filePath ? `${req.protocol}://${req.get('host')}/${filePath}` : null;
            return { ...order, file_url: fileUrl };
        });

        return res.status(200).json({ orders: ordersWithFilesAndCategory });
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
    const userQuery = 'SELECT * FROM User WHERE user_id = ?';
    db.query(userQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

        // Update user details
        const updateUserQuery = 'UPDATE User SET name = ?, organization = ?, mobile_number = ?, email = ?, address_line_1 = ?, address_line_2 = ?, postcode = ?, city = ?, state = ?, country = ? WHERE user_id = ?';
        db.query(updateUserQuery, [name, organization, mobile_number, email, address_line1, address_line2, postcode, city, state, country, userId], (err, result) => {
            if (err) {
                console.error('Error updating user details:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'Doctor details updated successfully' });
        });
    });
});

router.get('/doctorTransactions/:doctorId', (req, res) => {
    const doctorId = req.params.doctorId;

    // Query transactions for the specified doctor
    const transactionsQuery = 'SELECT * FROM Transactions WHERE doctor_id = ?';
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
