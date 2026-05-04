# ============================================================
# TierAlto Fix Script
# Run this from PowerShell in D:\projects\TierAlto
# It will:
#   1. Overwrite _chatbot.css with the fixed version
#   2. Overwrite main.js with the fixed version
#   3. Add the exit popup HTML to all 10 pages
#   4. Deploy to Netlify
# ============================================================

# --- STEP 0: Make sure we're in the right folder -----------
Set-Location "D:\projects\TierAlto"
Write-Host "Working in: $(Get-Location)" -ForegroundColor Cyan

# --- STEP 1: Write the fixed _chatbot.css ------------------
Write-Host "`nStep 1: Writing fixed _chatbot.css..." -ForegroundColor Yellow

$chatbotCSS = @'
/* Chatbot Widget */

/* Trigger bubble */
.chatbot__trigger {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-teal);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(2,128,144,0.35);
  transition: transform 0.2s, box-shadow 0.2s;
}
.chatbot__trigger:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(2,128,144,0.45);
}

/* Panel: HIDDEN by default. JS adds .is-open to show it. */
.chatbot__panel {
  position: fixed;
  bottom: 92px;
  right: 24px;
  z-index: 9999;
  width: 320px;
  height: 480px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transform: translateY(12px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.chatbot__panel.is-open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

/* Header */
.chatbot__header {
  background: var(--color-navy);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.chatbot__logo {
  width: 120px;
  height: auto;
  display: block;
  flex-shrink: 0;
}
.chatbot__subtitle {
  flex: 1;
  color: var(--color-text-teal-on-dark);
  font-size: 11px;
  line-height: 1.2;
}
.chatbot__close {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
  padding: 0 0 0 8px;
}

/* Messages */
.chatbot__messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.chatbot__message {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
}
.chatbot__message--bot {
  background: var(--color-light-teal);
  color: var(--color-text-body);
  align-self: flex-start;
}
.chatbot__message--user {
  background: var(--color-teal);
  color: #fff;
  align-self: flex-end;
}

/* Input row */
.chatbot__input-row {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 0.5px solid var(--color-border-card);
}
.chatbot__input {
  flex: 1;
  padding: 8px 12px;
  border: 0.5px solid var(--color-border-default);
  border-radius: 6px;
  font-size: 14px;
  color: var(--color-text-body);
  background: var(--color-light-gray);
}
.chatbot__input:focus {
  border-color: var(--color-teal);
  outline: none;
}
.chatbot__send {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
}

/* Mobile */
@media (max-width: 480px) {
  .chatbot__panel {
    width: calc(100vw - 16px);
    right: 8px;
    bottom: 84px;
  }
}

/* Exit Intent Popup */
#ta-exit-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 99990;
  background: rgba(0,0,0,0.55);
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}
#ta-exit-overlay.is-open {
  display: flex;
}
#ta-exit-modal {
  background: #fff;
  border-radius: 16px;
  padding: 40px 36px;
  max-width: 460px;
  width: 100%;
  position: relative;
  text-align: center;
  box-shadow: 0 8px 40px rgba(0,0,0,0.2);
  animation: taExitSlideUp 0.25s ease;
  box-sizing: border-box;
}
@keyframes taExitSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
#ta-exit-modal img { margin-bottom: 16px; }
#ta-exit-headline {
  font-size: 20px;
  font-weight: 700;
  color: #1A1A2E;
  margin: 0 0 10px;
}
#ta-exit-modal > p {
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  margin: 0 0 20px;
}
#ta-exit-close {
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  line-height: 1;
}
#ta-exit-close:hover { color: #1A1A2E; }
#ta-exit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 14px;
}
#ta-ep-email {
  width: 100%;
  padding: 11px 14px;
  border-radius: 6px;
  border: 0.5px solid #CCCCCC;
  font-size: 15px;
  background: #F5F5F5;
  box-sizing: border-box;
}
#ta-ep-email:focus { outline: none; border-color: #028090; }
#ta-ep-submit {
  background: #028090;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
#ta-ep-submit:hover { background: #026d79; }
#ta-ep-submit:disabled { background: #9CA3AF; cursor: not-allowed; }
#ta-exit-dismiss {
  background: none;
  border: none;
  color: #6B7280;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
}
#ta-exit-dismiss:hover { color: #374151; }
'@

Set-Content -Path "src\css\components\_chatbot.css" -Value $chatbotCSS -Encoding UTF8
Write-Host "  OK: src\css\components\_chatbot.css written" -ForegroundColor Green

# --- STEP 2: Write the fixed main.js -----------------------
Write-Host "`nStep 2: Writing fixed main.js..." -ForegroundColor Yellow

$mainJS = @'
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

