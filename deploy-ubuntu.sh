#!/bin/bash

# Specialty Built Performance and Fab - Ubuntu VPS Deployment Script
# Run this script on your Ubuntu VPS to deploy the website

set -e

echo "🚀 Starting Specialty Built Performance and Fab deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="specialtybuilt"
APP_DIR="/var/www/$APP_NAME"
DOMAIN="your-domain.com"  # Replace with your actual domain

echo -e "${BLUE}📋 Configuration:${NC}"
echo -e "  App Name: $APP_NAME"
echo -e "  App Directory: $APP_DIR"
echo -e "  Domain: $DOMAIN"
echo ""

# Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
sudo apt update
sudo apt upgrade -y

# Install Node.js (LTS version)
echo -e "${YELLOW}📱 Installing Node.js...${NC}"
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js installation
echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"
echo -e "${GREEN}✅ NPM version: $(npm --version)${NC}"

# Install PM2 globally
echo -e "${YELLOW}🔧 Installing PM2 process manager...${NC}"
sudo npm install -g pm2

# Install Nginx
echo -e "${YELLOW}🌐 Installing Nginx...${NC}"
sudo apt install -y nginx

# Create application directory
echo -e "${YELLOW}📁 Setting up application directory...${NC}"
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

echo -e "${GREEN}✅ System setup complete!${NC}"
echo ""
echo -e "${BLUE}📤 Next steps:${NC}"
echo -e "1. Upload your project files to: $APP_DIR"
echo -e "2. Run the setup script: bash $APP_DIR/setup-app.sh"
echo -e "3. Configure your domain in Nginx"
echo ""
echo -e "${YELLOW}⚠️  Don't forget to:${NC}"
echo -e "  • Set up your .env.local file with actual credentials"
echo -e "  • Update the domain name in nginx configuration"
echo -e "  • Configure SSL certificate (Let's Encrypt recommended)"