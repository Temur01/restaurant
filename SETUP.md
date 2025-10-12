# Beyougli Karshi - To'liq O'rnatish Qo'llanmasi

## Loyiha Haqida

Beyougli Karshi - React, TypeScript, Node.js va PostgreSQL yordamida yaratilgan zamonaviy restoran veb-sayti va admin panel.

## Xususiyatlar

✅ **Frontend**:
- React 18 + TypeScript
- Tailwind CSS
- To'liq responsive dizayn
- React Router
- Axios API client

✅ **Backend**:
- Node.js + Express
- PostgreSQL database
- JWT authentication
- RESTful API
- TypeScript

✅ **Admin Panel**:
- Taomlarni qo'shish, tahrirlash, o'chirish
- Rasm, narx, tarkib boshqaruvi
- Xavfsiz autentifikatsiya

## 1. PostgreSQL O'rnatish

### macOS:
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Windows:
PostgreSQL.org dan installer yuklab oling va o'rnating.

## 2. Database Yaratish

```bash
# PostgreSQL CLI ga kiring
psql postgres

# Database yaratish
CREATE DATABASE beyougli_karshi;

# Chiqish
\q
```

## 3. Backend O'rnatish

```bash
cd server

# Paketlarni o'rnatish
npm install

# .env faylini yaratish
touch .env
```

`.env` faylini quyidagicha to'ldiring:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/beyougli_karshi
JWT_SECRET=o-zingizning-maxfiy-kalitingiz-12345678
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

**⚠️ Muhim**: `password` ni o'z PostgreSQL parolingizga o'zgartiring!

```bash
# Database migrate
npm run build
npm run db:migrate

# Serverni ishga tushirish
npm run dev
```

Server http://localhost:5000 da ishga tushadi.

## 4. Frontend O'rnatish

Yangi terminal oching:

```bash
cd /Users/user/Desktop/restaraunt

# Paketlarni o'rnatish
npm install

# Development serverni ishga tushirish
npm run dev
```

Frontend http://localhost:5173 da ochiladi.

## 5. Saytdan Foydalanish

### Oddiy Foydalanuvchi:
1. Brauzeringizda http://localhost:5173 ni oching
2. Barcha taomlarni ko'ring

### Admin Panel:
1. http://localhost:5173/admin ga o'ting
2. Login qiling:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Taomlarni boshqaring (CRUD operatsiyalari)

## 6. API Endpoints

### Public Endpoints:
- `GET http://localhost:5000/api/meals` - Barcha taomlar
- `GET http://localhost:5000/api/meals/:id` - Bitta taom

### Protected Endpoints (Token kerak):
- `POST http://localhost:5000/api/meals` - Yangi taom
- `PUT http://localhost:5000/api/meals/:id` - Taomni yangilash
- `DELETE http://localhost:5000/api/meals/:id` - Taomni o'chirish

### Authentication:
- `POST http://localhost:5000/api/auth/login` - Kirish
- `GET http://localhost:5000/api/auth/verify` - Token tekshirish

## 7. Production Build

### Backend:
```bash
cd server
npm run build
npm start
```

### Frontend:
```bash
npm run build
npm run preview
```

## Muammolarni Hal Qilish

### Database Connection Error:
- PostgreSQL ishlab turganini tekshiring: `pg_isready`
- DATABASE_URL to'g'ri sozlanganini tekshiring
- Parol va port raqamini tekshiring

### CORS Error:
- Backend serveri ishlab turganini tekshiring
- Frontend API URL to'g'ri ekanini tekshiring (`src/services/api.ts`)

### Authentication Error:
- Token localStorage da saqlanganini tekshiring
- Backend va frontend bir vaqtda ishlab turganini tekshiring

## Texnologiyalar

**Frontend**:
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.0
- React Router DOM 6.21.1
- Axios 1.6.5
- Vite 5.0.8

**Backend**:
- Node.js
- Express 4.18.2
- PostgreSQL (pg 8.11.3)
- TypeScript 5.3.3
- JWT (jsonwebtoken 9.0.2)
- Bcrypt 5.1.1

## Litsenziya

MIT

## Muallif

Beyougli Karshi Restaurant

