/**
 * KHANZA COFFEE — Main JavaScript
 * Premium Coffee Shop Website
 * Version: 1.0.0
 */

// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initScrollProgress();
  initNavbar();
  initHeroParticles();
  initHeroStats();
  initRevealAnimations();
  initMenuFilter();
  initCounters();
  initTestimonialSlider();
  initLightbox();
  initFAQ();
  initContactForm();
  initThemeToggle();
  initMusicToggle();
  initFooterYear();
});

/* ==========================================
   LOADING SCREEN
   ========================================== */
function initLoader() {
  document.body.classList.add('loading');
  const loader = document.getElementById('loader');

  // Wait for load + min time
  const minTime = new Promise(r => setTimeout(r, 2400));
  const pageLoad = new Promise(r => {
    if (document.readyState === 'complete') r();
    else window.addEventListener('load', r);
  });

  Promise.all([minTime, pageLoad]).then(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    // Trigger hero animations
    document.querySelectorAll('.reveal-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100);
    });
  });
}

/* ==========================================
   CUSTOM CURSOR
   ========================================== */
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .menu-card, .gallery-item, .faq-question, .filter-btn');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

/* ==========================================
   SCROLL PROGRESS
   ========================================== */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ==========================================
   NAVBAR
   ========================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('nav-open');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.classList.remove('nav-open');
    });
  });

  // Active nav link on scroll
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }
}

/* ==========================================
   HERO PARTICLES
   ========================================== */
function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  function createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: ${Math.random() * 0.6 + 0.2};
    `;
    container.appendChild(p);
    // Remove after animation
    p.addEventListener('animationend', () => p.remove());
  }

  // Initial burst
  for (let i = 0; i < 20; i++) createParticle();
  // Continuous spawn
  setInterval(createParticle, 1200);
}

/* ==========================================
   HERO ANIMATED STATS
   ========================================== */
function initHeroStats() {
  const statNums = document.querySelectorAll('.hero .stat-num');
  let animated = false;

  function animateStats() {
    if (animated) return;
    animated = true;
    statNums.forEach(el => {
      animateCount(el, 0, parseInt(el.dataset.count), 1800);
    });
  }

  // Trigger when hero is visible
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(animateStats, 500);
    }
  }, { threshold: 0.3 });

  const hero = document.querySelector('.hero');
  if (hero) observer.observe(hero);
}

/* ==========================================
   COUNTER ANIMATION
   ========================================== */
function animateCount(el, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        animateCount(el, 0, target, 2000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================
   REVEAL ANIMATIONS
   ========================================== */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================
   MENU FILTER
   ========================================== */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active btn
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      menuCards.forEach((card, i) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = `fadeInUp 0.5s ${i * 0.05}s both`;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// CSS animation injection for menu filter
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);

/* ==========================================
   CART ADD ANIMATION
   ========================================== */
function addToCartAnim(btn) {
  btn.innerHTML = '<i class="fas fa-check"></i> Added!';
  btn.style.background = '#6DCE8A';
  btn.style.color = '#0a2010';

  // Show toast
  const toast = document.getElementById('cartToast');
  toast.classList.add('show');

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-plus"></i> Add';
    btn.style.background = '';
    btn.style.color = '';
  }, 1500);

  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ==========================================
   TESTIMONIAL SLIDER
   ========================================== */
function initTestimonialSlider() {
  const slider = document.getElementById('testiSlider');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  const dotsContainer = document.getElementById('testiDots');

  if (!slider) return;

  const cards = slider.querySelectorAll('.testi-card');
  let current = 0;
  let autoTimer = null;
  let cardsPerView = getCardsPerView();

  const totalSlides = Math.ceil(cards.length / cardsPerView);

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function getCardsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function getCardWidth() {
    const card = cards[0];
    return card.offsetWidth + 28; // gap
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, totalSlides - 1));
    const offset = current * cardsPerView * getCardWidth();
    slider.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function updateDots() {
    document.querySelectorAll('.testi-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current < totalSlides - 1 ? current + 1 : 0); }
  function prev() { goTo(current > 0 ? current - 1 : totalSlides - 1); }

  prevBtn?.addEventListener('click', () => { prev(); resetAuto(); });
  nextBtn?.addEventListener('click', () => { next(); resetAuto(); });

  function startAuto() {
    autoTimer = setInterval(next, 4500);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // Touch/swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    resetAuto();
  });

  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    createDots();
    goTo(0);
  });

  createDots();
  startAuto();
}

/* ==========================================
   LIGHTBOX
   ========================================== */
let lightboxImages = [];
let currentLightboxIdx = 0;

function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item, i) => {
    const img = item.querySelector('img');
    if (img) {
      lightboxImages.push({ src: img.src, alt: img.alt });
    }
  });

  // Keyboard support
  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });

  // Click outside to close
  const lb = document.getElementById('lightbox');
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target === lb.querySelector('.lightbox-img-wrap')) {
      closeLightbox();
    }
  });
}

function openLightbox(el) {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item, i) => {
    if (item === el) currentLightboxIdx = i;
  });
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  lbImg.src = lightboxImages[currentLightboxIdx]?.src || '';
  lbImg.alt = lightboxImages[currentLightboxIdx]?.alt || '';
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function nextLightbox() {
  currentLightboxIdx = (currentLightboxIdx + 1) % lightboxImages.length;
  document.getElementById('lightboxImg').src = lightboxImages[currentLightboxIdx].src;
}

function prevLightbox() {
  currentLightboxIdx = (currentLightboxIdx - 1 + lightboxImages.length) % lightboxImages.length;
  document.getElementById('lightboxImg').src = lightboxImages[currentLightboxIdx].src;
}

/* ==========================================
   FAQ ACCORDION
   ========================================== */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ==========================================
   CONTACT FORM
   (Sends via mailto to Gmail)
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const successEl = document.getElementById('formSuccess');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const message = document.getElementById('cMsg').value.trim();

    if (!name || !email || !message) return;

    // Loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;

    // Open mailto with Gmail
    const subject = encodeURIComponent(`Pesan dari ${name} - KHANZA COFFEE Website`);
    const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
    const mailtoLink = `mailto:muhammadrifafarezi@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;

      // Reset
      btnText.style.display = 'inline-block';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
      form.reset();

      // Show success
      successEl.style.display = 'flex';
      setTimeout(() => { successEl.style.display = 'none'; }, 5000);
    }, 1200);
  });
}

/* ==========================================
   THEME TOGGLE
   ========================================== */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Load saved theme
  const saved = localStorage.getItem('khanza-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  btn?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('khanza-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* ==========================================
   BACKGROUND MUSIC
   ========================================== */
function initMusicToggle() {
  const btn = document.getElementById('musicToggle');
  const audio = document.getElementById('bgMusic');
  const icon = document.getElementById('musicIcon');

  if (!btn || !audio) return;

  let playing = false;
  audio.volume = 0.18;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.classList.remove('playing');
      icon.className = 'fas fa-music';
      playing = false;
    } else {
      audio.play().catch(() => {});
      btn.classList.add('playing');
      icon.className = 'fas fa-pause';
      playing = true;
    }
  });
}

/* ==========================================
   FOOTER YEAR
   ========================================== */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ==========================================
   SMOOTH SCROLL (polyfill for older browsers)
   ========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ==========================================
   PARALLAX ON HERO BG
   ========================================== */
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
  }
}, { passive: true });
