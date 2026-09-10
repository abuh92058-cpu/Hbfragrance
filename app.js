/* ══════════════════════════════════════════════════════════════
   HB FRAGRANCE — app.js
   ──────────────────────────────────────────────────────────────
   ★ WHERE TO EDIT THINGS (see README.md for full guide):
   1. WhatsApp number / messages .... CONFIG below
   2. Products (name, price, size,
      description, images) .......... PRODUCTS array below  [PLACEHOLDERS]
   3. Social profile links ........... SOCIALS below  [PLACEHOLDERS — "#"]
   4. Policy texts ................... POLICIES below  [EDIT BEFORE LAUNCH]
   ══════════════════════════════════════════════════════════════ */
'use strict';

/* ── 1. CONFIG ───────────────────────────────────────────── */
const CONFIG = {
  brand: 'HB Fragrance',
  waNumber: '923445247189',            // WhatsApp: 0344 5247189
  baseMessage: 'Hello HB Fragrance, I want to place an order.',
  currency: 'PKR'
};

/* ── 2. PRODUCTS ───────────────────────────────────────────
   ⚠ PLACEHOLDER PRODUCTS — replace name, tagline, notes, size,
   price, badge, category & image with your real catalogue.      */
const PRODUCTS = [
  {
    id: 'oud-royale',
    name: 'Office foreman',
    tagline: 'Smoky oud wrapped in golden amber — bold, royal, unforgettable.',
    notes: { top: 'Saffron, Nutmeg', heart: 'Smoked Oud, Leather', base: 'Amber, Dark Musk' },
    size: '50ml',
    price: 2499,
    badge: 'Bestseller',               // PLACEHOLDER badge — verify or remove
    category: 'men',                   // men | women | unisex
    img: 'images/product-oud-royale.jpeg',
    alt: 'HB Oud Royale black perfume bottle with oud wood and amber'
  },
  {
    id: 'noir-essence',
    name: 'Azzaro wanted',
    tagline: 'Midnight bergamot and leather — quiet power in a bottle.',
    notes: { top: 'Bergamot, Black Pepper', heart: 'Leather, Vetiver', base: 'Cedarwood, Tonka' },
    size: '50ml',
    price: '1799',
    badge: 'New',                      // PLACEHOLDER badge
    category: 'men',
    img: 'images/product-noir-essence.jpeg',
    alt: 'HB Noir Essence midnight-blue perfume bottle with leather and vetiver'
  },
  {
    id: 'velour-musk',
    name: 'Khamra Qahwa',
    tagline: 'Soft white musk and iris — elegance you wear every day.',
    notes: { top: 'White Tea, Pear', heart: 'Iris, White Musk', base: 'Sandalwood, Cashmere' },
    size: '50ml',
    price: 1799,
    badge: '',
    category: 'women',
    img: 'images/product-velour-musk.jpeg',
    alt: 'HB Velour Musk frosted white perfume bottle with flowers and silk'
  },
  {
    id: 'amber-dusk',
    name: 'Cool water',
    tagline: 'Warm amber and vanilla — a golden-hour glow, bottled.',
    notes: { top: 'Pink Pepper, Mandarin', heart: 'Amber, Vanilla Orchid', base: 'Tonka, Benzoin' },
    size: '50ml',
    price: 1799,
    badge: 'Limited',                  // PLACEHOLDER badge
    category: 'unisex',
    img: 'images/product-amber-dusk.jpeg',
    alt: 'HB Amber Dusk amber glass perfume bottle glowing in warm light'
  },
];

/* ── 3. SOCIALS — ⚠ replace "#" with real profile URLs ──── */
const SOCIALS = { instagram: '#', tiktok: '#' };

/* ── 4. POLICIES — ⚠ EDIT/TEXT: placeholder wording — confirm
   every policy with the business owner before launch. ─────── */
