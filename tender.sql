-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2024 at 10:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tender`
--

-- --------------------------------------------------------

--
-- Table structure for table `bids`
--

CREATE TABLE `bids` (
  `id` int(11) NOT NULL,
  `tenderId` int(11) NOT NULL,
  `userId` varchar(25) NOT NULL,
  `companyName` text NOT NULL,
  `bidCost` double NOT NULL,
  `bidTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `isLastFiveMinutesFlag` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bids`
--

INSERT INTO `bids` (`id`, `tenderId`, `userId`, `companyName`, `bidCost`, `bidTime`, `isLastFiveMinutesFlag`, `createdAt`) VALUES
(3, 1, 'akash.@gmail.com', 'ene', 20000, '2024-10-18 07:19:04', 0, '2024-10-18 07:19:04'),
(5, 3, 'akash.@gmail.com', 'ene', 509890000, '2024-10-18 07:20:28', 0, '2024-10-18 07:20:28');

-- --------------------------------------------------------

--
-- Table structure for table `tenders`
--

CREATE TABLE `tenders` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text DEFAULT NULL,
  `startTime` text NOT NULL,
  `endTime` text NOT NULL,
  `bufferTime` int(11) DEFAULT NULL,
  `status` text DEFAULT 'open',
  `createdBy` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tenders`
--

INSERT INTO `tenders` (`id`, `name`, `description`, `startTime`, `endTime`, `bufferTime`, `status`, `createdBy`, `createdAt`, `updatedAt`) VALUES
(1, 'Construction of New Office Building', 'This tender involves the construction of a modern office building with sustainable features.', '2024-10-17T22:31', '2024-10-25T22:31', 30, 'open', 'me', '2024-10-17 17:06:45', '2024-10-17 17:06:45'),
(3, 'Construction of New Office Building', 'This tender involves the construction of a modern office building with sustainable features.', '2024-10-17T22:31', '2024-10-25T22:31', 30, 'open', 'me', '2024-10-17 17:08:23', '2024-10-17 17:08:23'),
(12, 'Renovation of Historic Library', 'This tender involves the renovation of a historic library to modernize facilities while preserving its architectural integrity.', '2024-10-01T09:00', '2024-11-15T18:00', 30, 'open', '', '2024-10-18 08:55:07', '2024-10-18 08:55:07'),
(13, 'Construction of Community Park', 'The project includes the construction of a new community park with walking trails, playgrounds, and sports facilities.', '2024-10-10T08:00', '2024-12-01T17:00', 45, 'open', '', '2024-10-18 08:55:07', '2024-10-18 08:55:07'),
(14, 'Solar Energy Farm Development', 'This tender is for the development of a solar energy farm, including the installation of solar panels and supporting infrastructure.', '2024-10-20T10:00', '2024-11-30T15:00', 20, 'open', '', '2024-10-18 08:55:07', '2024-10-18 08:55:07'),
(15, 'Construction of New Bridge', 'The scope of this tender is to build a new bridge over the river to improve transportation links in the area.', '2024-10-05T11:00', '2024-11-05T12:00', 15, 'open', '', '2024-10-18 08:55:07', '2024-10-18 08:55:07'),
(16, 'Traffic Management System Installation', 'This project focuses on the installation of a new traffic management system to enhance road safety and efficiency.', '2024-10-12T09:00', '2024-11-25T14:30', 30, 'open', '', '2024-10-18 08:55:07', '2024-10-18 08:55:07'),
(17, 'Construction of New Hospital', 'This tender involves the construction of a state-of-the-art hospital equipped with the latest medical technology.', '2024-10-20T09:30', '2024-12-15T20:00', 25, 'open', '', '2024-10-18 08:55:07', '2024-10-18 08:55:07'),
(18, 'High School Construction Project', 'The project aims to build a new high school to accommodate the growing student population in the district.', '2024-10-01T10:00', '2024-11-22T16:00', 30, 'open', '', '2024-10-18 08:55:07', '2024-10-18 08:55:07'),
(19, 'Smart Water Management System', 'This tender involves the implementation of a smart water management system to reduce wastage and improve efficiency.', '2024-10-15T11:00', '2024-11-10T13:00', 30, 'open', '', '2024-10-18 08:55:07', '2024-10-18 08:55:07'),
(20, 'Construction of Sports Complex', 'The scope of this project is to construct a new sports complex, including indoor and outdoor facilities for various sports.', '2024-10-25T08:30', '2024-12-05T15:00', 40, 'open', '', '2024-10-18 08:55:07', '2024-10-18 08:55:07'),
(21, 'Railway Station Upgrade', 'This tender is for the upgrade of the existing railway station to enhance passenger facilities and operational efficiency.', '2024-10-28T10:00', '2024-11-18T17:00', 20, 'open', '', '2024-10-18 08:55:07', '2024-10-18 08:55:07');

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `_id` int(11) NOT NULL,
  `userName` varchar(125) NOT NULL,
  `email` varchar(125) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `password` varchar(125) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_accounts`
--

INSERT INTO `user_accounts` (`_id`, `userName`, `email`, `mobile`, `password`, `role`) VALUES
(1, 'devAsad', 'asad.test@gmail.com', '9876543210', '$2b$10$uZ9OAzC6t0V93EsfM/SgRuTyjr8nr2SE8PEqLWBnQmVXwsANJtOR6', 'admin'),
(4, 'akash', 'akash.@gmail.com', '84464563217', '$2b$10$GSmV9vh9TNu7aPrbLVAOK.bhDIMrHebbZxHwjFUrGorPGdbxbDg7i', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bids`
--
ALTER TABLE `bids`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tenderId` (`tenderId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `tenders`
--
ALTER TABLE `tenders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bids`
--
ALTER TABLE `bids`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tenders`
--
ALTER TABLE `tenders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_accounts`
--
ALTER TABLE `user_accounts`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bids`
--
ALTER TABLE `bids`
  ADD CONSTRAINT `bids_ibfk_1` FOREIGN KEY (`tenderId`) REFERENCES `tenders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
