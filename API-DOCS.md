# Gym Management API — Documentation

## Base URL
http://localhost:3000/api

Production URL akan diisi setelah deployment AWS EC2.

---

## Authentication & Authorization
API ini menggunakan JWT (JSON Web Token).

Header untuk endpoint protected:
Authorization: Bearer <accessToken>

Role yang tersedia:
- USER
- ADMIN

---

## AUTHENTICATION

### Register User
POST /auth/register

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "User123!"
}

Response 201:
{
  "success": true,
  "message": "User registered successfully"
}

---

### Login
POST /auth/login

Request Body:
{
  "email": "john@example.com",
  "password": "User123!"
}

Response 200:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "JWT_ACCESS_TOKEN",
    "refreshToken": "JWT_REFRESH_TOKEN",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    }
  }
}

---

### Get Current User
GET /auth/me  
Requires Authentication

Response 200:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}

---

### Refresh Token
POST /auth/refresh

Request Body:
{
  "refreshToken": "JWT_REFRESH_TOKEN"
}

Response 200:
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "NEW_ACCESS_TOKEN"
  }
}

---

## MEMBERSHIP PLAN (ADMIN)

### Create Membership Plan
POST /plans  
ADMIN only

Request Body:
{
  "name": "Basic",
  "price": 300000,
  "durationInDays": 30,
  "description": "Basic membership plan"
}

Response 201:
{
  "success": true,
  "message": "Membership plan created",
  "data": {
    "id": 1,
    "name": "Basic",
    "price": 300000,
    "durationInDays": 30
  }
}

---

### Get Membership Plans
GET /plans

Query Params:
- page
- limit
- search

Response 200:
{
  "success": true,
  "message": "List membership plans",
  "data": [],
  "pagination": {
    "totalRecords": 1,
    "totalPages": 1,
    "currentPage": 1,
    "limit": 10
  }
}

---

## MEMBER

### Create Member
POST /members  
USER

Request Body:
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "08123456789",
  "membershipPlanId": 1
}

Response 201:
{
  "success": true,
  "message": "Member created",
  "data": {
    "id": 1,
    "fullName": "John Doe"
  }
}

---

### Update Member
PUT /members/:id  
Owner or ADMIN

Request Body:
{
  "fullName": "John Updated"
}

Response 200:
{
  "success": true,
  "message": "Member updated"
}

---

## GYM CLASS

### Create Gym Class
POST /classes  
ADMIN

Request Body:
{
  "name": "Morning Yoga",
  "description": "Yoga for beginners",
  "scheduleTime": "2025-12-20T08:00:00Z",
  "maxParticipants": 10
}

Response 201:
{
  "success": true,
  "message": "Class created"
}

---

### Get Gym Classes
GET /classes

Query Params:
- page
- limit
- search
- date

Response 200:
{
  "success": true,
  "message": "List classes",
  "data": [],
  "pagination": {
    "totalRecords": 1,
    "totalPages": 1
  }
}

---

## BOOKING (Many-to-Many)

### Create Booking
POST /bookings  
USER

Request Body:
{
  "memberId": 3,
  "gymClassId": 3
}

Response 201:
{
  "success": true,
  "message": "Booking created",
  "data": {
    "id": 1,
    "status": "CONFIRMED"
  }
}

---

### Cancel Booking
POST /bookings/:id/cancel  
Owner or ADMIN

Response 200:
{
  "success": true,
  "message": "Booking cancelled"
}

---

### List All Bookings
GET /bookings  
ADMIN

Response 200:
{
  "success": true,
  "data": []
}

---

## Test Credentials (For Demo)

Admin Account:
email: admin@gym.com  
password: Admin123!

User Account:
email: memberbaru@gym.com  
password: User123!

---

## Notes
- Password di-hash menggunakan bcrypt
- JWT bersifat stateless
- Access token berlaku ±15 menit
- Refresh token berlaku ±7 hari
- Ownership check mencegah Broken Object Level Authorization (BOLA)
- API mengikuti OWASP Security Guidelines

---

## Status
Backend API telah:
- Mengimplementasikan authentication & authorization
- Menggunakan Prisma ORM
- Memiliki relasi one-to-many dan many-to-many
- Siap di-deploy ke AWS EC2
