-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2024 at 10:40 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uniprecision`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `user_id`) VALUES
(1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `price`, `unit`, `category_name`) VALUES
(1, 500.00, 'MY-12', 'Sohaib'),
(2, 300.00, 'MY-12', 'Inzamam'),
(3, 600.00, 'MY-12', 'X-RAYS'),
(4, 400.00, 'MY-12', 'Y-RAYS');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('Approved','Not Approved') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `user_id`, `status`) VALUES
(1, 1, 'Approved'),
(2, 2, 'Approved'),
(3, 3, 'Not Approved'),
(4, 6, 'Approved'),
(5, 7, 'Approved'),
(6, 11, 'Approved'),
(7, 12, 'Approved'),
(9, 14, 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `date_generated` date DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `nric_passport_no` varchar(255) DEFAULT NULL,
  `clinical_summary_title` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `previous_study` varchar(255) DEFAULT NULL,
  `Examination_Date` date DEFAULT NULL,
  `status` enum('UnPaid','Paid') DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `doctor_id`, `transaction_id`, `file_path`, `category_id`, `date_generated`, `patient_name`, `dob`, `nric_passport_no`, `clinical_summary_title`, `age`, `gender`, `previous_study`, `Examination_Date`, `status`, `price`) VALUES
(16, 6, NULL, 'uploads\\1711406342977.jpg', 1, '2024-03-25', 'Inzamam', '2024-03-14', 'ed vjr', 'Form zypher', 19, 'Female', 'rvebjkd erk gtr', '2024-03-15', 'Paid', 500),
(17, 7, NULL, 'uploads\\1711448021889.jpg', 3, '2024-03-26', 'Soahib shoukat', '2024-03-13', '4thv55 4rtgrgef', 'Form zypher', 19, 'Male', 'Null', '2024-03-15', 'Paid', 600),
(18, 7, NULL, 'uploads\\1711448132994.png', 3, '2024-03-26', 'Soahib', '2024-03-15', '3efdbjio4vnmo545', 'Form zypher', 14, 'Male', '200035,4tvjl45tv6tb  gkvfgjk', '2024-03-03', 'Paid', 600),
(19, 7, NULL, 'uploads\\1711488226514.jpg', 3, '2024-03-26', 'Sohaib shoukat', '2024-03-13', '3520177921341', 'Center Lized', 20, 'Male', 'Continus headache in summer change', '2024-03-21', 'Paid', 600),
(20, 7, NULL, 'uploads\\1711488892604.jpg', 3, '2024-03-26', 'Soahib', '2024-03-15', '4thv55 4rtgrgef', 'Center Lized', 20, 'Male', ' trgrefgr evgbg r', '2024-03-29', 'Paid', 600);

-- --------------------------------------------------------

--
-- Table structure for table `radiologist`
--

CREATE TABLE `radiologist` (
  `radiologist_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('Approved','Not Approved') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `radiologist`
--

