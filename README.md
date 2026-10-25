# Shashi Kumar — Full-Stack Web Developer &amp; Technical Consultant

Official Portfolio: **[https://skdigital.cloud](https://skdigital.cloud)**  
A high-performance, modern, mobile-responsive, and SEO-optimized personal developer portfolio for **Shashi Kumar** — showcasing custom web & mobile application engineering, speed optimization, bug fixing, and technical consulting.

---

## 🚀 Live Overview & Core Features

- **Blazing Fast & Lightweight:** Built using clean semantic HTML5, modern Vanilla CSS, and lightweight Vanilla JavaScript without heavy framework overhead.
- **Modern UI / UX:** Glassmorphic navigation header, subtle gradients, micro-animations via `IntersectionObserver`, and mobile drawer navigation.
- **Enterprise SEO & Structured Data:**
  - Complete JSON-LD schema markup (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `Person`, `AboutPage`, `ContactPage`).
  - Open Graph and Twitter Card metadata for rich social media sharing.
  - XML Sitemap (`sitemap.xml`) and search-engine compliance rules (`robots.txt`).
- **Analytics & Conversion Tracking:**
  - Integrated Google Analytics 4 (`G-323GZ37944`) across all pages.
  - Custom event telemetry for `generate_lead` form submissions, `whatsapp_click` buttons, and `email_click`/`phone_click` channels.
- **Interactive Lead Capture with WhatsApp Handoff:**
  - Custom lead inquiry form with honeypot spam protection.
  - Graceful dual-channel delivery: submits payload to backend storage (`/tables/leads`) and automatically opens prefilled WhatsApp conversation with backup mailto fallback.
  - Floating WhatsApp action button with attention-drawing pulse effect.
- **Comprehensive Service Catalog:** Dedicated landing pages for search engine ranking across key development niches.

---

## 📁 Repository Structure

```text
GenCode/
├── index.html                     # Homepage with hero, services, tech stack, why choose me, testimonials, FAQ & form
├── about.html                     # About Me: bio, skills breakdown, career timeline & principles
├── contact.html                   # Dedicated Contact page with interactive inquiry form & quick channels
├── privacy-policy.html            # Complete legal privacy policy and client code ownership terms
├── 404.html                       # Custom 404 error page with quick navigation links
├── website-development.html       # Service: Custom PHP, Laravel, WordPress, Shopify & React development
├── website-optimization.html      # Service: Speed, Core Web Vitals & on-page SEO optimization
├── website-bug-fixing.html        # Service: Rapid bug fixing, 500 errors, plugin conflicts & security
├── website-maintenance.html       # Service: Monthly maintenance, updates, backups & uptime monitoring
├── software-testing.html          # Service: QA, manual & automated testing, regression & cross-browser QA
├── mobile-app-development.html    # Service: React Native & Flutter iOS/Android app development
├── website-audit.html             # Service: Comprehensive UX/UI, accessibility, and CRO audit reports
├── sitemap.xml                    # Complete XML sitemap for search engines
├── robots.txt                     # Crawler directives and sitemap declaration
├── site.webmanifest               # Progressive Web App (PWA) manifest configuration
├── css/
│   └── style.css                  # Master CSS design system, CSS variables, utility classes & responsive queries
├── js/
│   └── main.js                    # Mobile menu toggle, sticky header, scroll reveal, FAQ & lead form handoff
└── images/
    ├── favicon.svg                # Modern SVG gradient code icon
    └── og-cover.svg               # 1200x630 OpenGraph social share card
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Markup** | Semantic HTML5, Schema.org JSON-LD |
| **Styling** | Vanilla CSS3 (Custom properties, CSS Grid, Flexbox, Clamp typography) |
| **Scripting** | Vanilla JavaScript (ES6+, IntersectionObserver, Async/Await) |
| **Typography** | Inter (Google Fonts) |
| **Iconography** | Font Awesome 6.4 (Free SVG & Web Font CDN) |
| **Assets** | Native vector SVGs for crisp rendering on high-DPI retina displays |

---

## 💻 Local Development

You can run this project locally using any simple HTTP server:

### Option 1: Python 3
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## ⚙️ Configuration & Customization

All primary contact settings are centralized in [js/main.js](file:///c:/Users/shash/Downloads/GenCode/js/main.js):

- **WhatsApp Phone Number:** Change `const WHATSAPP_NUMBER = '917986288635';` (International format without leading `+`).
- **Support Email:** Change `const EMAIL = 'shashi.php92@gmail.com';`.
- **Form Storage Endpoint:** Modify `fetch('tables/leads', ...)` in `js/main.js` to point to your backend API, Supabase, Firebase, or serverless function.

---

## 🚢 Deployment

This site is 100% static and can be deployed with zero build steps to:

1. **GitHub Pages:**
   - Push code to a GitHub repository.
   - Go to Settings > Pages > Source > `main` branch > `/ (root)`.
2. **Vercel / Netlify / Fast Edge Hosting:**
   - Connect your Git repository.
   - Leave build command blank and publish directory as `.`.
3. **Apache / cPanel / Nginx:**
   - Upload the entire folder to `public_html` or web root directory.
   - Ensure SSL certificate is active for HTTPS.

---

## 📄 License & Ownership

© 2026 Shashi Kumar. All rights reserved. Custom code and designs belong to Shashi Kumar.
