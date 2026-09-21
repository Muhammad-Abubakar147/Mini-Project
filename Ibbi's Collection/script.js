/* =====================================================
   ibbi's Collection — Main Script
   Vanilla JS only. Organized into clear modules.
===================================================== */

/* ---------- LOGO SVG COMPONENT ----------
   NOTE: This SVG recreates the uploaded logo's monogram,
   ornate frame, wordmark and gold metallic identity.
   Replace with <img src="assets/logo/logo-full.png"> etc.
   once the original exported logo file is available —
   the markup structure below is built so swapping is easy.
------------------------------------------------------ */
function buildLogoSVG(uid, variant = "full") {
  const grad = `goldGrad-${uid}`;
  const glow = `glow-${uid}`;

  const defs = `
    <defs>
      <linearGradient id="${grad}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7a5c1e"/>
        <stop offset="22%" stop-color="#d4af37"/>
        <stop offset="45%" stop-color="#f6e6b4"/>
        <stop offset="60%" stop-color="#d4af37"/>
        <stop offset="80%" stop-color="#b8860b"/>
        <stop offset="100%" stop-color="#7a5c1e"/>
      </linearGradient>
      <filter id="${glow}" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.45"/>
      </filter>
    </defs>`;

  const monogram = `
    <g filter="url(#${glow})">
      <rect x="18" y="14" width="164" height="150" rx="8" fill="none" stroke="url(#${grad})" stroke-width="2.4"/>
      <rect x="24" y="20" width="152" height="138" rx="6" fill="none" stroke="url(#${grad})" stroke-width="1"/>
      <path d="M60 14 Q100 -6 140 14" fill="none" stroke="url(#${grad})" stroke-width="2"/>
      <path d="M60 164 Q100 184 140 164" fill="none" stroke="url(#${grad})" stroke-width="2"/>
      <rect x="16" y="12" width="8" height="8" transform="rotate(45 20 16)" fill="url(#${grad})"/>
      <rect x="176" y="12" width="8" height="8" transform="rotate(45 180 16)" fill="url(#${grad})"/>
      <rect x="16" y="160" width="8" height="8" transform="rotate(45 20 164)" fill="url(#${grad})"/>
      <rect x="176" y="160" width="8" height="8" transform="rotate(45 180 164)" fill="url(#${grad})"/>
      <text x="72" y="112" font-family="Playfair Display, serif" font-size="110" font-weight="700" fill="url(#${grad})">I</text>
      <text x="88" y="112" font-family="Playfair Display, serif" font-size="110" font-weight="700" fill="url(#${grad})">C</text>
      <path d="M70 128 Q100 145 132 128" fill="none" stroke="url(#${grad})" stroke-width="2.4" stroke-linecap="round"/>
    </g>`;

  if (variant === "monogram") {
    return `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">${defs}${monogram}</svg>`;
  }

  // Full lockup with wordmark
  return `
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      ${defs}
      <g transform="translate(50,10) scale(1)">${monogram}</g>
      <line x1="60" y1="205" x2="95" y2="205" stroke="url(#${grad})" stroke-width="1.2"/>
      <line x1="205" y1="205" x2="240" y2="205" stroke="url(#${grad})" stroke-width="1.2"/>
      <rect x="147" y="201" width="6" height="6" transform="rotate(45 150 204)" fill="url(#${grad})"/>
      <text x="150" y="222" text-anchor="middle" font-family="Playfair Display, serif" font-style="italic" font-size="30" fill="url(#${grad})">Ibbi's Collection</text>
      <text x="150" y="248" text-anchor="middle" font-family="Jost, sans-serif" letter-spacing="4" font-size="12" fill="url(#${grad})">BY ABUBAKAR</text>
      <path d="M110 258 Q150 272 190 258" fill="none" stroke="url(#${grad})" stroke-width="1" stroke-linecap="round"/>
    </svg>`;
}

/* Inject logo into all designated placeholders */
function renderAllLogos() {
  document.getElementById("navLogo").innerHTML = buildLogoSVG("nav", "monogram");
  document.getElementById("mobileNavLogo").innerHTML = buildLogoSVG("mnav", "monogram");
  document.getElementById("footerLogo").innerHTML = buildLogoSVG("footer", "monogram");
  document.getElementById("heroLogoStage").innerHTML = `<div class="logo-3d">${buildLogoSVG("hero", "full")}</div>`;
  document.getElementById("aboutLogo").innerHTML = buildLogoSVG("about", "full");
}

