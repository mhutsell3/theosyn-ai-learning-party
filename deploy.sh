#!/bin/bash

# TheoSYN AI Learning Party - Deploy to AI Server (192.168.5.3)
# Run on the AI server: cd /opt/theosyn-ai-party && ./deploy.sh

set -e

echo "╔════════════════════════════════════════╗"
echo "║  TheoSYN AI Party — Deploy to AI PC    ║"
echo "╚════════════════════════════════════════╝"
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

APP_NAME="theosyn-party"
APP_DIR="/opt/theosyn-ai-party"

# Step 1: Install dependencies
echo -e "${YELLOW}[1/5] Installing dependencies...${NC}"
npm install --production
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 2: Create logs directory
echo -e "${YELLOW}[2/5] Creating logs directory...${NC}"
mkdir -p logs
echo -e "${GREEN}✓ Logs directory ready${NC}"
echo ""

# Step 3: Setup .env if missing
echo -e "${YELLOW}[3/5] Checking .env...${NC}"
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${YELLOW}Created .env from .env.example — update GHL_WEBHOOK_SECRET${NC}"
else
    echo -e "${GREEN}✓ .env exists${NC}"
fi
echo ""

# Step 4: Start/restart with PM2
echo -e "${YELLOW}[4/5] Starting PM2 process...${NC}"
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
    pm2 restart "$APP_NAME"
    echo -e "${GREEN}✓ Restarted $APP_NAME${NC}"
else
    pm2 start ecosystem.config.js
    echo -e "${GREEN}✓ Started $APP_NAME${NC}"
fi
pm2 save
echo ""

# Step 5: Verify
echo -e "${YELLOW}[5/5] Verifying...${NC}"
sleep 2
pm2 status "$APP_NAME"
echo ""

# Health check
echo -e "${YELLOW}Health check:${NC}"
curl -s http://localhost:3010/api/health | python3 -m json.tool 2>/dev/null || echo "Waiting for startup..."
echo ""

echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  Deploy complete! Port 3010            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo "PM2 commands:"
echo "  pm2 logs $APP_NAME"
echo "  pm2 restart $APP_NAME"
echo "  pm2 monit"
echo ""
echo "Next: Add Cloudflare Tunnel entry:"
echo "  party.theosynlabs.com → http://localhost:3010"
