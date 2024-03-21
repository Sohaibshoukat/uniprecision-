// routes/radiologist/radiologist.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.post('/fillReport', (req, res) => {
    const { report_id, examination_date, clinical_diagnostic_center, findings, summary,previous_study } = req.body;

    // Get current date and time
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Update data in the Report table
    const updateReportQuery = 'UPDATE Report SET examination_date = ?, clinical_diagnostic_center = ?, findings = ?, summary = ?, date_generated = ?,previous_study=?, report_status = "Complete" WHERE report_id = ?';

    db.query(updateReportQuery, [examination_date, clinical_diagnostic_center, findings, summary, currentDate,previous_study, report_id], (err, result) => {
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

router.get('/completedReports', (req, res) => {
    // Query all reports with status 'Complete'
    const completedReportsQuery = 'SELECT * FROM Report WHERE report_status = "Complete"';
    db.query(completedReportsQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving completed reports:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Return the list of completed reports
        return res.status(200).json({ completed_reports: results });
    });
});

module.exports = router;