/* =====================================================
   PRODUCT DATA
===================================================== */
const PRODUCTS = [
  { id: 1, name: "Classic Black Abaya", tags: ["abayas"], price: 129, oldPrice: 159, dateAdded: "2025-11-01",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    desc: "A timeless silhouette crafted from premium flowing fabric, designed for effortless elegance and modest sophistication." },
  { id: 2, name: "Signature Beige Dress", tags: ["dresses"], price: 149, dateAdded: "2025-10-20",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    desc: "A refined beige dress that blends minimalist design with a tailored, flattering fit for any occasion." },
  { id: 3, name: "Premium Embroidered Suit", tags: ["dresses"], price: 199, oldPrice: 249, dateAdded: "2025-09-15",
    image: "https://images.unsplash.com/photo-1548624313-0396c75f6da3?q=80&w=800&auto=format&fit=crop",
    desc: "Hand-detailed embroidery meets structured tailoring in this premium two-piece suit set." },
  { id: 4, name: "Elegant Silk Scarf", tags: ["accessories"], price: 59, dateAdded: "2025-11-10",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop",
    desc: "A luxuriously soft silk scarf finished with delicate edges — the perfect finishing touch." },
  { id: 5, name: "Classic Luxury Handbag", tags: ["bags"], price: 219, dateAdded: "2025-08-05",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
    desc: "A structured handbag crafted from fine leather, designed to elevate any ensemble." },
  { id: 6, name: "Minimalist Watch", tags: ["accessories"], price: 179, dateAdded: "2025-07-22",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
    desc: "Clean lines and a champagne-gold finish make this timepiece an everyday statement of quiet luxury." },
  { id: 7, name: "Pearl Accessories Set", tags: ["accessories", "new"], price: 89, dateAdded: "2025-11-25",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    desc: "A curated set of pearl jewelry pieces designed to add timeless refinement to your look." },
  { id: 8, name: "Premium Khimar", tags: ["abayas", "new"], price: 99, dateAdded: "2025-11-22",
    image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=800&auto=format&fit=crop",
    desc: "Lightweight, breathable and elegantly draped — designed for comfort without compromising style." },
  { id: 9, name: "Signature Evening Dress", tags: ["dresses", "limited"], price: 259, oldPrice: 299, dateAdded: "2025-11-18",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
    desc: "A show-stopping evening dress created in extremely limited quantity for the discerning wardrobe." },
  { id: 10, name: "Classic Tote Bag", tags: ["bags"], price: 149, dateAdded: "2025-06-10",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    desc: "A spacious, structured tote built for everyday luxury with meticulous stitching detail." },
  { id: 11, name: "Limited Edition Shawl", tags: ["accessories", "limited"], price: 119, oldPrice: 139, dateAdded: "2025-11-27",
    image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=800&auto=format&fit=crop",
    desc: "An exclusive shawl produced in a single limited run, featuring an intricate hand-finished border." },
  { id: 12, name: "Luxury Gift Set", tags: ["accessories", "new", "limited"], price: 149, oldPrice: 179, dateAdded: "2025-11-29",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    desc: "A beautifully packaged gift set combining our most-loved accessories — perfect for gifting." },
];

const categoryLabel = {
  abayas: "Abayas", dresses: "Dresses", accessories: "Accessories",
  bags: "Bags", new: "New Arrival", limited: "Limited Edition"
};
function primaryCategory(product) {
  const preferred = ["abayas", "dresses", "bags", "accessories"];
  return preferred.find(t => product.tags.includes(t)) || product.tags[0];
}

/* =====================================================
   STATE (localStorage backed)
===================================================== */
const store = {
  get cart() { return JSON.parse(localStorage.getItem("ibbi_cart") || "[]"); },
  set cart(v) { localStorage.setItem("ibbi_cart", JSON.stringify(v)); },
  get wishlist() { return JSON.parse(localStorage.getItem("ibbi_wishlist") || "[]"); },
  set wishlist(v) { localStorage.setItem("ibbi_wishlist", JSON.stringify(v)); }
};

