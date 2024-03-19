-- User Table
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    organization VARCHAR(255),
    mobile_number VARCHAR(15),
    email VARCHAR(255),
    password VARCHAR(255),
    role ENUM('Radiologist', 'Doctor', 'Admin'),
    address_line_1 VARCHAR(255),
    address_line_2 VARCHAR(255),
    postcode VARCHAR(10),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255) DEFAULT 'Malaysia'
);

-- Doctor Table
CREATE TABLE Doctor (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    status ENUM('Approved', 'Not Approved'),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Radiologist Table
CREATE TABLE Radiologist (
    radiologist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    status ENUM('Approved', 'Not Approved'),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Admin Table
CREATE TABLE Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Category Table
CREATE TABLE Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2),
    unit VARCHAR(50),
    category_name VARCHAR(255)
);

-- Transactions Table
CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_record VARCHAR(255),
    doctor_id INT,
    radiologist_id INT,
    date_generated DATE,
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
    FOREIGN KEY (radiologist_id) REFERENCES Radiologist(radiologist_id)
);

-- Order Table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT,
    transaction_id INT,
    file_path VARCHAR(255),
    category_id INT,
    date_generated DATE,
    patient_name VARCHAR(255),
    dob DATE,
    nric_passport_no VARCHAR(255),
    clinical_summary_title VARCHAR(255),
    age INT,
    gender ENUM('Male', 'Female'),
    previous_study VARCHAR(255),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
    FOREIGN KEY (transaction_id) REFERENCES Transactions(transaction_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

-- Report Table
CREATE TABLE Report (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    radiologist_id INT,
    patient_name VARCHAR(255),
    dob DATE,
    nric_passport_no VARCHAR(255),
    doctor_id INT,
    examination_date DATE,
    age INT,
    gender ENUM('Male', 'Female'),
    clinical_diagnostic_center VARCHAR(255),
    previous_study VARCHAR(255),
    findings TEXT,
    summary TEXT,
    order_id INT,
    report_status ENUM('Pending', 'Assign', 'Complete'),
    FOREIGN KEY (radiologist_id) REFERENCES Radiologist(radiologist_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
