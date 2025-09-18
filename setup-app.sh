#!/bin/bash

# Specialty Built Performance and Fab - Application Setup Script
# Run this script in your project directory after uploading files

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

APP_NAME="specialtybuilt"
DOMAIN="your-domain.com"  # Replace with your actual domain

echo -e "${BLUE}🔧 Setting up Specialty Built Performance and Fab application...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Make sure you're in the project directory.${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  Creating .env.local template...${NC}"
    cat > .env.local << EOF
# Shopify Configuration
SHOPIFY_STORE_DOMAIN=specialty-built.myshopify.com
SHOPIFY_ACCESS_TOKEN=your_shopify_access_token_here
SHOPIFY_API_KEY=your_shopify_api_key_here
SHOPIFY_API_SECRET=your_shopify_api_secret_here

# Email Configuration
GMAIL_USER=dan@specialtybuilt.com
GMAIL_APP_PASSWORD=your_gmail_app_password_here
NEXT_PUBLIC_CONTACT_EMAIL=dan@specialtybuilt.com

# NextAuth Configuration
NEXTAUTH_URL=https://$DOMAIN
NEXTAUTH_SECRET=your_secure_random_string_here
EOF
    echo -e "${RED}❌ Please edit .env.local with your actual credentials before continuing!${NC}"
    echo -e "${BLUE}📝 Edit command: nano .env.local${NC}"
    exit 1
fi

# Build the application
echo -e "${YELLOW}🏗️  Building production application...${NC}"
npm run build

# Create PM2 ecosystem file
echo -e "${YELLOW}⚙️  Creating PM2 configuration...${NC}"
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF

# Create logs directory
mkdir -p logs

# Create Nginx configuration
echo -e "${YELLOW}🌐 Creating Nginx configuration...${NC}"
sudo tee /etc/nginx/sites-available/$APP_NAME << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Start application with PM2
echo -e "${YELLOW}🚀 Starting application with PM2...${NC}"
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo -e "${GREEN}✅ Application setup complete!${NC}"
echo ""
echo -e "${BLUE}📊 Application Status:${NC}"
pm2 status

echo ""
echo -e "${BLUE}🌐 Your website should now be accessible at:${NC}"
echo -e "  http://$DOMAIN"
echo ""
echo -e "${YELLOW}🔒 Recommended next steps:${NC}"
echo -e "1. Set up SSL certificate:"
echo -e "   sudo apt install certbot python3-certbot-nginx"
echo -e "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo -e "2. Configure firewall:"
echo -e "   sudo ufw allow OpenSSH"
echo -e "   sudo ufw allow 'Nginx Full'"
echo -e "   sudo ufw enable"
echo ""
echo -e "${BLUE}📋 Useful PM2 commands:${NC}"
echo -e "  pm2 status           - Check application status"
echo -e "  pm2 logs $APP_NAME     - View application logs"
echo -e "  pm2 restart $APP_NAME  - Restart application"
echo -e "  pm2 stop $APP_NAME     - Stop application"