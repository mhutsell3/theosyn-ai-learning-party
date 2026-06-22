# Deployment Checklist - TheoSYN AI Learning Party

Use this checklist to ensure a complete deployment to your Ubuntu server.

## Pre-Deployment ✓

- [ ] Ubuntu 18.04+ server access via SSH
- [ ] Domain registered and available
- [ ] GoHighLevel account with API access
- [ ] GHL API key obtained
- [ ] GHL Location ID identified
- [ ] GHL Webhook secret created
- [ ] Project cloned to local machine
- [ ] All dependencies installed locally (`npm install`)

## Local Development Testing

- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts server successfully
- [ ] Landing page loads at http://localhost:3000
- [ ] Newsletter form works and submits
- [ ] Waitlist form submits successfully
- [ ] Party registration form works
- [ ] Coaching booking form works
- [ ] All forms accept data without errors
- [ ] Forms display success messages

## Server Setup (Ubuntu)

### Step 1: SSH Access
- [ ] Can SSH into server: `ssh ubuntu@your-ip`
- [ ] User is `ubuntu`
- [ ] Have sudo access

### Step 2: Node.js Installation
- [ ] Node.js 18+ installed
  ```bash
  node --version  # Should show v18.x.x or higher
  ```
- [ ] npm installed
  ```bash
  npm --version
  ```

### Step 3: PM2 Installation
- [ ] PM2 installed globally
  ```bash
  pm2 --version
  ```

### Step 4: Project Deployment
- [ ] Project cloned to `/home/ubuntu/theosyn-ai-party`
  ```bash
  cd /home/ubuntu/theosyn-ai-party && ls
  ```
- [ ] Dependencies installed
  ```bash
  npm install
  # No errors and `node_modules/` folder exists
  ```

### Step 5: Environment Configuration
- [ ] `.env` file created from `.env.example`
  ```bash
  cp .env.example .env
  ```
- [ ] All GHL credentials filled in:
  - [ ] `GHL_API_KEY`
  - [ ] `GHL_WEBHOOK_SECRET`
  - [ ] `GHL_LOCATION_ID`
  - [ ] `GHL_CONTACT_API_URL`
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000` (or your preferred port)
- [ ] `APP_URL` set to your domain

### Step 6: Start with PM2
- [ ] Application starts with PM2
  ```bash
  pm2 start ecosystem.config.js
  ```
- [ ] PM2 shows process running
  ```bash
  pm2 status
  # theosyn-api should show "online"
  ```
- [ ] Application logs show no errors
  ```bash
  pm2 logs theosyn-api
  ```

### Step 7: Auto-Start Configuration
- [ ] Auto-start enabled
  ```bash
  pm2 startup
  pm2 save
  ```
- [ ] Processes saved
  ```bash
  pm2 resurrect
  # Application should restart automatically
  ```

## Networking & Domain

### Step 8: Firewall Configuration
- [ ] Port 3000 is accessible from your machine
  ```bash
  curl http://localhost:3000
  # Should return the landing page
  ```
- [ ] Firewall allows port 80 (HTTP)
  ```bash
  sudo ufw allow 80/tcp
  ```
- [ ] Firewall allows port 443 (HTTPS)
  ```bash
  sudo ufw allow 443/tcp
  ```

### Step 9: Nginx Reverse Proxy (Optional)
- [ ] Nginx installed
  ```bash
  sudo apt install nginx
  ```
- [ ] Nginx config created at `/etc/nginx/sites-available/theosyn`
- [ ] Site enabled in `/etc/nginx/sites-enabled/`
- [ ] Nginx config tested
  ```bash
  sudo nginx -t
  ```
- [ ] Nginx restarted
  ```bash
  sudo systemctl restart nginx
  ```

### Step 10: DNS Configuration
- [ ] Domain DNS records point to server IP
  - [ ] A record: `your-domain.com` → `server-ip`
  - [ ] CNAME (optional): `www.your-domain.com` → `your-domain.com`
- [ ] Domain resolves to server
  ```bash
  nslookup your-domain.com
  ```

### Step 11: SSL Certificate (Recommended)
- [ ] Let's Encrypt installed
  ```bash
  sudo apt install certbot python3-certbot-nginx
  ```
- [ ] SSL certificate generated
  ```bash
  sudo certbot --nginx -d your-domain.com
  ```
- [ ] Certificate auto-renewal configured
- [ ] Nginx redirects HTTP to HTTPS

## GoHighLevel Integration

### Step 12: Webhook Configuration
- [ ] Login to GoHighLevel account
- [ ] Go to Settings → Webhooks
- [ ] Add new webhook with:
  - [ ] **URL**: `https://your-domain.com/api/webhooks/ghl`
  - [ ] **Secret**: Your webhook secret
  - [ ] **Events**: Contact Created, Contact Updated, Opportunity Updated
