# Vercel KV Setup Guide

This application uses Vercel KV (Redis-compatible key-value store) for persistent session storage. This ensures that user sessions survive server restarts and deployments.

## Setup Instructions

### 1. Create Vercel KV Database

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Navigate to the **Storage** tab
3. Click **Create Database**
4. Select **KV** (Key-Value Store)
5. Give it a name (e.g., "school-calendar-sessions")
6. Select the region closest to your deployment
7. Click **Create**

### 2. Connect KV to Your Project

1. After creating the database, click **Connect to Project**
2. Select your "school-calendar-sync" project
3. Choose the environment(s) to connect:
   - ✅ Production
   - ✅ Preview (optional)
   - ✅ Development (optional)
4. Click **Connect**

Vercel will automatically add the required environment variables:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### 3. Deploy Your Application

Once the KV database is connected, trigger a new deployment:

```bash
git push origin main
```

Or manually redeploy in the Vercel dashboard.

## How It Works

### Session Storage
- **Sessions are stored** with a 7-day TTL (Time To Live)
- **Key format**: `session:{sessionId}`
- **Value**: JSON-stringified Google OAuth tokens

### Session Flow
1. **Login**: User authenticates → tokens stored in KV → sessionId returned
2. **Requests**: Frontend sends sessionId → backend retrieves tokens from KV
3. **Expiration**: Sessions auto-expire after 7 days
4. **Logout**: Session deleted from KV immediately

### Benefits
- ✅ Sessions persist across server restarts
- ✅ Sessions persist across deployments
- ✅ Automatic expiration (7 days)
- ✅ Serverless-friendly (no Redis server required)
- ✅ Free tier available (256 MB storage)

## Local Development

For local development, you have two options:

### Option 1: Use Vercel KV (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Pull environment variables: `vercel env pull`
4. The KV credentials will be available locally

### Option 2: Fallback to In-Memory Storage
The code can be modified to fallback to in-memory sessions for local development. Add this to `backend/routes/auth.js`:

```javascript
// Check if running locally
const isLocal = process.env.NODE_ENV !== 'production';
const sessions = isLocal ? new Map() : null; // Fallback for local dev
```

## Troubleshooting

### Error: "KV_REST_API_URL is not defined"
- **Cause**: Vercel KV not connected to project
- **Fix**: Follow setup instructions above to connect KV to your project

### Sessions Not Persisting
- **Cause**: KV connection issue
- **Fix**: Check Vercel dashboard → Storage → Verify connection status

### 401 Errors After Deployment
- **Cause**: Old sessions cleared before KV setup
- **Fix**: Users need to log out and log back in once after KV setup

## Pricing

Vercel KV Pricing (as of 2024):
- **Hobby**: Free - 256 MB storage, 3,000 commands/day
- **Pro**: $1/month - 1 GB storage, 100,000 commands/day
- **Enterprise**: Custom pricing

Most small applications fit within the free tier.

## More Information

- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Vercel KV Quickstart](https://vercel.com/docs/storage/vercel-kv/quickstart)
