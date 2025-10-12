# Beyougli Karshi - Restoran Veb-sayti 🍽️

O'zbek milliy taomlarini taqdim etuvchi zamonaviy, to'liq moslashuvchan restoran menyu veb-sayti va admin panel. React, TypeScript, Node.js va PostgreSQL yordamida yaratilgan.

## 🚀 Tez Boshlash

**Batafsil o'rnatish qo'llanmasi uchun [SETUP.md](./SETUP.md) faylini ko'ring.**

```bash
# 1. PostgreSQL database yarating
createdb beyougli_karshi

# 2. Backend o'rnatish
cd server
npm install
# .env faylini sozlang
npm run build
npm run db:migrate
npm run dev

# 3. Frontend o'rnatish (yangi terminal)
cd ..
npm install
npm run dev
```

**Admin Panel**: http://localhost:5173/admin
- Username: `admin`
- Password: `admin123`

## ✨ Xususiyatlar

### Frontend
- 📱 **To'liq Moslashuvchan Dizayn** - Mobil, planshet va kompyuterlarda mukammal
  - Mobil: 1 ustunli tartib
  - Planshet: 2 ustun
  - Kompyuter: 3 ustun
  - Katta Kompyuter: 4 ustun
- 🎨 **Chiroyli UI/UX** - Gradient effektlar va animatsiyalar bilan zamonaviy dizayn
- 🎯 **Kengaytirilgan Header** - Professional sarlavha qismi
- 📋 **Boy Footer** - Ijtimoiy tarmoqlar, aloqa, ish vaqti
- 🍕 **Taom Kartalari** - Rasm, narx, tarkib va tavsif
- 🇺🇿 **O'zbek tili** - Butun sayt o'zbek tilida
- 🍖 **Milliy Taomlar** - O'zbek oshxonasining an'anaviy taomlari
- ⚡ **Tez va Javobkor** - Vite bilan optimal ishlash

### Backend & Admin Panel
- 🔐 **JWT Authentication** - Xavfsiz admin kirish tizimi
- 📊 **Admin Dashboard** - Taomlarni boshqarish paneli
- ✏️ **CRUD Operatsiyalar** - Taomlarni qo'shish, tahrirlash, o'chirish
- 💾 **PostgreSQL Database** - Barqaror ma'lumotlar bazasi
- 🔒 **Bcrypt Encryption** - Parollar xavfsiz shifrlangan
- 🚀 **RESTful API** - To'liq funktsional API endpoints
- 📝 **TypeScript** - Backend ham typed

## 🛠️ Texnologiyalar

### Frontend
- **React 18.2.0** - UI kutubxonasi
- **TypeScript 5.3.3** - Type xavfsizligi
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Vite 5.0.8** - Build vosita va dev server
- **React Router 6.21.1** - Routing
- **Axios 1.6.5** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **TypeScript 5.3.3** - Type xavfsizligi

## Boshlash

### Talablar

- Node.js (v16 yoki yuqori)
- npm yoki yarn

### O'rnatish

1. Bog'liqliklarni o'rnating:
```bash
npm install
```

2. Development serverni ishga tushiring:
```bash
npm run dev
```

3. Brauzeringizni oching va `http://localhost:5173` manziliga o'ting

### Production uchun Build qilish

```bash
npm run build
```

Qurilgan fayllar `dist` papkasida bo'ladi.

### Production Build-ni ko'rish

```bash
npm run preview
```

## 📁 Loyiha Strukturasi

```
restaraunt/
├── src/                          # Frontend source
│   ├── components/
│   │   ├── Header.tsx           # Header komponent
│   │   ├── Footer.tsx           # Footer komponent
│   │   └── MealCard.tsx         # Taom kartasi komponent
│   ├── pages/
│   │   ├── HomePage.tsx         # Asosiy sahifa
│   │   ├── AdminLogin.tsx       # Admin login sahifasi
│   │   └── AdminDashboard.tsx   # Admin dashboard
│   ├── services/
│   │   └── api.ts               # API client (Axios)
│   ├── App.tsx                  # Router setup
│   ├── main.tsx                 # Entry point
│   └── types.ts                 # TypeScript types
├── server/                       # Backend source
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts      # PostgreSQL configuration
│   │   ├── controllers/
│   │   │   ├── authController.ts    # Auth logic
│   │   │   └── mealsController.ts   # Meals CRUD logic
│   │   ├── middleware/
│   │   │   └── auth.ts          # JWT middleware
│   │   ├── routes/
│   │   │   ├── authRoutes.ts    # Auth endpoints
│   │   │   └── mealsRoutes.ts   # Meals endpoints
│   │   ├── database/
│   │   │   ├── schema.sql       # Database schema
│   │   │   └── migrate.ts       # Migration script
│   │   └── server.ts            # Express server
│   ├── package.json
│   └── tsconfig.json
├── package.json
├── SETUP.md                     # Batafsil o'rnatish qo'llanmasi
└── README.md
```

## 🔧 Admin Panel Ishlatish

1. **Login**: http://localhost:5173/admin ga o'ting
2. **Kirish**: Username: `admin`, Password: `admin123`
3. **Dashboard**: Taomlar ro'yxatini ko'ring
4. **Qo'shish**: "Yangi taom qo'shish" tugmasini bosing
5. **Tahrirlash**: Taom yonidagi "Tahrirlash" ni bosing
6. **O'chirish**: Taom yonidagi "O'chirish" ni bosing

### API dan Foydalanish

```javascript
// Barcha taomlarni olish
GET http://localhost:5000/api/meals

// Yangi taom qo'shish (Token kerak)
POST http://localhost:5000/api/meals
Headers: { Authorization: "Bearer YOUR_TOKEN" }
Body: {
  "name": "Yangi Taom",
  "image": "https://...",
  "description": "Tavsif",
  "price": 25000,
  "category": "Kategoriya",
  "ingredients": ["ingredient1", "ingredient2"]
}
```

## Manzil

**Beyougli Karshi**
- Manzil: Qarshi shahri, Nasaf ko'chasi, 123-uy
- Telefon: +998 99 123-45-67
- Email: info@beyouglikarshi.uz

## Litsenziya

MIT

## Aloqa

Savollar yoki fikr-mulohazalar uchun biz bilan bog'laning!