const POLICIES = {
  shipping: {
    title: 'Shipping Policy',
    body: `
      <div class="policy-flag">⚠ Placeholder policy — please review and confirm before launch.</div>
      <h5>Nationwide Delivery</h5>
      <p>HB Fragrance delivers across Pakistan. Orders are dispatched promptly after confirmation on WhatsApp.</p>
      <h5>Delivery Time</h5>
      <p>Estimated delivery time depends on your city and courier schedules. A tracking estimate will be shared with you on WhatsApp once your order is dispatched.</p>
      <h5>Delivery Charges</h5>
      <p>Delivery charges, if any, are confirmed with you on WhatsApp before dispatch. Please share your complete address to receive an accurate quote.</p>
      <h5>Careful Packaging</h5>
      <p>Every bottle is packed securely in elegant, protective packaging so your fragrance arrives in perfect condition.</p>`
  },
  returns: {
    title: 'Return & Exchange Policy',
    body: `
      <div class="policy-flag">⚠ Placeholder policy — please review and confirm before launch.</div>
      <h5>Our Promise</h5>
      <p>Your satisfaction matters. If there is an issue with your order — such as damage during transit or a wrong item — contact us and we will make it right.</p>
      <h5>How to Report an Issue</h5>
      <p>Message us on WhatsApp within 48 hours of delivery with your order details and clear photos of the unopened item and packaging.</p>
      <h5>Eligibility</h5>
      <p>For hygiene and quality reasons, opened or used fragrances cannot be returned unless the item arrived damaged or incorrect. Each case is reviewed individually and fairly.</p>
      <h5>Resolution</h5>
      <p>Approved cases are resolved through replacement, exchange, or other fair remedy as agreed with you on WhatsApp.</p>`
  },
  privacy: {
    title: 'Privacy Policy',
    body: `
      <div class="policy-flag">⚠ Placeholder policy — please review and confirm before launch.</div>
      <h5>Information We Collect</h5>
      <p>When you place an order, we collect your name, phone number, delivery address, and order details — only what is needed to fulfil your order.</p>
      <h5>How We Use It</h5>
      <p>Your information is used solely to process, deliver, and support your order. We do not sell your personal data to third parties.</p>
      <h5>WhatsApp Ordering</h5>
      <p>Orders placed through WhatsApp are also subject to WhatsApp's own privacy policy.</p>
      <h5>Contact</h5>
      <p>For any privacy questions, message us on WhatsApp at 0344 5247189.</p>`
  }
};

/* ═══════════════ Helpers ═══════════════ */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const fmt = n => `${CONFIG.currency} ${n.toLocaleString('en-PK')}`;
const waLink = msg => `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(msg)}`;
const byId = id => PRODUCTS.find(p => p.id === id);
const CAT_LABEL = { men: 'For Him', women: 'For Her', unisex: 'Unisex' };

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ═══════════════ Product grid + search/filter/sort ═══════════════ */
const state = { q: '', cat: 'all', sort: 'featured' };

