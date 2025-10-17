# Vercel Setup Guide - Beyoglu Karshi

## Frontend: beyoglu-karshi.com
## Backend: admin.beyoglu-karshi.com
---

## 📱 Frontend Setup (beyoglu-karshi.com)

### 1. Vercel ga frontend deploy qiling:

```bash
cd /Users/user/Desktop/restaraunt

# Agar Vercel CLI yo'q bo'lsa
npm install -g vercel

# Deploy
vercel
```

### 2. Environment Variable qo'shing:

Vercel Dashboard → Loyihangiz → Settings → Environment Variables:

```
Name: VITE_API_URL
Value: https://admin.beyoglu-karshi.com/api
Environment: Production
```

### 3. Custom Domain:

Vercel Dashboard → Settings → Domains → Add Domain:
- `beyoglu-karshi.com`
- `www.beyoglu-karshi.com`

### 4. DNS Settings (Domain Provider):

```
# Root domain
Type: A
Name: @
Value: 76.76.21.21

# WWW subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🔧 Backend Setup (admin.beyoglu-karshi.com)

### 1. Backend deploy qiling:

```bash
cd /Users/user/Desktop/restaraunt/server

# Deploy
vercel
```

### 2. Environment Variables:

Vercel Dashboard → Backend Project → Settings → Environment Variables:

```
DATABASE_URL = postgresql://user:pass@host:5432/db
JWT_SECRET = super-secure-secret-key
ADMIN_USERNAME = admin
ADMIN_PASSWORD = secure-password
NODE_ENV = production
PORT = 5000
```

### 3. Custom Domain:

Vercel Dashboard → Settings → Domains → Add Domain:
- `admin.beyoglu-karshi.com`

### 4. DNS Settings:

```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com  (yoki Vercel bergan qiymat)
```

---

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Tavsiya)

1. Vercel Dashboard → Backend Project → Storage
2. Create → Postgres
3. DATABASE_URL avtomatik sozlanadi

### Option 2: Railway.app Postgres

1. https://railway.app
2. New Project → PostgreSQL
3. Copy DATABASE_URL
4. Vercel Environment Variables ga qo'shing

### Option 3: Neon.tech (Serverless Postgres)

1. https://neon.tech
2. Create Project
3. Copy connection string
4. Vercel ga qo'shing

---

## ✅ Tekshirish

### Frontend:
```bash
curl https://beyoglu-karshi.com
# Yoki brauzerda oching
```

### Backend API:
```bash
# Health check
curl https://admin.beyoglu-karshi.com/api/health

# Get meals
curl https://admin.beyoglu-karshi.com/api/meals
```

### Admin Panel:
1. https://beyoglu-karshi.com/admin
2. Login: admin / your-password
3. Test CRUD operations

---

## 🚀 Git Push va Auto Deploy

```bash
# O'zgarishlarni commit qiling
git add .
git commit -m "Production deployment configuration"
git push origin main

# Vercel avtomatik deploy qiladi!
```

---

## 📞 Yordam Kerakmi?

Agar muammo bo'lsa:
1. Vercel Logs ni tekshiring
2. Environment variables to'g'ri ekanini tekshiring
3. DNS propagation (5-30 daqiqa) kutib ko'ring
4. [BACKEND_DEPLOYMENT.md](./BACKEND_DEPLOYMENT.md) ga qarang

Hammasi tayyor! 🎉

