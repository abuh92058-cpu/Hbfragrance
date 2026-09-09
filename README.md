# HB Fragrance — hbfragrance.store

Premium single-page e-commerce website with WhatsApp ordering, shopping bag,
product search/filter, quick-view, checkout flow, FAQ, policies, and contact.

**Tech:** pure HTML + CSS + vanilla JavaScript. No dependencies, no build step.
Just upload the folder to any static host (Netlify, Vercel, Cloudflare Pages,
cPanel) and point `hbfragrance.store` to it.

## Run locally

```bash
cd hb-fragrance
python3 -m http.server 8000
# open http://localhost:8000
```

## ★ What to replace before launch (checklist)

| # | What | Where | Notes |
|---|------|-------|-------|
| 1 | **Products** — name, description, notes, size, price, badge, category, photo | `app.js` → `PRODUCTS` array | All 6 are **PLACEHOLDERS** |
| 2 | **Product photos** | `images/product-*.jpg` | Replace with real bottle photography (4:5 portrait works best). Keep filenames or update `img` in `app.js` |
| 3 | **Hero / story photos** | `images/hero.jpg`, `images/story.jpg` | Custom AI visuals — keep or replace with brand shoots |
| 4 | **WhatsApp number** | `app.js` → `CONFIG.waNumber` + the static `wa.me` links in `index.html` (search `wa.me`) | Currently `923445247189` |
| 5 | **Sample reviews** | `index.html` → Reviews section (tagged `Sample review`) | Replace with real customer feedback |
| 6 | **Policies** (shipping / returns / privacy) | `app.js` → `POLICIES` + FAQ answers in `index.html` | Placeholder wording — confirm every line |
| 7 | **Instagram / TikTok URLs** | `app.js` → `SOCIALS` (currently `"#"`) | Set real profile links |
| 8 | **Payment options** | Checkout `<select id="coPay">` in `index.html` | Match your real methods (COD, bank, etc.) |
| 9 | **Delivery promise** | Announcement bar + FAQ + trust badges | Confirm coverage, timing, charges |

Quick way to find every placeholder: search the project for `PLACEHOLDER`, `EDIT`,
`Sample review`, and `wa.me`.

## How ordering works

1. Customer clicks **Order Now** on a product → WhatsApp opens with a pre-filled
   product message, **or**
2. Customer adds items to the **Bag** → **Checkout via WhatsApp** → fills in
   name/phone/city/address/payment → WhatsApp opens with the full order —
   customer presses send, you confirm and dispatch.

The bag is saved in the browser (`localStorage`), so items survive page reloads.

## Product-friendly URLs

Opening a product sets a shareable hash URL, e.g.
`https://hbfragrance.store/#product-oud-royale` — visiting it opens that
product's quick view directly. Share these links on social media.

## Files

```
hb-fragrance/
├── index.html      — all sections, SEO + Open Graph + schema markup
├── styles.css      — design system (black / white / gold), responsive
├── app.js          — products, cart, search, checkout, FAQ, policies
├── images/         — hero, 6 products, story visual
├── sitemap.xml     — submit in Google Search Console after launch
├── robots.txt
└── README.md
```

## Launch tips

- Replace placeholder photos with consistent, well-lit bottle shots.
- Test an order end-to-end on your own phone via WhatsApp.
- Submit `sitemap.xml` to Google Search Console + add Google Business Profile.
- Buy/connect the `hbfragrance.store` domain on your host with free SSL.
