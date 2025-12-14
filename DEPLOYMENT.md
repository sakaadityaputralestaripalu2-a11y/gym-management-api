# Deployment Documentation
Gym Management API

---

## 1. Repository GitHub
https://github.com/sakaadityaputralestaripalu2-a11y/gym-management-api

---

## 2. Production URL

Base URL:
http://54.227.83.243:3000

Health Check Endpoint:
GET http://54.227.83.243:3000/api

Response:
```json
{
  "success": true,
  "message": "Gym Management API - v1",
  "timestamp": "2025-12-14T00:00:00.000Z",
  "uptime": 12345
}
 
 //3. Detail AWS EC2
 Platform: AWS Academy Learner Lab
Service: Amazon EC2
Instance ID: i-0960c467c4829b54f
Instance Type: t2.micro
Operating System: Ubuntu Server 22.04 LTS
Region: us-east-1 (N. Virginia)
Public IPv4 Address: 54.227.83.243
Security Group (Inbound Rules):
SSH (22) – 0.0.0.0/0
HTTP (80) – 0.0.0.0/0
Custom TCP (3000) – 0.0.0.0/0

// 4.Langkah Deployment
 Koneksikan ke server AC2 : 
 ssh -i gym-key.pem ubuntu@54.227.83.243

 Update Sistem :
 sudo apt update && sudo apt upgrade -y

 install software yg dibutuhkan :

 install git
 sudo apt install git -y

 install nodejsv18
 curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

verifikasi :
node -v
npm -v (harus keluar no versi baik node maupun mpm)

Clone Repo :
git clone https://github.com/sakaadityaputralestaripalu2-a11y/gym-management-api.git
cd gym-management-api

Install Dependency : npm install

// 5. Konfigurasi Env Variable 
file .env dibuat di root project dengan variabel berikut (nilai tidak ditampilkan untuk keamanan)

NODE_ENV
PORT
DATABASE_URL
JWT_SECRET
JWT_EXPIRES_IN
JWT_REFRESH_SECRET
JWT_REFRESH_EXPIRES_IN


// 6. Setup Database
generate prisma client dengan : "npx prisma generate"

jalankan migration database dengan : "npx prisma migrate deploy"

// 7. App start
install pm2 :sudo apt install -g pm2

untuk menjalankan aplikasi 
pm2 start src/app.js --name gym api (server harus berstatus online)

// 8. Nginx Configuration
Tidak digunakan pada deployment ini.
Aplikasi dijalankan langsung menggunakan PM2 dan diakses melalui port 3000.

//9. Langkah Verif Deployment
untuk cek status aplikasi gunakan : pm2 status
untuk cek log aplikasi gunaan : pm2 logs gym-api

untuk test dari server :curl http://localhost:3000/api

test ddari browser :http://54.227.83.243:3000/api

//10, Troubleshooting

Api tidak bisa diakses = Pastikan port 3000 terbuka di Security Group

Aplikasi Crash = Cek log dengan "pm2 logs gym-api"

Error database = jalankan ulang "npx prisma migrate deploy"

//11. Monitoring
 Status Aplikasi : pm2 status
 log aplikasi : pm2 logs gym-api
 resource monitoring: pm2 monit

 //12. Maintenance
git pull origin main
npm install
pm2 restart gym-api





