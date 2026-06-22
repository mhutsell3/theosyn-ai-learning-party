# Quick Reference - TheoSYN AI Learning Party Commands

## Local Development (Windows/Mac/Linux)

```bash
# Install dependencies once
npm install

# Start development server (with auto-reload)
npm run dev

# Access at: http://localhost:3000
```

## Ubuntu Server Commands

### First-Time Setup
```bash
# SSH into server
ssh ubuntu@your-server-ip

# Clone project (if not already cloned)
cd ~
git clone <repo-url> theosyn-ai-party
cd theosyn-ai-party

# Install dependencies
npm install

# Create .env file
cp .env.example .env
nano .env  # Add your GHL credentials

# Start with PM2
npm run pm2:start
```

### PM2 Management
```bash
# Check if running
pm2 status

# View logs
pm2 logs

# View logs for specific app
pm2 logs theosyn-api

# Monitor in real-time
pm2 monit

# Restart application
pm2 restart theosyn-api

# Stop application
pm2 stop theosyn-api

# Start application
pm2 start ecosystem.config.js

# Delete from PM2
pm2 delete theosyn-api
```

### Setup Auto-Start on Reboot
```bash
# Run this ONCE
pm2 startup

# Then run this
pm2 save

# Verify it works
pm2 resurrect
```

### Configuration
```bash
# Edit environment variables
nano .env

# Restart after .env changes
pm2 restart theosyn-api

# Check if .env is loaded
pm2 info theosyn-api
```

### Logs & Debugging
```bash
# View application logs
pm2 logs theosyn-api

# View errors only
pm2 logs theosyn-api --err

# Clear logs
pm2 flush

# Get process info
pm2 info theosyn-api

# Show memory usage
pm2 show theosyn-api | grep memory
```

### Testing
```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test with domain
curl https://your-domain.com/api/health

# Should return JSON with status: "healthy"
```

### Port & Network
```bash
# Check if port 3000 is open
lsof -i :3000

# Kill process using port 3000
kill -9 <PID>

# Check firewall
sudo ufw status

# Allow port 80 (HTTP)
sudo ufw allow 80/tcp

# Allow port 443 (HTTPS)
sudo ufw allow 443/tcp
```

## Nginx (Reverse Proxy)

```bash
# Check Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx

# View Nginx config
sudo nano /etc/nginx/sites-available/theosyn
```

## SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Renew certificate (manual)
sudo certbot renew

# Test auto-renewal
sudo certbot renew --dry-run

# View certificates
sudo certbot certificates
```

## Git Operations

```bash
# Check status
git status

# Pull latest code
git pull origin main

# Add changes
git add .

# Commit changes
git commit -m "Your message"

# Push to repository
git push origin main

# View recent commits
git log --oneline -10
```

## Emergency Commands

```bash
# Check disk space
df -h

# Check memory
free -h

# Check CPU usage
top

# Restart server
sudo reboot

# Stop everything
pm2 stop all

# Restart everything
pm2 restart all
```

## GHL Integration Commands

```bash
# Test webhook with curl
curl -X POST http://localhost:3000/api/webhooks/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Check webhook status
curl http://localhost:3000/api/webhooks/status

# Test form submission (newsletter)
curl -X POST http://localhost:3000/api/forms/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Test party registration
curl -X POST http://localhost:3000/api/forms/party-registration \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "firstName": "John", "lastName": "Doe"}'
```

## File Management

```bash
# View .env file
cat .env

# Edit .env file
nano .env

# Backup .env
cp .env .env.backup

# Check logs directory
ls -la logs/

# View recent logs
tail -50 logs/out.log

# View error logs
tail -50 logs/err.log
```

## Process Management

```bash
# Show all running processes
ps aux | grep node

# Find specific process
ps aux | grep theosyn

# Kill specific process
kill -9 <PID>

# Show process count
ps aux | grep node | wc -l
```

## Monitoring

```bash
# Check real-time stats
pm2 monit

# Memory usage
ps aux --sort=-%mem | grep node

# CPU usage
ps aux --sort=-%cpu | grep node

# Uptime of server
uptime

# Check application uptime
pm2 show theosyn-api | grep uptime
```

## Common Issues - Quick Fixes

```bash
# Application won't start?
pm2 logs theosyn-api --err

# Port 3000 already in use?
lsof -i :3000
kill -9 <PID>

# .env not loading?
cat .env | grep GHL_API_KEY

# GHL API calls failing?
# Check if GHL_API_KEY is valid
echo $GHL_API_KEY

# Webhook not working?
curl http://localhost:3000/api/webhooks/status

# Need to restart everything?
pm2 restart all
```

## Useful Aliases (Add to ~/.bashrc)

```bash
# Add these lines to ~/.bashrc for shortcuts
alias logs='pm2 logs theosyn-api'
alias status='pm2 status'
alias restart='pm2 restart theosyn-api'
alias monit='pm2 monit'
alias cdproject='cd /home/ubuntu/theosyn-ai-party'

# Then reload
source ~/.bashrc
```

## Important URLs

```
Local Development:    http://localhost:3000
Production:           https://your-domain.com
Health Check:         https://your-domain.com/api/health
Webhook Endpoint:     https://your-domain.com/api/webhooks/ghl
GHL API:              https://rest.gohighlevel.com/v1/contacts/
```

## Important Credentials (Keep Secure!)

```
Location: /home/ubuntu/theosyn-ai-party/.env (DO NOT GIT COMMIT)

Needed:
- GHL_API_KEY
- GHL_WEBHOOK_SECRET
- GHL_LOCATION_ID

Keep in:
- Secure backup location
- Password manager
- Encrypted storage
```

## Documentation Files

```
README.md                  - Project overview
SETUP.md                  - Detailed setup guide
DEPLOYMENT_CHECKLIST.md   - Pre/post deployment checklist
CONVERSION_SUMMARY.md     - What was converted and why
QUICK_REFERENCE.md        - This file
```

## Support

1. **Check the docs**: README.md → SETUP.md → DEPLOYMENT_CHECKLIST.md
2. **Check the logs**: `pm2 logs theosyn-api`
3. **Test endpoints**: Use curl commands above
4. **Contact**: milford.hutsell@gmail.com

---

**Pro Tip**: Bookmark this page for quick reference while deploying!

Last updated: June 22, 2026
