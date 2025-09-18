# Ubuntu VPS Deployment Guide - Specialty Built Performance and Fab

## 🚀 Quick Start

Your website is ready to deploy on Ubuntu VPS! Follow these steps:

### Step 1: Prepare Your VPS
Upload and run the deployment script on your Ubuntu server:

```bash
# Upload deploy-ubuntu.sh to your VPS
scp deploy-ubuntu.sh user@your-server-ip:~/

# Connect to your VPS
ssh user@your-server-ip

# Run the deployment script
chmod +x deploy-ubuntu.sh
./deploy-ubuntu.sh
```

### Step 2: Upload Your Website Files
Upload all project files to `/var/www/specialtybuilt/`:

```bash
# From your local machine, upload the entire project
scp -r . user@your-server-ip:/var/www/specialtybuilt/

# Or use rsync for better performance
rsync -avz --exclude node_modules --exclude .next . user@your-server-ip:/var/www/specialtybuilt/
```

### Step 3: Configure Environment Variables
```bash
# Connect to your VPS
ssh user@your-server-ip

# Navigate to project directory
cd /var/www/specialtybuilt

# Copy environment template and edit with your credentials
cp env-template.txt .env.local
nano .env.local
```

**Required credentials in .env.local:**
- Shopify store domain and access tokens
- Gmail credentials for contact form
- Your domain name for NEXTAUTH_URL

### Step 4: Deploy the Application
```bash
# Run the application setup script
chmod +x setup-app.sh
./setup-app.sh
```

### Step 5: Configure Domain and SSL
```bash
# Edit the domain in nginx config
sudo nano /etc/nginx/sites-available/specialtybuilt
# Replace "your-domain.com" with your actual domain

# Reload nginx
sudo nginx -t
sudo systemctl reload nginx

# Install SSL certificate (recommended)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 📋 Files Created for Deployment

- `deploy-ubuntu.sh` - Initial server setup (Node.js, PM2, Nginx)
- `setup-app.sh` - Application deployment and configuration
- `ecosystem.config.js` - PM2 process manager configuration
- `nginx-specialtybuilt` - Nginx reverse proxy configuration
- `env-template.txt` - Environment variables template
- `server.js` - Custom Node.js server for production

## ✅ What's Included

Your deployed website will have:

### 🏠 **Homepage**
- Hero section with Dan's services
- Featured Shopify products
- Professional diesel repair focus

### 🔧 **Services Pages**
- Duramax repair and performance
- 6.0 Powerstroke services
- Fabrication capabilities
- Detailed service descriptions

### 👤 **About Page**
- Dan's experience and expertise
- Professional background
- Trust-building content

### 📞 **Contact Form**
- Working email integration via Gmail SMTP
- Professional contact information
- Location and hours

### 🛒 **Shop Integration**
- Shopify product display
- Product modals with full details
- Image galleries
- Variant selection

## 🛠️ Management Commands

Once deployed, use these PM2 commands to manage your application:

```bash
pm2 status              # Check application status
pm2 logs specialtybuilt # View application logs
pm2 restart specialtybuilt # Restart application
pm2 stop specialtybuilt    # Stop application
pm2 start specialtybuilt   # Start application
```

## 🔒 Security Features

- Nginx reverse proxy with security headers
- SSL/HTTPS support ready
- Environment variables protection
- Process management with PM2
- Firewall configuration guidance

## 📊 Performance Optimizations

- Clustered Node.js processes
- Gzip compression
- Static asset caching
- Memory management
- Auto-restart on failure

## 🌐 Access Your Website

After deployment, your website will be accessible at:
- HTTP: `http://your-domain.com`
- HTTPS: `https://your-domain.com` (after SSL setup)

## 🆘 Troubleshooting

### Check Application Status
```bash
pm2 status
pm2 logs specialtybuilt
```

### Check Nginx Status
```bash
sudo systemctl status nginx
sudo nginx -t
```

### View System Resources
```bash
free -h        # Memory usage
df -h          # Disk usage
top            # CPU usage
```

## 📞 Support

All features are production-ready:
- ✅ Shopify integration working
- ✅ Contact form with Gmail SMTP
- ✅ Professional responsive design
- ✅ SEO optimized
- ✅ Performance optimized

Your Specialty Built Performance and Fab website is ready to go live!