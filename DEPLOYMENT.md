# Deployment Guide - Beyougli Karshi

## Muammo: "Taomlarni yuklashda xatolik yuz berdi"

Bu xato frontend backend API ga ulana olmagani uchun yuz beradi. Vercel da faqat frontend deploy qilgansiz, backend esa hali deploy qilinmagan.

## Yechim: 3 ta variant

### ✅ Variant 1: Backend ni ham Vercel ga deploy qilish (Tavsiya etiladi)

#### 1. Backend uchun alohida Vercel loyihasi yaratish:

```bash
cd server

# Vercel CLI o'rnatish (agar o'rnatilmagan bo'lsa)
npm install -g vercel

# Vercel ga login qiling
vercel login

# Backend ni deploy qiling
vercel
```

Vercel savollarga javoblar:
- **Set up and deploy?** → `Y`
- **Project name?** → `beyoglu-karshi-api`
- **Directory?** → `./`

#### 2. Environment Variables sozlash:

Vercel Dashboard da (https://vercel.com/dashboard):
1. Loyihangizni tanlang → Settings → Environment Variables
2. Quyidagilarni qo'shing:

```
DATABASE_URL = postgresql://user:password@host:5432/database
JWT_SECRET = your-production-secret-key-very-secure
ADMIN_USERNAME = admin
ADMIN_PASSWORD = your-secure-password-change-this
NODE_ENV = production
```

**⚠️ DIQQAT**: Production uchun PostgreSQL database kerak!

#### 3. Frontend environment variable sozlash:

Vercel Dashboard da **frontend** loyihangiz uchun:
1. Settings → Environment Variables
2. Qo'shish:

```
VITE_API_URL = https://beyoglu-karshi-api.vercel.app/api
```

(Backend URL ni o'zingiznikiga o'zgartiring)

#### 4. Frontend ni qayta deploy qiling:

```bash
cd /Users/user/Desktop/restaraunt
vercel --prod
```

---

### ✅ Variant 2: Railway.app da backend deploy qilish (Osonroq)

Railway PostgreSQL database bilan birga keladi!

#### 1. Railway account yarating: https://railway.app

#### 2. Yangi loyiha yarating:
- "New Project" → "Deploy from GitHub repo"
- Yoki "Empty Project" → PostgreSQL qo'shing

#### 3. PostgreSQL qo'shing:
- "New" → "Database" → "PostgreSQL"

#### 4. Backend ni deploy qiling:
- "New" → "GitHub Repo" → server papkasini tanlang

#### 5. Environment Variables:
```
DATABASE_URL = (Automatically set by Railway)
JWT_SECRET = your-secret-key
ADMIN_USERNAME = admin
ADMIN_PASSWORD = secure-password
NODE_ENV = production
PORT = 5000
```

#### 6. Railway URL ni oling va Vercel ga qo'shing:

Vercel da frontend uchun:
```
VITE_API_URL = https://your-app.railway.app/api
```

---

### ✅ Variant 3: Render.com da deploy qilish (Bepul tier bor)

#### 1. Render.com ga kiring: https://render.com

#### 2. PostgreSQL database yarating:
- "New" → "PostgreSQL"

#### 3. Web Service yarating:
- "New" → "Web Service"
- Connect GitHub repo
- **Build Command**: `cd server && npm install && npm run build`
- **Start Command**: `cd server && npm start`

#### 4. Environment Variables qo'shing

#### 5. Vercel da frontend URL ni yangilang

---

## Tezkor Yechim: Serverless Function (Oddiy loyihalar uchun)

Agar backend juda oddiy bo'lsa, Vercel Serverless Functions ishlatishingiz mumkin:

### 1. Backend kodini Vercel Serverless ga o'zgartirish:

```bash
cd /Users/user/Desktop/restaraunt
mkdir -p api
```

**Eslatma**: Bu variant murakkab backend uchun mos emas. To'liq backend deploy qilish yaxshiroq.

---

## 🎯 Tavsiya etilgan yechim:

**Railway.app** dan foydalaning - eng oson va PostgreSQL bilan birga keladi!

### Railway.app bilan qadamlar:

1. **Railway.app** ga boring va GitHub bilan login qiling
2. **New Project** → **Provision PostgreSQL** 
3. **Add GitHub Repo** → server papkangizni tanlang
4. Environment variables ni sozlang (DATABASE_URL avtomatik)
5. Deploy URL ni oling (masalan: `https://beyoglu-karshi-api.up.railway.app`)
6. Vercel frontend Settings da:
   ```
   VITE_API_URL = https://beyoglu-karshi-api.up.railway.app/api
   ```
7. Frontend ni qayta deploy qiling

---

## Hozirgi xatolikni tuzatish:

Agar backend hali deploy qilinmagan bo'lsa, vaqtinchalik yechim:

### Frontend da fallback meals qo'shish:

Murojaat qiling - men frontend ga fallback ma'lumotlar qo'shib beray, backend tayyor bo'lguncha ishlaydi.

---

## Qo'shimcha yordam:

Qaysi variant bilan davom etishni xohlaysiz?
1. Railway.app (Oson + Database)
2. Vercel + External Database
3. Render.com (Bepul tier)

Menga ayting, men tanlagan variantingiz bo'yicha batafsil ko'rsatma beray! 🚀

