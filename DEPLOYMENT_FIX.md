# 🚀 Deployment Fix Guide

## Issue
The `api.beyoglu-karshi.com` domain is returning 404 errors for `/api/categories` and other endpoints.

## Root Cause
The Vercel project for the backend API needs to be configured to deploy from the `server` folder.

## Solution

### Option 1: Using Vercel Dashboard (Recommended)

1. **Go to your Backend API Vercel project**:
   - Open Vercel Dashboard
   - Find the project for `api.beyoglu-karshi.com`

2. **Configure Root Directory**:
   - Go to **Settings** → **General**
   - Find **Root Directory** setting
   - Set it to: `server`
   - Click **Save**

3. **Redeploy**:
   - Go to **Deployments**
   - Click on the latest deployment
   - Click **... (three dots)** → **Redeploy**

### Option 2: Using Vercel CLI

```bash
cd /Users/user/Desktop/restaraunt/server

# Link to your Vercel project
vercel link

# Deploy to production
vercel --prod
```

## Verification Steps

After redeployment, test these endpoints:

```bash
# 1. Health check
curl https://api.beyoglu-karshi.com/api/health

# 2. Categories
curl https://api.beyoglu-karshi.com/api/categories

# 3. Meals
curl https://api.beyoglu-karshi.com/api/meals

# 4. Swagger UI
open https://api.beyoglu-karshi.com/api-docs

# 5. Swagger JSON
curl https://api.beyoglu-karshi.com/api-docs.json
```

## Expected Results

✅ Health check should return: `{"status":"OK","message":"Server ishlayapti"}`
✅ Categories should return: `{"success":true,"categories":[...]}`
✅ Meals should return: `{"success":true,"meals":[...]}`
✅ Swagger UI should show API documentation (not white screen)

## Project Structure

You have TWO separate Vercel projects:

### 1. Frontend Project (beyoglu-karshi.com)
- **Repository**: https://github.com/Temur01/restaurant.git
- **Root Directory**: `.` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Domains**:
  - beyoglu-karshi.com
  - www.beyoglu-karshi.com
  - admin.beyoglu-karshi.com

### 2. Backend API Project (api.beyoglu-karshi.com)
- **Repository**: https://github.com/Temur01/restaurant.git
- **Root Directory**: `server` ⚠️ **IMPORTANT**
- **Build Command**: `npm run build`
- **Framework Preset**: Other
- **Domain**:
  - api.beyoglu-karshi.com

## Common Issues

### Issue: 404 on all API endpoints
**Cause**: Root directory not set to `server`
**Fix**: Set Root Directory to `server` in Vercel project settings

### Issue: Swagger shows white screen
**Cause**: Swagger config looking for .ts files instead of .js files
**Fix**: Already fixed in latest commit (uses compiled .js files in production)

### Issue: CORS errors
**Cause**: Domain not in allowed origins list
**Fix**: Check `server/src/server.ts` line 16-24 for allowed origins

## Environment Variables

Make sure these are set in your Backend API Vercel project:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Should be `production`

## Need Help?

If issues persist, check Vercel deployment logs:
1. Go to Vercel Dashboard
2. Select your backend API project
3. Click on latest deployment
4. Check **Build Logs** and **Function Logs**