INSERT INTO `radiologist` (`radiologist_id`, `user_id`, `status`) VALUES
(1, 4, 'Approved'),
(2, 5, 'Approved'),
(3, 15, 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` int(11) NOT NULL,
  `radiologist_id` int(11) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `nric_passport_no` varchar(255) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `examination_date` date DEFAULT NULL,
  `date_generated` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `clinical_diagnostic_center` varchar(255) DEFAULT NULL,
  `previous_study` varchar(255) DEFAULT NULL,
  `findings` text DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `report_status` enum('UnPaid','Pending','Assigned','Complete') DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`report_id`, `radiologist_id`, `patient_name`, `dob`, `nric_passport_no`, `doctor_id`, `examination_date`, `date_generated`, `age`, `gender`, `clinical_diagnostic_center`, `previous_study`, `findings`, `summary`, `order_id`, `report_status`, `price`) VALUES
(12, 1, 'Inzamam', '2024-03-14', 'ed vjr', 6, '2024-03-15', '2024-03-26', 19, 'Female', 'Form zypher', 'rvebjkd erk gtr', 'sdjifclcd ', 'od jfiej fn dvkfv', 16, 'Complete', 500),
(13, 1, 'Soahib shoukat', '2024-03-13', '4thv55 4rtgrgef', 7, '2024-03-15', '2024-03-26', 19, 'Male', 'Form zypher', 'Null', 'Sohaib', 'eiwdbedwofk vewkerbfg', 17, 'Complete', 600),
(14, 2, 'Soahib', '2024-03-15', '3efdbjio4vnmo545', 7, '2024-03-03', NULL, 14, 'Male', 'Form zypher', '200035,4tvjl45tv6tb  gkvfgjk', NULL, NULL, 18, 'Assigned', 600),
(15, 1, 'Sohaib shoukat', '2024-03-13', '3520177921341', 7, '2024-03-21', '2024-03-26', 20, 'Male', 'Center Lized', 'Continus headache in summer change', 'You are good dont doo extra drama you are good', 'Dont be lazy and put so much drama in your life', 19, 'Complete', 600),
(16, 1, 'Soahib', '2024-03-15', '4thv55 4rtgrgef', 7, '2024-03-29', '2024-03-26', 20, 'Male', 'Center Lized', ' trgrefgr evgbg r', 'The person is putting drama he is perfect', 'no need for summary he is just lazy', 20, 'Complete', 600);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `transaction_record` varchar(255) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `radiologist_id` int(11) DEFAULT NULL,
  `date_generated` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('Radiologist','Doctor','Admin') DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT 'Malaysia',
  `guest_type` enum('Personal','Organization') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `organization`, `mobile_number`, `email`, `password`, `role`, `address_line_1`, `address_line_2`, `postcode`, `city`, `state`, `country`, `guest_type`) VALUES
(1, 'sohaib shoukat', 'Lahore', '03049117372', 'ffkgn@gmail.com', '$2a$10$AonbNAoqtZ/UGNYchfUi3.yyf0TVvX8X7g7FQqrHbFI1BLqSivcRq', 'Doctor', 'house 867 hassan block nishter calony lahore', '', '05441', 'Lahore', 'Punjab', 'Pakistan', 'Personal'),
(2, 'sohaib shoukat', 'Sohaib', '03049117372', 'sohaibshoukat9@gmail.com', '$2a$10$z7gUVqdgLsw86F2yA2Fafehom7KW7qQKvAYe2MHECYsFjZieV6wBa', 'Doctor', 'house 867 hassan block nishter calony lahore', '', '05441', 'Select...', 'Perlis', 'Malaysia', 'Personal'),
(3, 'sohaib shoukat', 'Sohaib', '03049117372', 'sohaibshoukat92@gmail.com', '$2a$10$.3fBHmuRvuOoeCYwJ4X6NOruERVv.kr/4BqkMkNiFR6SP6Xmc5/mu', 'Doctor', 'house 867 hassan block nishter calony lahore', '', '05441', 'Lahore', 'Perlis', 'Malaysia', 'Personal'),
(4, 'sohaib shoukat', 'Khubaib', '03049117372', 'khubaibshoukat@gmail.com', '$2a$10$LMT6pNKglpeY2Z4u1VCo1.WxGMwQ6IrFLMVziqgVzMbPGN2SIKJeC', 'Radiologist', 'house 867 hassan block nishter calony lahore', 'Near Chow Lahore', '05441', 'Lahore', 'Sabah', 'Malaysia', 'Personal'),
(5, 'sohaib shoukat', 'odsnkc d', '03049117372', 'sohaibshoukat94@gmail.com', '$2a$10$BiqbYmMIAn/nMSOu0h9q0.PpvFzXe7F/n8Pg8KwBNPQ6kRfrbIEx6', 'Radiologist', 'house 867 hassan block nishter calony lahore', '', '05441', 'Lahore', '', 'UK', 'Personal'),
(6, 'sohaib shoukat', 'odsnkc d', '03049117372', 'sohaibshoukat999794@gmail.com', NULL, 'Doctor', 'house 867 hassan block nishter calony lahore', '', '05441', 'Lahore', '', 'UK', 'Personal'),
(7, 'sohaib shoukat', 'Sohaib Organization', '03049117372', 'sohaibshoukat@gmail.com', '$2a$10$rXWQkXW3m3L5pnkpaE5CS.l50RXDnvjck6VGLfGC2HlG/ldat2OCK', 'Doctor', 'house 867 hassan block nishter calony lahore', '', '05441', 'Select...', 'Perak', 'Malaysia', 'Organization'),
(10, NULL, NULL, NULL, 'sohaibshoukat123@gmail.com', '$2a$10$DUEYzBb.gzmTSC1hnVw1i.ni62I0fkWr1lLiZrG91OEtSMdclbCLW', 'Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'sohaib shoukat', '', '03049117372', 'sohaibshoukat0@gmail.com', '$2a$10$FwxSNfl9mWS32r/.EWhDUOhKvpar2tCJb6zCYL/Zrw6eNlRaJq0NK', 'Doctor', 'house 867 hassan block nishter calony lahore', '', '05441', 'Select...', 'Sabah', 'Malaysia', 'Personal'),
(12, 'sohaib shoukat', 'Sohaib Pharma', '03049117372', 'sohaibshoukat00@gmail.com', '$2a$10$xeQ4ChGov6GXGpqsP5TE1.pE2jX8G6mIkqdXFWCdOGsX3R94EEuZ2', 'Doctor', 'house 867 hassan block nishter calony lahore', '', '05441', 'Lahore', 'Negeri Sembilan', 'Malaysia', 'Organization'),
(14, 'sohaib shoukat', 'AURLAB', '03049117372', 'sohaibshoukat9123@gmail.com', '12345', 'Doctor', 'house 867 hassan block nishter calony lahore', '', '05441', 'Lahore', 'Selangor', '', NULL),
(15, 'sohaib shoukat', '', '03049117372', 'sohaibshoukat9876@gmail.com', '12345', 'Radiologist', 'house 867 hassan block nishter calony lahore', '', '05441', 'Select...', 'Sabah', '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `transaction_id` (`transaction_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `radiologist`
--
ALTER TABLE `radiologist`
  ADD PRIMARY KEY (`radiologist_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `radiologist_id` (`radiologist_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `radiologist_id` (`radiologist_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `radiologist`
--
ALTER TABLE `radiologist`
  MODIFY `radiologist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `radiologist`
--
ALTER TABLE `radiologist`
  ADD CONSTRAINT `radiologist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`radiologist_id`) REFERENCES `radiologist` (`radiologist_id`),
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  ADD CONSTRAINT `report_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`radiologist_id`) REFERENCES `radiologist` (`radiologist_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
