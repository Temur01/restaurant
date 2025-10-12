# Backend Deployment - admin.beyoglu-karshi.com

## Subdomain: admin.beyoglu-karshi.com

Backend API sizning subdomeningizda deploy qilinadi.

---

## 1️⃣ Vercel ga Backend Deploy qilish

### A) Vercel Project yaratish

```bash
cd server

# Vercel CLI o'rnatish (agar yo'q bo'lsa)
npm install -g vercel

# Login qiling
vercel login

# Deploy
vercel
```

**Vercel savollari:**
- **Project name:** beyoglu-karshi-backend
- **Directory:** ./

### B) Environment Variables (Vercel Dashboard)

Vercel.com → Loyihangiz → **Settings** → **Environment Variables**:

```
DATABASE_URL = postgresql://user:password@host:5432/database
JWT_SECRET = your-super-secure-secret-key-change-this-now
ADMIN_USERNAME = admin
ADMIN_PASSWORD = your-secure-admin-password
NODE_ENV = production
PORT = 5000
```

### C) Custom Domain sozlash

1. Vercel Dashboard → Loyihangiz → **Settings** → **Domains**
2. **Add Domain** ni bosing
3. `admin.beyoglu-karshi.com` ni kiriting
4. Vercel sizga DNS record beradi

---

## 2️⃣ DNS Configuration (Domain Provider)

Domain provider da (Namecheap, GoDaddy, va h.k.) DNS settings ga kiring:

### CNAME Record qo'shing:

```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com  (Vercel bergan qiymat)
TTL: 3600
```

**Yoki A Record:**

```
Type: A
Name: admin
Value: 76.76.21.21  (Vercel IP - Vercel dashboard da ko'rsatiladi)
TTL: 3600
```

DNS yangilanishi 5-30 daqiqa davom etishi mumkin.

---

## 3️⃣ Frontend Configuration

### Vercel da Frontend Environment Variable:

Vercel.com → **beyoglu-karshi.com** loyihangiz → Settings → Environment Variables:

```
Name: VITE_API_URL
Value: https://admin.beyoglu-karshi.com/api
Environment: Production
```

**Keyin frontend ni redeploy qiling:**

```bash
cd /Users/user/Desktop/restaraunt
git add .
git commit -m "Update API URL to production subdomain"
git push
```

Vercel avtomatik redeploy qiladi.

---

## 4️⃣ Backend Build Configuration

Vercel loyihangizda **Settings** → **Build & Development Settings**:

```
Build Command: npm install && npm run build
Output Directory: dist
Install Command: npm install
```

---

## 5️⃣ SSL Certificate

Vercel avtomatik SSL certificate beradi (Let's Encrypt).

Subdomain deploy bo'lgandan keyin avtomatik HTTPS ishlaydi: ✅ https://admin.beyoglu-karshi.com

---

## 6️⃣ Test qilish

### Backend test:

```bash
# Health check
curl https://admin.beyoglu-karshi.com/api/health

# Meals API
curl https://admin.beyoglu-karshi.com/api/meals
```

### Frontend test:

1. https://beyoglu-karshi.com ochilsin
2. Admin panel: https://beyoglu-karshi.com/admin
3. Login qiling
4. Taomlarni CRUD qilishni test qiling

---

## 🚨 Muammolarni Hal Qilish

### CORS Error:
✅ Server kodda CORS to'g'ri sozlangan (cors origin: beyoglu-karshi.com)

### Database connection error:
- PostgreSQL database ishlab turganini tekshiring
- DATABASE_URL to'g'ri ekanini tekshiring
- Database firewall Vercel IP ga ruxsat berganini tekshiring

### 404 errors:
- Vercel routing `dist/server.js` ga to'g'ri yo'naltirilganini tekshiring
- `vercel.json` to'g'ri sozlanganini tekshiring

---

## 📊 Alternative: Railway.app (Tavsiya)

Agar Vercel da muammo bo'lsa, Railway osonroq:

### Railway.app bilan:

1. https://railway.app ga kiring
2. **New Project** → **Deploy from GitHub**
3. `server` papkasini tanlang
4. **Add PostgreSQL** (avtomatik database)
5. Environment variables qo'shing
6. **Settings** → **Domains** → Custom Domain: `admin.beyoglu-karshi.com`
7. Railway sizga CNAME beradi: `your-app.up.railway.app`
8. DNS Provider da CNAME qo'shing:
   ```
   Type: CNAME
   Name: admin
   Value: your-app.up.railway.app
   ```

---

## ✅ Final Checklist

- [ ] Backend Vercel/Railway da deploy qilindi
- [ ] Environment variables sozlandi
- [ ] Custom domain `admin.beyoglu-karshi.com` qo'shildi
- [ ] DNS CNAME/A record sozlandi
- [ ] SSL certificate ishlayapti (https)
- [ ] Frontend `VITE_API_URL` yangilandi
- [ ] Frontend qayta deploy qilindi
- [ ] API test qilindi va ishlayapti
- [ ] Admin panel login ishlayapti
- [ ] CRUD operatsiyalar ishlayapti

---

## 🎉 Deploy Bo'lgandan Keyin

✅ **Frontend:** https://beyoglu-karshi.com  
✅ **Backend API:** https://admin.beyoglu-karshi.com/api  
✅ **Admin Panel:** https://beyoglu-karshi.com/admin

Hammasi tayyor! 🚀

