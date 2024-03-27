// routes/radiologist/radiologist.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.get('/getAllReports/:radioid', (req, res) => {
    const radioid = req.params.radioid;

    const ordersQuery = `
    SELECT r.*, c.price, c.category_name, o.*
    FROM Report r
    INNER JOIN Orders o ON r.order_id = o.order_id
    INNER JOIN Category c ON o.category_id = c.category_id
    WHERE r.radiologist_id = ? AND report_status = 'Assigned'
    `;

    db.query(ordersQuery, [radioid], (err, results) => {
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

router.get('/getSingleReprt/:radioid/:reportid', (req, res) => {
    const radioid = req.params.radioid;
    const reportid = req.params.reportid;

    const reportQuery = `
    SELECT r.*, c.price, c.category_name, o.*
    FROM Report r
    INNER JOIN Orders o ON r.order_id = o.order_id
    INNER JOIN Category c ON o.category_id = c.category_id
    WHERE r.radiologist_id = ? AND report_status = 'Assigned' AND report_id = ?
    LIMIT 1
    `;

    db.query(reportQuery, [radioid, reportid], (err, results) => {
        if (err) {
            console.error('Error retrieving report:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Report not found' });
        }

        const report = results[0];

        const doctorQuery = `
        SELECT d.*, u.name AS doctor_name
        FROM Doctor d
        INNER JOIN User u ON d.user_id = u.user_id
        WHERE d.doctor_id = ? AND d.status = 'Approved'
        `;

        db.query(doctorQuery, [report.doctor_id], (err, doctorResults) => {
            if (err) {
                console.error('Error retrieving doctor data:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (doctorResults.length === 0) {
                return res.status(404).json({ error: 'Doctor not found' });
            }

            const doctor = doctorResults[0];

            const filePath = report.file_path;
            const fileUrl = filePath ? `${req.protocol}://${req.get('host')}/${filePath}` : null;
            const reportWithFileUrl = { ...report, file_url: fileUrl };

            return res.status(200).json({ report: reportWithFileUrl, doctor: doctor });
        });
    });
});

router.get('/getRadioId/:id', (req, res) => {
    const userId = req.params.id;

    // Query the database to get the doctor ID based on the user ID
    const doctorIdQuery = 'SELECT radiologist_id FROM radiologist WHERE user_id = ?';
    db.query(doctorIdQuery, [userId], (err, result) => {
        if (err) {
            console.error('Error retrieving doctor ID:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Radiologist ID not found for the given user ID' });
        }

        const radioId = result[0].radiologist_id;
        return res.status(200).json({ radioId });
    });
});

router.post('/fillReport', (req, res) => {
    const { report_id, findings, summary } = req.body;

    // Get current date and time
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Update data in the Report table
    const updateReportQuery = 'UPDATE Report SET findings = ?, summary = ?, date_generated = ?, report_status = "Complete" WHERE report_id = ?';
    db.query(updateReportQuery, [findings, summary, currentDate, report_id], (err, result) => {
        if (err) {
            console.error('Error updating report:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Report not found or already completed' });
        }

        return res.status(200).json({ message: 'Report filled successfully' });
    });
});

router.post('/editRadiologistDetails', (req, res) => {
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

router.get('/getCompletedReports/:radioid', (req, res) => {
    const radioid = req.params.radioid;

    const ordersQuery = `
    SELECT r.*, c.price, c.category_name, o.*
    FROM Report r
    INNER JOIN Orders o ON r.order_id = o.order_id
    INNER JOIN Category c ON o.category_id = c.category_id
    WHERE r.radiologist_id = ? AND report_status = 'Complete'
    `;

    db.query(ordersQuery, [radioid], (err, results) => {
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

router.get('/getcompleteSingleReprt/:radioid/:reportid', (req, res) => {
    const radioid = req.params.radioid;
    const reportid = req.params.reportid;

    const reportQuery = `
    SELECT r.*, c.price, c.category_name, o.*
    FROM Report r
    INNER JOIN Orders o ON r.order_id = o.order_id
    INNER JOIN Category c ON o.category_id = c.category_id
    WHERE r.radiologist_id = ? AND report_status = 'Complete' AND report_id = ?
    LIMIT 1
    `;

    db.query(reportQuery, [radioid, reportid], (err, results) => {
        if (err) {
            console.error('Error retrieving report:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Report not found' });
        }

        const report = results[0];

        const doctorQuery = `
        SELECT d.*, u.name AS doctor_name
        FROM Doctor d
        INNER JOIN User u ON d.user_id = u.user_id
        WHERE d.doctor_id = ? AND d.status = 'Approved'
        `;

        db.query(doctorQuery, [report.doctor_id], (err, doctorResults) => {
            if (err) {
                console.error('Error retrieving doctor data:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (doctorResults.length === 0) {
                return res.status(404).json({ error: 'Doctor not found' });
            }

            const doctor = doctorResults[0];

            const filePath = report.file_path;
            const fileUrl = filePath ? `${req.protocol}://${req.get('host')}/${filePath}` : null;
            const reportWithFileUrl = { ...report, file_url: fileUrl };

            return res.status(200).json({ report: reportWithFileUrl, doctor: doctor });
        });
    });
});

module.exports = router;