- [ ] Webhook shows as "Active"
- [ ] Test webhook in GHL settings

### Step 13: API Credentials
- [ ] Go to Settings → API Access in GHL
- [ ] Verify API key is active
- [ ] Verify Location ID is correct
- [ ] Create/verify webhook secret

## Testing

### Step 14: Basic Connectivity
- [ ] Landing page loads: `https://your-domain.com`
- [ ] Health check works:
  ```bash
  curl https://your-domain.com/api/health
  ```
- [ ] Returns JSON with status "healthy"

### Step 15: Form Submissions
- [ ] Newsletter form submission:
  - [ ] Fill in email
  - [ ] Submit form
  - [ ] Get success message
  - [ ] Check GHL for new contact
- [ ] Waitlist form submission:
  - [ ] Fill in email, first name, last name
  - [ ] Submit form
  - [ ] Check GHL for contact with "foundation-course-waitlist" tag
- [ ] Party registration:
  - [ ] Complete registration form
  - [ ] Verify contact created in GHL with "ai-party-attendee" tag
- [ ] Coaching booking:
  - [ ] Fill in details and topic
  - [ ] Submit form
  - [ ] Verify contact created in GHL

### Step 16: Webhook Testing
- [ ] Test webhook in GHL Settings
- [ ] Check PM2 logs for webhook receipt
  ```bash
  pm2 logs theosyn-api
  ```
- [ ] Webhook shows successful delivery

## Monitoring

### Step 17: Application Monitoring
- [ ] PM2 process monitoring enabled
  ```bash
  pm2 monit
  ```
- [ ] CPU usage normal
- [ ] Memory usage under 300MB
- [ ] No errors in logs

### Step 18: SSL Certificate Monitoring
- [ ] Certificate expiration tracked (auto-renewal enabled)
  ```bash
  sudo certbot renew --dry-run
  ```
- [ ] Set calendar reminder (if not auto-renewal)

## Maintenance

### Step 19: Backup Configuration
- [ ] `.env` file backed up securely
  ```bash
  sudo cp .env /secure/location/.env.backup
  ```
- [ ] Not committed to Git
- [ ] Accessible only to authorized users

### Step 20: Logs Configuration
- [ ] PM2 logs configured
  ```bash
  pm2 save
  ```
- [ ] Log rotation set up (optional)
- [ ] Old logs periodically cleaned

## Post-Deployment

### Step 21: Update Landing Page Links
In `public/index.html`, update:
- [ ] Discord invite link
- [ ] Any external links (if any)
- [ ] Contact email addresses

### Step 22: Analytics (Optional)
- [ ] Set up server monitoring
- [ ] Set up form tracking
- [ ] Set up email notifications for errors

### Step 23: Communication
- [ ] Notify team of deployment
- [ ] Share application URL
- [ ] Provide access credentials where needed

### Step 24: Documentation
- [ ] README.md reviewed
- [ ] SETUP.md saved for reference
- [ ] Team has access to deployment guide
- [ ] Backup procedures documented

## Rollback Procedure (If Needed)

- [ ] Know how to stop PM2 process
  ```bash
  pm2 stop theosyn-api
  ```
- [ ] Know how to revert code
  ```bash
  git reset --hard origin/main
  ```
- [ ] Know how to restart
  ```bash
  pm2 start ecosystem.config.js
  ```
- [ ] Have last known good version identified

## Troubleshooting Reference

### If application won't start:
1. Check PM2 logs: `pm2 logs theosyn-api --err`
2. Verify .env file: `cat .env`
3. Check Node.js: `node --version`
4. Check npm dependencies: `npm install`

### If forms aren't submitting:
1. Check GHL API key is valid
2. Verify .env credentials
3. Check PM2 logs for API errors
4. Test with curl: `curl -X POST http://localhost:3000/api/forms/newsletter`

### If webhooks aren't received:
1. Verify webhook URL is correct in GHL
2. Verify webhook secret matches
3. Check firewall allows inbound traffic
4. Check PM2 logs for incoming webhooks

## Sign-Off

- [ ] All checks completed
- [ ] Application is live and accessible
- [ ] Forms are submitting data to GHL
- [ ] Webhooks are being received
- [ ] No errors in PM2 logs
- [ ] Team is informed and trained

**Deployment Date**: ________________  
**Deployed By**: ________________  
**Verified By**: ________________  

---

For support: milford.hutsell@gmail.com
