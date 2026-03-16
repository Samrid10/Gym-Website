/**
 * INSPIRE GYM & STUDIOS — JAVASCRIPT
 * Features: Sticky Navbar, Smooth Scroll, Scroll Animations,
 *           Mobile Menu, Active Nav Links, Contact Form, Back To Top
 */

/* ============================================================
   1. NAVBAR — Sticky scroll effect + mobile toggle
   ============================================================ */

const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const btnNav    = document.querySelector('.btn-nav');

// Sticky effect on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  handleBackToTop();
});

// Mobile hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================================================
   2. ACTIVE NAV LINK — highlights based on scroll position
   ============================================================ */

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ============================================================
   3. SCROLL REVEAL ANIMATIONS
   ============================================================ */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   4. BACK TO TOP BUTTON
   ============================================================ */

const backToTop = document.getElementById('backToTop');

function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   5. CONTACT FORM — Validation & success state
   ============================================================ */

const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple validation
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!fname || !lname || !email) {
    shakeForm();
    return;
  }

  if (!isValidEmail(email)) {
    document.getElementById('email').style.borderColor = '#e8102a';
    document.getElementById('email').focus();
    return;
  }

  // Simulate form submission
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  setTimeout(() => {
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1500);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeForm() {
  contactForm.style.animation = 'shake 0.4s ease';
  setTimeout(() => contactForm.style.animation = '', 400);
}

// Remove error border on input
document.getElementById('email').addEventListener('input', function() {
  this.style.borderColor = '';
});

// Inject shake keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-8px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);

/* ============================================================
   6. SMOOTH SCROLL for all anchor links
   ============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   7. GALLERY lightbox hint — scale effect on click
   ============================================================ */

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function() {
    this.style.transition = 'transform 0.2s ease';
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 200);
  });
});

/* ============================================================
   8. TRAINER CARD — Subtle parallax tilt on hover
   ============================================================ */

document.querySelectorAll('.trainer-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
});

/* ============================================================
   9. PLAN CARD — Highlight on hover
   ============================================================ */

document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.plan-card').forEach(c => {
      if (c !== card && !c.classList.contains('plan-featured')) {
        c.style.opacity = '0.6';
      }
    });
  });

  card.addEventListener('mouseleave', () => {
    document.querySelectorAll('.plan-card').forEach(c => {
      c.style.opacity = '';
    });
  });
});

/* ============================================================
   10. STATS COUNTER — Animate numbers on scroll
   ============================================================ */

function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 2000;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const raw = el.textContent;
        const num = parseInt(raw.replace(/\D/g, ''), 10);
        const suffix = raw.replace(/[0-9,]/g, '');
        el.textContent = '0' + suffix;
        animateCounter(el, num, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ============================================================
   11. SCHEDULE TABLE — Highlight on row hover
   ============================================================ */

document.querySelectorAll('.schedule-table tbody tr').forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.background = 'rgba(232,16,42,0.07)';
  });
  row.addEventListener('mouseleave', () => {
    row.style.background = '';
  });
});

/* ============================================================
   12. INIT — Run on load
   ============================================================ */

window.addEventListener('load', () => {
  updateActiveNav();
  handleBackToTop();
  // Force re-check visible elements
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});

console.log('%c⚡ Inspire Gym & Studios', 'color: #e8102a; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion. Forged for champions.', 'color: #ffffff; font-size: 12px;');