/* ── Chatbot ──────────────────────────────────────────────── */
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
    return 'Advisory starts at $250/hour. Retainers from $1,800/month. Every engagement starts with a free discovery call — <a href="/contact/" style="color:#028090">book one here</a>.';
  if (q.includes('service') || q.includes('what do you do') || q.includes('offer'))
    return 'We offer five service lines: Pre-Shipment Device Configuration, Provisioning Workflow Design, UC Platform Advisory, Ongoing Automation Partnership, and Custom Application Builds. <a href="/services/" style="color:#028090">See all services →</a>';
  if (q.includes('provisioning') || q.includes('staging') || q.includes('phone') || q.includes('device'))
    return 'Provisioning is our core specialty. Check out our <a href="/field-notes/" style="color:#028090">Field Notes</a> or <a href="/deployments/" style="color:#028090">tell us about your deployment</a>.';
  if (q.includes('book') || q.includes('call') || q.includes('schedule') || q.includes('talk'))
    return 'Book a free 30-minute discovery call at <a href="/contact/" style="color:#028090">tieralto.com/contact</a> or call <a href="tel:16786995935" style="color:#028090">1-678-699-5935</a>.';
  if (q.includes('number') || q.includes('contact') || q.includes('email') || q.includes('reach'))
    return 'Reach us at <a href="tel:16786995935" style="color:#028090">1-678-699-5935</a> or <a href="mailto:hello@tieralto.com" style="color:#028090">hello@tieralto.com</a>.';
  return 'Great question for a real conversation. Let\'s connect:<br><a href="tel:16786995935" style="color:#028090">1-678-699-5935</a> · <a href="/contact/" style="color:#028090">tieralto.com/contact</a>';
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

/* ── Exit Intent Popup ────────────────────────────────────── */
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
      form.innerHTML = '<p style="color:#028090;font-weight:600;font-size:15px;padding:10px 0;">&#10003; You\'re subscribed — field notes coming your way.</p>';
    }
    setTimeout(closePopup, 2500);
  });
}());
'@

Set-Content -Path "src\js\main.js" -Value $mainJS -Encoding UTF8
Write-Host "  OK: src\js\main.js written" -ForegroundColor Green

# --- STEP 3: Add exit popup HTML to all 10 pages -----------
Write-Host "`nStep 3: Adding exit popup HTML to pages..." -ForegroundColor Yellow

$popupHTML = @'

    <!-- Exit Intent Popup -->
    <div id="ta-exit-overlay" role="dialog" aria-modal="true" aria-labelledby="ta-exit-headline">
      <div id="ta-exit-modal">
        <button id="ta-exit-close" aria-label="Close popup">&times;</button>
        <img src="/images/tieralto-icon.svg" alt="TierAlto" width="36" height="36"/>
        <h2 id="ta-exit-headline">Before you go — stay sharp.</h2>
        <p>Get Field Notes delivered when published. Real problems, real fixes — no marketing, no product pitches.</p>
        <form id="ta-exit-form">
          <input type="email" id="ta-ep-email" placeholder="Your email address" autocomplete="email" required/>
          <button type="submit" id="ta-ep-submit">Get Field Notes</button>
        </form>
        <button id="ta-exit-dismiss">No thanks</button>
      </div>
    </div>
'@

$pages = @(
  "index.html",
  "about\index.html",
  "contact\index.html",
  "deployments\index.html",
  "field-notes\index.html",
  "field-notes\distributor-failure-rate\index.html",
  "field-notes\firmware-mismatch-customer-site\index.html",
  "field-notes\sip-registration-failure-causes\index.html",
  "services\index.html",
  "terms-of-service\index.html"
)

foreach ($page in $pages) {
  $content = Get-Content -Path $page -Raw -Encoding UTF8

  # Skip if popup already present
  if ($content -match 'ta-exit-overlay') {
    Write-Host "  SKIP (already has popup): $page" -ForegroundColor Gray
    continue
  }

  # Also remove hidden attribute from chatbot panel if present
  $content = $content -replace '<div class="chatbot__panel" id="chatbot-panel" hidden="">', '<div class="chatbot__panel" id="chatbot-panel">'
  $content = $content -replace '<div class="chatbot__panel" id="chatbot-panel" hidden>', '<div class="chatbot__panel" id="chatbot-panel">'

  # Insert popup before </body>
  $content = $content -replace '</body>', "$popupHTML`n  </body>"

  Set-Content -Path $page -Value $content -Encoding UTF8
  Write-Host "  OK: $page" -ForegroundColor Green
}

# --- STEP 4: Deploy to Netlify -----------------------------
Write-Host "`nStep 4: Deploying to Netlify..." -ForegroundColor Yellow
netlify deploy --prod
Write-Host "`nAll done!" -ForegroundColor Cyan
