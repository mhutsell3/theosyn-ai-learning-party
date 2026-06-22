# TheoSYN AI Learning Party - Full-Stack Application

A Node.js + Express backend for the TheoSYN AI Learning Party landing page with GoHighLevel (GHL) webhook integration.

## 📁 Project Structure

```
theosyn-ai-party/
├── public/
│   └── index.html           # Frontend landing page
├── routes/
│   ├── forms.js             # Form submission handlers (newsletter, registration, booking)
│   ├── webhooks.js          # GHL webhook receivers
│   └── health.js            # Health check endpoint
├── server.js                # Main Express application
├── ecosystem.config.js      # PM2 process manager configuration
├── package.json             # Node.js dependencies
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── SETUP.md                 # Detailed setup guide for Ubuntu
├── deploy.sh                # Automated deployment script
└── README.md                # This file
```

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server with hot reload
npm run dev

# Server runs on http://localhost:3000
```

### Production Deployment (Ubuntu)

```bash
# Make deploy script executable
chmod +x deploy.sh

# Run automated deployment
./deploy.sh

# Or follow manual steps in SETUP.md
```

## 📡 API Endpoints

### Form Submissions
- `POST /api/forms/newsletter` - Newsletter signup
- `POST /api/forms/foundation-waitlist` - Course waitlist
- `POST /api/forms/party-registration` - Party registration
- `POST /api/forms/coaching-booking` - Coaching session booking

### Webhooks
- `POST /api/webhooks/ghl` - GoHighLevel webhook receiver
- `POST /api/webhooks/test` - Test webhook endpoint
- `GET /api/webhooks/status` - Webhook status check

### Health
- `GET /api/health` - Application health check

## 🔧 Technologies Used

- **Node.js** - Runtime
- **Express** - Web framework
- **PM2** - Process manager with auto-start
- **Axios** - HTTP client for API calls
- **Dotenv** - Environment variable management
- **Helmet** - Security headers
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP logging

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=production
PORT=3000
GHL_API_KEY=your_ghl_api_key
GHL_WEBHOOK_SECRET=your_webhook_secret
GHL_LOCATION_ID=your_location_id
GHL_CONTACT_API_URL=https://rest.gohighlevel.com/v1/contacts/
APP_URL=https://your-domain.com
```

## 📋 Features

✅ Static landing page (HTML/CSS/JS)  
✅ API endpoints for form submissions  
✅ GoHighLevel webhook integration  
✅ Automatic contact creation/update in GHL  
✅ PM2 process management with auto-start  
✅ Comprehensive error handling  
✅ Security headers with Helmet  
✅ CORS support for cross-origin requests  
✅ Health check endpoint for monitoring  

## 📊 Form Handlers

### Newsletter Signup
Creates a contact in GHL with the "newsletter-subscriber" tag.

### Foundation Course Waitlist
Captures first/last name and adds "foundation-course-waitlist" tag.

### AI Party Registration
Registers attendees with party date tracking.

### Coaching Session Booking
Creates booking requests with topic/subject information.

## 🔗 GHL Integration

The application creates/updates contacts in GoHighLevel with:
- Email address
- First/last name
- Source tracking
- Custom tags for segmentation
- Custom fields for additional data

### Webhook Events Handled
- `contact.created` - New contact created
- `contact.updated` - Contact information updated
- `opportunity.updated` - Sales opportunity changes

## 📱 Frontend Features

- Responsive design (mobile, tablet, desktop)
- Modal forms for registrations
- Real-time form validation
- Success/error message feedback
- Smooth scrolling navigation
- Modern UI with gradient accents

## 🛠️ PM2 Management

```bash
# Start
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# Logs
pm2 logs theosyn-api

# Restart
pm2 restart theosyn-api

# Stop
pm2 stop theosyn-api

# Auto-start on reboot
pm2 startup
pm2 save
```

## 🔍 Debugging

```bash
# View real-time logs
pm2 logs theosyn-api

# View error logs
pm2 logs theosyn-api --err

# Monitor resource usage
pm2 monit

# Check process details
pm2 info theosyn-api
```

## 🌐 Deployment Options

### Option 1: Direct Ubuntu Server (Recommended)
1. Follow SETUP.md for manual installation
2. Or run: `./deploy.sh`

### Option 2: Docker
Create a Dockerfile for containerized deployment.

### Option 3: Cloud Platforms
- Railway
- Render
- Heroku
- AWS EC2
- DigitalOcean

## 📈 Monitoring

Check application health:
```bash
curl http://localhost:3000/api/health
```

## 🔐 Security

- Environment variables for sensitive data
- Helmet.js for security headers
- CORS middleware for controlled access
- Request validation
- Webhook signature verification
- No sensitive data in logs

## 📝 Notes

- All form data is sent to GoHighLevel
- GHL API credentials are required
- Webhooks require valid signature verification
- PM2 ensures auto-restart on failure
- Logs are stored in `/logs` directory

## 🤝 Support

For issues or questions:
- Check SETUP.md for installation help
- Review logs: `pm2 logs`
- Verify .env configuration
- Test endpoints with curl or Postman

## 📄 License

MIT - See project repository for details

---

**Built with ❤️ by TheoSYN Labs**  
Bringing enterprise-grade simplicity to AI for Baby Boomers and Gen X.
