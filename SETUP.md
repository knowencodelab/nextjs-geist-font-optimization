# The Fourth Sealing Hub - Enhanced E-Learning Platform Setup Guide

## 🚀 Platform Overview

This enhanced version of The Fourth Sealing Hub includes:
- **Updated Course Details**: All courses now 6 weeks duration at KES 42,000
- **MySQL Database Integration**: Complete database schema for production use
- **Enhanced Registration Form**: Comprehensive student registration with all required fields
- **Payment Integration Ready**: Support for MPESA, Bank, and Paybill payments
- **Responsive Design**: Modern, captivating landing page with gradient themes
- **Course Schedule Integration**: Based on the provided COURSE SCHEDULE.pdf

## 📋 Prerequisites

- Node.js 18+ and npm
- MySQL 8.0+
- Git (optional)

## 🗄️ Database Setup

### 1. Install MySQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# macOS
brew install mysql
brew services start mysql

# Windows
# Download from https://dev.mysql.com/downloads/installer/
```

### 2. Create Database and User
```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE fourth_sealing_hub;

-- Create user (replace 'password' with your secure password)
CREATE USER 'fourth_sealing_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON fourth_sealing_hub.* TO 'fourth_sealing_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Run Database Setup Script
```bash
# Install dependencies
npm install mysql2

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# Then run setup script
npm run db:setup
```

## 🔧 Environment Configuration

Create `.env` file in root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=fourth_sealing_user
DB_PASSWORD=your_secure_password
DB_NAME=fourth_sealing_hub

# Payment Configuration (MPESA)
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=http://localhost:8000/api/payment/callback

# App Configuration
NEXTAUTH_URL=http://localhost:8000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

## 📦 Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Access the platform
# Enhanced landing page: http://localhost:8000/page-enhanced
# Enhanced registration: http://localhost:8000/register/enhanced
```

## 🎯 Course Details (Updated)

All courses now feature:
- **Duration**: 6 weeks intensive training
- **Fee**: KES 42,000 per program
- **Schedule**: Evening classes (6:00 PM - 8:00 PM or 6:30 PM - 8:30 PM)
- **Mode**: Hybrid (Theoretical/Practical)

### Available Programs:
1. **Informatics and Data Science for Health** - Mon-Fri 6:00 PM - 8:00 PM
2. **Research Data Management & Project Evaluation** - Tue-Thu 7:00 PM - 9:00 PM
3. **Systems Security Assertion** - Mon-Wed 6:30 PM - 8:30 PM
4. **Advanced Analytics & Machine Learning** - Tue-Thu-Sat 6:00 PM - 8:00 PM

## 📝 Registration Form Fields

The enhanced registration includes:

### A. Personal Information
- Full Name
- Date of Birth
- Gender (Male/Female/Other)
- National ID/Passport Number
- Phone Number (WhatsApp enabled)
- Email Address
- Current Address (City/County)

### B. Educational & Professional Background
- Highest Academic Qualification
- Area of Study
- Institution Attended
- Current Occupation/Role
- Organization

### C. Program Details
- Preferred Learning Mode (Theoretical/Practical/Hybrid)
- Motivation for Joining

### D. Payment Information
- Total Program Fee: KES 42,000
- Amount Paid
- Payment Method (MPESA/Bank/Paybill)
- Transaction Code/Receipt No.
- Balance Calculation

### E. Emergency Contact
- Full Name
- Relationship to Applicant
- Phone Number

## 💳 Payment Integration Setup

### MPESA Integration (Daraja API)
1. Register at https://developer.safaricom.co.ke/
2. Create app and get consumer key/secret
3. Update .env with your credentials
4. Test with sandbox credentials first

### Bank Transfer Setup
- Provide bank details in registration confirmation
- Manual verification process
- Receipt upload functionality

### Paybill Setup
- Dedicated paybill number for the institution
- Automated verification system

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach
- **Gradient Themes**: Blue to indigo color scheme
- **Modern UI**: Clean, professional appearance
- **Interactive Elements**: Hover effects and animations
- **Accessibility**: WCAG 2.1 compliant

## 🔐 Security Features

- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Rate limiting on API endpoints

## 📊 Database Schema

The MySQL database includes:
- `users` table for authentication
- `student_profiles` for detailed registration
- `courses` table with updated pricing
- `payments` table for transaction tracking

## 🚀 Production Deployment

### Environment Variables for Production
```env
# Production Database
DB_HOST=your_production_host
DB_USER=your_production_user
DB_PASSWORD=your_production_password
DB_NAME=your_production_database

# Production Payment
MPESA_CONSUMER_KEY=production_key
MPESA_CONSUMER_SECRET=production_secret
MPESA_SHORTCODE=production_shortcode
MPESA_PASSKEY=production_passkey
```

### Build Commands
```bash
npm run build
npm start
```

## 📞 Support

For technical support:
- Email: thefourthsealing@outlook.com
- Website: www.fourthsealing.com
- Phone: +254 XXX XXX XXX

## 🔄 Migration from Previous Version

If upgrading from the previous version:
1. Backup existing data
2. Run database migration scripts
3. Update environment variables
4. Test payment integrations
5. Deploy new registration flow