function filteredProducts() {
  let list = PRODUCTS.filter(p => {
    const matchCat = state.cat === 'all' || p.category === state.cat;
    const hay = `${p.name} ${p.tagline} ${p.notes.top} ${p.notes.heart} ${p.notes.base}`.toLowerCase();
    return matchCat && hay.includes(state.q.toLowerCase().trim());
  });
  if (state.sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (state.sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
  if (state.sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function cardHTML(p) {
  return `
  <article class="product-card" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}">
    <div class="p-img">
      <img src="${p.img}" alt="${p.alt}" loading="lazy" />
      ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
      <span class="quick-hint">Quick View</span>
    </div>
    <div class="p-body">
      <span class="p-cat">${CAT_LABEL[p.category]}</span>
      <h3>${p.name}</h3>
      <p class="p-tag">${p.tagline}</p>
      <p class="p-notes">${p.notes.heart}</p>
      <div class="p-row">
        <span class="p-size">${p.size}</span>
        <span class="p-price">${fmt(p.price)}<small>inclusive of taxes</small></span>
      </div>
      <div class="p-actions">
        <button class="btn btn-gold" data-act="order">Order Now</button>
        <button class="p-add" data-act="add" aria-label="Add ${p.name} to bag">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h15l-1.5 9h-12z"/><path d="M6 8l-1-4H2"/><circle cx="9.5" cy="20" r="1.4"/><circle cx="17.5" cy="20" r="1.4"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}

function renderProducts() {
  const list = filteredProducts();
  const grid = $('#productGrid');
  grid.innerHTML = list.map(cardHTML).join('');
  $('#gridEmpty').hidden = list.length > 0;
  $('#resultCount').textContent = list.length
    ? `Showing ${list.length} of ${PRODUCTS.length} fragrances`
    : '';
}

$('#searchInput').addEventListener('input', e => { state.q = e.target.value; renderProducts(); });
$('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderProducts(); });
$$('.pill').forEach(pill => pill.addEventListener('click', () => {
  $$('.pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  state.cat = pill.dataset.cat;
  renderProducts();
}));
$('#resetFilters').addEventListener('click', () => {
  state.q = ''; state.cat = 'all'; state.sort = 'featured';
  $('#searchInput').value = ''; $('#sortSelect').value = 'featured';
  $$('.pill').forEach(p => p.classList.toggle('active', p.dataset.cat === 'all'));
  renderProducts();
});
// Footer "Shop" links jump to shop with a category pre-selected
$$('[data-shop-cat]').forEach(a => a.addEventListener('click', () => {
  const cat = a.dataset.shopCat;
  state.cat = cat;
  $$('.pill').forEach(p => p.classList.toggle('active', p.dataset.cat === cat));
  renderProducts();
}));

/* Card interactions (delegated) */
$('#productGrid').addEventListener('click', e => {
  const card = e.target.closest('.product-card');
  if (!card) return;
  const p = byId(card.dataset.id);
  const actBtn = e.target.closest('[data-act]');
  if (actBtn?.dataset.act === 'add') { e.stopPropagation(); addToCart(p.id, 1); return; }
  if (actBtn?.dataset.act === 'order') {
    e.stopPropagation();
    const msg = `${CONFIG.baseMessage}\n\nProduct: ${p.name} (${p.size}) — ${fmt(p.price)}\nPlease confirm availability. Thank you!`;
    window.open(waLink(msg), '_blank', 'noopener');
    return;
  }
  openQuick(p.id);
});
$('#productGrid').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.classList.contains('product-card')) openQuick(e.target.dataset.id);
});

/* ═══════════════ Cart ═══════════════ */
let cart = {};
try { cart = JSON.parse(localStorage.getItem('hb_cart') || '{}'); } catch { cart = {}; }
Object.keys(cart).forEach(id => { if (!byId(id)) delete cart[id]; });

const saveCart = () => localStorage.setItem('hb_cart', JSON.stringify(cart));
const cartQty = () => Object.values(cart).reduce((a, b) => a + b, 0);
const cartTotal = () => Object.entries(cart).reduce((a, [id, q]) => a + byId(id).price * q, 0);

function addToCart(id, qty = 1) {
  cart[id] = (cart[id] || 0) + qty;
  saveCart(); renderCart();
  toast(`${byId(id).name} added to your bag`);
  openCart();
}
function renderCart() {
  const ids = Object.keys(cart);
  $('#cartCount').textContent = cartQty();
  $('#cartHeadCount').textContent = `(${cartQty()})`;
  const box = $('#cartItems');
  if (!ids.length) {
    box.innerHTML = `<div class="cart-empty">
      <svg viewBox="0 0 24 24" width="52" height="52" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h15l-1.5 9h-12z"/><path d="M6 8l-1-4H2"/><circle cx="9.5" cy="20" r="1.4"/><circle cx="17.5" cy="20" r="1.4"/></svg>
      <p><strong>Your bag is empty.</strong><br />Your signature scent is waiting.</p></div>`;
    $('#cartFoot').style.display = 'none';
    return;
  }
  $('#cartFoot').style.display = '';
  box.innerHTML = ids.map(id => {
    const p = byId(id), q = cart[id];
    return `<div class="cart-item" data-id="${id}">
      <img src="${p.img}" alt="${p.alt}" />
      <div>
        <h4>${p.name}</h4>
        <span class="c-size">${p.size} • ${CAT_LABEL[p.category]}</span>
        <div class="c-price">${fmt(p.price * q)}</div>
        <div class="qty" role="group" aria-label="Quantity for ${p.name}">
          <button data-c="dec" aria-label="Decrease quantity">−</button>
          <span>${q}</span>
          <button data-c="inc" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="c-remove" data-c="rm" aria-label="Remove ${p.name}">✕</button>
    </div>`;
  }).join('');
  $('#cartSubtotal').textContent = fmt(cartTotal());
}
$('#cartItems').addEventListener('click', e => {
  const btn = e.target.closest('[data-c]');
  if (!btn) return;
  const id = e.target.closest('.cart-item').dataset.id;
  if (btn.dataset.c === 'inc') cart[id]++;
  if (btn.dataset.c === 'dec') { cart[id]--; if (cart[id] <= 0) delete cart[id]; }
  if (btn.dataset.c === 'rm') delete cart[id];
  saveCart(); renderCart();
});

const overlay = $('#overlay'), drawer = $('#cartDrawer');
function lockScroll(on) { document.body.style.overflow = on ? 'hidden' : ''; }
function openCart() {
  drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
  overlay.classList.add('show'); overlay.setAttribute('aria-hidden', 'false');
  lockScroll(true);
}
function closeCart() {
  drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true');
  if (!document.querySelector('.modal.open')) { overlay.classList.remove('show'); lockScroll(false); }
}
$('#cartBtn').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
$('#continueBtn').addEventListener('click', closeCart);
overlay.addEventListener('click', () => { closeCart(); closeModals(); });

/* ═══════════════ Quick view ═══════════════ */
let quickId = null, quickQty = 1;
function openQuick(id) {
  const p = byId(id);
  if (!p) return;
  quickId = id; quickQty = 1;
  $('#qVal').textContent = '1';
  $('#quickImg').src = p.img;
  $('#quickImg').alt = p.alt;
  const badge = $('#quickBadge');
  badge.textContent = p.badge || '';
  badge.style.display = p.badge ? '' : 'none';
  $('#quickCat').textContent = CAT_LABEL[p.category];
  $('#quickName').textContent = p.name;
  $('#quickTag').textContent = p.tagline;
  $('#quickNotes').innerHTML = `
    <div><b>Top</b><span>${p.notes.top}</span></div>
    <div><b>Heart</b><span>${p.notes.heart}</span></div>
    <div><b>Base</b><span>${p.notes.base}</span></div>`;
  $('#quickSize').textContent = p.size;
  $('#quickPrice').textContent = fmt(p.price);
  openModal('#quickModal');
  history.replaceState(null, '', `#product-${id}`);   // product-friendly URL
}
$('#qMinus').addEventListener('click', () => { quickQty = Math.max(1, quickQty - 1); $('#qVal').textContent = quickQty; });
$('#qPlus').addEventListener('click', () => { quickQty = Math.min(10, quickQty + 1); $('#qVal').textContent = quickQty; });
$('#quickAdd').addEventListener('click', () => { closeModals(true); addToCart(quickId, quickQty); });
$('#quickOrder').addEventListener('click', () => {
  const p = byId(quickId);
  const msg = `${CONFIG.baseMessage}\n\nProduct: ${p.name} (${p.size}) × ${quickQty} — ${fmt(p.price * quickQty)}\nPlease confirm availability. Thank you!`;
  window.open(waLink(msg), '_blank', 'noopener');
});

/* ═══════════════ Modals ═══════════════ */
function openModal(sel) {
  $(sel).classList.add('open');
  $(sel).setAttribute('aria-hidden', 'false');
  overlay.classList.add('show');
  lockScroll(true);
  const x = $(sel + ' [data-close]');
  if (x) x.focus({ preventScroll: true });
}
function closeModals(keepOverlay = false) {
  $$('.modal.open').forEach(m => { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); });
  if (!keepOverlay && !drawer.classList.contains('open')) { overlay.classList.remove('show'); lockScroll(false); }
  if (location.hash.startsWith('#product-')) history.replaceState(null, '', '#shop');
}
$$('[data-close]').forEach(b => b.addEventListener('click', () => closeModals()));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModals(); closeCart(); closeMenu(); }
});