/* =====================================================
   TOAST NOTIFICATIONS
===================================================== */
function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}

/* =====================================================
   IMAGE FALLBACK (prevents broken images)
===================================================== */
function safeImgAttrs(url, name) {
  const fallback = `https://placehold.co/600x800/1a1917/d4af37?text=${encodeURIComponent(name)}`;
  return `src="${url}" onerror="this.onerror=null;this.src='${fallback}'" alt="${name}"`;
}

/* =====================================================
   PRODUCT RENDERING
===================================================== */
function formatPrice(n) { return `$${n.toFixed(2)}`; }

function createProductCard(product) {
  const cat = primaryCategory(product);
  const inWishlist = store.wishlist.includes(product.id);
  const discount = product.oldPrice ? Math.round(100 - (product.price / product.oldPrice) * 100) : null;

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-media">
        <img ${safeImgAttrs(product.image, product.name)} loading="lazy">
        ${discount ? `<span class="product-badge">-${discount}%</span>` : (product.tags.includes("new") ? `<span class="product-badge">New</span>` : (product.tags.includes("limited") ? `<span class="product-badge">Limited</span>` : ""))}
        <div class="product-actions">
          <button class="wish-btn ${inWishlist ? "active-wish" : ""}" data-id="${product.id}" aria-label="Add to wishlist">
            <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.35-9.5-8.8C.6 7.6 2.4 4 6 4c2 0 3.4 1 4.5 2.5C11.6 5 13 4 15 4c3.6 0 5.4 3.6 3.5 7.2C19 16.65 12 20 12 20Z" fill="${inWishlist ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.5"/></svg>
          </button>
        </div>
        <button class="quick-view-trigger" data-id="${product.id}">Quick View</button>
      </div>
      <div class="product-info">
        <p class="product-category">${categoryLabel[cat] || cat}</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price-row">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ""}
        </div>
        <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    </article>`;
}

let currentFilter = "all";
let currentSearch = "";
let currentSort = "default";

function getFilteredProducts() {
  let list = [...PRODUCTS];

  if (currentFilter !== "all") {
    list = list.filter(p => p.tags.includes(currentFilter));
  }
  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.tags.join(" ").includes(q));
  }
  if (currentSort === "newest") {
    list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  } else if (currentSort === "price-low") {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    list.sort((a, b) => b.price - a.price);
  }
  return list;
}

function renderProductGrid() {
  const grid = document.getElementById("productGrid");
  const noResults = document.getElementById("noResults");
  const list = getFilteredProducts();

  grid.innerHTML = list.map(createProductCard).join("");
  noResults.hidden = list.length !== 0;
}

function renderNewArrivals() {
  const wrap = document.getElementById("newArrivalsGrid");
  const items = PRODUCTS.filter(p => p.tags.includes("new")).slice(0, 3);
  // Pad with recent items if fewer than 3
  const filler = PRODUCTS.filter(p => !items.includes(p)).slice(0, 3 - items.length);
  const combined = [...items, ...filler];

  wrap.innerHTML = combined.map(p => `
    <div class="editorial-item" data-id="${p.id}">
      <img ${safeImgAttrs(p.image, p.name)} loading="lazy">
      <div class="editorial-caption">
        <p class="cat">${categoryLabel[primaryCategory(p)]}</p>
        <h3>${p.name}</h3>
        <p class="price">${formatPrice(p.price)}</p>
        <button class="qv-editorial-btn" data-id="${p.id}">Quick View</button>
      </div>
    </div>
  `).join("");
}

/* =====================================================
   CART LOGIC
===================================================== */
function addToCart(id, qty = 1) {
  const cart = store.cart;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  store.cart = cart;
  renderCart();
  showToast("Added to cart ✓");
}

function removeFromCart(id) {
  store.cart = store.cart.filter(item => item.id !== id);
  renderCart();
  showToast("Removed from cart");
}

function updateQty(id, delta) {
  const cart = store.cart;
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    store.cart = cart.filter(i => i.id !== id);
  } else {
    store.cart = cart;
  }
  renderCart();
}

function clearCart() {
  store.cart = [];
  renderCart();
  showToast("Cart cleared");
}

function getCartDetails() {
  return store.cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return { ...product, qty: item.qty };
  }).filter(Boolean);
}

function renderCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const details = getCartDetails();

  if (details.length === 0) {
    cartItemsEl.innerHTML = `<p class="empty-msg">Your bag is currently empty.</p>`;
  } else {
    cartItemsEl.innerHTML = details.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img ${safeImgAttrs(item.image, item.name)}>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price)}</p>
          <div class="qty-control">
            <button class="qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button class="qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `).join("");
  }

  const totalItems = details.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = details.reduce((sum, i) => sum + i.qty * i.price, 0);

  document.getElementById("cartItemCount").textContent = totalItems;
  document.getElementById("cartSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("cartCount").textContent = totalItems;

  updateOrderSummary(details, subtotal);
}

