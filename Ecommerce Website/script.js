/* =========================================================
   ibbi's Collection — Main JavaScript
   All e-commerce logic: products, cart, wishlist, filters,
   search, sort, checkout, UI interactions.
   ========================================================= */

/* ---------- FALLBACK IMAGE (used if a product image fails) ---------- */
const FALLBACK_IMG = "https://placehold.co/600x750/f0e6d6/1a1a1a?text=ibbi%27s+Collection";

/* ---------- PRODUCT DATA ---------- */
const products = [
  {
    id: 1, name: "Classic Black Abaya", category: "abayas",
    price: 89.99, oldPrice: 109.99, isNew: false, isLimited: false,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    desc: "A timeless black abaya crafted from soft, flowing fabric — elegant, modest and effortlessly chic."
  },
  {
    id: 2, name: "Signature Beige Dress", category: "dresses",
    price: 74.99, oldPrice: null, isNew: true, isLimited: false,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    desc: "A refined beige dress designed for effortless elegance, perfect for day-to-evening wear."
  },
  {
    id: 3, name: "Premium Embroidered Suit", category: "dresses",
    price: 129.99, oldPrice: 159.99, isNew: false, isLimited: false,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    desc: "Delicately embroidered suit set combining tradition and modern tailoring."
  },
  {
    id: 4, name: "Elegant Silk Scarf", category: "accessories",
    price: 34.99, oldPrice: null, isNew: true, isLimited: false,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
    desc: "A luxuriously soft silk scarf that adds a refined touch to any outfit."
  },
  {
    id: 5, name: "Classic Luxury Handbag", category: "bags",
    price: 149.99, oldPrice: null, isNew: false, isLimited: false,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    desc: "A structured leather handbag built for everyday elegance and durability."
  },
  {
    id: 6, name: "Minimalist Watch", category: "accessories",
    price: 99.99, oldPrice: null, isNew: true, isLimited: false,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
    desc: "A sleek minimalist timepiece — the perfect finishing touch to any look."
  },
  {
    id: 7, name: "Pearl Accessories Set", category: "accessories",
    price: 59.99, oldPrice: 79.99, isNew: false, isLimited: false,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    desc: "An elegant pearl jewelry set including earrings and necklace."
  },
  {
    id: 8, name: "Premium Khimar", category: "abayas",
    price: 64.99, oldPrice: null, isNew: true, isLimited: false,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    desc: "A premium flowing khimar made from breathable, high-quality fabric."
  },
  {
    id: 9, name: "Signature Evening Dress", category: "dresses",
    price: 159.99, oldPrice: null, isNew: false, isLimited: true,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
    desc: "A striking evening dress designed for standout, unforgettable moments."
  },
  {
    id: 10, name: "Classic Tote Bag", category: "bags",
    price: 89.99, oldPrice: null, isNew: false, isLimited: false,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80",
    desc: "A spacious, versatile tote bag crafted for everyday luxury."
  },
  {
    id: 11, name: "Limited Edition Shawl", category: "accessories",
    price: 79.99, oldPrice: null, isNew: false, isLimited: true,
    image: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?w=600&q=80",
    desc: "A rare, limited-run shawl featuring an exclusive woven pattern."
  },
  {
    id: 12, name: "Luxury Gift Set", category: "accessories",
    price: 119.99, oldPrice: null, isNew: true, isLimited: true,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    desc: "A beautifully packaged gift set featuring our most-loved accessories."
  }
];

/* ---------- STATE (persisted via localStorage) ---------- */
let cart = JSON.parse(localStorage.getItem("ibbi_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("ibbi_wishlist")) || [];
let currentFilter = "all";
let currentSort = "default";
let currentSearch = "";

/* =========================================================
   UTILITIES
   ========================================================= */
function saveCart() { localStorage.setItem("ibbi_cart", JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem("ibbi_wishlist", JSON.stringify(wishlist)); }
function formatPrice(n) { return "$" + n.toFixed(2); }
function findProduct(id) { return products.find(p => p.id === id); }

function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("out");
    setTimeout(() => toast.remove(), 350);
  }, 2200);
}

/* Attach onerror fallback to every product image safely */
function imgWithFallback(src, alt, cls) {
  return `<img src="${src}" alt="${alt}" loading="lazy" class="${cls || ''}" onerror="this.onerror=null;this.src='${FALLBACK_IMG}';">`;
}

/* =========================================================
   PRODUCT CARD RENDERING
   ========================================================= */
