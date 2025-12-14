# Gym Management API

Backend REST API untuk sistem manajemen gym, dibangun menggunakan Node.js, Express.js, Prisma ORM, dan JWT Authentication.  
Aplikasi ini di-deploy ke cloud menggunakan AWS EC2.

---

## 🌐 Production API Access

API telah berhasil di-deploy dan dapat diakses melalui public internet.

### Base URL
http://54.227.83.243:3000

---

### Health Check Endpoint
Endpoint ini digunakan untuk memastikan aplikasi berjalan dengan normal.

**Endpoint:**
GET /api


**Full URL:**


http://54.227.83.243:3000/api


**Response (HTTP 200):**
```json
{
  "success": true,
  "message": "Gym Management API - v1",
  "timestamp": "2025-12-14T00:00:00.000Z",
  "uptime": 12345
}


Endpoint health check:

Tidak memerlukan autentikasi
Dapat diakses secara publik
Mengembalikan status aplikasi, pesan, timestamp, dan uptime
Availability
API dapat diakses melalui public internet
URL production terdokumentasi dalam repository ini
API aktif dan berjalan setelah proses deployment
URL akan tetap aktif minimal 2 minggu setelah deadline pengumpulan

//Documentation

Detail API tersedia di file API-DOCS.md
Panduan deployment tersedia di file DEPLOYMENT.md


Test Credentials (For Testing Only)

Admin Account:

Email: admin@gym.com

Password: Admin123!

Regular User Account:

Email: member1@gym.com

Password: User123!

Credentials ini hanya digunakan untuk keperluan testing dan demonstrasi.