/* ═══════════════ Checkout via WhatsApp ═══════════════ */
$('#checkoutBtn').addEventListener('click', () => {
  if (!Object.keys(cart).length) { toast('Your bag is empty'); return; }
  $('#coSummary').innerHTML =
    Object.entries(cart).map(([id, q]) => {
      const p = byId(id);
      return `<div class="co-line"><span>${p.name} <small>(${p.size}) × ${q}</small></span><strong>${fmt(p.price * q)}</strong></div>`;
    }).join('') +
    `<div class="co-total"><span>Subtotal</span><span>${fmt(cartTotal())}</span></div>`;
  closeCart();
  openModal('#checkoutModal');
});
$('#checkoutForm').addEventListener('submit', e => {
  e.preventDefault();
  const lines = Object.entries(cart).map(([id, q]) => {
    const p = byId(id);
    return `• ${p.name} (${p.size}) × ${q} — ${fmt(p.price * q)}`;
  });
  const msg =
`${CONFIG.baseMessage}

${lines.join('\n')}
Subtotal: ${fmt(cartTotal())}

Name: ${$('#coName').value.trim()}
Phone: ${$('#coPhone').value.trim()}
City: ${$('#coCity').value.trim()}
Address: ${$('#coAddr').value.trim()}
Payment: ${$('#coPay').value}

Please confirm my order. Thank you!`;
  window.open(waLink(msg), '_blank', 'noopener');
  toast('Opening WhatsApp — press send to place your order');
});

