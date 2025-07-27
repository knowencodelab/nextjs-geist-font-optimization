const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  try {
    // Connect to MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    console.log('Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'fourth_sealing_hub'}`);
    console.log('Database created or already exists');

    // Use the database
    await connection.execute(`USE ${process.env.DB_NAME || 'fourth_sealing_hub'}`);

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'instructor', 'admin') DEFAULT 'student',
        approved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created');

    // Create student_profiles table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS student_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNIQUE,
        date_of_birth DATE,
        gender ENUM('Male', 'Female', 'Other'),
        national_id VARCHAR(50),
        phone_number VARCHAR(20),
        current_address TEXT,
        highest_qualification VARCHAR(100),
        area_of_study VARCHAR(100),
        institution_attended VARCHAR(255),
        current_occupation VARCHAR(100),
        organization VARCHAR(255),
        learning_mode ENUM('Theoretical', 'Practical', 'Hybrid'),
        motivation TEXT,
        emergency_contact_name VARCHAR(255),
        emergency_contact_relationship VARCHAR(100),
        emergency_contact_phone VARCHAR(20),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Student profiles table created');

    // Create courses table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        duration VARCHAR(50),
        fee DECIMAL(10,2),
        schedule TEXT,
        modules JSON,
        outline TEXT,
        lecture_content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Courses table created');

    // Create payments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        course_id INT,
        amount DECIMAL(10,2),
        payment_method ENUM('MPESA', 'Bank', 'Paybill'),
        transaction_code VARCHAR(100),
        status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      )
    `);
    console.log('Payments table created');

    // Insert sample courses
    await connection.execute(`
      INSERT INTO courses (title, description, duration, fee, schedule, modules, outline, lecture_content) VALUES
      ('Informatics and Data Science for Health', 'Comprehensive program covering Python, R, and health data analytics with practical applications', '6 weeks', 42000.00, 'Week 1-6: Monday-Friday 6:00 PM - 8:00 PM', '["Health Informatics Fundamentals", "Python for Health Data", "Statistical Analysis", "Machine Learning Applications", "Data Visualization", "Final Project"]', 'Detailed 6-week curriculum covering health informatics and data science', 'Introduction to health informatics and data science applications'),
      ('Research Data Management and Project Evaluation', 'Master systematic approaches to managing research data and evaluating project outcomes effectively', '6 weeks', 42000.00, 'Week 1-6: Tuesday-Thursday 7:00 PM - 9:00 PM', '["Research Data Lifecycle", "Data Management Planning", "Statistical Analysis", "Project Evaluation", "Reporting & Dissemination", "Final Project"]', 'Comprehensive 6-week program on research data management', 'Introduction to research data management principles'),
      ('Systems Security Assertion', 'Comprehensive cybersecurity training focusing on system security assessment and implementation', '6 weeks', 42000.00, 'Week 1-6: Monday-Wednesday 6:30 PM - 8:30 PM', '["Security
