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
  `admin_name` VARCHAR(150) NOT NULL DEFAULT 'Dr. Sarah Jenkins',
  `admin_email` VARCHAR(150) NOT NULL,
  `admin_password` VARCHAR(255) NOT NULL,
  `doctor_count` INT DEFAULT 24,
  `patient_count` INT DEFAULT 450,
  `join_date` DATE DEFAULT '2026-01-15',
  `plan` VARCHAR(50) DEFAULT 'Enterprise',
  `beds` VARCHAR(50) DEFAULT '200 Beds',
  `status` ENUM('Active', 'Suspended') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Initial Seed Data
-- --------------------------------------------------------
INSERT INTO `hospitals` (`hospital_id`, `name`, `slug`, `city`, `admin_name`, `admin_email`, `admin_password`, `doctor_count`, `patient_count`, `join_date`, `plan`, `beds`, `status`) VALUES
('HOSP-8921', 'St. Jude Medical Center', 'stjude.medipulse.org', 'New York, NY', 'Dr. Sarah Jenkins', 'admin@stjude.org', 'StJudeAdmin@8921', 48, 1420, '2026-01-10', 'Enterprise', '450 Beds', 'Active'),
('HOSP-4410', 'City Care Trauma Institute', 'citycare.medipulse.org', 'Chicago, IL', 'Dr. Marcus Brody', 'admin@citycare.org', 'CityCarePass@4410', 32, 890, '2026-02-01', 'Premium', '280 Beds', 'Active'),
('HOSP-3109', 'Metro Pediatrics Hospital', 'metroped.medipulse.org', 'Los Angeles, CA', 'Dr. Elena Rostova', 'admin@metroped.org', 'MetroPass@3109', 26, 610, '2026-02-12', 'Enterprise', '320 Beds', 'Active'),
('HOSP-7023', 'Apex Heart & Vascular Clinic', 'apexheart.medipulse.org', 'Houston, TX', 'Dr. Arthur Pendelton', 'admin@apexheart.org', 'ApexPass@7023', 18, 340, '2026-08-05', 'Standard', '120 Beds', 'Suspended');