/* ═══════════════ Contact form → WhatsApp ═══════════════ */
$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const msg = `Hello ${CONFIG.brand}, my name is ${$('#cfName').value.trim()} (${$('#cfPhone').value.trim()}).\n\n${$('#cfMsg').value.trim()}`;
  window.open(waLink(msg), '_blank', 'noopener');
  toast('Opening WhatsApp with your message');
  e.target.reset();
});

/* ═══════════════ Policies modal ═══════════════ */
$$('[data-policy]').forEach(b => b.addEventListener('click', () => {
  const p = POLICIES[b.dataset.policy];
  $('#policyTitle').textContent = p.title;
  $('#policyBody').innerHTML = p.body;
  openModal('#policyModal');
}));

/* ═══════════════ Social placeholders ═══════════════ */
$$('[data-social]').forEach(a => {
  const url = SOCIALS[a.dataset.social];
  if (url && url !== '#') { a.href = url; a.target = '_blank'; a.rel = 'noopener'; return; }
  a.addEventListener('click', e => { e.preventDefault(); toast('Our social profile link is being added — stay tuned'); });
});

/* ═══════════════ FAQ accordion ═══════════════ */
$$('.acc-item').forEach(item => {
  const btn = $('.acc-btn', item), panel = $('.acc-panel', item);
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    $$('.acc-item.open').forEach(o => { o.classList.remove('open'); $('.acc-panel', o).style.maxHeight = null; $('.acc-btn', o).setAttribute('aria-expanded', 'false'); });
    if (!isOpen) {
      item.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ═══════════════ Header / menu / misc ═══════════════ */
const header = $('#siteHeader'), toTop = $('#toTop');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', scrollY > 10);
  toTop.classList.toggle('show', scrollY > 700);
}, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const menuBtn = $('#menuBtn'), mobileMenu = $('#mobileMenu');
function closeMenu() {
  menuBtn.classList.remove('open');
  mobileMenu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
});
$$('.m-link, .m-cta', mobileMenu).forEach(a => a.addEventListener('click', closeMenu));

$('#searchBtn').addEventListener('click', () => {
  document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => $('#searchInput').focus({ preventScroll: true }), 600);
});

/* Reveal on scroll */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach(el => io.observe(el));

/* Footer year */
$('#year').textContent = new Date().getFullYear();

/* Deep links: #product-<id> opens quick view */
function handleHash() {
  const m = location.hash.match(/^#product-([\w-]+)/);
  if (m && byId(m[1])) openQuick(m[1]);
}
window.addEventListener('hashchange', handleHash);

/* Init */
renderProducts();
renderCart();
handleHash();
