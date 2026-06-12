// === PP:FUNC:nav-init ===

function navInit() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('nav__menu--open', !expanded);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[data-anchor]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = link.getAttribute('data-anchor');
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        if (menu && menu.classList.contains('nav__menu--open')) {
          menu.classList.remove('nav__menu--open');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

// === /PP:FUNC:nav-init ===
// === PP:FUNC:reveal-init ===
(() => {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length === 0) {
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  revealEls.forEach((el) => observer.observe(el));
})();
// === /PP:FUNC:reveal-init ===


// === PP:FUNC:hero-init ===
(() => {
  const section = document.querySelector('[data-pp-section="hero"]');
  if (!section) {
    return;
  }
  const card = section.querySelector('.hero__card[data-reveal]');
  if (card) {
    card.style.setProperty('--reveal-delay', '0.15s');
  }
})();
// === /PP:FUNC:hero-init ===


// === PP:FUNC:features-grid-init ===
(() => {
  const section = document.querySelector('[data-pp-section="features-grid"]');
  if (!section) {
    return;
  }
  const cards = section.querySelectorAll('.features-grid__card[data-reveal]');
  cards.forEach((card, i) => {
    card.style.setProperty('--reveal-delay', `${(i * 0.08).toFixed(2)}s`);
  });
})();
// === /PP:FUNC:features-grid-init ===


// === PP:FUNC:about-init ===
(() => {
  const section = document.querySelector('[data-pp-section="about"]');
  if (!section) {
    return;
  }
  const content = section.querySelector('.about__content[data-reveal]');
  if (content) {
    content.style.setProperty('--reveal-delay', '0.1s');
  }
})();
// === /PP:FUNC:about-init ===


// === PP:FUNC:faq-init ===
(() => {
  const section = document.querySelector('[data-pp-section="faq"]');
  if (!section) {
    return;
  }
  const items = Array.from(section.querySelectorAll('[data-faq-item]'));
  if (items.length === 0) {
    return;
  }
  const setAnswerHeight = (item, open) => {
    const answer = item.querySelector('[data-faq-answer]');
    if (!answer) {
      return;
    }
    if (!open) {
      answer.style.maxHeight = '0px';
      return;
    }
    requestAnimationFrame(() => {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    });
  };
  items.forEach((item) => {
    setAnswerHeight(item, item.open);
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach((other) => {
          if (other !== item && other.open) {
            other.open = false;
            setAnswerHeight(other, false);
          }
        });
      }
      setAnswerHeight(item, item.open);
    });
  });
})();
// === /PP:FUNC:faq-init ===


// === PP:FUNC:contact-init ===

function contactInit() {
  const form = document.querySelector('.contact__form');
  if (!form) return;

  // Formspree handler — replace YOUR_FORM_ID with actual Formspree endpoint
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
  const isConfigured = FORMSPREE_ENDPOINT.indexOf('YOUR_FORM_ID') === -1;

  const caveat = form.querySelector('.contact__caveat');
  if (!isConfigured && caveat) {
    caveat.removeAttribute('hidden');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!isConfigured) {
      alert('Booking form is not yet connected. Please call or email us directly to book your appointment.');
      return;
    }
    const btn = form.querySelector('.contact__submit');
    const originalText = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

    const data = new FormData(form);
    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.innerHTML = '<p class="contact__success" role="status">🐾 Thanks! We\'ll be in touch within 24 hours to confirm your booking.</p>';
        } else {
          return res.json().then(function (json) { throw new Error(json.error || 'Server error'); });
        }
      })
      .catch(function (err) {
        if (btn) { btn.textContent = originalText; btn.disabled = false; }
        const errEl = form.querySelector('.contact__error');
        if (errEl) { errEl.textContent = 'Oops — ' + err.message + '. Please try again or call us directly.'; errEl.removeAttribute('hidden'); }
      });
  });
}

// === /PP:FUNC:contact-init ===


// === PP:FUNC:main ===
document.addEventListener('DOMContentLoaded', () => {
  // PP:MAIN_CALLS
});
// === /PP:FUNC:main ===

// PP:JS_INSERT_POINT