function updateOrderSummary(details, subtotal) {
  const summaryEl = document.getElementById("orderSummaryItems");
  const totalEl = document.getElementById("orderTotal");
  if (!summaryEl) return;
  summaryEl.innerHTML = details.map(item => `
    <div class="summary-item"><span>${item.name} × ${item.qty}</span><span>${formatPrice(item.price * item.qty)}</span></div>
  `).join("") || `<p class="summary-item">No items in cart.</p>`;
  totalEl.textContent = formatPrice(subtotal);
}

/* =====================================================
   WISHLIST LOGIC
===================================================== */
function toggleWishlist(id) {
  let wishlist = store.wishlist;
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);
    showToast("Added to wishlist ♥");
  }
  store.wishlist = wishlist;
  renderWishlist();
  renderProductGrid(); // refresh heart states
  renderNewArrivals();
}

function renderWishlist() {
  const wishlistEl = document.getElementById("wishlistItems");
  const ids = store.wishlist;
  const items = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (items.length === 0) {
    wishlistEl.innerHTML = `<p class="empty-msg">Your wishlist is empty.</p>`;
  } else {
    wishlistEl.innerHTML = items.map(item => `
      <div class="wishlist-item" data-id="${item.id}">
        <img ${safeImgAttrs(item.image, item.name)}>
        <div class="wishlist-item-info">
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price)}</p>
          <div class="wishlist-actions">
            <button class="wl-add-cart" data-id="${item.id}">Add to Cart</button>
            <button class="wl-remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `).join("");
  }
  document.getElementById("wishlistCount").textContent = ids.length;
}

/* =====================================================
   QUICK VIEW MODAL
===================================================== */
let quickViewQty = 1;
let quickViewProductId = null;

function openQuickView(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  quickViewProductId = id;
  quickViewQty = 1;

  document.getElementById("qvImage").src = product.image;
  document.getElementById("qvImage").alt = product.name;
  document.getElementById("qvImage").onerror = function () {
    this.onerror = null;
    this.src = `https://placehold.co/600x800/1a1917/d4af37?text=${encodeURIComponent(product.name)}`;
  };
  document.getElementById("qvCategory").textContent = categoryLabel[primaryCategory(product)];
  document.getElementById("qvName").textContent = product.name;
  document.getElementById("qvPrice").textContent = formatPrice(product.price);
  document.getElementById("qvDesc").textContent = product.desc;
  document.getElementById("qvQty").textContent = quickViewQty;

  openModal("quickViewModal");
}

