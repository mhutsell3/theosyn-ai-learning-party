# Quick Start - 15 Minute Deployment

Deploy TheoSYN AI Learning Party to Ubuntu in ~15 minutes using automated scripts.

## Prerequisites (5 minutes)

1. **Ubuntu server** with SSH access
2. **GHL Account** with:
   - API Key
   - Location ID
   - Webhook Secret
3. **Domain name** (or server IP address)

## Deployment (10 minutes)

### Step 1: SSH Into Server (1 min)
```bash
ssh ubuntu@your-server-ip
cd ~
```

### Step 2: Clone Project (1 min)
```bash
git clone <your-repo-url> theosyn-ai-party
cd theosyn-ai-party
```

### Step 3: Make Deploy Script Executable (30 sec)
```bash
chmod +x deploy.sh
```

### Step 4: Run Automated Deployment (5 min)
```bash
./deploy.sh
```

This script will:
- ✅ Install Node.js 18 (if not present)
- ✅ Install PM2 globally
- ✅ Install npm dependencies
- ✅ Copy .env.example to .env
- ✅ Start application with PM2
- ✅ Setup auto-start on reboot
- ✅ Display status

### Step 5: Configure .env (2 min)
When prompted, edit the .env file:

```bash
nano .env
```

Update these values:
```env
GHL_API_KEY=your_actual_api_key
GHL_WEBHOOK_SECRET=your_webhook_secret
GHL_LOCATION_ID=your_location_id
APP_URL=https://your-domain.com
```

Save: `Ctrl+O`, Enter, `Ctrl+X`

### Step 6: Restart Application (1 min)
```bash
pm2 restart theosyn-api
```

## Verify It's Working (2 minutes)

### Test Health Endpoint
```bash
curl http://localhost:3000/api/health
```

Should return:
```json
{
  "status": "healthy",
  "service": "TheoSYN AI Learning Party Backend",
  ...
}
```

### Check PM2 Status
```bash
pm2 status
```

Should show:
```
id │ name        │ namespace   │ version │ mode    │ ↺ │ status  │ ↻  │ uptime
0  │ theosyn-api │ default     │ 1.0.0   │ cluster │ 0 │ online  │ 0  │ 1m
```

### View Logs
```bash
pm2 logs theosyn-api --lines 10
```

Should show no errors.

## Setup Domain & GHL Webhooks (5 minutes)

### Option A: Using IP Address (Testing)
Application is accessible at: `http://your-server-ip:3000`

### Option B: Using Domain (Recommended)
1. Update DNS A record to point to server IP
2. Wait for DNS to propagate
3. Access at: `https://your-domain.com`

### Configure GHL Webhooks
1. Log into GoHighLevel
2. Go to **Settings → Webhooks**
3. Click **Add Webhook**
4. Fill in:
   - **URL**: `https://your-domain.com/api/webhooks/ghl`
   - **Secret**: Copy from your `.env` file (`GHL_WEBHOOK_SECRET`)
5. Select events:
   - ✓ Contact Created
   - ✓ Contact Updated
   - ✓ Opportunity Updated
6. Click **Save**

## Test It Works (3 minutes)

### Test Newsletter Form
```bash
curl -X POST http://localhost:3000/api/forms/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

Response should be:
```json
{
  "success": true,
  "message": "Successfully subscribed to the TheoSYN Brief!"
}
```

### Check GHL
Log into GoHighLevel and verify a new contact was created.

### Test in Browser
Visit your domain and:
1. Click any "Join" button
2. Fill in the form
3. Submit
4. See success message
5. Verify contact appears in GHL

## Common Commands

```bash
# View logs
pm2 logs theosyn-api

# Restart app
pm2 restart theosyn-api

# Stop app
pm2 stop theosyn-api

# Check status
pm2 status

# Monitor in real-time
pm2 monit
```

## Issues?

### Application won't start
```bash
# Check error logs
pm2 logs theosyn-api --err

# Verify Node.js is installed
node --version

# Reinstall dependencies
npm install
```

### Can't connect from browser
```bash
# Check if running
pm2 status

# Verify port is open
lsof -i :3000

# Check firewall
sudo ufw status
```

### GHL API errors
```bash
# Verify .env file
cat .env | grep GHL_API_KEY

# Check if it's empty
# If empty, follow Step 5 above
```

### Forms not submitting
1. Check PM2 logs: `pm2 logs theosyn-api`
2. Verify GHL_API_KEY is correct
3. Test health: `curl http://localhost:3000/api/health`

## Next Steps (Optional)

### Setup SSL Certificate (Recommended)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Setup Nginx Reverse Proxy (Advanced)
See SETUP.md for detailed Nginx configuration.

### Setup Monitoring
```bash
# Email logs daily
pm2 attach theosyn-api
```

## You're Done! 🎉

Your application is:
- ✅ Running with Node.js
- ✅ Managed by PM2 (auto-start on reboot)
- ✅ Receiving form submissions
- ✅ Creating contacts in GHL
- ✅ Ready for production

## Important Notes

- **Auto-start is enabled** - App starts automatically on server reboot
- **Logs are saved** - Check with `pm2 logs`
- **.env is NOT in Git** - Keep it secure
- **Webhooks require valid domain** - Use domain name, not IP for production
- **GHL API calls use .env credentials** - Must be correct

## Quick Reference

| What | Command |
|------|---------|
| View logs | `pm2 logs theosyn-api` |
| Restart | `pm2 restart theosyn-api` |
| Status | `pm2 status` |
| Health | `curl http://localhost:3000/api/health` |
| Edit .env | `nano .env` |
| Edit code | `nano routes/forms.js` |

## Support

- 📖 Full docs: See README.md
- 🔧 Setup help: See SETUP.md
- ✅ Deployment check: See DEPLOYMENT_CHECKLIST.md
- ⚡ Commands: See QUICK_REFERENCE.md
- 📧 Contact: milford.hutsell@gmail.com

---

**That's it!** Your TheoSYN AI Learning Party is live. 

Forms are now collecting contacts directly into GoHighLevel.

Enjoy! 🚀
