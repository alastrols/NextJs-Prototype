-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2022 at 07:58 PM
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
(36, 3, 'TEST', '2022-06-03', '1654191920532.jpg', 'F1catalog.jpg', 'Show', 1, '2022-06-03 23:58:33'),
(39, 2, 'TEST6', '2022-06-05', '1654300617122.jpg', 'First Aid room - Copy.jpg', 'Hide', 2, '2022-06-03 23:58:33'),
(40, 0, 'TEST1', '2022-06-04', '1654300708516.jpg', 'fitness.jpg', 'Show', 2, '2022-06-03 23:58:47');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `blog_id` int(11) NOT NULL,
  `topic` text COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('Show','Hide') COLLATE utf8_unicode_ci NOT NULL,
  `post_date` date NOT NULL,
  `thumbnail` text COLLATE utf8_unicode_ci NOT NULL,
  `original_name` text COLLATE utf8_unicode_ci NOT NULL,
  `detail` text COLLATE utf8_unicode_ci NOT NULL,
  `arr` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`blog_id`, `topic`, `status`, `post_date`, `thumbnail`, `original_name`, `detail`, `arr`, `user_id`, `created_at`) VALUES
(2, 'TEST NEWS', 'Show', '2022-06-05', 'test.jpg', '', 'TEST', 2, 0, '2022-06-05 13:21:56'),
(3, 'TEST NEWS 2', 'Show', '2022-06-05', 'test.jpg', '', 'TEST', 0, 0, '2022-06-05 13:21:56'),
(5, 'Topic', 'Show', '2022-06-06', '1654448334898.png', 'cbimage.png', '<h1 style=\"text-align: center;\">Welcome to News Page</h1>\r\n<p style=\"text-align: center;\"><img src=\"http://localhost:3001/api/image/tinyupload/1654455347272.png\" alt=\"cbimage\" width=\"300\" height=\"214\"></p>\r\n<p style=\"text-align: left;\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<hr>\r\n<p style=\"text-align: left;\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<hr>\r\n<p style=\"text-align: left;\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<hr>\r\n<p style=\"text-align: left;\">&nbsp;</p>', 1, 2, '2022-06-05 16:58:54'),
(6, 'TTTT', 'Show', '2022-06-07', '1654537975337.png', 'cbimage.png', '<p>TEST</p>', 3, 2, '2022-06-06 17:52:55');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `topic` text COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('Show','Hide') COLLATE utf8_unicode_ci NOT NULL,
  `post_date` date NOT NULL,
  `thumbnail` text COLLATE utf8_unicode_ci NOT NULL,
  `original_name` text COLLATE utf8_unicode_ci NOT NULL,
  `detail` text COLLATE utf8_unicode_ci NOT NULL,
  `arr` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`news_id`, `topic`, `status`, `post_date`, `thumbnail`, `original_name`, `detail`, `arr`, `user_id`, `created_at`) VALUES
(2, 'TEST NEWS', 'Show', '2022-06-05', 'test.jpg', '', 'TEST', 2, 0, '2022-06-05 13:21:56'),
(3, 'TEST NEWS 2', 'Show', '2022-06-05', 'test.jpg', '', 'TEST', 0, 0, '2022-06-05 13:21:56'),
(5, 'Topic222', 'Show', '2022-06-07', '1654448334898.png', 'cbimage.png', '<h1 style=\"text-align: center;\">Welcome to News Page</h1>\r\n<p style=\"text-align: center;\"><img src=\"http://localhost:3001/api/image/tinyupload/1654455347272.png\" alt=\"cbimage\" width=\"300\" height=\"214\"></p>\r\n<p style=\"text-align: left;\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<hr>\r\n<p style=\"text-align: left;\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<hr>\r\n<p style=\"text-align: left;\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<hr>\r\n<p style=\"text-align: left;\">&nbsp;</p>', 1, 2, '2022-06-05 16:58:54');

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
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blog_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`);

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
  MODIFY `banner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