/* =====================================================
   MODAL HELPERS
===================================================== */
function openModal(id) {
  document.getElementById(id).classList.add("active");
  document.getElementById(id).setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  document.getElementById(id).classList.remove("active");
  document.getElementById(id).setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* =====================================================
   DRAWER HELPERS (Cart / Wishlist)
===================================================== */
function openDrawer(drawerId) {
  document.getElementById(drawerId).classList.add("open");
  document.getElementById(drawerId).setAttribute("aria-hidden", "false");
  document.getElementById("backdrop").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeDrawer(drawerId) {
  document.getElementById(drawerId).classList.remove("open");
  document.getElementById(drawerId).setAttribute("aria-hidden", "true");
  document.getElementById("backdrop").classList.remove("active");
  document.body.style.overflow = "";
}
function closeAllOverlays() {
  ["cartDrawer", "wishlistDrawer"].forEach(closeDrawer);
  document.getElementById("mobileNav").classList.remove("open");
  document.getElementById("menuToggle").classList.remove("open");
  document.body.style.overflow = "";
}

/* =====================================================
   CHECKOUT
===================================================== */
function openCheckout() {
  if (store.cart.length === 0) {
    showToast("Your cart is empty");
    return;
  }
  closeDrawer("cartDrawer");
  const details = getCartDetails();
  const subtotal = details.reduce((s, i) => s + i.price * i.qty, 0);
  updateOrderSummary(details, subtotal);
  openModal("checkoutModal");
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const messageEl = document.getElementById("checkoutMessage");

  if (!form.checkValidity()) {
    messageEl.textContent = "Please complete all required fields.";
    messageEl.style.color = "#b3413b";
    return;
  }

  messageEl.style.color = "var(--gold-light)";
  messageEl.textContent = "Order placed successfully! (Demo only — no real payment processed.)";

  setTimeout(() => {
    clearCart();
    form.reset();
    messageEl.textContent = "";
    closeModal("checkoutModal");
  }, 2200);
}

/* =====================================================
   NEWSLETTER + CONTACT VALIDATION
===================================================== */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById("newsletterEmail");
  const messageEl = document.getElementById("newsletterMessage");

  if (!isValidEmail(emailInput.value)) {
    messageEl.style.color = "#e88b8b";
    messageEl.textContent = "Please enter a valid email address.";
    return;
  }
  messageEl.style.color = "var(--gold-light)";
  messageEl.textContent = "Thank you for subscribing to ibbi's Collection!";
  emailInput.value = "";
  showToast("Subscribed successfully ✓");
}

function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const messageEl = document.getElementById("contactMessageStatus");

  if (!form.checkValidity()) {
    messageEl.style.color = "#e88b8b";
    messageEl.textContent = "Please fill in all fields correctly.";
    return;
  }
  messageEl.style.color = "var(--gold-dark)";
  messageEl.textContent = "Message sent! We'll get back to you shortly.";
  form.reset();
}

/* =====================================================
   SCROLL EFFECTS: reveal, header compact, active nav, back-to-top
===================================================== */
function setupScrollReveal() {
  const items = document.querySelectorAll(".reveal, .fade-up");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => observer.observe(item));
}

function setupHeaderScroll() {
  const header = document.getElementById("siteHeader");
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
    backToTop.classList.toggle("show", window.scrollY > 500);
  });
}

