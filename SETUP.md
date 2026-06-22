# TheoSYN AI Learning Party - Node.js Backend Setup

Complete setup guide for deploying the Node.js backend with PM2 on Ubuntu.

## Prerequisites

- Ubuntu 18.04 or later
- Node.js 18+ and npm
- PM2 (will be installed)
- Git

## Step 1: Install Node.js and npm

```bash
# Update package manager
sudo apt update
sudo apt upgrade -y

# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

## Step 2: Install PM2 Globally

```bash
sudo npm install -g pm2
```

## Step 3: Clone and Setup Project

```bash
# Create project directory
cd /home/ubuntu
git clone <your-repo-url> theosyn-ai-party
cd theosyn-ai-party

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your GHL credentials
nano .env
```

## Step 4: Configure .env File

Edit `/home/ubuntu/theosyn-ai-party/.env` with your settings:

```env
NODE_ENV=production
PORT=3000

# Get these from your GHL account
GHL_API_KEY=your_api_key
GHL_WEBHOOK_SECRET=your_webhook_secret
GHL_LOCATION_ID=your_location_id
GHL_CONTACT_API_URL=https://rest.gohighlevel.com/v1/contacts/

# Optional: Email settings
EMAIL_FROM=noreply@theosyn.com

# Application
APP_NAME=TheoSYN AI Learning Party
APP_URL=https://your-domain.com
```

### Getting GHL Credentials

1. Log into GoHighLevel
2. Go to Settings → API Access
3. Create an API key and copy it
4. Create a webhook secret
5. Note your Location ID

## Step 5: Start with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Verify it's running
pm2 status

# View logs
pm2 logs

# View specific logs
pm2 logs theosyn-api
```

## Step 6: Setup Auto-Start on System Reboot

```bash
# Generate startup script
pm2 startup

# Save PM2 process list (IMPORTANT!)
pm2 save

# Verify
pm2 resurrect
```

## Step 7: Setup Nginx Reverse Proxy (Optional but Recommended)

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/theosyn
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS (if using SSL)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/webhooks {
        proxy_pass http://localhost:3000/api/webhooks;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/theosyn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 8: Setup SSL with Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is setup automatically
```

## Step 9: Configure GHL Webhooks

1. Log into GoHighLevel
2. Go to Settings → Webhooks
3. Add webhook URL:
   - **URL**: `https://your-domain.com/api/webhooks/ghl`
   - **Secret**: Your webhook secret from `.env`
4. Select events to receive:
   - Contact Created
   - Contact Updated
   - Opportunity Updated
   - Any custom events you need

## Useful PM2 Commands

```bash
# View all running processes
pm2 list

# Monitor in real-time
pm2 monit

# Restart application
pm2 restart theosyn-api

# Stop application
pm2 stop theosyn-api

# Start application
pm2 start ecosystem.config.js

# View logs
pm2 logs theosyn-api

# Clear logs
pm2 flush

# Delete process
pm2 delete theosyn-api

# Check max memory restart
pm2 show theosyn-api
```

## Troubleshooting

### Port 3000 already in use
```bash
# Find and kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

### PM2 process won't start
```bash
# Check error logs
pm2 logs theosyn-api --err

# Verify Node.js installation
node --version

# Check .env file exists
cat /home/ubuntu/theosyn-ai-party/.env
```

### Webhooks not receiving events
1. Verify GHL webhook URL is correct
2. Check webhook secret matches in GHL and `.env`
3. Verify firewall allows inbound requests
4. Check PM2 logs: `pm2 logs theosyn-api`

### Database connections timing out
```bash
# Increase PM2 timeout
pm2 start ecosystem.config.js --listen-timeout 30000
```

## Monitoring

Monitor your application with PM2:

```bash
# Real-time monitoring
pm2 monit

# Get detailed process info
pm2 info theosyn-api

# Export process list
pm2 export
```

## Backup

Backup your `.env` file regularly (do NOT commit to git):

```bash
sudo cp /home/ubuntu/theosyn-ai-party/.env /backups/.env.backup
```

## Updates

To update the application:

```bash
cd /home/ubuntu/theosyn-ai-party

# Pull latest code
git pull origin main

# Install new dependencies
npm install

# Restart PM2
pm2 restart theosyn-api

# Check logs
pm2 logs theosyn-api
```

## Next Steps

1. Update your domain DNS to point to your server
2. Set up SSL certificate
3. Configure GHL webhooks
4. Update all form buttons in `public/index.html` with correct links
5. Update Discord and other social links
6. Test all forms and webhooks
7. Set up monitoring/alerting

For support, contact: milford.hutsell@gmail.com
