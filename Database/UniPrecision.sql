-- Create User Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    organisation VARCHAR(255),
    mobile_number VARCHAR(15),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(50),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    postcode VARCHAR(10),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100)
);

-- Create Doctor Table
CREATE TABLE Doctor (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    status ENUM('Approved', 'Not Approved'),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Radiologist Table
CREATE TABLE Radiologist (
    radiologist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    status ENUM('Approved', 'Not Approved'),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Admin Table
CREATE TABLE Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Category Table
CREATE TABLE Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10,2),
    unit VARCHAR(20),
    category_name VARCHAR(255)
);

-- Create Transactions Table
CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_record TEXT,
    doctor_id INT,
    radiologist_id INT,
    date_generated DATE,
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
    FOREIGN KEY (radiologist_id) REFERENCES Radiologist(radiologist_id)
);

-- Create Order Table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT,
    transaction_id INT,
    image_file_path TEXT,
    total_price DECIMAL(10,2),
    category_id INT,
    date_generated DATE,
    patient_name VARCHAR(255),
    dob DATE,
    nric_passport_no VARCHAR(50),
    clinical_summary TEXT,
    examination_date DATE,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    clinical_diagnostic_center VARCHAR(255),
    previous_study TEXT,
    findings TEXT,
    summary TEXT,
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
    FOREIGN KEY (transaction_id) REFERENCES Transactions(transaction_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

-- Create Report Table
CREATE TABLE Report (
    radiologist_id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT,
    date_generated DATE,
    patient_name VARCHAR(255),
    dob DATE,
    nric_passport_no VARCHAR(50),
    doctor_id INT,
    clinical_summary TEXT,
    examination_date DATE,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    clinical_diagnostic_center VARCHAR(255),
    previous_study TEXT,
    findings TEXT,
    summary TEXT,
    order_id INT,
    report_status ENUM('Pending', 'Assigned', 'Complete'),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
