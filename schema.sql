-- MediPulse Hospital Management System Database Schema
-- Multi-Tenant Hospital & Super Admin Tables

CREATE DATABASE IF NOT EXISTS `medipulse_hms` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `medipulse_hms`;

-- --------------------------------------------------------
-- Table structure for `hospitals`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `hospital_id` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Unique Hospital ID e.g. HOSP-8921',
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `city` VARCHAR(100) DEFAULT 'Central City',
  `admin_email` VARCHAR(150) NOT NULL,
  `admin_password` VARCHAR(255) NOT NULL,
  `plan` VARCHAR(50) DEFAULT 'Enterprise',
  `beds` VARCHAR(50) DEFAULT '200 Beds',
  `license_key` VARCHAR(100) DEFAULT NULL,
  `status` ENUM('Active', 'Provisioning', 'Suspended') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Sample Initial Data for `hospitals`
-- --------------------------------------------------------
INSERT INTO `hospitals` (`hospital_id`, `name`, `slug`, `city`, `admin_email`, `admin_password`, `plan`, `beds`, `license_key`, `status`) VALUES
('HOSP-8921', 'St. Jude Medical Center', 'stjude.medipulse.org', 'New York, NY', 'admin@stjude.org', 'StJudeAdmin@8921', 'Enterprise', '450 Beds', 'MP-8921-X9K2', 'Active'),
('HOSP-4410', 'City Care Trauma Institute', 'citycare.medipulse.org', 'Chicago, IL', 'admin@citycare.org', 'CityCarePass@4410', 'Premium', '280 Beds', 'MP-4410-T4M1', 'Active'),
('HOSP-3109', 'Metro Pediatrics Hospital', 'metroped.medipulse.org', 'Los Angeles, CA', 'admin@metroped.org', 'MetroPass@3109', 'Enterprise', '320 Beds', 'MP-3109-P8Q3', 'Active');
