-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2025 at 07:21 AM
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
-- Database: `rental_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_0286dd552c9bea9a69ecb3759e7b94777635514b', 'i:1;', 1749082337),
('laravel_cache_0286dd552c9bea9a69ecb3759e7b94777635514b:timer', 'i:1749082337;', 1749082337),
('laravel_cache_1574bddb75c78a6fd2251d61e2993b5146201319', 'i:2;', 1749082970),
('laravel_cache_1574bddb75c78a6fd2251d61e2993b5146201319:timer', 'i:1749082970;', 1749082970),
('laravel_cache_2e01e17467891f7c933dbaa00e1459d23db3fe4f', 'i:1;', 1749085935),
('laravel_cache_2e01e17467891f7c933dbaa00e1459d23db3fe4f:timer', 'i:1749085935;', 1749085935),
('laravel_cache_64e095fe763fc62418378753f9402623bea9e227', 'i:1;', 1749085772),
('laravel_cache_64e095fe763fc62418378753f9402623bea9e227:timer', 'i:1749085772;', 1749085772),
('laravel_cache_80e28a51cbc26fa4bd34938c5e593b36146f5e0c', 'i:1;', 1749087997),
('laravel_cache_80e28a51cbc26fa4bd34938c5e593b36146f5e0c:timer', 'i:1749087997;', 1749087997),
('laravel_cache_827bfc458708f0b442009c9c9836f7e4b65557fb', 'i:1;', 1749085114),
('laravel_cache_827bfc458708f0b442009c9c9836f7e4b65557fb:timer', 'i:1749085114;', 1749085114),
('laravel_cache_98fbc42faedc02492397cb5962ea3a3ffc0a9243', 'i:1;', 1749083047),
('laravel_cache_98fbc42faedc02492397cb5962ea3a3ffc0a9243:timer', 'i:1749083047;', 1749083047),
('laravel_cache_a9334987ece78b6fe8bf130ef00b74847c1d3da6', 'i:1;', 1749087296),
('laravel_cache_a9334987ece78b6fe8bf130ef00b74847c1d3da6:timer', 'i:1749087296;', 1749087296),
('laravel_cache_b7eb6c689c037217079766fdb77c3bac3e51cb4c', 'i:2;', 1749087164),
('laravel_cache_b7eb6c689c037217079766fdb77c3bac3e51cb4c:timer', 'i:1749087164;', 1749087164),
('laravel_cache_c5b76da3e608d34edb07244cd9b875ee86906328', 'i:3;', 1749087844),
('laravel_cache_c5b76da3e608d34edb07244cd9b875ee86906328:timer', 'i:1749087844;', 1749087844),
('laravel_cache_e1822db470e60d090affd0956d743cb0e7cdf113', 'i:1;', 1749086322),
('laravel_cache_e1822db470e60d090affd0956d743cb0e7cdf113:timer', 'i:1749086322;', 1749086322),
('laravel_cache_fb644351560d8296fe6da332236b1f8d61b2828a', 'i:2;', 1749083613),
('laravel_cache_fb644351560d8296fe6da332236b1f8d61b2828a:timer', 'i:1749083613;', 1749083613),
('laravel_cache_fe2ef495a1152561572949784c16bf23abb28057', 'i:1;', 1749083685),
('laravel_cache_fe2ef495a1152561572949784c16bf23abb28057:timer', 'i:1749083685;', 1749083685);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_06_02_093250_add_role_to_users_table', 2),
(5, '2025_06_04_020848_add_confirmation_code_to_users_table', 3),
(6, '2025_06_04_021128_add_confirmation_code_to_users_table', 4),
(7, '2025_06_04_021134_add_confirmation_code_to_users_table', 4),
(8, '2025_06_04_025523_add_email_verification_to_users_table', 5),
(9, '2025_06_04_034912_remove_verification_code_from_users_table', 6),
(10, '2025_06_04_062136_add_email_verified_at_to_users_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('VdzbNNfqktSyxOOdeOua3z5AjSRLKFiDFcYCbv0K', 54, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiemVBMkgxSmRFb0Rxc1RkZjlRMVhuRExnSk0xT0dBUmk3OHhqaGdJQiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6MzoidXJsIjthOjA6e31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo1NDt9', 1749089260);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('owner','staff','customer') NOT NULL DEFAULT 'customer',
  `email_verified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`, `role`, `email_verified_at`) VALUES
(16, 'Shanner Aldous Orcasitas', 'orcasitas.shanneraldous32@gmail.com', '$2y$12$Y3aRtRDQU3NhsDQF7EbsRuIVTQ/tKxZ8hJ04.pH8mHsHYwbCDr95O', 'trJsTQ3K0Y0RQrQUEAW0wJzAxtEqyTstrRFqpBnmuQYkuffKCSov37TtMqKi', '2025-06-02 17:58:40', '2025-06-04 16:54:46', 'customer', '2025-06-04 16:22:29'),
(17, 'Krisha Ann Casipong', 'casipongapril00@gmail.com', '$2y$12$pbTTmRYy17dg3tXqqjUSrevGSr5vOb.BJRtQjF/eV0Q8vGLMmq5om', NULL, '2025-06-02 18:00:28', '2025-06-02 18:00:28', 'staff', NULL),
(18, 'Sharoneth Andro Orcasitas', 'sharonethandroorcasitas@gmail.com', '$2y$12$FcCE2CSkbK5u8VQi/eBoq.YIQuRddjr.qKOxUQB9ctQ12Bl2L3tbC', NULL, '2025-06-02 18:01:18', '2025-06-02 18:01:18', 'owner', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
