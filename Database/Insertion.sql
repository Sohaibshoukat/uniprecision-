-- Insertion statements for User Table
INSERT INTO User (name, organization, mobile_number, email, password, role, address_line_1, address_line_2, postcode, city, state, country)
VALUES ('John Doe', 'Hospital A', '123456789', 'john@example.com', 'password123', 'Doctor', '123 Main St', 'Apt 101', '12345', 'Cityville', 'Stateville', 'Malaysia'),
       ('Jane Smith', 'Clinic B', '987654321', 'jane@example.com', 'password456', 'Radiologist', '456 Oak St', 'Suite 202', '54321', 'Townville', 'Countyville', 'Malaysia'),
       ('Admin1', 'Admin Organization', '111222333', 'admin@example.com', 'adminpass', 'Admin', '789 Elm St', 'Unit 303', '67890', 'Metropolis', 'Provinceville', 'Malaysia');

-- Insertion statements for Doctor Table
INSERT INTO Doctor (user_id, status)
VALUES (1, 'Approved'),
       (2, 'Not Approved');

-- Insertion statements for Radiologist Table
INSERT INTO Radiologist (user_id, status)
VALUES (2, 'Approved'),
       (3, 'Not Approved');

-- Insertion statements for Admin Table
INSERT INTO Admin (user_id)
VALUES (3);

-- Insertion statements for Category Table
INSERT INTO Category (price, unit, category_name)
VALUES (100.00, 'USD', 'X-ray'),
       (50.00, 'USD', 'Ultrasound'),
       (200.00, 'USD', 'MRI');

-- Insertion statements for Transactions Table
INSERT INTO Transactions (transaction_record, doctor_id, radiologist_id, date_generated)
VALUES ('Transaction 1 Record', 1, 1, '2024-03-18'),
       ('Transaction 2 Record', 1, 2, '2024-03-19'),
       ('Transaction 3 Record', 2, 2, '2024-03-20');

-- Insertion statements for Orders Table
INSERT INTO Orders (doctor_id, transaction_id, file_path, category_id, date_generated, patient_name, dob, nric_passport_no, clinical_summary_title, age, gender, previous_study)
VALUES (1, 1, '/path/to/file1.pdf', 1, '2024-03-18', 'Patient 1', '1990-01-01', '123456-78-9012', 'Summary 1', 30, 'Male', 'None'),
       (1, 2, '/path/to/file2.pdf', 2, '2024-03-19', 'Patient 2', '1985-05-15', '987654-32-1098', 'Summary 2', 36, 'Female', 'MRI Scan'),
       (2, 3, '/path/to/file3.pdf', 3, '2024-03-20', 'Patient 3', '1978-12-31', '654321-09-8765', 'Summary 3', 43, 'Male', 'X-ray');

-- Insertion statements for Report Table
INSERT INTO Report (radiologist_id, patient_name, dob, nric_passport_no, doctor_id, examination_date, age, gender, clinical_diagnostic_center, previous_study, findings, summary, order_id, report_status)
VALUES (1, 'Patient 1', '1990-01-01', '123456-78-9012', 1, '2024-03-18', 30, 'Male', 'Diagnostic Center A', 'None', 'Findings for Patient 1', 'Summary for Patient 1', 1, 'Complete'),
       (1, 'Patient 2', '1985-05-15', '987654-32-1098', 1, '2024-03-19', 36, 'Female', 'Diagnostic Center B', 'MRI Scan', 'Findings for Patient 2', 'Summary for Patient 2', 2, 'Complete'),
       (2, 'Patient 3', '1978-12-31', '654321-09-8765', 2, '2024-03-20', 43, 'Male', 'Diagnostic Center C', 'X-ray', 'Findings for Patient 3', 'Summary for Patient 3', 3, 'Complete');
