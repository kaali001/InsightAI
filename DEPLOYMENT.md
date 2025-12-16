# Render Deployment Guide

## Quick Setup

### 1. Prerequisites
- GitHub repository with your code
- MongoDB Atlas account (or other MongoDB host)
- OpenAI API key (optional)

### 2. Render Setup

1. **Create New Web Service**
   - Go to https://render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select branch: `main`

2. **Configure Build Settings**
   ```
   Name: insightai-backend
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

3. **Set Environment Variables**
   
   **Required:**
   ```
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/insightai_db
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   FRONTEND_URL=https://your-frontend-domain.com
   ENV=production
   ```

   **Optional:**
   ```
   OPENAI_API_KEY=sk-your-openai-key
   LOG_LEVEL=INFO
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Check logs for any errors

### 3. Verify Deployment

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-app.onrender.com/health

# Root endpoint
curl https://your-app.onrender.com/

# API docs
open https://your-app.onrender.com/docs
```

## Troubleshooting

### "No open ports detected"

**Problem:** Render can't detect the port binding.

**Solutions:**
1. Ensure `PORT` environment variable is set (Render sets this automatically)
2. Check Start Command uses: `--port $PORT`
3. Verify app binds to `0.0.0.0` (not `localhost`)
4. Check logs for startup errors

**Verify in logs:**
```
InsightAI Backend starting up...
Environment: production
Port: 10000
```

### Build fails

**Common issues:**
1. Missing dependencies in `requirements.txt`
2. Python version mismatch
3. Import errors

**Solution:**
```bash
# Test locally first
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### MongoDB connection fails

**Solutions:**
1. Whitelist Render IPs in MongoDB Atlas:
   - Go to Network Access
   - Add IP: `0.0.0.0/0` (allow all)
   
2. Check connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

3. Ensure username/password don't have special characters (URL encode them)

### Rate limiting too aggressive

If you're hitting rate limits during deployment:

```env
# Temporarily increase for testing
RATE_LIMITS__ANALYSIS=10/minute
RATE_LIMITS__DEFAULT=100/minute
```

## Free Tier Limitations

Render Free Tier includes:
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic HTTPS
- ✅ Custom domains
- ⚠️ Spins down after 15 min of inactivity
- ⚠️ Cold start: 30-60 seconds

**Prevent spin-down:**
- Use a uptime monitor (UptimeRobot, Pingdom)
- Ping your health endpoint every 10 minutes

## Production Checklist

- [ ] Set `ENV=production` in environment variables
- [ ] Use strong `JWT_SECRET` (min 32 characters)
- [ ] Configure proper `FRONTEND_URL`
- [ ] Set up MongoDB Atlas with proper access controls
- [ ] Enable MongoDB Atlas backups
- [ ] Set up monitoring/alerts
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate (auto with Render)

## Monitoring

Render provides:
- **Logs**: Real-time logs in dashboard
- **Metrics**: CPU, memory, bandwidth
- **Alerts**: Email notifications for failures

Access logs:
```bash
# Install Render CLI
npm install -g render-cli

# View logs
render logs insightai-backend
```

## Updating Deployment

Auto-deploys on git push:
```bash
git add .
git commit -m "Update API"
git push origin main
```

Manual deployment:
- Go to Render dashboard
- Click "Manual Deploy" → "Deploy latest commit"

## Rollback

If deployment fails:
1. Go to "Events" tab in Render dashboard
2. Find previous successful deploy
3. Click "Rollback to this version"

## Cost Optimization

Free tier is enough for development. For production:
- **Starter ($7/month)**: No spin-down, better performance
- **Standard ($25/month)**: Faster builds, more RAM

## Support

- **Render Docs**: https://render.com/docs
- **Community**: https://community.render.com
- **Status**: https://status.render.com