function setupActiveNav() {
  const sections = document.querySelectorAll("main section[id], .hero[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
}

/* =====================================================
   EVENT BINDINGS
===================================================== */
function bindEvents() {
  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const backdrop = document.getElementById("backdrop");

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    backdrop.classList.toggle("active", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  document.querySelectorAll("[data-nav-mobile]").forEach(link => {
    link.addEventListener("click", closeAllOverlays);
  });
  backdrop.addEventListener("click", closeAllOverlays);

  // Search overlay
  const searchToggle = document.getElementById("searchToggle");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");

  searchToggle.addEventListener("click", () => {
    searchOverlay.classList.add("active");
    searchInput.focus();
  });
  searchClose.addEventListener("click", () => searchOverlay.classList.remove("active"));
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderProductGrid();
  });
  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.remove("active");
  });

  // Filters
  document.getElementById("filterTabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderProductGrid();
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });

  // Collection tiles -> apply filter
  document.querySelectorAll(".collection-tile").forEach(tile => {
    tile.addEventListener("click", () => {
      const filter = tile.dataset.filter;
      currentFilter = filter;
      document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.filter === filter);
      });
      renderProductGrid();
      document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Sort
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProductGrid();
  });

  // Explore Limited Edition button
  document.getElementById("exploreLimitedBtn").addEventListener("click", () => {
    currentFilter = "limited";
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b.dataset.filter === "limited"));
    renderProductGrid();
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });

  // Product grid delegated events
  document.getElementById("productGrid").addEventListener("click", handleProductGridClick);
  document.getElementById("newArrivalsGrid").addEventListener("click", handleEditorialClick);

  // Cart drawer
  document.getElementById("cartToggle").addEventListener("click", () => openDrawer("cartDrawer"));
  document.getElementById("cartClose").addEventListener("click", () => closeDrawer("cartDrawer"));
  document.getElementById("clearCartBtn").addEventListener("click", clearCart);
  document.getElementById("checkoutBtn").addEventListener("click", openCheckout);
  document.getElementById("cartItems").addEventListener("click", handleCartClick);

  // Wishlist drawer
  document.getElementById("wishlistToggle").addEventListener("click", () => openDrawer("wishlistDrawer"));
  document.getElementById("wishlistClose").addEventListener("click", () => closeDrawer("wishlistDrawer"));
  document.getElementById("wishlistItems").addEventListener("click", handleWishlistDrawerClick);

  // Backdrop closes drawers too
  backdrop.addEventListener("click", () => {
    closeDrawer("cartDrawer");
    closeDrawer("wishlistDrawer");
  });

  // Quick view modal
  document.getElementById("quickViewClose").addEventListener("click", () => closeModal("quickViewModal"));
  document.getElementById("quickViewModal").addEventListener("click", (e) => {
    if (e.target.id === "quickViewModal") closeModal("quickViewModal");
  });
  document.getElementById("qvMinus").addEventListener("click", () => {
    if (quickViewQty > 1) quickViewQty--;
    document.getElementById("qvQty").textContent = quickViewQty;
  });
  document.getElementById("qvPlus").addEventListener("click", () => {
    quickViewQty++;
    document.getElementById("qvQty").textContent = quickViewQty;
  });
  document.getElementById("qvAddToCart").addEventListener("click", () => {
    if (quickViewProductId) {
      addToCart(quickViewProductId, quickViewQty);
      closeModal("quickViewModal");
    }
  });

  // Checkout modal
  document.getElementById("checkoutClose").addEventListener("click", () => closeModal("checkoutModal"));
  document.getElementById("checkoutModal").addEventListener("click", (e) => {
    if (e.target.id === "checkoutModal") closeModal("checkoutModal");
  });
  document.getElementById("checkoutForm").addEventListener("submit", handleCheckoutSubmit);

  // Newsletter + Contact
  document.getElementById("newsletterForm").addEventListener("submit", handleNewsletterSubmit);
  document.getElementById("contactForm").addEventListener("submit", handleContactSubmit);

  // Back to top
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Escape key closes overlays
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal("quickViewModal");
      closeModal("checkoutModal");
      closeDrawer("cartDrawer");
      closeDrawer("wishlistDrawer");
      document.getElementById("searchOverlay").classList.remove("active");
      closeAllOverlays();
    }
  });

  // Static footer links (Shipping/Returns/etc.) - demo placeholders
  document.querySelectorAll("[data-static-link]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("This page is coming soon.");
    });
  });
}

function handleProductGridClick(e) {
  const addBtn = e.target.closest(".add-cart-btn");
  const wishBtn = e.target.closest(".wish-btn");
  const qvBtn = e.target.closest(".quick-view-trigger");

  if (addBtn) addToCart(Number(addBtn.dataset.id));
  if (wishBtn) toggleWishlist(Number(wishBtn.dataset.id));
  if (qvBtn) openQuickView(Number(qvBtn.dataset.id));
}

function handleEditorialClick(e) {
  const btn = e.target.closest(".qv-editorial-btn");
  if (btn) openQuickView(Number(btn.dataset.id));
}

function handleCartClick(e) {
  const id = Number(e.target.dataset.id);
  if (!id) return;
  if (e.target.classList.contains("qty-plus")) updateQty(id, 1);
  if (e.target.classList.contains("qty-minus")) updateQty(id, -1);
  if (e.target.classList.contains("cart-item-remove")) removeFromCart(id);
}

function handleWishlistDrawerClick(e) {
  const id = Number(e.target.dataset.id);
  if (!id) return;
  if (e.target.classList.contains("wl-remove")) toggleWishlist(id);
  if (e.target.classList.contains("wl-add-cart")) {
    addToCart(id);
  }
}

/* =====================================================
   INIT
===================================================== */
function init() {
  renderAllLogos();
  renderProductGrid();
  renderNewArrivals();
  renderCart();
  renderWishlist();
  setupScrollReveal();
  setupHeaderScroll();
  setupActiveNav();
  bindEvents();
}

document.addEventListener("DOMContentLoaded", init);