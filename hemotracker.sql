-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2024 at 05:21 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hemotracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `acceptor`
--

CREATE TABLE `acceptor` (
  `acc_id` int(11) NOT NULL,
  `acc_fname` varchar(100) NOT NULL,
  `acc_lname` varchar(100) NOT NULL,
  `acc_gender` varchar(100) NOT NULL,
  `acc_age` varchar(100) NOT NULL,
  `acc_dob` date NOT NULL,
  `acc_mail` varchar(100) NOT NULL,
  `acc_blood` varchar(50) NOT NULL,
  `acc_phno` int(50) NOT NULL,
  `acc_location` varchar(100) NOT NULL,
  `acc_state` varchar(100) NOT NULL,
  `acc_password` varchar(100) NOT NULL,
  `acc_pin` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `acceptor`
--

INSERT INTO `acceptor` (`acc_id`, `acc_fname`, `acc_lname`, `acc_gender`, `acc_age`, `acc_dob`, `acc_mail`, `acc_blood`, `acc_phno`, `acc_location`, `acc_state`, `acc_password`, `acc_pin`) VALUES
(1, 'Anand', 'biju', 'male', '22', '2024-02-15', 'anand123@gmail.com', 'B-', 2147483647, 'kozhikode', 'kerala', 'anand123@', 0),
(2, 'Athulya', 'jayaprakash', 'Female', '19', '2024-02-07', 'athulya123@gmail.com', 'B+', 657845, 'Alappuzha', 'kerala', 'athulya123@', 0),
(3, 'Sufiyan', 'km', 'male', '20', '2024-02-27', 'gowrinandhan95@gmail.com', 'O+', 2147483647, 'Thodupuzha', 'Kerala', 'jishna123@', 0),
(4, 'Anurudh', 'ravichandran', 'Male', '32', '2024-02-29', 'anirudh123@gmail.com', 'O+', 2147483647, 'Kozhikode', 'Alabama', 'anirudh123@', 659854);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_email` varchar(100) NOT NULL,
  `admin_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_name`, `admin_email`, `admin_password`) VALUES
(1, 'Abu Sufiyan', 'sufiyan@gmail.com', 'sufiyan@');

-- --------------------------------------------------------

--
-- Table structure for table `donor`
--

CREATE TABLE `donor` (
  `don_id` int(11) NOT NULL,
  `don_fname` varchar(100) NOT NULL,
  `don_lname` varchar(100) NOT NULL,
  `don_gender` varchar(100) NOT NULL,
  `don_age` varchar(100) NOT NULL,
  `don_dob` varchar(50) NOT NULL,
  `don_mail` varchar(100) NOT NULL,
  `don_blood` varchar(50) NOT NULL,
  `don_phno` varchar(50) NOT NULL,
  `don_location` varchar(100) NOT NULL,
  `don_state` varchar(100) NOT NULL,
  `don_password` varchar(100) NOT NULL,
  `don_pin` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donor`
--

INSERT INTO `donor` (`don_id`, `don_fname`, `don_lname`, `don_gender`, `don_age`, `don_dob`, `don_mail`, `don_blood`, `don_phno`, `don_location`, `don_state`, `don_password`, `don_pin`) VALUES
(1, 'Anand', 'Mohan', 'male', '21', '2024-02-01', 'anand123@gmail.com', 'B+', '9865328754', 'Kozhikode', 'kerala', 'anand123@', 658784),
(2, 'Sufiyan', 'muhammed', 'male', '26', '2024-02-07', 'sufiyan123@gmail.com', 'O-', '8754216598', 'Kozhikode', 'Kerala', 'sufiyan123@', 658957),
(3, 'jobin', 'ks', 'male', '23', '2024-02-13', 'jobin123@gmail.com', 'A+', '9865875421', 'Thrissur', 'kerala', 'jobin123@', 685968),
(4, 'Athira', 's', 'Female', '26', '2024-02-20', 'athira123@gmail.com', 'AB-', '6598326554', 'Malappuram', 'Alabama', 'athira123@', 685986),
(5, 'Manu', 'sudeer', 'Male', '30', '1991-02-06', 'manu123@gmail.com', 'A-', '6587549865', 'Alappuzha', 'Alabama', 'manu123@', 654785),
(6, 'Albert', 'joshy', 'Male', '26', '2024-02-06', 'albertjosh123@gmail.com', 'B+', '9584875498', 'kochi', 'Alabama', 'albertjosh123@', 652845),
(7, 'Mohan', 'Das', 'Male', '12', '2024-02-29', 'mohana12@mail.com', 'O+', '9865875492', 'Kayamkulam', 'Alabama', 'mohana12@', 657485),
(8, 'arathy', 'anilkumar', 'Female', '20', '2003-07-02', 'arathy123@gmail.com', 'A+', '123456789', 'pala', 'Alabama', 'arathy678', 686579),
(10, 'devu', 'kutty', 'Female', '18', '2008-05-05', 'devu23@gmail.com', 'O+', '9867564789', 'kottayam', 'Alaska', 'devu123', 678945),
(11, 'malavika', 'a', 'Female', '20', '2003-06-08', 'malu8@gmail.com', 'O+', '8978764523', 'petta', 'Alabama', 'malu89', 678945),
(12, 'manu', 'n', 'Male', '25', '1999-01-01', 'manu@gmail.com', 'AB-', '89345678', 'trivandrum', 'Alabama', 'manu890', 678954),
(13, 'surya', 'mol', 'Female', '18', '2006-01-01', 'surya12', 'O-', '9876543212', 'petta', 'Alabama', 'surya', 686579),
(14, 'abhinav', 'Krishna', 'Male', '20', '2024-02-01', 'abhin@gmail.com', 'A+', '9685748556', 'Thodupuzha', 'Alabama', 'abhinav123@', 685586);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `req_id` int(11) NOT NULL,
  `req_donor` int(11) NOT NULL,
  `req_Acceptor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acceptor`
--
ALTER TABLE `acceptor`
  ADD PRIMARY KEY (`acc_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `donor`
--
ALTER TABLE `donor`
  ADD PRIMARY KEY (`don_id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`req_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acceptor`
--
ALTER TABLE `acceptor`
  MODIFY `acc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `donor`
--
ALTER TABLE `donor`
  MODIFY `don_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `req_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
