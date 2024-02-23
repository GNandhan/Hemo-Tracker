-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2024 at 11:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
  `acc_mail` varchar(100) NOT NULL,
  `acc_phno` varchar(50) NOT NULL,
  `acc_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `acceptor`
--

INSERT INTO `acceptor` (`acc_id`, `acc_fname`, `acc_lname`, `acc_gender`, `acc_mail`, `acc_phno`, `acc_password`) VALUES
(1, 'Anand', 'biju', 'male', 'anand123@gmail.com', '2147483647', 'anand123@'),
(2, 'Athulya', 'jayaprakash', 'Female', 'athulya123@gmail.com', '657845', 'athulya123@'),
(3, 'Sufiyan', 'km', 'male', 'gowrinandhan95@gmail.com', '2147483647', 'jishna123@'),
(4, 'Anurudh', 'ravichandran', 'Male', 'anirudh123@gmail.com', '2147483647', 'anirudh123@'),
(5, 'abhinand', 'm pillai', 'Male', 'abhinand123@gmail.com', '2147483647', 'abhinand123@'),
(6, 'Anand', 'gowrinandhan', 'Male', 'tyuyuj@gmail.com', '2147483647', 'sufiyan123@'),
(7, 'anandhu', 'kk', 'Female', 'anandhu123@gmail.com', '2147483647', 'anandhu123@'),
(8, 'Amalraj', 'rajan', 'Male', 'amalraj123@gmail.com', '2147483647', 'amalraj123@'),
(9, 'aravind', 'jayan', 'Male', 'aravindj123@gmail.com', '2147483647', 'aravindj123@'),
(10, 'mahesh', 'babu', 'Male', 'mahesh123@gmail.com', '2147483647', 'mahesh123@'),
(11, 'mathew', 'thomas', 'Male', 'mathew123@gmail.com', '8596478587', 'mathew123@'),
(12, 'sujatha', 'rajan', 'Female', 'sujatha123@gmail.com', '6598875498', 'sujatha123@'),
(13, 'abhraham', 'simon', 'Male', 'abhraham123@gmail.com', '1245879865', 'abhraham123@'),
(14, 'ram', 'divakar', 'Male', 'ram123@gmail.com', '9856987452', 'ram123@'),
(15, 'abhiram', 'jay', 'Male', 'abhiram123@gmail.com', '9865875452', 'abhiram123@'),
(16, 'dev', 'nandhan', 'Male', 'dev123@gmail.com', '8475848574', 'dev123@'),
(17, 'thejus', 'krishna', 'Male', 'thejus123@gmail.com', '3265988754', 'thejus123@'),
(18, 'naushad', 'vava', 'Male', 'naushad123@gmail.com', '2585967845', 'naushad123@'),
(19, 'JIshna', 'm', 'Female', 'jishnam111@gmail.com', '8754986554', 'jishnam111@'),
(20, 'alphy', 'jojo', 'Female', 'alphy123@gmail.com', '5241784596', 'alphy123@'),
(21, 'alphy', 'jojo', 'Male', 'alphy123@gmail.com', '8574985652', 'alphy123@'),
(22, 'aaa', 'bbb', 'Male', 'aaa12@gmail.com', '9988665598', 'aaa12@'),
(23, 'kareem', 'lala', 'Male', 'kareem123@gmail.com', '8956748556', 'kareem123@'),
(24, 'dathu', 'palthu', 'Male', 'dathu123@gmail.com', '8754986598', 'dathu123@'),
(25, 'salman', 'muhammed', 'Male', 'salman123@gmail.com', '8754986587', 'salman123@'),
(26, 'Nandha', 'Mohan', 'Female', 'nandha123@gmail.com', '8754986587', 'nandha123@'),
(27, 'amaljith', 'das', 'Male', 'amaljith123@gmail.com', '9865875498', 'amaljith123@'),
(28, 'adarsh', 'raju', 'Male', 'adarsh123@gmail.com', '8798658754', 'adarsh123@'),
(29, 'Jishna', 'MK', 'Female', 'jishnamk9@gmail.com', '9865875498', 'jishnamk9@'),
(30, 'abhishek', 'sir', 'Male', 'abhishek123@gmail.com', '9865875498', 'abhishek123@'),
(31, 'JIshna', 'MK', 'Female', 'jishnamk9@gmail.com', '8798658754', 'jishnamk9@'),
(32, 'jishna', 'k', 'Female', 'jishnamk9@gmail.com', '08113846443', 'jishna123@'),
(33, 'jishna', 'k', 'Female', 'jishnamk9@gmail.com', '08113846443', 'jishna123@'),
(34, 'Mehrof', 'Muhammed', 'Male', 'jishnamk9@gmail.com', '9865875498', 'jishnamk9@'),
(35, 'Nandhu', 'MS', 'Male', 'gnandhan2026@gmail.com', '8113846443', 'gnandhan2026@');

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
(9, 'devu', 'kutty', 'Female', '18', '2008-05-05', 'devu23@gmail.com', 'O+', '9867564789', 'kottayam', 'Alaska', 'devu123', 678945),
(10, 'malavika', 'a', 'Female', '20', '2003-06-08', 'malu8@gmail.com', 'O+', '8978764523', 'petta', 'Alabama', 'malu89', 678945),
(11, 'manu', 'n', 'Male', '25', '1999-01-01', 'manu@gmail.com', 'AB-', '89345678', 'trivandrum', 'Alabama', 'manu890', 678954),
(12, 'surya', 'mol', 'Female', '18', '2006-01-01', 'surya12', 'O-', '9876543212', 'petta', 'Alabama', 'surya', 686579),
(13, 'abhinav', 'Krishna', 'Male', '20', '2024-02-01', 'abhin@gmail.com', 'A+', '9685748556', 'Thodupuzha', 'Alabama', 'abhinav123@', 685586),
(14, 'avinash', 'narayan', 'Male', '30', '2024-02-20', 'avinash123@gmail.com', 'A+', '9865329865', 'Thrissur', 'Alabama', 'avinash123@', 986578),
(16, 'Abdul', 'Kareem', 'Male', '25', '2024-02-01', 'kareem123@gmail.com', 'A+', '9865875498', 'kozhikode', 'Kerala', 'kareem123@', 875498),
(17, 'Gowrinandhan', 'S', 'Male', '21', '2024-02-01', 'gowrinandhan95@gmail.com', 'B+', '8113846443', 'Thodupuzha', 'Kerala', 'gowri123@', 685586),
(18, 'Nandha', 'Mohan', 'Female', '22', '2024-02-08', 'nandha123@gmail.com', 'O+', '5598875498', 'ernakulam', 'Kerala', 'nandha123@', 986587),
(19, 'arjun', 'das', 'Male', '26', '2024-02-20', 'arjun123@gmail.com', 'AB-', '8754986554', 'Thrissur', 'Kerala', 'arjun123@', 658798),
(20, 'arjun', 'das', 'Male', '26', '2024-02-20', 'arjun123@gmail.com', 'AB-', '8754986554', 'Thrissur', 'Kerala', 'arjun123@', 658798),
(21, 'adarsh', 'raju', 'Male', '26', '2024-02-13', 'adarsh123@gmail.com', 'B+', '9887549865', 'kasargod', 'Kerala', 'adarsh123@', 659887),
(22, 'abhishek', 'sir', 'Male', '22', '2024-02-01', 'abhishek123@gmail.com', 'O+', '8754986587', 'kozhikode', 'Kerala', 'abhishek123@', 965878),
(23, 'Gowrinandhan', 'S', 'Male', '21', '2002-06-26', 'gowrinandhan95@gmail.com', 'A+', '8113846443', 'Thodupuzha', 'Kerala', 'gowri123@', 685586),
(24, 'jishna', 'k', 'Female', '22', '2024-02-22', 'jishnamk9@gmail.com', 'AB-', '08113846443', 'Kondotty', 'Kerala', 'jishna123@', 685586),
(25, 'nanda', 'm', 'Female', '21', '2024-02-22', 'gowrinandhan95@gmail.com', 'AB-', '08113846443', 'Thodupuzha', 'Kerala', 'nandha123@', 685586),
(26, 'Gowrinandhan', 'S', 'Male', '21', '2002-06-26', 'gowrinandhan95@gmail.com', 'B+', '8113846443', 'Thodupuzha', 'Kerala', 'gowrinandhan95@', 685586);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `req_id` int(11) NOT NULL,
  `donor_id` int(11) NOT NULL,
  `acceptor_id` int(11) NOT NULL,
  `status` enum('pending','active') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`req_id`, `donor_id`, `acceptor_id`, `status`) VALUES
(1, 26, 35, 'active'),
(2, 26, 1, '');

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
  MODIFY `acc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `donor`
--
ALTER TABLE `donor`
  MODIFY `don_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