function createProductBadges(p) {
  let badges = "";
  if (p.oldPrice) badges += `<span class="p-badge sale">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>`;
  if (p.isNew) badges += `<span class="p-badge new">New</span>`;
  if (p.isLimited) badges += `<span class="p-badge limited">Limited</span>`;
  return badges ? `<div class="product-badges">${badges}</div>` : "";
}

function createProductCard(p, index) {
  const isWished = wishlist.includes(p.id);
  return `
    <div class="product-card" data-id="${p.id}" style="animation-delay:${(index % 8) * 0.06}s">
      <div class="product-media">
        ${createProductBadges(p)}
        <button class="wishlist-btn ${isWished ? 'active' : ''}" data-id="${p.id}" aria-label="Toggle wishlist for ${p.name}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
        ${imgWithFallback(p.image, p.name)}
        <div class="product-overlay-actions">
          <button class="quick-view-btn" data-id="${p.id}">Quick View</button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price-row">
          <span class="price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
        </div>
        <button class="add-cart-btn" data-id="${p.id}">Add to Cart</button>
      </div>
    </div>
  `;
}

function renderProductGrid() {
  const grid = document.getElementById("productGrid");
  const noResults = document.getElementById("noResults");

  let list = products.filter(p => {
    const matchesFilter =
      currentFilter === "all" ? true :
      currentFilter === "new" ? p.isNew :
      currentFilter === "limited" ? p.isLimited :
      p.category === currentFilter;
    const matchesSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (currentSort === "price-low") list.sort((a, b) => a.price - b.price);
  else if (currentSort === "price-high") list.sort((a, b) => b.price - a.price);
  else if (currentSort === "newest") list = [...list].sort((a, b) => (b.isNew - a.isNew) || b.id - a.id);

  if (list.length === 0) {
    grid.innerHTML = "";
    noResults.hidden = false;
  } else {
    noResults.hidden = true;
    grid.innerHTML = list.map((p, i) => createProductCard(p, i)).join("");
  }
}

function renderNewArrivals() {
  const grid = document.getElementById("newArrivalsGrid");
  const list = products.filter(p => p.isNew);
  grid.innerHTML = list.map((p, i) => createProductCard(p, i)).join("");
}

/* =========================================================
   CART LOGIC
   ========================================================= */
function addToCart(id) {
  const product = findProduct(id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
  }
  saveCart();
  renderCart();
  showToast("Added to cart ✓");
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  showToast("Removed from cart");
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  showToast("Cart cleared");
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const emptyMsg = document.getElementById("emptyCartMsg");
  const count = cartCount();

  document.getElementById("cartCount").textContent = count;
  document.getElementById("drawerCartCount").textContent = `(${count})`;
  document.getElementById("cartSubtotal").textContent = formatPrice(cartTotal());

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "";
    cartItemsEl.appendChild(emptyMsg);
    emptyMsg.style.display = "block";
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      ${imgWithFallback(item.image, item.name)}
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="price">${formatPrice(item.price)}</span>
        <div class="qty-controls">
          <button class="qty-decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button class="qty-increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-item" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `).join("");
}

/* =========================================================
   WISHLIST LOGIC
   ========================================================= */
function toggleWishlist(id) {
  const exists = wishlist.includes(id);
  if (exists) {
    wishlist = wishlist.filter(w => w !== id);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);
    showToast("Added to wishlist ♥");
  }
  saveWishlist();
  renderWishlist();
  renderProductGrid();
  renderNewArrivals();
}

function renderWishlist() {
  const container = document.getElementById("wishlistItems");
  const emptyMsg = document.getElementById("emptyWishlistMsg");
  document.getElementById("wishlistCount").textContent = wishlist.length;
  document.getElementById("drawerWishlistCount").textContent = `(${wishlist.length})`;

  if (wishlist.length === 0) {
    container.innerHTML = "";
    container.appendChild(emptyMsg);
    return;
  }

  container.innerHTML = wishlist.map(id => {
    const p = findProduct(id);
    if (!p) return "";
    return `
      <div class="wishlist-item" data-id="${p.id}">
        ${imgWithFallback(p.image, p.name)}
        <div class="wishlist-item-info">
          <h4>${p.name}</h4>
          <span class="price">${formatPrice(p.price)}</span>
        </div>
        <button class="remove-item wishlist-remove" data-id="${p.id}">Remove</button>
      </div>
    `;
  }).join("");
}

/* =========================================================
   QUICK VIEW
   ========================================================= */
function openQuickView(id) {
  const p = findProduct(id);
  if (!p) return;
  const body = document.getElementById("quickViewBody");
  body.innerHTML = `
    <div class="qv-image">${imgWithFallback(p.image, p.name)}</div>
    <div class="qv-info">
      <span class="product-category">${p.category}</span>
      <h2>${p.name}</h2>
      <div class="price-row">
        <span class="price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
      </div>
      <p class="desc">${p.desc}</p>
      <button class="btn btn-primary" id="qvAddToCart" data-id="${p.id}">Add to Cart</button>
    </div>
  `;
  document.getElementById("quickViewOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  document.getElementById("quickViewOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

/* =========================================================
   DRAWERS (Cart / Wishlist)
   ========================================================= */
function openDrawer(drawer) {
  drawer.classList.add("open");
  document.getElementById("drawerOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeAllDrawers() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("wishlistDrawer").classList.remove("open");
  document.getElementById("drawerOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

/* =========================================================
   CHECKOUT
   ========================================================= */
function openCheckout() {
  if (cart.length === 0) {
    showToast("Your cart is empty");
    return;
  }
  renderCheckoutSummary();
  document.getElementById("checkoutOverlay").classList.add("active");
  closeAllDrawers();
  document.body.style.overflow = "hidden";
}
function closeCheckout() {
  document.getElementById("checkoutOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

function renderCheckoutSummary() {
  const summaryEl = document.getElementById("checkoutSummary");
  summaryEl.innerHTML = cart.map(item => `
    <div class="summary-item">
      <span>${item.name} × ${item.qty}</span>
      <span>${formatPrice(item.price * item.qty)}</span>
    </div>
  `).join("");
  document.getElementById("checkoutTotal").textContent = formatPrice(cartTotal());
}

function validateCheckoutForm() {
  const fields = ["custName", "custEmail", "custPhone", "custAddress", "custCity", "custPayment"];
  let valid = true;
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.classList.add("invalid");
      valid = false;
    } else {
      el.classList.remove("invalid");
    }
  });
  const email = document.getElementById("custEmail");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && !emailPattern.test(email.value)) {
    email.classList.add("invalid");
    valid = false;
  }
  return valid;
}

/* =========================================================
   SCROLL ANIMATIONS + ACTIVE NAV + BACK TO TOP
   ========================================================= */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function initActiveNav() {
  const sections = document.querySelectorAll("main section[id], .hero[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });

    // Back to top visibility
    document.getElementById("backToTop").classList.toggle("show", window.scrollY > 500);

    // Header shadow on scroll
    document.getElementById("header").style.boxShadow = window.scrollY > 10 ? "var(--shadow-sm)" : "none";
  });
}

/* =========================================================
   EVENT LISTENERS
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProductGrid();
  renderNewArrivals();
  renderCart();
  renderWishlist();
  initScrollReveal();
  initActiveNav();

  /* ---- Mobile Nav ---- */
  const hamburger = document.getElementById("hamburger");
  const navLinksEl = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  function toggleMobileNav() {
    hamburger.classList.toggle("active");
    navLinksEl.classList.toggle("active");
    navOverlay.classList.toggle("active");
    const expanded = hamburger.classList.contains("active");
    hamburger.setAttribute("aria-expanded", expanded);
  }
  hamburger.addEventListener("click", toggleMobileNav);
  navOverlay.addEventListener("click", toggleMobileNav);
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (navLinksEl.classList.contains("active")) toggleMobileNav();
    });
  });

  /* ---- Search Bar ---- */
  const searchToggle = document.getElementById("searchToggle");
  const searchBar = document.getElementById("searchBar");
  const searchInput = document.getElementById("searchInput");
  const closeSearch = document.getElementById("closeSearch");

  searchToggle.addEventListener("click", () => {
    searchBar.classList.toggle("active");
    if (searchBar.classList.contains("active")) searchInput.focus();
  });
  closeSearch.addEventListener("click", () => {
    searchBar.classList.remove("active");
    searchInput.value = "";
    currentSearch = "";
    renderProductGrid();
  });
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderProductGrid();
    // Scroll to shop when typing
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });

  /* ---- Filters ---- */
  document.getElementById("filterTabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderProductGrid();
  });

  /* ---- Sort ---- */
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProductGrid();
  });

  /* ---- Delegated clicks: Add to Cart / Wishlist / Quick View (product grid + new arrivals) ---- */
  function handleGridClicks(e) {
    const addBtn = e.target.closest(".add-cart-btn");
    const wishBtn = e.target.closest(".wishlist-btn");
    const qvBtn = e.target.closest(".quick-view-btn");

    if (addBtn) addToCart(Number(addBtn.dataset.id));
    if (wishBtn) toggleWishlist(Number(wishBtn.dataset.id));
    if (qvBtn) openQuickView(Number(qvBtn.dataset.id));
  }
  document.getElementById("productGrid").addEventListener("click", handleGridClicks);
  document.getElementById("newArrivalsGrid").addEventListener("click", handleGridClicks);

  /* ---- Quick View Modal ---- */
  document.getElementById("closeQuickView").addEventListener("click", closeQuickView);
  document.getElementById("quickViewOverlay").addEventListener("click", (e) => {
    if (e.target.id === "quickViewOverlay") closeQuickView();
  });
  document.getElementById("quickViewBody").addEventListener("click", (e) => {
    const btn = e.target.closest("#qvAddToCart");
    if (btn) {
      addToCart(Number(btn.dataset.id));
      closeQuickView();
    }
  });

  /* ---- Cart Drawer ---- */
  const cartDrawer = document.getElementById("cartDrawer");
  const wishlistDrawer = document.getElementById("wishlistDrawer");

  document.getElementById("cartToggle").addEventListener("click", () => openDrawer(cartDrawer));
  document.getElementById("closeCart").addEventListener("click", closeAllDrawers);
  document.getElementById("continueShoppingBtn").addEventListener("click", closeAllDrawers);
  document.getElementById("drawerOverlay").addEventListener("click", closeAllDrawers);
  document.getElementById("clearCartBtn").addEventListener("click", clearCart);

  document.getElementById("wishlistToggle").addEventListener("click", () => openDrawer(wishlistDrawer));
  document.getElementById("closeWishlist").addEventListener("click", closeAllDrawers);

  document.getElementById("cartItems").addEventListener("click", (e) => {
    const dec = e.target.closest(".qty-decrease");
    const inc = e.target.closest(".qty-increase");
    const remove = e.target.closest(".remove-item");
    if (dec) changeQty(Number(dec.dataset.id), -1);
    if (inc) changeQty(Number(inc.dataset.id), 1);
    if (remove) removeFromCart(Number(remove.dataset.id));
  });

  document.getElementById("wishlistItems").addEventListener("click", (e) => {
    const remove = e.target.closest(".wishlist-remove");
    if (remove) toggleWishlist(Number(remove.dataset.id));
  });

  /* ---- Checkout ---- */
  document.getElementById("checkoutBtn").addEventListener("click", openCheckout);
  document.getElementById("closeCheckout").addEventListener("click", closeCheckout);
  document.getElementById("checkoutOverlay").addEventListener("click", (e) => {
    if (e.target.id === "checkoutOverlay") closeCheckout();
  });

  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateCheckoutForm()) {
      showToast("Please fill in all required fields");
      return;
    }
    // Simulate order placement (front-end demo only)
    closeCheckout();
    document.getElementById("successOverlay").classList.add("active");
    cart = [];
    saveCart();
    renderCart();
    document.getElementById("checkoutForm").reset();
  });

  document.getElementById("closeSuccess").addEventListener("click", () => {
    document.getElementById("successOverlay").classList.remove("active");
    document.body.style.overflow = "";
  });
  document.getElementById("successCloseBtn").addEventListener("click", () => {
    document.getElementById("successOverlay").classList.remove("active");
    document.body.style.overflow = "";
  });

  /* ---- Limited Edition CTA ---- */
  document.getElementById("exploreLimitedBtn").addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    document.querySelector('[data-filter="limited"]').classList.add("active");
    currentFilter = "limited";
    renderProductGrid();
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });

  /* ---- Newsletter Validation ---- */
  function handleNewsletter(formId, inputSelector, msgId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector(inputSelector);
      const email = input.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const msgEl = msgId ? document.getElementById(msgId) : null;

      if (!emailPattern.test(email)) {
        if (msgEl) { msgEl.textContent = "Please enter a valid email address."; msgEl.className = "form-msg error"; }
        showToast("Invalid email address");
        return;
      }
      if (msgEl) { msgEl.textContent = "Thank you for subscribing! 🎉"; msgEl.className = "form-msg success"; }
      showToast("Subscribed successfully ✓");
      form.reset();
    });
  }
  handleNewsletter("newsletterForm", "#newsletterEmail", "newsletterMsg");
  handleNewsletter("footerNewsletterForm", "input[type='email']", null);

  /* ---- Contact Form (demo) ---- */
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Message sent ✓");
    e.target.reset();
  });

  /* ---- Back to Top ---- */
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---- Escape key closes modals/drawers ---- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDrawers();
      closeQuickView();
      closeCheckout();
      document.getElementById("successOverlay").classList.remove("active");
      searchBar.classList.remove("active");
    }
  });
});