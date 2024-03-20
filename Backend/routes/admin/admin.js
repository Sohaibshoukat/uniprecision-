const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.get('/getAllRadiologists', (req, res) => {
    // Query to fetch all radiologists with their names
    const radiologistsQuery = 'SELECT r.*, u.name AS radiologist_name FROM Radiologist r INNER JOIN User u ON r.user_id = u.user_id Where status= "Approved"';

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
    const pendingReportsQuery = 'SELECT * FROM Report WHERE report_status = "Pending"';

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

    // Update data in the Report table
    const updateReportQuery = 'UPDATE Report SET radiologist_id = ?, report_status = "Assigned" WHERE report_id = ?';
    db.query(updateReportQuery, [radiologist_id, report_id], (err, result) => {
        if (err) {
            console.error('Error updating report:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Report not found' });
        }

        return res.status(200).json({ message: 'Report assigned successfully' });
    });
});

router.post('/adddoctor', (req, res) => {
    const { name, organisation, mobile_number, email, password, address_line1, address_line2, postcode, city, state, country } = req.body;
    const role = 'Doctor';
    const status = 'Approved';

    // Insert data into User table
    const userInsertQuery = 'INSERT INTO User (name, organisation, mobile_number, email, password, role, address_line1, address_line2, postcode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(userInsertQuery, [name, organisation, mobile_number, email, password, role, address_line1, address_line2, postcode, city, state, country], (err, result) => {
        if (err) {
            console.error('Error signing up doctor:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const userId = result.insertId;

        // Insert data into Doctor table
        const doctorInsertQuery = 'INSERT INTO Doctor (user_id, status) VALUES (?, ?)';
        db.query(doctorInsertQuery, [userId, status], (err, result) => {
            if (err) {
                console.error('Error signing up doctor:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'Doctor signed up successfully' });
        });
    });
});

router.post('/addradiologist', (req, res) => {
    const { name, organisation, mobile_number, email, password, address_line1, address_line2, postcode, city, state, country } = req.body;
    const role = 'Radiologist';
    const status = 'Approved';

    // Insert data into User table
    const userInsertQuery = 'INSERT INTO User (name, organisation, mobile_number, email, password, role, address_line1, address_line2, postcode, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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

router.post('/updateUserStatus', (req, res) => {
    const { user_id } = req.body;

    // Query to get the role of the user
    const roleQuery = 'SELECT role FROM User WHERE user_id = ?';
    db.query(roleQuery, [user_id], (err, results) => {
        if (err) {
            console.error('Error retrieving user role:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const role = results[0].role.toLowerCase();

        // Update status based on the role
        let updateQuery = '';
        switch (role) {
            case 'radiologist':
                updateQuery = 'UPDATE Radiologist SET status = "Approved" WHERE user_id = ?';
                break;
            case 'doctor':
                updateQuery = 'UPDATE Doctor SET status = "Approved" WHERE user_id = ?';
                break;
            // Add more cases for other roles if needed

            default:
                return res.status(400).json({ error: 'Invalid role' });
        }

        // Execute the update query
        db.query(updateQuery, [user_id], (err, result) => {
            if (err) {
                console.error('Error updating user status:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found in respective table' });
            }

            return res.status(200).json({ message: 'User status updated successfully' });
        });
    });
});

router.get('/getAllUsers', (req, res) => {
    // Query to retrieve all users
    const getUsersQuery = 'SELECT * FROM User';

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

    // Insert data into Category table
    const addCategoryQuery = 'INSERT INTO Category (price, unit, category_name) VALUES (?, ?, ?)';
    db.query(addCategoryQuery, [price, unit, category_name], (err, result) => {
        if (err) {
            console.error('Error adding category:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(200).json({ message: 'Category added successfully' });
    });
});

router.post('/editCategory/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const { price, unit, category_name } = req.body;

    // Update data in Category table
    const editCategoryQuery = 'UPDATE Category SET price = ?, unit = ?, category_name = ? WHERE category_id = ?';
    db.query(editCategoryQuery, [price, unit, category_name, categoryId], (err, result) => {
        if (err) {
            console.error('Error editing category:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json({ message: 'Category updated successfully' });
    });
});

router.delete('/deleteCategory/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;

    // Delete category from Category table
    const deleteCategoryQuery = 'DELETE FROM Category WHERE category_id = ?';
    db.query(deleteCategoryQuery, [categoryId], (err, result) => {
        if (err) {
            console.error('Error deleting category:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json({ message: 'Category deleted successfully' });
    });
});

module.exports = router;
