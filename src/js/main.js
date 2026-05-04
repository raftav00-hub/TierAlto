document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyHeader();
  initFAQ();
  initFieldNotesFilter();
  initScrollReveal();
});

function initMobileNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks  = document.querySelector('.nav__links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('nav__links--open');
  });
}

function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initFAQ() {
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    const answer = btn.nextElementSibling;
    if (answer) answer.hidden = true;
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (btn.nextElementSibling) btn.nextElementSibling.hidden = expanded;
    });
  });
}

function initFieldNotesFilter() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const posts      = document.querySelectorAll('.post-card');
  if (!filterBtns.length) return;
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('filter-pill--active'));
      btn.classList.add('filter-pill--active');
      const topic = btn.dataset.topic;
      posts.forEach(card => {
        card.style.display =
          (topic === 'all' || card.dataset.topic === topic) ? '' : 'none';
      });
    });
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach(el => observer.observe(el));
}

document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = form.querySelector('.newsletter-form__success');
    if (success) {
      success.hidden = false;
      form.querySelector('input[type="email"]').value = '';
    }
  });
});

/* â”€â”€ Chatbot â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const chatbotTrigger  = document.getElementById('chatbot-trigger');
const chatbotPanel    = document.getElementById('chatbot-panel');
const chatbotClose    = document.getElementById('chatbot-close');
const chatbotInput    = document.getElementById('chatbot-input');
const chatbotSend     = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `chatbot__message chatbot__message--${type}`;
  msg.innerHTML = `<p>${text}</p>`;
  chatbotMessages?.appendChild(msg);
  if (chatbotMessages) chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(input) {
  const q = input.toLowerCase();
  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('pricing'))
    return 'Advisory starts at $250/hour. Retainers from $1,800/month. Every engagement starts with a free discovery call â€” <a href="/contact/" style="color:#028090">book one here</a>.';
  if (q.includes('service') || q.includes('what do you do') || q.includes('offer'))
    return 'We offer five service lines: Pre-Shipment Device Configuration, Provisioning Workflow Design, UC Platform Advisory, Ongoing Automation Partnership, and Custom Application Builds. <a href="/services/" style="color:#028090">See all services â†’</a>';
  if (q.includes('provisioning') || q.includes('staging') || q.includes('phone') || q.includes('device'))
    return 'Provisioning is our core specialty. Check out our <a href="/field-notes/" style="color:#028090">Field Notes</a> or <a href="/deployments/" style="color:#028090">tell us about your deployment</a>.';
  if (q.includes('book') || q.includes('call') || q.includes('schedule') || q.includes('talk'))
    return 'Book a free 30-minute discovery call at <a href="/contact/" style="color:#028090">tieralto.com/contact</a> or call <a href="tel:16786995935" style="color:#028090">1-678-699-5935</a>.';
  if (q.includes('number') || q.includes('contact') || q.includes('email') || q.includes('reach'))
    return 'Reach us at <a href="tel:16786995935" style="color:#028090">1-678-699-5935</a> or <a href="mailto:info@tieralto.com" style="color:#028090">info@tieralto.com</a>.';
  return 'Great question for a real conversation. Let\'s connect:<br><a href="tel:16786995935" style="color:#028090">1-678-699-5935</a> Â· <a href="/contact/" style="color:#028090">tieralto.com/contact</a>';
}

chatbotTrigger?.addEventListener('click', () => {
  if (!chatbotPanel) return;
  chatbotPanel.classList.contains('is-open')
    ? chatbotPanel.classList.remove('is-open')
    : (chatbotPanel.classList.add('is-open'), chatbotInput?.focus());
});

chatbotClose?.addEventListener('click', () => {
  chatbotPanel?.classList.remove('is-open');
});

function sendMessage() {
  const text = chatbotInput?.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  chatbotInput.value = '';
  setTimeout(() => addMessage(getBotResponse(text), 'bot'), 400);
}
chatbotSend?.addEventListener('click', sendMessage);
chatbotInput?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

/* â”€â”€ Exit Intent Popup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
(function () {
  'use strict';
  const SESSION_KEY = 'ta-exit-shown';
  if (sessionStorage.getItem(SESSION_KEY)) return;
  const overlay    = document.getElementById('ta-exit-overlay');
  const closeBtn   = document.getElementById('ta-exit-close');
  const dismissBtn = document.getElementById('ta-exit-dismiss');
  const form       = document.getElementById('ta-exit-form');
  const submitBtn  = document.getElementById('ta-ep-submit');
  if (!overlay) return;

  function openPopup() {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, '1');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closePopup() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (!isMobile) {
    document.addEventListener('mouseleave', e => { if (e.clientY < 10) openPopup(); });
  }
  overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });
  closeBtn?.addEventListener('click', closePopup);
  dismissBtn?.addEventListener('click', closePopup);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('ta-ep-email')?.value.trim();
    if (!email) return;
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Subscribing...'; }
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'Exit Intent Popup' }),
    }).catch(() => {});
    if (form) {
      form.innerHTML = '<p style="color:#028090;font-weight:600;font-size:15px;padding:10px 0;">&#10003; You\'re subscribed â€” field notes coming your way.</p>';
    }
    setTimeout(closePopup, 2500);
  });
}());
