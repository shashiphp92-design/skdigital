/* ============================================================
   SK DIGITAL — Shashi Kumar
   Ultra-Modern High-Converting Interactive Logic (Vanilla JS)
   - Canvas Moving Particle & Wave Background Animation
   - Interactive Mouse Spotlight Tracking for Bento Grid
   - Global Instant Currency Toggle (INR / USD)
   - Interactive Live Project Estimator & Scope Calculator
   - 1-Click Structured WhatsApp Quote Generator
   - Terminal Interactive Console & GA4 Telemetry
   ============================================================ */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '917986288635'; // +91 7986288635
  const EMAIL = 'shashi.php92@gmail.com';


  /* ---------- GA4 Event Helper ---------- */
  const trackEvent = (eventName, params) => {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      }
    } catch (e) {}
  };

  /* ============================================================
     1. MOVING BACKGROUND CANVAS ANIMATION EFFECT
     - Lightweight, silky-smooth 60fps interactive particle mesh
     - Electric Sky Blue (#0EA5E9) & Emerald Green (#10B981)
     - Repulsion & attraction on mouse movement
     - Automatically paused on tab blur or reduced motion
     ============================================================ */
  const initCanvasBackground = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId = null;
    let isVisible = true;
    let waveStep = 0;

    const mouse = {
      x: null,
      y: null,
      radius: 160
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    }, { passive: true });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 150);
    }, { passive: true });

    // Particles configuration
    let particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 85);

    class GlowingParticle {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.size = Math.random() * 2.5 + 1.2;
        this.isEmerald = Math.random() > 0.45;
        this.color = this.isEmerald ? '#10b981' : '#0ea5e9';
        this.rgba = this.isEmerald ? '16, 185, 129' : '14, 165, 233';
        this.alpha = Math.random() * 0.5 + 0.35;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 2.5;
            this.y -= Math.sin(angle) * force * 2.5;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.rgba}, ${this.alpha})`;
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new GlowingParticle());
      }
    };
    initParticles();

    // Laser connection filaments
    const connectParticles = () => {
      const maxDistance = 140;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = particles[a].isEmerald
              ? `rgba(16, 185, 129, ${opacity})`
              : `rgba(14, 165, 233, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Flowing undulating wave ribbon across lower screen
    const drawWaveMesh = () => {
      waveStep += 0.015;
      const waveY = height * 0.72;

      // Wave 1 - Electric Sky Blue
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 15) {
        const y = waveY + Math.sin(x * 0.0035 + waveStep) * 45 + Math.cos(x * 0.002 - waveStep * 0.5) * 25;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const grad1 = ctx.createLinearGradient(0, waveY - 50, 0, height);
      grad1.addColorStop(0, 'rgba(14, 165, 233, 0.08)');
      grad1.addColorStop(1, 'rgba(14, 165, 233, 0.0)');
      ctx.fillStyle = grad1;
      ctx.fill();

      // Wave 1 outline stroke
      ctx.beginPath();
      for (let x = 0; x <= width; x += 15) {
        const y = waveY + Math.sin(x * 0.0035 + waveStep) * 45 + Math.cos(x * 0.002 - waveStep * 0.5) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.22)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Wave 2 - Emerald Green counter-wave
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 15) {
        const y = (waveY + 30) + Math.sin(x * 0.004 - waveStep * 0.8) * 35 + Math.cos(x * 0.003 + waveStep) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const grad2 = ctx.createLinearGradient(0, waveY, 0, height);
      grad2.addColorStop(0, 'rgba(16, 185, 129, 0.06)');
      grad2.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
      ctx.fillStyle = grad2;
      ctx.fill();

      // Wave 2 stroke
      ctx.beginPath();
      for (let x = 0; x <= width; x += 15) {
        const y = (waveY + 30) + Math.sin(x * 0.004 - waveStep * 0.8) * 35 + Math.cos(x * 0.003 + waveStep) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    };

    // Draw mouse light aura
    const drawMouseAura = () => {
      if (mouse.x === null || mouse.y === null) return;
      ctx.save();
      const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
      aura.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
      aura.addColorStop(0.5, 'rgba(16, 185, 129, 0.05)');
      aura.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      drawMouseAura();
      drawWaveMesh();

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        animate();
      }
    });

    animate();
  };

    /* ============================================================
     2. MOUSE SPOTLIGHT TRACKING FOR BENTO GRID
     ============================================================ */
  const initBentoSpotlight = () => {
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  };

  /* ============================================================
     4. INTERACTIVE LIVE PROJECT ESTIMATOR & LEAD MAGNET (3-STEP)
     ============================================================ */
  const initEstimator = () => {
    const form = document.getElementById('project-estimator-form');
    if (!form) return;

    // Service pricing matrices & scope rules
    const serviceSpecs = {
      webdev: {
        name: 'Business Website',
        subtitle: 'Landing page or dynamic corporate CMS website',
        types: {
          static: {
            name: 'Static Landing Page / Website',
            baseTimeDays: 4,
            inr: { base: 5000, perPage: 750, freePages: 3 },
            usd: { base: 65, perPage: 10, freePages: 3 },
            timeline: '3–5 Days'
          },
          dynamic: {
            name: 'Dynamic CMS / WordPress / Laravel',
            baseTimeDays: 10,
            inr: { base: 15000, perPage: 1500, freePages: 5 },
            usd: { base: 200, perPage: 22, freePages: 5 },
            timeline: '1–2 Weeks'
          }
        }
      },
      ecommerce: {
        name: 'E-Commerce Website',
        subtitle: 'Custom store with cart, payments & catalog',
        baseTimeDays: 16,
        inr: { base: 35000, perTemplate: 1500, freeTemplates: 5 },
        usd: { base: 450, perTemplate: 20, freeTemplates: 5 },
        timeline: '2–3 Weeks',
        catalogTiers: {
          small: { label: '1–20 Products (Starter)', inr: 0, usd: 0, timeAdd: 0 },
          medium: { label: '21–100 Products (Growing)', inr: 5000, usd: 60, timeAdd: 4 },
          large: { label: '101–500 Products (Established)', inr: 12000, usd: 150, timeAdd: 7 },
          enterprise: { label: '500+ Products (Enterprise)', inr: 20000, usd: 250, timeAdd: 12 }
        },
        platforms: {
          shopify: { label: 'Shopify Store (Liquid)', inr: 0, usd: 0 },
          woocommerce: { label: 'WooCommerce / WordPress', inr: 0, usd: 0 },
          headless: { label: 'Custom Headless / Laravel API', inr: 10000, usd: 125, timeAdd: 5 }
        }
      },
      mobile: {
        name: 'Mobile App Development',
        subtitle: 'Cross-platform iOS and Android mobile app',
        baseTimeDays: 24,
        inr: { base: 35000, perScreen: 2500, freeScreens: 5 },
        usd: { base: 450, perScreen: 35, freeScreens: 5 },
        timeline: '3–5 Weeks',
        platforms: {
          cross: { label: 'Cross-Platform (iOS & Android)', inr: 0, usd: 0, timeAdd: 0 },
          android: { label: 'Android Native Only', inr: -4000, usd: -50, timeAdd: -4 },
          ios: { label: 'iOS Native Only', inr: -4000, usd: -50, timeAdd: -4 }
        }
      },
      speed: {
        name: 'Website Speed Optimization',
        subtitle: 'Google PageSpeed 90+ Score & Core Web Vitals SLA',
        baseTimeDays: 3,
        inr: { base: 8000, perTemplate: 1000, freeTemplates: 3 },
        usd: { base: 100, perTemplate: 12, freeTemplates: 3 },
        timeline: '2–4 Days',
        scopes: {
          cwv: { label: 'Core Web Vitals 90+ Score SLA', inr: 0, usd: 0, timeAdd: 0 },
          db: { label: '+ Database & Redis Object Caching', inr: 3500, usd: 45, timeAdd: 2 },
          edge: { label: '+ Full Edge CDN & Global Assets', inr: 3000, usd: 40, timeAdd: 1 }
        }
      },
      qa: {
        name: 'Website Testing / QA',
        subtitle: 'Automated Playwright regression testing & QA matrix',
        baseTimeDays: 8,
        inr: { base: 12000, perFlow: 900, freeFlows: 5 },
        usd: { base: 150, perFlow: 14, freeFlows: 5 },
        timeline: '1–2 Weeks',
        depths: {
          playwright: { label: 'Automated Playwright E2E Suite', inr: 0, usd: 0, timeAdd: 0 },
          matrix: { label: '+ Cross-Browser & Device Matrix QA', inr: 3500, usd: 45, timeAdd: 3 },
          perf: { label: '+ API & Latency Benchmark Suite', inr: 4000, usd: 50, timeAdd: 3 }
        }
      },
      bugfix: {
        name: 'Bug Fixing',
        subtitle: 'Rapid emergency diagnosis and resolution for errors',
        baseTimeDays: 2,
        timeline: '24–48 Hours',
        issueTiers: {
          small: { label: '1–2 Specific Bugs / Glitches', inr: 4999, usd: 65, timeDays: 2, timeline: '24–48 Hours' },
          medium: { label: '3–5 Issues / Broken Features', inr: 9999, usd: 130, timeDays: 3, timeline: '48–72 Hours' },
          large: { label: '6–10 Issues / Complex Errors', inr: 16999, usd: 220, timeDays: 5, timeline: '3–5 Days' }
        },
        severities: {
          standard: { label: 'Standard (CSS, layout, minor visual bugs)', inr: 0, usd: 0, timeAdd: 0 },
          high: { label: 'High (Broken checkout, forms, API error)', inr: 2500, usd: 35, timeAdd: 0 },
          critical: { label: 'Critical Emergency (Fatal 500, DB crash, malware)', inr: 5000, usd: 65, timeAdd: -1 }
        }
      },
      maintenance: {
        name: 'Website Maintenance',
        subtitle: 'Proactive updates, cloud backups & ongoing support',
        baseTimeDays: 1,
        timeline: 'Immediate Onboarding (24h SLA)',
        plans: {
          essential: { label: 'Essential Care (Backups, updates, 24/7 uptime)', inr: 4999, usd: 65 },
          pro: { label: 'Pro Care (+10 hrs dev updates, speed audit, priority SLA)', inr: 9999, usd: 130 },
          enterprise: { label: 'Enterprise Care (+25 hrs dev retainer, staging sync, 24/7 response)', inr: 19999, usd: 260 }
        },
        periods: {
          '1mo': { label: '1 Month (Month-to-Month)', multiplier: 1, discount: 0 },
          '3mo': { label: '3 Months (5% package savings)', multiplier: 3, discount: 0.05 },
          '6mo': { label: '6 Months (10% package savings)', multiplier: 6, discount: 0.10 },
          '12mo': { label: '12 Months (15% package savings)', multiplier: 12, discount: 0.15 }
        }
      },
      audit: {
        name: 'Website Audit',
        subtitle: 'Forensic UI/UX, CRO funnel & tech health report',
        baseTimeDays: 4,
        timeline: '3–5 Days',
        sizes: {
          small: { label: 'Small Site (1–5 Pages / Landing Page)', inr: 7999, usd: 99, timeAdd: 0 },
          medium: { label: 'Medium Site (6–15 Pages / Business)', inr: 10999, usd: 139, timeAdd: 1 },
          large: { label: 'Large Site (15+ Pages / E-Commerce / Portal)', inr: 14999, usd: 189, timeAdd: 3 }
        },
        depths: {
          ux: { label: 'UI/UX & Mobile Usability Teardown', inr: 0, usd: 0, timeAdd: 0 },
          cro: { label: '+ Full Conversion Rate Optimization (CRO) & Funnel Audit', inr: 3500, usd: 45, timeAdd: 1 },
          tech: { label: '+ Deep Forensic Tech Stack, Security & Speed Audit', inr: 4500, usd: 60, timeAdd: 2 }
        }
      }
    };

    // Service-specific Add-on catalog (Customer-friendly language, strictly unchecked by default)
    const serviceAddons = {
      webdev: [
        { id: 'seo', name: 'SEO Architecture & Schema Setup', desc: 'Google search indexing, meta tags & JSON-LD structured data', inr: 3500, usd: 45, icon: 'fa-solid fa-magnifying-glass-chart' },
        { id: 'payment', name: 'Payment Gateway Integration', desc: 'Razorpay, Stripe or PayPal for instant client payments', inr: 4500, usd: 60, icon: 'fa-solid fa-credit-card' },
        { id: 'cms', name: 'Custom Admin Dashboard / CMS', desc: 'Easily edit copy, images, and blogs without touching code', inr: 7500, usd: 95, icon: 'fa-solid fa-sliders' },
        { id: 'i18n', name: 'Multilingual Support (i18n)', desc: 'Multi-language toggle for international audiences', inr: 5000, usd: 65, icon: 'fa-solid fa-language' },
        { id: 'chat', name: 'WhatsApp & Live Chat Widget', desc: '1-click chat widget connecting visitors directly to your phone', inr: 3000, usd: 40, icon: 'fa-solid fa-comments' },
        { id: 'speed_sla', name: '90+ PageSpeed SLA Guarantee', desc: 'Sub-second load times & Google green score badge', inr: 4000, usd: 50, icon: 'fa-solid fa-bolt' },
        { id: 'cicd', name: 'Automated CI/CD Deployment', desc: 'GitHub Actions pipeline for zero-downtime releases', inr: 3500, usd: 45, icon: 'fa-solid fa-code-branch' }
      ],
      ecommerce: [
        { id: 'payment', name: 'Multi-Gateway Payment Setup', desc: 'Cards, UPI, NetBanking, Stripe, PayPal & COD support', inr: 4500, usd: 60, icon: 'fa-solid fa-credit-card' },
        { id: 'seo', name: 'E-Commerce SEO & Product Feeds', desc: 'Google Shopping XML feeds and rich product snippet schemas', inr: 4500, usd: 60, icon: 'fa-solid fa-magnifying-glass-chart' },
        { id: 'abandon', name: 'Cart Abandonment Recovery', desc: 'Automated WhatsApp & email reminders for dropped carts', inr: 4500, usd: 60, icon: 'fa-solid fa-cart-arrow-down' },
        { id: 'shipping', name: 'Shipping API & Tracking Sync', desc: 'Automated label generation with Shiprocket, Delhivery or FedEx', inr: 5500, usd: 70, icon: 'fa-solid fa-truck-fast' },
        { id: 'i18n', name: 'Multi-Currency & Multi-Language', desc: 'Automatic geo-IP currency switcher for global shoppers', inr: 5000, usd: 65, icon: 'fa-solid fa-globe' },
        { id: 'speed_sla', name: 'High-Traffic Redis Caching SLA', desc: 'Sub-second catalog browsing and instant cart loading', inr: 4000, usd: 50, icon: 'fa-solid fa-bolt' }
      ],
      mobile: [
        { id: 'iap', name: 'In-App Purchases & Subscriptions', desc: 'Apple App Store & Google Play billing integration', inr: 6000, usd: 80, icon: 'fa-solid fa-receipt' },
        { id: 'push', name: 'Push Notifications & Firebase', desc: 'Targeted customer alerts, deep links & Firebase backend', inr: 6500, usd: 85, icon: 'fa-solid fa-bell' },
        { id: 'backend', name: 'Custom REST/GraphQL API Backend', desc: 'Secure Node/Laravel API server with JWT authentication', inr: 8500, usd: 110, icon: 'fa-solid fa-server' },
        { id: 'deploy', name: 'App Store & Play Store Publishing', desc: 'Official store submission, screenshots & review compliance', inr: 4500, usd: 60, icon: 'fa-brands fa-app-store-ios' },
        { id: 'qa', name: '15+ Device Real-Screen QA Testing', desc: 'Rigorous testing across flagship iPhones and Androids', inr: 4500, usd: 60, icon: 'fa-solid fa-mobile' }
      ],
      speed: [
        { id: 'ci_speed', name: 'Automated Speed Regression CI', desc: 'Lighthouse CI audit on git commits to lock in 90+ score', inr: 3500, usd: 45, icon: 'fa-solid fa-code-branch' },
        { id: 'audit_doc', name: 'Executive Speed Audit & Video Proof', desc: 'Before/after video comparisons and technical breakdown', inr: 3000, usd: 40, icon: 'fa-solid fa-file-video' },
        { id: 'seo_speed', name: 'Technical On-Page SEO Speed Audit', desc: 'Schema markup, heading structure & crawl efficiency tuning', inr: 3500, usd: 45, icon: 'fa-solid fa-magnifying-glass-chart' },
        { id: 'rum_monitor', name: '30-Day Real-User Monitoring (RUM)', desc: 'Live Core Web Vitals telemetry with instant regression alerts', inr: 3000, usd: 40, icon: 'fa-solid fa-chart-line' }
      ],
      qa: [
        { id: 'ci_qa', name: 'GitHub Actions CI/CD Test Pipeline', desc: 'Automated test execution on every pull request', inr: 4500, usd: 60, icon: 'fa-solid fa-code-branch' },
        { id: 'load', name: 'Load & Stress Testing (5k Users)', desc: 'Simulate traffic spikes with k6 & identify bottlenecks', inr: 5500, usd: 70, icon: 'fa-solid fa-chart-line' },
        { id: 'trace', name: 'Video Traces & Bug Documentation', desc: 'Trace viewer recordings and formatted developer bug tickets', inr: 3000, usd: 40, icon: 'fa-solid fa-video' },
        { id: 'sec_scan', name: 'Automated OWASP Security Scan', desc: 'Automated vulnerability audit for XSS, SQLi & headers', inr: 4000, usd: 50, icon: 'fa-solid fa-shield-virus' }
      ],
      bugfix: [
        { id: 'fix_speed', name: 'Post-Fix Performance & Speed Check', desc: 'Verify fixes didn’t degrade page load speed or SEO', inr: 3000, usd: 40, icon: 'fa-solid fa-gauge-high' },
        { id: 'backup', name: 'Full Offsite Cloud Backup Snapshot', desc: 'Complete safeguard snapshot of files & database before fixes', inr: 2500, usd: 30, icon: 'fa-solid fa-floppy-disk' },
        { id: 'sec_harden', name: 'Security & Vulnerability Patching', desc: 'Malware scans, SQL injection prevention & header hardening', inr: 4500, usd: 60, icon: 'fa-solid fa-shield-virus' },
        { id: 'doc_fix', name: 'Root Cause Prevention Report', desc: 'Detailed explanation of what broke and how to prevent it', inr: 2500, usd: 30, icon: 'fa-solid fa-file-shield' }
      ],
      maintenance: [
        { id: 'maint_seo', name: 'Monthly Technical SEO Health Check', desc: 'Crawl error audits, broken link sweeps & XML sitemap sync', inr: 3500, usd: 45, icon: 'fa-solid fa-magnifying-glass-chart' },
        { id: 'maint_speed', name: 'Monthly Core Web Vitals Guard', desc: 'Monthly asset tuning to keep PageSpeed scores above 90+', inr: 3500, usd: 45, icon: 'fa-solid fa-gauge-high' },
        { id: 'staging', name: 'Dedicated Staging Environment Sync', desc: 'Test all updates in isolation before updating live site', inr: 4000, usd: 50, icon: 'fa-solid fa-server' },
        { id: 'sla_2h', name: '2-Hour Emergency Response SLA', desc: 'Dedicated priority developer channel for urgent issues', inr: 5000, usd: 65, icon: 'fa-solid fa-bolt' }
      ],
      audit: [
        { id: 'competitor', name: 'Top 3 Competitor UX Benchmarking', desc: 'Side-by-side UX teardown against 3 key market rivals', inr: 4000, usd: 50, icon: 'fa-solid fa-chart-pie' },
        { id: 'call', name: '60-Minute 1-on-1 Video Strategy Call', desc: 'Direct walkthrough of report & live Q&A with Shashi Kumar', inr: 3500, usd: 45, icon: 'fa-solid fa-video' },
        { id: 'jira', name: 'Ready-to-Code Jira/GitHub Tickets', desc: 'Formatted developer-ready task tickets with acceptance criteria', inr: 3500, usd: 45, icon: 'fa-solid fa-list-check' },
        { id: 'wins', name: 'Direct Implementation of Top 3 Wins', desc: 'Immediate senior developer execution of highest-impact fixes', inr: 5500, usd: 70, icon: 'fa-solid fa-wand-magic-sparkles' }
      ]
    };

    // State
    let currentStep = 1;
    let currencyMode = 'both'; // 'both' | 'inr' | 'usd'
    let webdevType = 'dynamic'; // 'static' | 'dynamic'

    // DOM References
    const stepperTabs = form.querySelectorAll('.stepper-tab');
    const stepPanes = form.querySelectorAll('.calc-step-pane');
    const dynamicScopeWrap = document.getElementById('calc-dynamic-scope-wrap');
    const dynamicAddonsWrap = document.getElementById('calc-dynamic-addons-wrap');
    const step2Title = document.getElementById('step-2-service-title');
    const step2Subtitle = document.getElementById('step-2-service-subtitle');

    // Summary Elements
    const scopeLabel = document.getElementById('est-scope-label');
    const pagesSummary = document.getElementById('est-pages-summary');
    const urgencySummary = document.getElementById('est-urgency-summary');
    const featuresSummary = document.getElementById('est-features-summary');
    const priceRangeDisplay = document.getElementById('est-price-range');
    const timelineDisplay = document.getElementById('est-timeline');
    const waQuoteBtn = document.getElementById('est-wa-quote-btn');
    const emailLockBtn = document.getElementById('est-email-lock-btn');
    const stripPrice = document.getElementById('est-strip-price');
    const stripTimeline = document.getElementById('est-strip-timeline');

    // Step Navigation Function
    const goToStep = (stepNumber) => {
      const targetStep = Math.max(1, Math.min(3, parseInt(stepNumber, 10)));
      currentStep = targetStep;

      // Update Stepper Tabs
      stepperTabs.forEach((tab) => {
        const step = parseInt(tab.getAttribute('data-step'), 10);
        const isActive = step === currentStep;
        const isPassed = step < currentStep;

        tab.classList.toggle('active', isActive);
        tab.classList.toggle('completed', isPassed);
        tab.setAttribute('aria-selected', String(isActive));
      });

      // Update Step Panes
      stepPanes.forEach((pane) => {
        const paneId = pane.id;
        const isActive = paneId === `calc-step-pane-${currentStep}`;
        pane.classList.toggle('active', isActive);
      });

      // Smooth scroll back to calculator top if stepped forward/backward
      const builderCard = form.querySelector('.estimator-builder-card');
      if (builderCard && window.innerWidth < 992) {
        builderCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Render Step 2 Scope Questions specifically tailored to the active service
    const renderScopeQuestions = (serviceKey) => {
      if (!dynamicScopeWrap) return;

      const spec = serviceSpecs[serviceKey] || serviceSpecs.webdev;
      if (step2Title) step2Title.textContent = `Tell us about your ${spec.name}`;
      if (step2Subtitle) step2Subtitle.textContent = spec.subtitle;

      let html = '';

      if (serviceKey === 'webdev') {
        html = `
          <!-- Website Architecture Type -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Website Type &amp; Architecture</label>
              <span class="calc-field-hint">Choose between an ultra-fast static build or dynamic CMS</span>
            </div>
            <div class="calc-pill-options-grid">
              <div class="calc-pill-option">
                <input type="radio" id="wb-type-dyn" name="webdev_type" value="dynamic" ${webdevType === 'dynamic' ? 'checked' : ''}>
                <label for="wb-type-dyn" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Dynamic / CMS Website</strong> <span class="pill-badge">Most Popular</span></div>
                  <div class="pill-desc">WordPress, Laravel, or custom admin panel for blogs, business leads &amp; updates.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="wb-type-stat" name="webdev_type" value="static" ${webdevType === 'static' ? 'checked' : ''}>
                <label for="wb-type-stat" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Static Website / Landing Page</strong></div>
                  <div class="pill-desc">Lightweight HTML5/CSS, blazing 95+ PageSpeed, ideal for startups &amp; portfolios.</div>
                </label>
              </div>
            </div>
          </div>

          <!-- Page Count Slider -->
          <div class="calc-field-group">
            <div class="slider-header">
              <div class="calc-field-label" style="margin-bottom:0;">
                <label for="input-webdev-pages">Estimated Number of Pages</label>
                <span class="calc-field-hint">Home, About, Services, Contact, Case Studies, etc.</span>
              </div>
              <span class="slider-value-display" id="display-webdev-pages">5 Pages</span>
            </div>
            <input type="range" id="input-webdev-pages" class="custom-range-slider" min="1" max="30" value="5" step="1">
            <div class="range-ticks">
              <span>1 Page (Landing)</span>
              <span>5–8 Pages (Standard)</span>
              <span>15–20 Pages</span>
              <span>30+ Pages</span>
            </div>
          </div>
        `;
      } else if (serviceKey === 'ecommerce') {
        html = `
          <!-- Product Catalog Size -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Product Catalog Scale</label>
              <span class="calc-field-hint">Select the initial number of SKUs / products in your store</span>
            </div>
            <div class="calc-pill-options-grid" style="grid-template-columns: repeat(2, 1fr);">
              <div class="calc-pill-option">
                <input type="radio" id="ecom-cat-sm" name="ecom_catalog" value="small" checked>
                <label for="ecom-cat-sm" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>1–20 Products</strong> <span class="pill-badge">Starter</span></div>
                  <div class="pill-desc">Boutique brand or single-category shop</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="ecom-cat-md" name="ecom_catalog" value="medium">
                <label for="ecom-cat-md" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>21–100 Products</strong> <span class="pill-badge">+₹5k / $60</span></div>
                  <div class="pill-desc">Growing store with multiple collections</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="ecom-cat-lg" name="ecom_catalog" value="large">
                <label for="ecom-cat-lg" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>101–500 Products</strong> <span class="pill-badge">+₹12k / $150</span></div>
                  <div class="pill-desc">Established multi-category retail store</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="ecom-cat-ent" name="ecom_catalog" value="enterprise">
                <label for="ecom-cat-ent" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>500+ Products</strong> <span class="pill-badge">+₹20k / $250</span></div>
                  <div class="pill-desc">Enterprise catalog, bulk CSV import &amp; sync</div>
                </label>
              </div>
            </div>
          </div>

          <!-- Store Platform -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>E-Commerce Engine / Platform</label>
              <span class="calc-field-hint">Preferred platform for store management and checkout</span>
            </div>
            <div class="calc-pill-options-grid">
              <div class="calc-pill-option">
                <input type="radio" id="ecom-plat-shop" name="ecom_platform" value="shopify" checked>
                <label for="ecom-plat-shop" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Shopify Store</strong></div>
                  <div class="pill-desc">Custom Liquid templates, app setup &amp; Shopify Payments</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="ecom-plat-woo" name="ecom_platform" value="woocommerce">
                <label for="ecom-plat-woo" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>WooCommerce / WordPress</strong></div>
                  <div class="pill-desc">Open-source store with zero transaction platform fees</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="ecom-plat-head" name="ecom_platform" value="headless">
                <label for="ecom-plat-head" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Custom Headless / Laravel API</strong> <span class="pill-badge">+₹10k</span></div>
                  <div class="pill-desc">Ultra-fast decoupled architecture for high-volume brands</div>
                </label>
              </div>
            </div>
          </div>
        `;
      } else if (serviceKey === 'mobile') {
        html = `
          <!-- Target Platform -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Target Operating System</label>
              <span class="calc-field-hint">Deploy to both stores simultaneously or a single OS</span>
            </div>
            <div class="calc-pill-options-grid">
              <div class="calc-pill-option">
                <input type="radio" id="mob-plat-cross" name="mob_platform" value="cross" checked>
                <label for="mob-plat-cross" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>iOS &amp; Android (Cross-Platform)</strong> <span class="pill-badge">Recommended</span></div>
                  <div class="pill-desc">Flutter or React Native single codebase with native 60fps performance.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="mob-plat-and" name="mob_platform" value="android">
                <label for="mob-plat-and" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Android Only</strong></div>
                  <div class="pill-desc">Dedicated Google Play release for Android smartphones and tablets.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="mob-plat-ios" name="mob_platform" value="ios">
                <label for="mob-plat-ios" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>iOS Only</strong></div>
                  <div class="pill-desc">Dedicated Apple App Store release for iPhone and iPad.</div>
                </label>
              </div>
            </div>
          </div>

          <!-- Screen Count Slider -->
          <div class="calc-field-group">
            <div class="slider-header">
              <div class="calc-field-label" style="margin-bottom:0;">
                <label for="input-mob-screens">Estimated Number of App Screens</label>
                <span class="calc-field-hint">Splash, Auth, Feed, Profile, Details, Settings, Cart, etc.</span>
              </div>
              <span class="slider-value-display" id="display-mob-screens">8 Screens</span>
            </div>
            <input type="range" id="input-mob-screens" class="custom-range-slider" min="5" max="30" value="8" step="1">
            <div class="range-ticks">
              <span>5 Screens (Core MVP)</span>
              <span>10–12 Screens</span>
              <span>20 Screens</span>
              <span>30+ Screens</span>
            </div>
          </div>
        `;
      } else if (serviceKey === 'speed') {
        html = `
          <!-- Page Templates Slider -->
          <div class="calc-field-group">
            <div class="slider-header">
              <div class="calc-field-label" style="margin-bottom:0;">
                <label for="input-speed-templates">Key Page Templates to Optimize</label>
                <span class="calc-field-hint">E.g., Homepage, Product/Service page, Category, Blog, Checkout</span>
              </div>
              <span class="slider-value-display" id="display-speed-templates">3 Templates</span>
            </div>
            <input type="range" id="input-speed-templates" class="custom-range-slider" min="1" max="15" value="3" step="1">
            <div class="range-ticks">
              <span>1 Template (Landing)</span>
              <span>3 Templates (Standard)</span>
              <span>7 Templates</span>
              <span>15+ Templates</span>
            </div>
          </div>

          <!-- Optimization Depth -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Optimization Scope &amp; Target</label>
              <span class="calc-field-hint">Select the depth of technical speed engineering required</span>
            </div>
            <div class="calc-pill-options-grid">
              <div class="calc-pill-option">
                <input type="radio" id="speed-scope-cwv" name="speed_scope" value="cwv" checked>
                <label for="speed-scope-cwv" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Core Web Vitals 90+ Score SLA</strong> <span class="pill-badge">Base</span></div>
                  <div class="pill-desc">Fix LCP, INP &amp; CLS. Asset minification, deferred JS &amp; modern WebP images.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="speed-scope-db" name="speed_scope" value="db">
                <label for="speed-scope-db" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>+ Database Profiling &amp; Redis Caching</strong> <span class="pill-badge">+₹3.5k / $45</span></div>
                  <div class="pill-desc">SQL query indexing, transient cleanup and Redis / OPcache object caching.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="speed-scope-edge" name="speed_scope" value="edge">
                <label for="speed-scope-edge" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>+ Full Cloudflare Enterprise CDN</strong> <span class="pill-badge">+₹3k / $40</span></div>
                  <div class="pill-desc">Global edge HTML caching, TLS 1.3, Brotli compression &amp; geo-routing.</div>
                </label>
              </div>
            </div>
          </div>
        `;
      } else if (serviceKey === 'qa') {
        html = `
          <!-- Critical User Flows Slider -->
          <div class="calc-field-group">
            <div class="slider-header">
              <div class="calc-field-label" style="margin-bottom:0;">
                <label for="input-qa-flows">Number of Critical User Flows</label>
                <span class="calc-field-hint">End-to-end flows: Checkout, Signup/Auth, Search, Booking, Form Submissions</span>
              </div>
              <span class="slider-value-display" id="display-qa-flows">5 Test Flows</span>
            </div>
            <input type="range" id="input-qa-flows" class="custom-range-slider" min="3" max="25" value="5" step="1">
            <div class="range-ticks">
              <span>3 Flows (Core MVP)</span>
              <span>5–8 Flows (Standard)</span>
              <span>15 Flows</span>
              <span>25+ Flows</span>
            </div>
          </div>

          <!-- QA Coverage Scope -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Testing Automation Scope</label>
              <span class="calc-field-hint">Depth of test coverage and cross-platform verification</span>
            </div>
            <div class="calc-pill-options-grid">
              <div class="calc-pill-option">
                <input type="radio" id="qa-scope-pw" name="qa_scope" value="playwright" checked>
                <label for="qa-scope-pw" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Automated Playwright E2E Suite</strong> <span class="pill-badge">Base</span></div>
                  <div class="pill-desc">Headless automated browser tests that verify your core workflows on every build.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="qa-scope-mat" name="qa_scope" value="matrix">
                <label for="qa-scope-mat" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>+ Cross-Browser &amp; Device Matrix QA</strong> <span class="pill-badge">+₹3.5k / $45</span></div>
                  <div class="pill-desc">Rigorous test coverage across Chrome, Safari, Firefox, iOS, and Android real viewports.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="qa-scope-perf" name="qa_scope" value="perf">
                <label for="qa-scope-perf" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>+ API &amp; Latency Regression Suite</strong> <span class="pill-badge">+₹4k / $50</span></div>
                  <div class="pill-desc">Automated contract testing for REST endpoints, webhooks, and database latency.</div>
                </label>
              </div>
            </div>
          </div>
        `;
      } else if (serviceKey === 'bugfix') {
        html = `
          <!-- Number of Bugs -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Number of Bugs / Issues</label>
              <span class="calc-field-hint">Estimated count of distinct errors or broken features</span>
            </div>
            <div class="calc-pill-options-grid">
              <div class="calc-pill-option">
                <input type="radio" id="bf-count-sm" name="bugfix_count" value="small" checked>
                <label for="bf-count-sm" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>1–2 Specific Bugs / Glitches</strong> <span class="pill-badge">₹4,999 / $65</span></div>
                  <div class="pill-desc">Targeted fixes for single-component issues (24–48h SLA)</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="bf-count-md" name="bugfix_count" value="medium">
                <label for="bf-count-md" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>3–5 Issues / Broken Features</strong> <span class="pill-badge">₹9,999 / $130</span></div>
                  <div class="pill-desc">Multi-page bug sweep or integration fixes (48–72h)</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="bf-count-lg" name="bugfix_count" value="large">
                <label for="bf-count-lg" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>6–10 Issues / Complex Errors</strong> <span class="pill-badge">₹16,999 / $220</span></div>
                  <div class="pill-desc">Comprehensive system debugging &amp; stabilization</div>
                </label>
              </div>
            </div>
          </div>

          <!-- Bug Severity -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Estimated Severity Level</label>
              <span class="calc-field-hint">Nature of the most critical issue</span>
            </div>
            <div class="calc-pill-options-grid">
              <div class="calc-pill-option">
                <input type="radio" id="bf-sev-std" name="bugfix_severity" value="standard" checked>
                <label for="bf-sev-std" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Standard (CSS / Layout / Minor JS)</strong></div>
                  <div class="pill-desc">Visual quirks, alignment bugs, responsive navigation glitches</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="bf-sev-high" name="bugfix_severity" value="high">
                <label for="bf-sev-high" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>High (Checkout / Form / API Failure)</strong> <span class="pill-badge">+₹2.5k</span></div>
                  <div class="pill-desc">Broken payment flows, form submission drop-offs, third-party webhook bugs</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="bf-sev-crit" name="bugfix_severity" value="critical">
                <label for="bf-sev-crit" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Critical Emergency (Fatal 500 / DB Crash)</strong> <span class="pill-badge">+₹5k</span></div>
                  <div class="pill-desc">Site is completely down, white screen of death, or security vulnerability</div>
                </label>
              </div>
            </div>
          </div>
        `;
      } else if (serviceKey === 'maintenance') {
        html = `
          <!-- Care Plan Level -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Support Scope / Care Plan</label>
              <span class="calc-field-hint">Choose the level of monthly ongoing maintenance needed</span>
            </div>
            <div class="calc-pill-options-grid">
              <div class="calc-pill-option">
                <input type="radio" id="maint-plan-ess" name="maint_plan" value="essential" checked>
                <label for="maint-plan-ess" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Essential Care Plan</strong> <span class="pill-badge">₹4,999/mo ($65/mo)</span></div>
                  <div class="pill-desc">Daily cloud backups, 24/7 uptime monitoring, security patches &amp; core updates.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="maint-plan-pro" name="maint_plan" value="pro">
                <label for="maint-plan-pro" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Pro Care Plan</strong> <span class="pill-badge">₹9,999/mo ($130/mo)</span></div>
                  <div class="pill-desc">Includes 10 hours dedicated developer updates, speed audit &amp; priority SLA.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="maint-plan-ent" name="maint_plan" value="enterprise">
                <label for="maint-plan-ent" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Enterprise Care Plan</strong> <span class="pill-badge">₹19,999/mo ($260/mo)</span></div>
                  <div class="pill-desc">25 hours dev retainer, dedicated staging sync, and 24/7 emergency response.</div>
                </label>
              </div>
            </div>
          </div>

          <!-- Commitment Period -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Maintenance Commitment Period</label>
              <span class="calc-field-hint">Longer terms unlock bundled retainer discounts</span>
            </div>
            <div class="calc-pill-options-grid" style="grid-template-columns: repeat(2, 1fr);">
              <div class="calc-pill-option">
                <input type="radio" id="maint-per-1" name="maint_period" value="1mo" checked>
                <label for="maint-per-1" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>1 Month</strong> <span class="pill-badge">Month-to-Month</span></div>
                  <div class="pill-desc">Cancel anytime with 7 days notice</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="maint-per-3" name="maint_period" value="3mo">
                <label for="maint-per-3" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>3 Months</strong> <span class="pill-badge">Save 5%</span></div>
                  <div class="pill-desc">Quarterly maintenance cycle</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="maint-per-6" name="maint_period" value="6mo">
                <label for="maint-per-6" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>6 Months</strong> <span class="pill-badge">Save 10%</span></div>
                  <div class="pill-desc">Semi-annual proactive care</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="maint-per-12" name="maint_period" value="12mo">
                <label for="maint-per-12" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>12 Months</strong> <span class="pill-badge">Save 15%</span></div>
                  <div class="pill-desc">Annual peace-of-mind partnership</div>
                </label>
              </div>
            </div>
          </div>
        `;
      } else if (serviceKey === 'audit') {
        html = `
          <!-- Website Size -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Website Scale / Page Depth</label>
              <span class="calc-field-hint">Select the approximate size of the website to be audited</span>
            </div>
            <div class="calc-pill-options-grid">
              <div class="calc-pill-option">
                <input type="radio" id="aud-sz-sm" name="audit_size" value="small" checked>
                <label for="aud-sz-sm" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Small Site (1–5 Pages)</strong> <span class="pill-badge">Base ₹7,999</span></div>
                  <div class="pill-desc">Landing page or focused micro-site audit</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="aud-sz-md" name="audit_size" value="medium">
                <label for="aud-sz-md" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Medium Site (6–15 Pages)</strong> <span class="pill-badge">+₹3k / $40</span></div>
                  <div class="pill-desc">Full corporate site or lead generation funnel</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="aud-sz-lg" name="audit_size" value="large">
                <label for="aud-sz-lg" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>Large Site (15+ Pages / E-Commerce)</strong> <span class="pill-badge">+₹7k / $90</span></div>
                  <div class="pill-desc">Multi-tier catalog or SaaS web application</div>
                </label>
              </div>
            </div>
          </div>

          <!-- Audit Depth -->
          <div class="calc-field-group">
            <div class="calc-field-label">
              <label>Audit Depth &amp; Deliverables</label>
              <span class="calc-field-hint">Select the analytical focus of the investigation</span>
            </div>
            <div class="calc-pill-options-grid">
              <div class="calc-pill-option">
                <input type="radio" id="aud-dp-ux" name="audit_depth" value="ux" checked>
                <label for="aud-dp-ux" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>UI/UX &amp; Mobile Usability Teardown</strong> <span class="pill-badge">Base</span></div>
                  <div class="pill-desc">Heuristic evaluation of friction points, mobile UX &amp; visual hierarchy.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="aud-dp-cro" name="audit_depth" value="cro">
                <label for="aud-dp-cro" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>+ Conversion Rate (CRO) &amp; Funnel Audit</strong> <span class="pill-badge">+₹3.5k / $45</span></div>
                  <div class="pill-desc">Form drop-off analysis, CTA effectiveness, and checkout psychology.</div>
                </label>
              </div>
              <div class="calc-pill-option">
                <input type="radio" id="aud-dp-tech" name="audit_depth" value="tech">
                <label for="aud-dp-tech" class="calc-pill-label" tabindex="0">
                  <div class="pill-title"><strong>+ Full Forensic Tech, Security &amp; Speed Audit</strong> <span class="pill-badge">+₹4.5k / $60</span></div>
                  <div class="pill-desc">Code quality, Core Web Vitals profiling, security headers &amp; API benchmarks.</div>
                </label>
              </div>
            </div>
          </div>
        `;
      }

      dynamicScopeWrap.innerHTML = html;

      // Toggle visibility of Urgency section (maintenance has a dedicated 24h onboarding SLA rather than sprint rush options)
      const urgencySection = form.querySelector('.urgency-section');
      if (urgencySection) {
        urgencySection.style.display = serviceKey === 'maintenance' ? 'none' : '';
      }

      // Bind input events for the newly rendered elements
      dynamicScopeWrap.querySelectorAll('input').forEach((input) => {
        input.addEventListener('change', calculate);
        if (input.type === 'range') {
          input.addEventListener('input', calculate);
        }
      });

      // Keyboard accessibility for newly created labels
      dynamicScopeWrap.querySelectorAll('label[tabindex="0"]').forEach((lbl) => {
        lbl.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const targetId = lbl.getAttribute('for');
            const targetInput = document.getElementById(targetId);
            if (targetInput) {
              targetInput.checked = true;
              targetInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        });
      });
    };

    // Render Step 3 Addons strictly relevant to the active service (all unchecked by default)
    const renderAddons = (serviceKey) => {
      if (!dynamicAddonsWrap) return;

      const addons = serviceAddons[serviceKey] || serviceAddons.webdev;
      let html = '';

      addons.forEach((addon) => {
        html += `
          <div class="calc-addon-item">
            <input type="checkbox" id="chk-addon-${addon.id}" name="est_features" value="${addon.id}" data-inr="${addon.inr}" data-usd="${addon.usd}" data-name="${addon.name}">
            <label for="chk-addon-${addon.id}" class="calc-addon-card" tabindex="0">
              <div class="addon-icon-box"><i class="${addon.icon}"></i></div>
              <div class="addon-details">
                <div class="addon-title-row">
                  <strong>${addon.name}</strong>
                  <span class="addon-price-tag">+₹${addon.inr.toLocaleString('en-IN')} (+$${addon.usd})</span>
                </div>
                <p class="addon-desc">${addon.desc}</p>
              </div>
              <div class="addon-checkbox-indicator"><i class="fa-solid fa-check"></i></div>
            </label>
          </div>
        `;
      });

      dynamicAddonsWrap.innerHTML = html;

      // Bind addon changes
      dynamicAddonsWrap.querySelectorAll('input[type="checkbox"]').forEach((chk) => {
        chk.addEventListener('change', calculate);
      });

      // Keyboard support for addon cards
      dynamicAddonsWrap.querySelectorAll('label[tabindex="0"]').forEach((lbl) => {
        lbl.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const targetId = lbl.getAttribute('for');
            const targetChk = document.getElementById(targetId);
            if (targetChk) {
              targetChk.checked = !targetChk.checked;
              targetChk.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        });
      });
    };

    // Core Calculation Engine
    const calculate = () => {
      const selectedServiceRadio = form.querySelector('input[name="est_service"]:checked');
      const serviceKey = selectedServiceRadio ? selectedServiceRadio.value : 'webdev';
      const spec = serviceSpecs[serviceKey] || serviceSpecs.webdev;

      let subtotalINR = 0;
      let subtotalUSD = 0;
      let estimatedDays = spec.baseTimeDays || 7;
      let scopeDescription = '';

      // Service Specific Scope Math
      if (serviceKey === 'webdev') {
        const typeRadio = form.querySelector('input[name="webdev_type"]:checked');
        webdevType = typeRadio ? typeRadio.value : 'dynamic';
        const typeSpec = spec.types[webdevType] || spec.types.dynamic;

        const pagesSlider = document.getElementById('input-webdev-pages');
        const rawPages = parseInt(pagesSlider ? pagesSlider.value : '5', 10);
        const pages = isNaN(rawPages) ? 5 : Math.max(1, Math.min(50, rawPages));
        const pagesDisplay = document.getElementById('display-webdev-pages');
        if (pagesDisplay) pagesDisplay.textContent = `${pages} Page${pages > 1 ? 's' : ''}`;

        const extraPages = Math.max(0, pages - typeSpec.inr.freePages);
        subtotalINR = typeSpec.inr.base + extraPages * typeSpec.inr.perPage;
        subtotalUSD = typeSpec.usd.base + extraPages * typeSpec.usd.perPage;
        estimatedDays = typeSpec.baseTimeDays + Math.round(extraPages * 0.7);

        scopeDescription = `${pages} Pages (${webdevType === 'static' ? 'Static HTML5' : 'Dynamic CMS'})`;
      } else if (serviceKey === 'ecommerce') {
        const catRadio = form.querySelector('input[name="ecom_catalog"]:checked');
        const catKey = catRadio ? catRadio.value : 'small';
        const catSpec = spec.catalogTiers[catKey] || spec.catalogTiers.small;

        const platRadio = form.querySelector('input[name="ecom_platform"]:checked');
        const platKey = platRadio ? platRadio.value : 'shopify';
        const platSpec = spec.platforms[platKey] || spec.platforms.shopify;

        subtotalINR = spec.inr.base + catSpec.inr + platSpec.inr;
        subtotalUSD = spec.usd.base + catSpec.usd + platSpec.usd;
        estimatedDays = spec.baseTimeDays + (catSpec.timeAdd || 0) + (platSpec.timeAdd || 0);

        scopeDescription = `${platSpec.label} (${catSpec.label.split(' ')[0]} Products)`;
      } else if (serviceKey === 'mobile') {
        const platRadio = form.querySelector('input[name="mob_platform"]:checked');
        const platKey = platRadio ? platRadio.value : 'cross';
        const platSpec = spec.platforms[platKey] || spec.platforms.cross;

        const screenSlider = document.getElementById('input-mob-screens');
        const rawScreens = parseInt(screenSlider ? screenSlider.value : '8', 10);
        const screens = isNaN(rawScreens) ? 8 : Math.max(5, Math.min(50, rawScreens));
        const screenDisplay = document.getElementById('display-mob-screens');
        if (screenDisplay) screenDisplay.textContent = `${screens} Screens`;

        const extraScreens = Math.max(0, screens - spec.inr.freeScreens);
        subtotalINR = spec.inr.base + platSpec.inr + extraScreens * spec.inr.perScreen;
        subtotalUSD = spec.usd.base + platSpec.usd + extraScreens * spec.usd.perScreen;
        estimatedDays = spec.baseTimeDays + (platSpec.timeAdd || 0) + Math.round(extraScreens * 1.5);

        scopeDescription = `${platSpec.label} (${screens} Screens)`;
      } else if (serviceKey === 'speed') {
        const tmplSlider = document.getElementById('input-speed-templates');
        const rawTmpl = parseInt(tmplSlider ? tmplSlider.value : '3', 10);
        const templates = isNaN(rawTmpl) ? 3 : Math.max(1, Math.min(30, rawTmpl));
        const tmplDisplay = document.getElementById('display-speed-templates');
        if (tmplDisplay) tmplDisplay.textContent = `${templates} Template${templates > 1 ? 's' : ''}`;

        const scopeRadio = form.querySelector('input[name="speed_scope"]:checked');
        const scopeKey = scopeRadio ? scopeRadio.value : 'cwv';
        const scopeSpec = spec.scopes[scopeKey] || spec.scopes.cwv;

        const extraTemplates = Math.max(0, templates - spec.inr.freeTemplates);
        subtotalINR = spec.inr.base + scopeSpec.inr + extraTemplates * spec.inr.perTemplate;
        subtotalUSD = spec.usd.base + scopeSpec.usd + extraTemplates * spec.usd.perTemplate;
        estimatedDays = spec.baseTimeDays + (scopeSpec.timeAdd || 0) + extraTemplates;

        scopeDescription = `${templates} Page Templates (${scopeSpec.label.split('+ ')[1] || 'Core Web Vitals'})`;
      } else if (serviceKey === 'qa') {
        const flowSlider = document.getElementById('input-qa-flows');
        const rawFlows = parseInt(flowSlider ? flowSlider.value : '5', 10);
        const flows = isNaN(rawFlows) ? 5 : Math.max(3, Math.min(50, rawFlows));
        const flowDisplay = document.getElementById('display-qa-flows');
        if (flowDisplay) flowDisplay.textContent = `${flows} Test Flows`;

        const scopeRadio = form.querySelector('input[name="qa_scope"]:checked');
        const scopeKey = scopeRadio ? scopeRadio.value : 'playwright';
        const depthSpec = spec.depths[scopeKey] || spec.depths.playwright;

        const extraFlows = Math.max(0, flows - spec.inr.freeFlows);
        subtotalINR = spec.inr.base + depthSpec.inr + extraFlows * spec.inr.perFlow;
        subtotalUSD = spec.usd.base + depthSpec.usd + extraFlows * spec.usd.perFlow;
        estimatedDays = spec.baseTimeDays + (depthSpec.timeAdd || 0) + Math.round(extraFlows * 0.8);

        scopeDescription = `${flows} User Flows (${depthSpec.label.split('+ ')[1] || 'Playwright E2E'})`;
      } else if (serviceKey === 'bugfix') {
        const countRadio = form.querySelector('input[name="bugfix_count"]:checked');
        const countKey = countRadio ? countRadio.value : 'small';
        const countSpec = spec.issueTiers[countKey] || spec.issueTiers.small;

        const sevRadio = form.querySelector('input[name="bugfix_severity"]:checked');
        const sevKey = sevRadio ? sevRadio.value : 'standard';
        const sevSpec = spec.severities[sevKey] || spec.severities.standard;

        subtotalINR = countSpec.inr + sevSpec.inr;
        subtotalUSD = countSpec.usd + sevSpec.usd;
        estimatedDays = Math.max(1, countSpec.timeDays + (sevSpec.timeAdd || 0));

        scopeDescription = `${countSpec.label.split(' (')[0]} [${sevSpec.label.split(' (')[0]}]`;
      } else if (serviceKey === 'maintenance') {
        const planRadio = form.querySelector('input[name="maint_plan"]:checked');
        const planKey = planRadio ? planRadio.value : 'essential';
        const planSpec = spec.plans[planKey] || spec.plans.essential;

        const perRadio = form.querySelector('input[name="maint_period"]:checked');
        const perKey = perRadio ? perRadio.value : '1mo';
        const perSpec = spec.periods[perKey] || spec.periods['1mo'];

        const rawINR = planSpec.inr * perSpec.multiplier;
        const rawUSD = planSpec.usd * perSpec.multiplier;
        subtotalINR = Math.round(rawINR * (1 - perSpec.discount));
        subtotalUSD = Math.round(rawUSD * (1 - perSpec.discount));
        estimatedDays = 1;

        scopeDescription = `${planSpec.label.split(' (')[0]} · ${perSpec.label}`;
      } else if (serviceKey === 'audit') {
        const sizeRadio = form.querySelector('input[name="audit_size"]:checked');
        const sizeKey = sizeRadio ? sizeRadio.value : 'small';
        const sizeSpec = spec.sizes[sizeKey] || spec.sizes.small;

        const depthRadio = form.querySelector('input[name="audit_depth"]:checked');
        const depthKey = depthRadio ? depthRadio.value : 'ux';
        const depthSpec = spec.depths[depthKey] || spec.depths.ux;

        subtotalINR = sizeSpec.inr + depthSpec.inr;
        subtotalUSD = sizeSpec.usd + depthSpec.usd;
        estimatedDays = spec.baseTimeDays + (sizeSpec.timeAdd || 0) + (depthSpec.timeAdd || 0);

        scopeDescription = `${sizeSpec.label.split(' (')[0]} · ${depthSpec.label.split(' (')[0]}`;
      }

      // Urgency Multiplier (Maintenance has a fixed 24h onboarding SLA rather than sprint rush options)
      const selectedUrgencyRadio = form.querySelector('input[name="est_urgency"]:checked');
      const urgencyKey = (selectedUrgencyRadio && serviceKey !== 'maintenance') ? selectedUrgencyRadio.value : 'standard';

      let urgencyMultiplier = 1.0;
      let urgencyLabel = 'Standard Pace';

      if (serviceKey === 'maintenance') {
        urgencyMultiplier = 1.0;
        urgencyLabel = 'Ongoing Care SLA';
      } else if (urgencyKey === 'priority') {
        urgencyMultiplier = 1.25;
        urgencyLabel = 'Priority Fast-Track (+25%)';
        estimatedDays = Math.max(1, Math.round(estimatedDays * 0.7));
      } else if (urgencyKey === 'rush') {
        urgencyMultiplier = 1.5;
        urgencyLabel = 'Dedicated Rush (+50%)';
        estimatedDays = Math.max(1, Math.round(estimatedDays * 0.5));
      }

      // Feature Addons (strictly unchecked by default, counted only when checked)
      let addonCostINR = 0;
      let addonCostUSD = 0;
      const selectedFeatureNames = [];

      form.querySelectorAll('input[name="est_features"]:checked').forEach((chk) => {
        const inr = parseInt(chk.getAttribute('data-inr') || '0', 10);
        const usd = parseInt(chk.getAttribute('data-usd') || '0', 10);
        const name = chk.getAttribute('data-name') || chk.value;
        if (!isNaN(inr) && inr > 0) addonCostINR += inr;
        if (!isNaN(usd) && usd > 0) addonCostUSD += usd;
        selectedFeatureNames.push(name);
        estimatedDays += 1;
      });

      // Calculate Min & Max Range
      let minINR, maxINR, minUSD, maxUSD;

      if (serviceKey === 'maintenance') {
        // Maintenance has fixed subscription pricing without scope contingency markup
        minINR = subtotalINR + addonCostINR;
        maxINR = subtotalINR + addonCostINR;
        minUSD = subtotalUSD + addonCostUSD;
        maxUSD = subtotalUSD + addonCostUSD;
      } else {
        // Development projects use a contingency range (-5% standard to +25% technical buffer)
        minINR = Math.round((subtotalINR * urgencyMultiplier + addonCostINR) * 0.95);
        maxINR = Math.round((subtotalINR * urgencyMultiplier + addonCostINR) * 1.25);
        minUSD = Math.round((subtotalUSD * urgencyMultiplier + addonCostUSD) * 0.95);
        maxUSD = Math.round((subtotalUSD * urgencyMultiplier + addonCostUSD) * 1.25);
      }

      // Format Timeline string dynamically
      let timelineText = '';
      if (serviceKey === 'maintenance') {
        timelineText = 'Immediate Onboarding (within 24 hours)';
      } else if (estimatedDays <= 2) {
        timelineText = '24–48 Hours Dedicated';
      } else if (estimatedDays <= 4) {
        timelineText = `${estimatedDays}–${estimatedDays + 2} Business Days`;
      } else if (estimatedDays <= 7) {
        timelineText = '5–7 Business Days';
      } else if (estimatedDays <= 14) {
        timelineText = '1–2 Weeks';
      } else if (estimatedDays <= 21) {
        timelineText = '2–3 Weeks';
      } else if (estimatedDays <= 35) {
        timelineText = '3–5 Weeks';
      } else {
        timelineText = '5–7 Weeks';
      }

      // Format Price Strings
      const inrRangeText = minINR === maxINR
        ? `₹${minINR.toLocaleString('en-IN')}`
        : `₹${minINR.toLocaleString('en-IN')} – ₹${maxINR.toLocaleString('en-IN')}`;
      const usdRangeText = minUSD === maxUSD
        ? `($${minUSD.toLocaleString('en-US')} USD)`
        : `($${minUSD.toLocaleString('en-US')} – $${maxUSD.toLocaleString('en-US')} USD)`;
      const formattedPrice = `${inrRangeText} ${usdRangeText}`;

      // Update Summary Output DOM
      if (scopeLabel) scopeLabel.textContent = spec.name;
      if (pagesSummary) pagesSummary.textContent = scopeDescription || 'Standard Scope';
      if (urgencySummary) urgencySummary.textContent = urgencyLabel;
      if (featuresSummary) {
        featuresSummary.textContent = selectedFeatureNames.length
          ? `${selectedFeatureNames.length} selected (${selectedFeatureNames.slice(0, 2).join(', ')}${selectedFeatureNames.length > 2 ? '...' : ''})`
          : 'None selected (Base scope)';
      }

      // Render Price according to Currency Toggle
      if (priceRangeDisplay) {
        if (currencyMode === 'inr') {
          priceRangeDisplay.innerHTML = `
            <span class="est-inr-price">${inrRangeText}</span>
            <span class="est-usd-price" style="opacity:0.75;">Approx. ${usdRangeText}</span>
          `;
        } else if (currencyMode === 'usd') {
          priceRangeDisplay.innerHTML = `
            <span class="est-inr-price" style="color:#38bdf8;">$${minUSD.toLocaleString('en-US')} – $${maxUSD.toLocaleString('en-US')} USD</span>
            <span class="est-usd-price">Approx. ${inrRangeText}</span>
          `;
        } else {
          priceRangeDisplay.innerHTML = `
            <span class="est-inr-price">${inrRangeText}</span>
            <span class="est-usd-price">${usdRangeText}</span>
          `;
        }
      }

      if (timelineDisplay) {
        timelineDisplay.textContent = `⏱ Estimated Timeline: ${timelineText}`;
      }

      // Update Live Quick-Strip for Mobile / Tablet
      if (stripPrice) {
        stripPrice.innerHTML = `<span class="strip-inr">${inrRangeText}</span> <span class="strip-usd">${usdRangeText}</span>`;
      }
      if (stripTimeline) {
        stripTimeline.textContent = `⏱ ${timelineText}`;
      }

      // Build 1-Click WhatsApp Link with Structured Formatting
      if (waQuoteBtn) {
        const waMessage =
          `Hi Shashi! I used your Website Cost Calculator on skdigital.cloud:%0A%0A` +
          `📌 *Service:* ${encodeURIComponent(spec.name)}%0A` +
          `📐 *Project Scope:* ${encodeURIComponent(scopeDescription)}%0A` +
          `⚡ *Delivery Pace:* ${encodeURIComponent(urgencyLabel)}%0A` +
          (selectedFeatureNames.length
            ? `✨ *Optional Extras:* ${encodeURIComponent(selectedFeatureNames.join(', '))}%0A`
            : `✨ *Optional Extras:* None (Base Scope)%0A`) +
          `💰 *Estimated Investment:* ${encodeURIComponent(formattedPrice)}%0A` +
          `⏱ *Estimated Timeline:* ${encodeURIComponent(timelineText)}%0A%0A` +
          `Can we discuss moving forward with this quote?`;

        waQuoteBtn.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`);
        waQuoteBtn.setAttribute('target', '_blank');
        waQuoteBtn.setAttribute('rel', 'noopener');
      }

      // Contact Form Handoff (Detailed Quote CTA)
      if (emailLockBtn) {
        emailLockBtn.onclick = (e) => {
          e.preventDefault();
          const contactSection = document.getElementById('contact');
          const messageTextarea = document.getElementById('message');
          const serviceSelect = document.getElementById('service');

          if (messageTextarea) {
            messageTextarea.value =
              `Estimated Project Scope from Calculator:\n` +
              `• Service: ${spec.name}\n` +
              `• Scope: ${scopeDescription}\n` +
              `• Delivery Pace: ${urgencyLabel}\n` +
              `• Optional Extras: ${selectedFeatureNames.join(', ') || 'None (Base Scope)'}\n` +
              `• Est. Budget Range: ${formattedPrice}\n` +
              `• Est. Timeline: ${timelineText}\n\n` +
              `Hi Shashi, please review this estimate and send an official detailed proposal.`;
          }

          if (serviceSelect) {
            const serviceSelectMap = {
              webdev: 'Custom Website Development',
              ecommerce: 'E-Commerce Store',
              mobile: 'Mobile App Development',
              speed: 'Speed Optimization',
              qa: 'Software QA Testing',
              bugfix: 'Emergency Bug Fixing',
              maintenance: 'Website Maintenance & Security AMC',
              audit: 'UI/UX & CRO Audit'
            };
            const targetVal = serviceSelectMap[serviceKey] || 'Custom Website Development';
            for (let i = 0; i < serviceSelect.options.length; i++) {
              if (
                serviceSelect.options[i].value === targetVal ||
                serviceSelect.options[i].text.includes(targetVal) ||
                serviceSelect.options[i].value.toLowerCase().includes(serviceKey)
              ) {
                serviceSelect.selectedIndex = i;
                break;
              }
            }
          }

          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        };
      }
    };

    // Bind Service Selection Radios (Step 1)
    form.querySelectorAll('input[name="est_service"]').forEach((radio) => {
      radio.addEventListener('change', (e) => {
        const srvKey = e.target.value;
        renderScopeQuestions(srvKey);
        renderAddons(srvKey);
        calculate();
      });
    });

    // Keyboard support for Step 1 Service Cards
    form.querySelectorAll('.calc-service-card[tabindex="0"]').forEach((card) => {
      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          const targetId = card.getAttribute('for');
          const radio = document.getElementById(targetId);
          if (radio) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      });
    });

    // Urgency Radios
    form.querySelectorAll('input[name="est_urgency"]').forEach((radio) => {
      radio.addEventListener('change', calculate);
    });

    // Keyboard support for Urgency Cards
    form.querySelectorAll('.urgency-label[tabindex="0"]').forEach((lbl) => {
      lbl.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          const targetId = lbl.getAttribute('for');
          const radio = document.getElementById(targetId);
          if (radio) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      });
    });

    // Stepper Tab Click Navigation
    stepperTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const stepNum = tab.getAttribute('data-step');
        goToStep(stepNum);
      });
    });

    // Next / Prev Button Navigation
    form.querySelectorAll('[data-goto-step]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetStep = btn.getAttribute('data-goto-step');
        goToStep(targetStep);
      });
    });

    // Currency Toggle Buttons
    const currencyPills = form.querySelectorAll('.curr-pill');
    currencyPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        currencyPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        currencyMode = pill.getAttribute('data-currency') || 'both';
        calculate();
      });
    });

    // Initialize Default State
    const initialService = form.querySelector('input[name="est_service"]:checked')?.value || 'webdev';
    renderScopeQuestions(initialService);
    renderAddons(initialService);
    calculate();

    // Expose calculate for external helpers
    window.recalcEstimator = calculate;
  };

  /* Helper to preselect service from Bento cards / navigation */
  window.preselectService = (serviceKey) => {
    let targetKey = serviceKey;
    let isStatic = false;

    if (serviceKey === 'static') {
      targetKey = 'webdev';
      isStatic = true;
    }

    const radio = document.querySelector(`input[name="est_service"][value="${targetKey}"]`);
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change', { bubbles: true }));

      // If static was requested, pre-select the static architecture pill in Step 2
      if (isStatic) {
        setTimeout(() => {
          const staticRadio = document.getElementById('wb-type-stat');
          if (staticRadio) {
            staticRadio.checked = true;
            staticRadio.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }, 50);
      }
    }

    // Advance to Step 2 so the user immediately sees the tailored scope questions
    const step2Tab = document.getElementById('calc-step-tab-2');
    if (step2Tab) {
      step2Tab.click();
    }

    const estimatorSection = document.getElementById('estimator');
    if (estimatorSection) {
      estimatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ============================================================
     5. HERO CONSOLE TABS (Speed Audit, Architecture.ts, Client Proof)
     ============================================================ */
  const initTerminalTabs = () => {
    const tabs = document.querySelectorAll('.terminal-tab');
    const panes = document.querySelectorAll('.terminal-pane');
    if (!tabs.length || !panes.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach((t) => t.classList.remove('active'));
        panes.forEach((p) => p.classList.remove('active'));

        tab.classList.add('active');
        const activePane = document.getElementById('pane-' + target);
        if (activePane) activePane.classList.add('active');
      });
    });
  };

  /* ============================================================
     6. MONOCHROME TECH STACK CATEGORY FILTER
     ============================================================ */
  const initTechFilters = () => {
    const filterBtns = document.querySelectorAll('.mono-filter-btn');
    const techPills = document.querySelectorAll('.tech-pill');
    if (!filterBtns.length || !techPills.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-filter');
        techPills.forEach((pill) => {
          if (cat === 'all' || pill.getAttribute('data-category') === cat) {
            pill.style.display = 'inline-flex';
          } else {
            pill.style.display = 'none';
          }
        });
      });
    });
  /* ============================================================
     6B. BLOG CATEGORY FILTERS & LIVE SEARCH
     ============================================================ */
  const initBlogFilters = () => {
    const filterBtns = document.querySelectorAll('.blog-filter-btn');
    const cards = document.querySelectorAll('.blog-card');
    const searchInput = document.getElementById('blogSearchInput');
    const noResults = document.getElementById('noResultsMessage');

    if (!filterBtns.length && !cards.length) return;

    let currentFilter = 'all';

    const applyFilters = () => {
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      let visibleCount = 0;

      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';
        const excerpt = card.querySelector('.blog-card-excerpt')?.textContent.toLowerCase() || '';
        const matchesCategory = (currentFilter === 'all' || category === currentFilter);
        const matchesQuery = !query || title.includes(query) || excerpt.includes(query);

        if (matchesCategory && matchesQuery) {
          card.style.display = '';
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.style.display = 'none';
          card.classList.add('hidden');
        }
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }
  };

  /* ============================================================
     7. STICKY HEADER & MOBILE NAVIGATION
     ============================================================ */
  const initNavigation = () => {
    const header = document.querySelector('.site-header');
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    };

    menu.querySelectorAll('a').forEach((a) => {
      a.onclick = () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      };
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  };

  /* ============================================================
     8. GENERIC WHATSAPP HOOKS & CONVERSION CLICKS
     ============================================================ */
  const initWhatsAppTriggers = () => {
    document.querySelectorAll('[data-wa-message]').forEach((el) => {
      const msg = el.getAttribute('data-wa-message') || 'Hi Shashi, I would like to discuss a project.';
      el.setAttribute('href', 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });

    document.addEventListener('click', (e) => {
      const waLink = e.target.closest('a[href*="wa.me"]');
      if (waLink) {
        trackEvent('whatsapp_click', {
          event_category: 'Contact',
          event_label: waLink.getAttribute('href') || 'WhatsApp CTA'
        });
      }
    });
  };

  /* ============================================================
     9. SCROLL REVEAL (INTERSECTION OBSERVER)
     ============================================================ */
  const initScrollReveal = () => {
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('visible'));
    }
  };

  /* ============================================================
     10. CONTACT FORM SUBMISSION & LEAD TELEMETRY
     ============================================================ */
  const initContactForm = () => {
    const form = document.getElementById('lead-form');
    if (!form) return;

    const alertBox = form.querySelector('.form-alert');
    const submitBtn = form.querySelector('button[type="submit"]');

    const showAlert = (type, text) => {
      if (!alertBox) return;
      alertBox.className = 'form-alert ' + type;
      alertBox.textContent = text;
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();

      // Honeypot spam check
      const hp = form.querySelector('input[name="website_url"]');
      if (hp && hp.value) return;

      const data = {
        name: form.name ? form.name.value.trim() : '',
        email: form.email ? form.email.value.trim() : '',
        phone: form.phone ? form.phone.value.trim() : '',
        service: form.service ? form.service.value : 'Custom Website Development',
        budget: form.budget ? form.budget.value : '',
        message: form.message ? form.message.value.trim() : '',
        source_page: location.pathname,
        status: 'new'
      };

      if (!data.name || !data.email || !data.message) {
        showAlert('error', 'Please fill in your name, email and project details.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showAlert('error', 'Please enter a valid email address.');
        return;
      }

      trackEvent('generate_lead', {
        event_category: 'Leads',
        service_requested: data.service,
        budget_bracket: data.budget || 'Not specified',
        source_page: location.pathname
      });

      const originalLabel = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      }

      let emailSent = false;
      try {
        const emailPayload = {
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          service: data.service,
          budget: data.budget || 'Not specified',
          message: data.message,
          _subject: '🚀 New Client Inquiry: ' + data.service + ' — ' + data.name,
          _replyto: data.email,
          _template: 'table',
          _captcha: 'false'
        };

        const res = await fetch('https://formsubmit.co/ajax/' + EMAIL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(emailPayload)
        });

        if (res.ok) emailSent = true;
      } catch (err) {
        emailSent = false;
      }

      const waText =
        'Hi Shashi! New project inquiry from skdigital.cloud:%0A%0A' +
        '*Name:* ' + encodeURIComponent(data.name) + '%0A' +
        '*Email:* ' + encodeURIComponent(data.email) + '%0A' +
        (data.phone ? '*Phone:* ' + encodeURIComponent(data.phone) + '%0A' : '') +
        '*Service:* ' + encodeURIComponent(data.service) + '%0A' +
        (data.budget ? '*Budget:* ' + encodeURIComponent(data.budget) + '%0A' : '') +
        '*Details:* ' + encodeURIComponent(data.message);
      const waLink = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + waText;

      showAlert(
        'success',
        '✅ Thank you, ' + data.name + '! Your inquiry was received. Opening WhatsApp now for instant confirmation...'
      );
      form.reset();

      setTimeout(() => {
        window.open(waLink, '_blank', 'noopener');
      }, 1000);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
      }
    });
  };

  /* ============================================================
     INITIALIZE ALL SYSTEMS (IDEMPOTENT SINGLE RUN)
     ============================================================ */
  let isInitialized = false;
  const initAll = () => {
    if (isInitialized) return;
    isInitialized = true;

    initCanvasBackground();
    initBentoSpotlight();
    initEstimator();
    initTerminalTabs();
    initTechFilters();
    initBlogFilters();
    initNavigation();
    initWhatsAppTriggers();
    initScrollReveal();
    initContactForm();

    // Auto-update copyright year
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
