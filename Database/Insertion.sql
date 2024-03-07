-- Insert dummy data into Users table
INSERT INTO Users (name, organisation, mobile_number, email, password, role, address_line1, address_line2, postcode, city, state, country)
VALUES
('John Doe', 'Hospital XYZ', '1234567890', 'john@example.com', 'password123', 'Doctor', '123 Main St', 'Apt 101', '12345', 'Cityville', 'Stateville', 'Countryland'),
('Jane Smith', 'Clinic ABC', '9876543210', 'jane@example.com', 'password456', 'Radiologist', '456 Oak St', 'Suite 202', '54321', 'Townsville', 'Stateville', 'Countryland'),
('Admin1', 'Hospital XYZ', '555444333', 'admin1@example.com', 'adminpassword', 'Admin', '789 Elm St', '', '67890', 'Metropolis', 'Stateville', 'Countryland');

-- Insert dummy data into Doctor table
INSERT INTO Doctor (user_id, status)
VALUES (1, 'Approved'),
       (2, 'Not Approved');

-- Insert dummy data into Radiologist table
INSERT INTO Radiologist (user_id, status)
VALUES (2, 'Approved');

-- Insert dummy data into Admin table
INSERT INTO Admin (user_id)
VALUES (3);

-- Insert dummy data into Category table
INSERT INTO Category (price, unit, category_name)
VALUES (100.00, 'USD', 'X-Ray'),
       (200.00, 'USD', 'MRI'),
       (150.00, 'USD', 'Ultrasound');

-- Insert dummy data into Transactions table
INSERT INTO Transactions (transaction_record, doctor_id, radiologist_id, date_generated)
VALUES ('Transaction 1 details', 1, 1, '2024-03-07'),
       ('Transaction 2 details', 1, NULL, '2024-03-08');

-- Insert dummy data into Orders table
INSERT INTO Orders (doctor_id, transaction_id, image_file_path, total_price, category_id, date_generated, patient_name, dob, nric_passport_no, clinical_summary, examination_date, age, gender, clinical_diagnostic_center, previous_study, findings, summary)
VALUES (1, 1, '/path/to/image1.jpg', 100.00, 1, '2024-03-07', 'Patient A', '1990-01-01', '123456789', 'Summary of clinical history', '2024-03-07', 34, 'Male', 'Clinic XYZ', 'Previous study details', 'Findings details', 'Summary of results'),
       (1, 2, '/path/to/image2.jpg', 200.00, 2, '2024-03-08', 'Patient B', '1985-05-15', '987654321', 'Summary of clinical history', '2024-03-08', 39, 'Female', 'Center ABC', 'Previous study details', 'Findings details', 'Summary of results');

-- Insert dummy data into Report table
INSERT INTO Report (report_id, date_generated, patient_name, dob, nric_passport_no, doctor_id, clinical_summary, examination_date, age, gender, clinical_diagnostic_center, previous_study, findings, summary, order_id, report_status)
VALUES (1, '2024-03-07', 'Patient A', '1990-01-01', '123456789', 1, 'Summary of clinical history', '2024-03-07', 34, 'Male', 'Clinic XYZ', 'Previous study details', 'Findings details', 'Summary of results', 1, 'Complete'),
       (2, '2024-03-08', 'Patient B', '1985-05-15', '987654321', 1, 'Summary of clinical history', '2024-03-08', 39, 'Female', 'Center ABC', 'Previous study details', 'Findings details', 'Summary of results', 2, 'Pending');
