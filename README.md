# TechAdvisor AI 🚀

> **The PCPartPicker + TechRadar + PriceRunner + Wirecutter for Australia & India**  
> An enterprise-grade technology discovery, product comparison, gaming PC configurator, real-time price tracking, and affiliate marketplace platform.

---

## 🌟 Key Features Implemented

1. **Interactive Gaming PC Builder (Flagship Feature)**
   - Automated Socket checks (`AM5`, `AM4`, `LGA1700`, `LGA1851`)
   - Memory compatibility validation (`DDR4` vs `DDR5`)
   - System wattage calculation & PSU safety headroom validation
   - GPU clearance vs Case length and CPU Cooler height clearance
   - Visual warning alerts: `⚠️ Insufficient PSU`, `⚠️ BIOS update required`, `⚠️ CPU bottleneck detected`
   - Build-by-budget (₹50k, ₹75k, ₹100k, ₹150k, ₹250k / AU$ presets) and build-by-purpose
   - Export part list to Reddit/Markdown and Save to User Dashboard

2. **4-Way Product Comparison Engine**
   - Side-by-side comparison for up to 4 products simultaneously
   - Dynamic badges: *Overall Winner*, *Best Value*, *Top Performance*
   - Deep spec diff highlights and pros/cons comparison

3. **Game FPS Estimator**
   - Benchmarking for *Cyberpunk 2077*, *GTA VI*, *CS2*, *Valorant*, *Fortnite*, *Apex Legends*, *Warzone*, and *PUBG*
   - Real-time Average FPS, 1% Low frame rate, and hardware bottleneck analysis across 1080p, 1440p, and 4K

4. **AI Buying Advisor & Laptop Advisor**
   - Natural language prompt analysis (e.g. *"I have ₹80,000 and want a gaming PC"* or *"I need a laptop for Adobe Photoshop and Microsoft 365"*)
   - Produces tailored Top Pick, Budget Alternative, and High-End Enthusiast Pick with upgrade roadmaps

5. **Multi-Region Live Price Tracking (India & Australia)**
   - **India Stores**: Amazon India, MDComputers, PrimeABGB, Vedant Computers, EliteHubs, PCStudio
   - **Australia Stores**: Amazon Australia, Scorptec, Centre Com, Mwave, JB Hi-Fi, Officeworks
   - Dynamic Currency Switcher (`₹ INR`, `A$ AUD`, `$ USD`)
   - Interactive historical price chart (30d, 90d, 180d, 1 year) with all-time low callouts

6. **Amazon Product & Image Importer (`/admin/import`)**
   - Import products via 10-character ASIN or Amazon product URL
   - Fetches official high-res images directly from Amazon Media CDN (`m.media-amazon.com`)
   - Automatically attaches your regional Amazon Associate tracking tags (`tag=yourtag-21`)

7. **Programmatic SEO & Structured Data Schemas**
   - Automated keyword cluster routes (`/best/[slug]`, `/buying-guides/[slug]`, `/product/[slug]`)
   - Full JSON-LD schemas: `Product`, `Review`, `FAQPage`, `ItemList`, and `BreadcrumbList`

---

## 🚀 How to Host on Vercel

Because this platform is built on **Next.js 15 (App Router)**, Vercel is the native, zero-configuration host.

### Step 1: Push to GitHub / GitLab / Bitbucket
```bash
git init
git add .
git commit -m "Initial TechAdvisor AI platform release"
git remote add origin https://github.com/yourusername/techadvisor-ai.git
git push -u origin main
```

### Step 2: Import Project on Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New..." -> "Project"**.
2. Select your `techadvisor-ai` repository.
3. Vercel automatically detects **Next.js**.
4. Leave Build Command as `next build` and Output Directory as `.next`.

### Step 3: Configure Environment Variables (Optional)
In the Vercel Dashboard under **Settings -> Environment Variables**, add:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
AMAZON_ASSOCIATE_TAG_IN=techadvisorin-21
AMAZON_ASSOCIATE_TAG_AU=techadvisorau-22
AMAZON_ASSOCIATE_TAG_US=techadvisorai-20
# For live PA-API 5.0 (Optional):
AMAZON_ACCESS_KEY=your_access_key
AMAZON_SECRET_KEY=your_secret_key
```

### Step 4: Click "Deploy"
Your platform will be live globally on Vercel's Edge Network with automatic SSL, instant CDN caching, and Incremental Static Regeneration (ISR).

---

## 🛒 How Amazon Product & Image Importing Works

### 1. The Legal & Architecture Model
Amazon strictly requires using the **Amazon Product Advertising API (PA-API 5.0)** or Amazon's approved affiliate feeds. Web scraping directly without API credentials violates Amazon's Terms of Service and can jeopardize your affiliate account.

### 2. High-Resolution Images
Amazon serves product images through its global Content Delivery Network:
`https://m.media-amazon.com/images/P/{ASIN}.01._SCLZZZZZZZ_SX800_.jpg`
Our platform links directly to these Amazon-hosted CDN URLs. This guarantees:
- Always up-to-date product photography
- Zero image hosting or cloud bandwidth costs on your server
- Compliance with Amazon Associates Operating Agreement guidelines

### 3. Automated Tracking Tag Injection
Whenever a product is viewed or imported, our `buildAffiliateUrl()` engine inspects the visitor's country:
- If India: appends `?tag=techadvisorin-21`
- If Australia: appends `?tag=techadvisorau-22`
- If US/Global: appends `?tag=techadvisorai-20`
Every purchase made within the 24-hour cookie window credits the affiliate commission directly to your Amazon Associates account.

### 4. Interactive Importer Test
You can test importing any Amazon product right now by navigating to:
**`http://localhost:3000/admin/import`**
Enter any ASIN (e.g. `B0BTZB7F88` for Ryzen 7 7800X3D) to see the title, media images, pricing, and tagged affiliate URL generated in real time.
