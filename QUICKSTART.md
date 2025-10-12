# 🚀 Tez Boshlash - Beyougli Karshi

## 1-Qadam: PostgreSQL o'rnating va database yarating

```bash
# PostgreSQL o'rnatish (macOS)
brew install postgresql@15
brew services start postgresql@15

# Database yaratish
createdb beyougli_karshi
```

## 2-Qadam: Backend ishga tushirish

```bash
cd server

# Paketlarni o'rnatish
npm install

# .env faylini yaratish
cat > .env << EOF
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/beyougli_karshi
JWT_SECRET=mening-maxfiy-kalitim-123456789
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NODE_ENV=development
EOF

# Database ni migrate qilish
npm run build
npm run db:migrate

# Serverni ishga tushirish
npm run dev
```

✅ Backend tayyor: http://localhost:5000

## 3-Qadam: Frontend ishga tushirish

Yangi terminal oching:

```bash
cd /Users/user/Desktop/restaraunt

# Paketlarni o'rnatish
npm install

# Development serverni ishga tushirish
npm run dev
```

✅ Frontend tayyor: http://localhost:5173

## 4-Qadam: Saytdan foydalaning

### Oddiy Foydalanuvchi:
🌐 http://localhost:5173 - Asosiy sahifa

### Admin Panel:
🔐 http://localhost:5173/admin

**Login Ma'lumotlari:**
- Username: `admin`
- Password: `admin123`

## Nima Qilish Mumkin?

✅ **Admin Panel da:**
- ➕ Yangi taom qo'shish
- ✏️ Taomlarni tahrirlash
- 🗑️ Taomlarni o'chirish
- 📸 Rasm URL qo'shish
- 💰 Narx belgilash
- 🥘 Tarkibni boshqarish

✅ **Asosiy Sayt:**
- 👀 Barcha taomlarni ko'rish
- 📱 Mobil, planshet va kompyuterda ishlaydi
- 🇺🇿 To'liq o'zbek tilida

## API Endpoints

### Public (Token shart emas):
```bash
GET http://localhost:5000/api/meals          # Barcha taomlar
GET http://localhost:5000/api/meals/:id      # Bitta taom
```

### Protected (Token kerak):
```bash
POST   http://localhost:5000/api/meals       # Yangi taom
PUT    http://localhost:5000/api/meals/:id   # Taomni yangilash
DELETE http://localhost:5000/api/meals/:id   # Taomni o'chirish
```

### Authentication:
```bash
POST http://localhost:5000/api/auth/login    # Kirish
GET  http://localhost:5000/api/auth/verify   # Token tekshirish
```

## Muammolar?

❌ **Port band bo'lsa:**
```bash
# Portni o'zgartirish (server/.env):
PORT=5001
```

❌ **Database connection error:**
```bash
# PostgreSQL ishlab turganini tekshiring:
pg_isready

# Serverni qayta ishga tushiring:
brew services restart postgresql@15
```

❌ **CORS error:**
- Backend serveri ishlab turganini tekshiring
- Ikkalasi ham bir vaqtda ishlab turishi kerak

## Keyingi Qadamlar

📚 Batafsil ma'lumot uchun:
- [SETUP.md](./SETUP.md) - To'liq o'rnatish qo'llanmasi
- [README.md](./README.md) - Loyiha hujjatlari
- [server/README.md](./server/README.md) - Backend API hujjatlari

---

**Omad tilaydi!** 🎉

Beyougli Karshi - Mazali O'zbek Taomlari 🍽️

