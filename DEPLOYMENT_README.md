# Specialty Built Performance and Fab - Deployment Guide

## Production Build Complete ✅

Your website has been successfully built for production deployment on Hostinger.

## Deployment Options for Hostinger:

### Option 1: Static Site Hosting (Recommended for Hostinger)
Since Hostinger typically supports static hosting, let's create a static export:

1. **Change next.config.ts to static export:**
```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

2. **Run static export:**
```bash
npm run build
```

3. **Upload the `out/` folder contents to your Hostinger public_html directory**

### Option 2: Node.js Hosting (if Hostinger supports it)
If Hostinger supports Node.js hosting:

1. **Upload these files to Hostinger:**
   - All files in `.next/standalone/` directory
   - The `public/` folder
   - `package.json`

2. **Set up environment variables on Hostinger:**
```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
NEXT_PUBLIC_CONTACT_EMAIL=dan@specialtybuilt.com
```

3. **Start command:** `node server.js`

## Files Ready for Deployment:

- ✅ Production build completed
- ✅ All development references removed
- ✅ Contact form with email functionality ready
- ✅ Optimized for performance
- ✅ SEO optimized
- ✅ Mobile responsive

## What Works Right Now:

1. **Homepage** - Professional landing page with Dan's services
2. **Services** - Detailed service listings (Duramax, 6.0 Powerstroke, etc.)
3. **About** - Dan's story and experience
4. **Contact** - Functional contact form (needs email setup)
5. **Shop** - E-commerce ready (needs Shopify connection)

## To Activate Contact Form:

Create `.env.local` file with:
```
GMAIL_USER=dan@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
NEXT_PUBLIC_CONTACT_EMAIL=dan@specialtybuilt.com
```

## Next Steps:

1. Choose hosting method (static vs Node.js)
2. Upload files to Hostinger
3. Set up email environment variables
4. Test contact form
5. Optional: Connect Shopify for e-commerce

The website is now completely clean and ready for client presentation!