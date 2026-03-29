// src/js/conversion.js
// TierAlto Conversion Components

(function() {
  'use strict';

  // ── Config ───────────────────────────────────────────────────────────
  const C = window.conversionConfig || {};

  // ── SVG Icons ────────────────────────────────────────────────────────
  const ICONS = {
    phone: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>`,
    email: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>`,
    calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
    close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
    arrowUp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`,
    award: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    shieldCheck: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    cpuChip: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>`,
    documentCheck: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></svg>`,
    users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
  };

  function getIcon(name) {
    const map = { award: ICONS.award, 'shield-check': ICONS.shieldCheck, 'cpu-chip': ICONS.cpuChip, 'document-check': ICONS.documentCheck, users: ICONS.users, phone: ICONS.phone, email: ICONS.email, calendar: ICONS.calendar };
    return map[name] || '';
  }

  // ── 1. Scroll Progress Bar ────────────────────────────────────────────
  function initScrollProgress() {
    const cfg = C.scrollProgress;
    if (!cfg || !cfg.enabled) return;
    const bar = document.createElement('div');
    bar.id = 'ta-scroll-progress';
    bar.style.cssText = `position:fixed;top:0;left:0;height:${cfg.height};width:0%;background:${cfg.color};z-index:${cfg.zIndex};transition:width 0.1s linear;pointer-events:none;`;
    document.body.prepend(bar);
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  // ── 2. Hello Bar ──────────────────────────────────────────────────────
  function initHelloBar() {
    const cfg = C.helloBar;
    if (!cfg || !cfg.enabled) return;
    if (localStorage.getItem(cfg.storageKey)) return;
    const bar = document.createElement('div');
    bar.id = 'ta-hello-bar';
    bar.style.cssText = `background:${cfg.backgroundColor};color:${cfg.textColor};text-align:center;padding:8px 48px 8px 16px;font-size:14px;position:relative;z-index:9999;`;
    bar.innerHTML = `${cfg.emoji ? cfg.emoji + ' ' : ''}${cfg.message}${cfg.link ? ` <a href="${cfg.link}" style="color:#fff;font-weight:600;text-decoration:underline;">${cfg.linkText}</a>` : ''}
    <button onclick="localStorage.setItem('${cfg.storageKey}','1');this.parentElement.remove();" aria-label="Close" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,0.7);font-size:18px;cursor:pointer;line-height:1;">&times;</button>`;
    document.body.prepend(bar);
  }

  // ── 3. Exit Intent Popup ──────────────────────────────────────────────
  function initExitIntent() {
    const cfg = C.exitIntent;
    if (!cfg || !cfg.enabled) return;
    if (sessionStorage.getItem(cfg.sessionKey)) return;
    if (cfg.desktopOnly && /Mobi|Android/i.test(navigator.userAgent)) return;

    const overlay = document.createElement('div');
    overlay.id = 'ta-exit-overlay';
    overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:99990;align-items:center;justify-content:center;padding:24px;';
    overlay.innerHTML = `
      <div id="ta-exit-modal" style="background:#fff;border-radius:16px;padding:40px 36px;max-width:480px;width:100%;position:relative;box-shadow:0 8px 40px rgba(0,0,0,0.18);animation:taFadeIn 0.25s ease;">
        <button id="ta-exit-close" aria-label="Close" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:22px;color:#6B7280;cursor:pointer;line-height:1;">&times;</button>
        <img src="/images/tieralto-icon.svg" alt="TierAlto" style="width:36px;margin-bottom:16px;display:block;">
        <h2 style="font-size:22px;font-weight:700;color:#1A1A2E;margin:0 0 10px;">${cfg.headline}</h2>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 24px;">${cfg.subheadline}</p>
        <a href="${cfg.ctaLink}" style="display:block;width:100%;background:#028090;color:#fff;border-radius:6px;padding:13px 20px;font-size:15px;font-weight:500;text-align:center;text-decoration:none;margin-bottom:14px;">${cfg.ctaText}</a>
        <p style="text-align:center;margin:0;"><button id="ta-exit-dismiss" style="background:none;border:none;color:#6B7280;font-size:13px;cursor:pointer;text-decoration:underline;">${cfg.dismissText}</button></p>
      </div>`;
    document.body.appendChild(overlay);

    function open() {
      if (sessionStorage.getItem(cfg.sessionKey)) return;
      sessionStorage.setItem(cfg.sessionKey, '1');
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }

    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.getElementById('ta-exit-close').addEventListener('click', close);
    document.getElementById('ta-exit-dismiss').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.addEventListener('mouseleave', e => { if (e.clientY < 10) open(); });
  }

  // ── 4. Sticky Bottom CTA Bar ──────────────────────────────────────────
  function initStickyBottomBar() {
    const cfg = C.stickyBottomBar;
    if (!cfg || !cfg.enabled) return;
    if (sessionStorage.getItem(cfg.sessionKey)) return;

    const path = window.location.pathname.replace(/\/?$/, '/');
    const page = cfg.pages[path] || cfg.pages.default;

    const bar = document.createElement('div');
    bar.id = 'ta-bottom-bar';
    bar.style.cssText = `position:fixed;bottom:0;left:0;right:0;z-index:9990;background:${cfg.backgroundColor};color:${cfg.textColor};padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;box-shadow:0 -4px 20px rgba(0,0,0,0.15);transform:translateY(100%);transition:transform 0.3s ease;`;
    bar.innerHTML = `
      <span style="font-size:15px;font-weight:500;flex:1;">${page.headline}</span>
      <div style="display:flex;gap:12px;align-items:center;flex-shrink:0;">
        <a href="${page.ctaLink}" style="background:${cfg.ctaButtonColor};color:${cfg.ctaButtonTextColor};padding:9px 20px;border-radius:6px;font-size:14px;font-weight:500;text-decoration:none;white-space:nowrap;">${page.ctaText}</a>
        <button id="ta-bottom-bar-close" aria-label="Dismiss" style="background:none;border:none;color:rgba(255,255,255,0.5);font-size:20px;cursor:pointer;line-height:1;padding:0 4px;">&times;</button>
      </div>`;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      bar.style.transform = window.scrollY > cfg.scrollThreshold ? 'translateY(0)' : 'translateY(100%)';
    }, { passive: true });

    document.getElementById('ta-bottom-bar-close').addEventListener('click', () => {
      sessionStorage.setItem(cfg.sessionKey, '1');
      bar.style.transform = 'translateY(100%)';
      setTimeout(() => bar.remove(), 300);
    });
  }

  // ── 5. Floating Action Button ─────────────────────────────────────────
  function initFloatingButton() {
    const cfg = C.floatingButton;
    if (!cfg || !cfg.enabled) return;

    let expanded = false;

    const wrap = document.createElement('div');
    wrap.id = 'ta-fab-wrap';
    wrap.style.cssText = 'position:fixed;bottom:88px;right:24px;z-index:9980;display:flex;flex-direction:column;align-items:flex-end;gap:10px;';

    // Contact menu (hidden initially)
    const menu = document.createElement('div');
    menu.id = 'ta-fab-menu';
    menu.style.cssText = 'display:none;flex-direction:column;align-items:flex-end;gap:10px;';
    cfg.contacts.forEach(contact => {
      const item = document.createElement('div');
      item.style.cssText = 'display:flex;align-items:center;gap:8px;animation:taFadeInUp 0.2s ease;';
      item.innerHTML = `
        <span style="background:#1E2761;color:#fff;padding:6px 12px;border-radius:20px;font-size:13px;font-weight:500;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.15);">${contact.label}</span>
        <a href="${contact.link}" style="width:44px;height:44px;border-radius:50%;background:${contact.color};color:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 2px 12px rgba(0,0,0,0.2);">${getIcon(contact.icon)}</a>`;
      menu.appendChild(item);
    });

    // Primary FAB button
    const btn = document.createElement('button');
    btn.id = 'ta-fab-btn';
    btn.setAttribute('aria-label', cfg.tooltip);
    btn.style.cssText = `width:56px;height:56px;border-radius:50%;background:${cfg.color};color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(2,128,144,0.4);transition:transform 0.15s;${cfg.pulse ? 'animation:taPulse 2.5s infinite;' : ''}`;
    btn.innerHTML = ICONS.phone;

    btn.addEventListener('click', () => {
      expanded = !expanded;
      menu.style.display = expanded ? 'flex' : 'none';
      btn.innerHTML = expanded
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : ICONS.phone;
    });

    wrap.appendChild(menu);
    wrap.appendChild(btn);
    document.body.appendChild(wrap);
  }

  // ── 6. Trust Badge Bar ────────────────────────────────────────────────
  function initTrustBadges() {
    const cfg = C.trustBadges;
    if (!cfg || !cfg.enabled) return;

    // Only inject on homepage (path === '/')
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') return;

    const bar = document.createElement('div');
    bar.id = 'ta-trust-bar';
    bar.style.cssText = `background:${cfg.backgroundColor};padding:16px 0;overflow:hidden;`;

    const inner = document.createElement('div');
    inner.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:32px;flex-wrap:wrap;padding:0 24px;';

    cfg.badges.forEach(badge => {
      const item = document.createElement('div');
      item.style.cssText = `display:flex;align-items:center;gap:8px;color:${cfg.textColor};font-size:14px;font-weight:500;white-space:nowrap;`;
      item.innerHTML = `<span style="color:${cfg.iconColor};display:flex;">${getIcon(badge.icon)}</span>${badge.text}`;
      inner.appendChild(item);
    });

    bar.appendChild(inner);

    // Inject after the hero section on homepage
    // Hero is the first <section> element on the page
    const hero = document.querySelector('section');
    if (hero && hero.nextSibling) {
      hero.parentNode.insertBefore(bar, hero.nextSibling);
    } else {
      document.querySelector('main') && document.querySelector('main').prepend(bar);
    }
  }

  // ── 7. Back to Top Button ─────────────────────────────────────────────
  function initBackToTop() {
    const cfg = C.backToTop;
    if (!cfg || !cfg.enabled) return;

    const btn = document.createElement('button');
    btn.id = 'ta-back-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9970;width:40px;height:40px;border-radius:50%;background:#fff;color:${cfg.color};border:1.5px solid ${cfg.color};cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(0,0,0,0.12);opacity:0;transform:translateY(10px);transition:opacity 0.25s,transform 0.25s;pointer-events:none;`;
    btn.innerHTML = ICONS.arrowUp;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      const show = window.scrollY > cfg.scrollThreshold;
      btn.style.opacity = show ? '1' : '0';
      btn.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
      btn.style.pointerEvents = show ? 'auto' : 'none';
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── 8. Cookie Consent Banner ──────────────────────────────────────────
  function initCookieBanner() {
    const cfg = C.cookieBanner;
    if (!cfg || !cfg.enabled) return;
    if (localStorage.getItem(cfg.storageKey)) return;

    const banner = document.createElement('div');
    banner.id = 'ta-cookie-banner';
    banner.style.cssText = `position:fixed;bottom:0;left:0;right:0;z-index:9995;background:${cfg.backgroundColor};color:${cfg.textColor};padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;box-shadow:0 -4px 20px rgba(0,0,0,0.15);transform:translateY(100%);transition:transform 0.35s ease;`;
    banner.innerHTML = `
      <p style="margin:0;font-size:14px;flex:1;">${cfg.message}</p>
      <div style="display:flex;gap:10px;flex-shrink:0;">
        <button id="ta-cookie-accept" style="background:${cfg.acceptButtonColor};color:#fff;border:none;border-radius:6px;padding:8px 18px;font-size:14px;font-weight:500;cursor:pointer;">${cfg.acceptText}</button>
        <button id="ta-cookie-decline" style="background:transparent;color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.3);border-radius:6px;padding:8px 18px;font-size:14px;cursor:pointer;">${cfg.declineText}</button>
      </div>`;
    document.body.appendChild(banner);

    // Slide up after brief delay
    requestAnimationFrame(() => setTimeout(() => { banner.style.transform = 'translateY(0)'; }, 600));

    function decide() {
      localStorage.setItem(cfg.storageKey, '1');
      banner.style.transform = 'translateY(100%)';
      setTimeout(() => banner.remove(), 350);
    }
    document.getElementById('ta-cookie-accept').addEventListener('click', decide);
    document.getElementById('ta-cookie-decline').addEventListener('click', decide);
  }

  // ── CSS Animations (inject once) ──────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    @keyframes taFadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }
    @keyframes taFadeInUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes taPulse { 0% { box-shadow:0 0 0 0 rgba(2,128,144,0.5); } 70% { box-shadow:0 0 0 14px rgba(2,128,144,0); } 100% { box-shadow:0 0 0 0 rgba(2,128,144,0); } }
    #ta-fab-btn:hover { transform: scale(1.08) !important; }
    #ta-back-top:hover { background: #028090 !important; color: #fff !important; }
    @media (max-width: 768px) {
      #ta-trust-bar > div { justify-content: flex-start; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; }
      #ta-trust-bar > div::-webkit-scrollbar { display: none; }
    }
  `;
  document.head.appendChild(style);

  // ── Init all ──────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initHelloBar();
    initExitIntent();
    initStickyBottomBar();
    initFloatingButton();
    initTrustBadges();
    initBackToTop();
    initCookieBanner();
  });

}());
