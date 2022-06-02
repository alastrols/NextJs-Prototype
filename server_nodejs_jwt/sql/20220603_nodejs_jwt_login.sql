-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2022 at 10:07 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_jwt_login`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `banner_id` int(11) NOT NULL,
  `arr` int(11) NOT NULL,
  `banner_name` text COLLATE utf8_unicode_ci NOT NULL,
  `post_date` date NOT NULL,
  `banner` text COLLATE utf8_unicode_ci NOT NULL,
  `original_name` text COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('Show','Hide') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Show',
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`banner_id`, `arr`, `banner_name`, `post_date`, `banner`, `original_name`, `status`, `user_id`, `created_at`) VALUES
(33, 0, 'TEST', '2022-06-03', '1654191920532.jpg', 'F1catalog.jpg', 'Show', 1, '2022-06-02 20:05:42'),
(36, 2, 'TEST', '2022-06-03', '1654191920532.jpg', 'F1catalog.jpg', 'Show', 1, '2022-06-02 20:00:17'),
(37, 1, 'TEST2', '2022-06-04', '1654192812028.jpg', 'F1catalog.jpg', 'Show', 1, '2022-06-02 20:05:42'),
(38, 3, 'TEST2', '2022-06-04', '1654192812056.jpg', 'F1catalog.jpg', 'Hide', 1, '2022-06-02 20:00:17');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `fullname` text COLLATE utf8_unicode_ci NOT NULL,
  `username` text COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `fullname`, `username`, `password`, `created_at`) VALUES
(1, 'Suphavit Bunnag', 'admin', '$2a$08$s8GxcIWNDIyx4yWFxdgwOuVTdMLMJl5HxFs.SAObaPEKxV9Nl1bZq', '2022-05-16 13:23:22'),
(2, 'Suphavit Bunnag', 'alastrol', '$2a$08$LvuImBEsWQ2oNc4/5T8Sm.i2VDXI4VxWrCNw/l.c4ceAqpQiM.FNu', '2022-06-01 17:52:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `banner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
