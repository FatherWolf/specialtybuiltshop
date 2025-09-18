# Specialty Built - Hostinger Deployment Instructions

## Prerequisites
- Hostinger plan that supports Node.js (Business or higher)
- Access to Hostinger control panel

## Deployment Steps

### 1. Upload Files
Upload these files/folders to your Hostinger public_html directory:
- `.next/` (entire build output)
- `src/` (source files)
- `public/` (static assets)
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `.env.local` (with your environment variables)

### 2. Environment Variables
Ensure your `.env.local` contains:
```
SHOPIFY_STORE_DOMAIN=specialty-built.myshopify.com
SHOPIFY_ACCESS_TOKEN=your_shopify_access_token_here
SHOPIFY_API_KEY=your_shopify_api_key_here
SHOPIFY_API_SECRET=your_shopify_api_secret_here
GMAIL_USER=dan@specialtybuilt.com
GMAIL_APP_PASSWORD=your_gmail_app_password_here
NEXT_PUBLIC_CONTACT_EMAIL=dan@specialtybuilt.com
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret-here
```

### 3. Install Dependencies
In Hostinger terminal or via SSH:
```bash
cd public_html
npm install
```

### 4. Start Application
```bash
npm start
```

## Features Included
✅ Shopify Integration - Products display from your store
✅ Product Modals - Full details with variants and images
✅ Contact Form - Working email integration
✅ Responsive Design - Mobile and desktop optimized
✅ SEO Optimized - Meta tags and structured data

## Your Shopify Product
- "Specialty Built Snap Back Hat" ($25.00)
- Displays on home page and shop page
- Full image gallery with all 5 uploaded images
- Variant selection if configured in Shopify

## Notes
- The app is built for production with optimizations
- All pages are server-side rendered for best SEO
- Contact form sends emails via Gmail SMTP
- Product data loads dynamically from Shopify

## Testing
After deployment, verify:
1. Home page loads with featured products
2. Shop page shows all products
3. Product modals open with full details
4. Contact form sends emails
5. All navigation works correctly