---
name: tieralto-cta-components
description: >
  TierAlto-specific conversion optimization components. Deploy this skill
  to add the approved CTA and engagement elements to the TierAlto website.

  Triggers when the user says things like: "add CTA components", "add the
  conversion layer", "deploy the CTA elements", "add sticky header",
  "add floating call button", "add trust badges", "add scroll progress bar",
  "add exit intent", "add sticky bottom bar", or "add back to top button".

  Builds 8 approved components only. Does NOT build components that were
  reviewed and rejected for TierAlto's B2B professional audience.
  All components are controlled from a single conversionConfig.ts file.
---

# TierAlto CTA Components — Conversion Layer

This skill builds 8 approved conversion components for tieralto.com.
Each component is a separate reusable file, imported into the root layout
so it appears on every page. All configuration lives in one file.

```
COMPONENTS TO BUILD (8 approved)
  1. Exit Intent Popup        → catches leaving visitors
  2. Sticky Header            → transparent → solid on scroll
  4. Sticky Bottom CTA Bar    → page-specific CTAs, slides up
  10. Floating Action Button  → tap-to-call + contact menu
  11. Trust Badge Bar         → credibility strip
  15. Back to Top Button      → long page UX
  16. Scroll Progress Bar     → teal reading progress
  17. Cookie Consent Banner   → compliance readiness

COMPONENTS INTENTIONALLY NOT BUILT
  3.  Hello Bar               → build shell only, enabled: false
  5.  Timed Popup             → skip — wrong for B2B audience
  6.  Scroll Popup            → skip — replaced by sticky bottom bar
  7.  Slide-In Popup          → skip — conflicts with chatbot widget
  8.  Social Proof Notif.     → skip — undermines credibility
  9.  Countdown Timer         → skip — no urgency offers at launch
  12. Testimonial Carousel    → skip — no testimonials at launch
  13. Multi-Step Form         → separate engagement — not this skill
  14. Live Chat Widget        → skip — chatbot already in spec
  18. Alert Banner            → build shell only, programmatic trigger
```

---

## Brand Reference

```
PRIMARY COLORS
  Navy:        #1E2761   (backgrounds, buttons)
  Teal:        #028090   (CTAs, accents, progress bar, floating button)
  Teal hover:  #026d79
  Navy hover:  #162255

TEXT
  White:       #FFFFFF   (on dark backgrounds)
  Heading:     #1A1A2E   (on light backgrounds)
  Body:        #374151
  Muted:       #6B7280

BACKGROUNDS
  Light teal:  #E6F5F7
  Light gray:  #F5F5F5

PHONE:         1-678-699-5935
EMAIL:         info@tieralto.com
CONTACT PAGE:  /contact
```

---

## Step 1 — Create conversionConfig.ts

Create this file at the project root or in `/lib/conversionConfig.ts`.
This is the single source of truth for all component settings.

```typescript
// lib/conversionConfig.ts
// TierAlto Conversion Components — Global Configuration
// Turn components on/off and customize copy from this single file.

const conversionConfig = {

  // ─── EXIT INTENT POPUP ────────────────────────────────────────────
  exitIntent: {
    enabled: true,
    headline: "Before you go — not sure where to start?",
    subheadline: "Book a free 30-minute call. No pitch. Just an honest conversation about what you're working on.",
    ctaText: "Book a Free Discovery Call",
    ctaLink: "/contact",
    dismissText: "No thanks, I'll figure it out myself",
    // Desktop only — do not trigger on mobile
    desktopOnly: true,
  },

  // ─── STICKY HEADER ────────────────────────────────────────────────
  stickyHeader: {
    enabled: true,
    // Transparent at top, transitions to solid on scroll
    transparentAtTop: false, // TierAlto nav is always navy — keep false
    scrollThreshold: 0,      // px before transition triggers
    ctaText: "Book a Call",
    ctaLink: "/contact",
  },

  // ─── STICKY BOTTOM CTA BAR ────────────────────────────────────────
  stickyBottomBar: {
    enabled: true,
    scrollThreshold: 300,     // px before bar slides up
    backgroundColor: "#1E2761",
    textColor: "#FFFFFF",
    ctaButtonColor: "#028090",
    ctaButtonTextColor: "#FFFFFF",
    // Page-specific copy — key matches pathname
    pages: {
      default: {
        headline: "Ready to move forward?",
        ctaText: "Book a Free Call",
        ctaLink: "/contact",
      },
      "/services": {
        headline: "Not sure which service fits?",
        ctaText: "Book a Free Call",
        ctaLink: "/contact",
      },
      "/field-notes": {
        headline: "Dealing with this? Let's talk.",
        ctaText: "Book 30 Min",
        ctaLink: "/contact",
      },
      "/deployments": {
        headline: "Working on a deployment right now?",
        ctaText: "Submit Your Deployment",
        ctaLink: "/deployments#ta-intake-form",
      },
      "/about": {
        headline: "Sounds like what you've been looking for?",
        ctaText: "Book a Discovery Call",
        ctaLink: "/contact",
      },
    },
  },

  // ─── FLOATING ACTION BUTTON ───────────────────────────────────────
  floatingButton: {
    enabled: true,
    color: "#028090",          // teal
    icon: "phone",             // primary icon
    tooltip: "Call us now",
    // Primary action
    primaryLink: "tel:16786995935",
    primaryLabel: "1-678-699-5935",
    // Expand to show menu with multiple contact options
    expandable: true,
    contacts: [
      {
        icon: "phone",
        label: "Call us",
        link: "tel:16786995935",
        color: "#028090",
      },
      {
        icon: "email",
        label: "Email us",
        link: "mailto:info@tieralto.com",
        color: "#1E2761",
      },
      {
        icon: "calendar",
        label: "Book a call",
        link: "/contact",
        color: "#028090",
      },
    ],
    // Position — bottom right, above back-to-top button
    bottom: "88px",
    right: "24px",
    // Pulse animation to draw attention
    pulse: true,
    // Hide on desktop when sticky bottom bar is visible
    hideWhenBottomBarVisible: false,
  },

  // ─── TRUST BADGE BAR ──────────────────────────────────────────────
  trustBadges: {
    enabled: true,
    backgroundColor: "#E6F5F7",  // light teal
    textColor: "#1E2761",        // navy
    iconColor: "#028090",        // teal
    // Where to place it on the homepage
    // "after-hero" = between hero and services overview
    // "before-footer-cta" = just above the final CTA section
    placement: "after-hero",
    // Marquee scroll on mobile (true) or wrap (false)
    marqueeOnMobile: true,
    badges: [
      {
        icon: "award",           // Heroicons name
        text: "Decades of Industry Experience",
      },
      {
        icon: "shield-check",
        text: "Vendor-Neutral — No Product Agenda",
      },
      {
        icon: "cpu-chip",
        text: "Multi-Vendor: Poly · Yealink · Grandstream",
      },
      {
        icon: "document-check",
        text: "Fixed-Fee Engagements — No Surprises",
      },
      {
        icon: "users",
        text: "Channel Partners & Distributors",
      },
    ],
  },

  // ─── BACK TO TOP BUTTON ───────────────────────────────────────────
  backToTop: {
    enabled: true,
    scrollThreshold: 400,      // px before button appears
    color: "#028090",          // teal
    backgroundColor: "#FFFFFF",
    // Position — bottom right, below floating button
    bottom: "24px",
    right: "24px",
  },

  // ─── SCROLL PROGRESS BAR ─────────────────────────────────────────
  scrollProgress: {
    enabled: true,
    color: "#028090",          // teal brand color
    height: "3px",
    // Show on all pages or only on long-form pages
    // "all" | "posts-only" (field-notes/[slug] only)
    showOn: "all",
    // Sits above the sticky header (z-index: header + 1)
    zIndex: 10000,
  },

  // ─── COOKIE CONSENT BANNER ────────────────────────────────────────
  cookieBanner: {
    enabled: true,
    message: "TierAlto uses cookies to improve your experience on our site.",
    acceptText: "Accept",
    declineText: "Decline",
    backgroundColor: "#1E2761",  // navy
    textColor: "#FFFFFF",
    acceptButtonColor: "#028090", // teal
    declineButtonColor: "transparent",
    // Remembers choice in localStorage
    storageKey: "ta-cookie-consent",
  },

  // ─── HELLO BAR (shell only — disabled at launch) ──────────────────
  helloBar: {
    enabled: false,            // turn on when you have news to share
    message: "New field notes published — read the latest from our team.",
    link: "/field-notes",
    linkText: "Read now →",
    backgroundColor: "#028090",
    textColor: "#FFFFFF",
    // Remembers dismissed state in localStorage
    storageKey: "ta-hello-bar-dismissed",
    // Emoji support
    emoji: "📡",
  },

}

export default conversionConfig
```

---

## Step 2 — File Structure

Create these files in your project:

```
components/
  conversion/
    ExitIntentPopup.tsx
    StickyBottomBar.tsx
    FloatingActionButton.tsx
    TrustBadgeBar.tsx
    BackToTopButton.tsx
    ScrollProgressBar.tsx
    CookieConsentBanner.tsx
    HelloBar.tsx          (shell only, disabled)

lib/
  conversionConfig.ts     (created in Step 1)
```

Import all components into your root layout:

```typescript
// app/layout.tsx  or  pages/_app.tsx

import ExitIntentPopup     from '@/components/conversion/ExitIntentPopup'
import StickyBottomBar     from '@/components/conversion/StickyBottomBar'
import FloatingActionButton from '@/components/conversion/FloatingActionButton'
import BackToTopButton     from '@/components/conversion/BackToTopButton'
import ScrollProgressBar   from '@/components/conversion/ScrollProgressBar'
import CookieConsentBanner from '@/components/conversion/CookieConsentBanner'
import HelloBar            from '@/components/conversion/HelloBar'
import conversionConfig    from '@/lib/conversionConfig'

// TrustBadgeBar is placed inline on the homepage between Hero and Services
// — not in the global layout

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {conversionConfig.helloBar.enabled && <HelloBar config={conversionConfig.helloBar}/>}
        {/* Your existing nav/header here */}
        {conversionConfig.scrollProgress.enabled && <ScrollProgressBar config={conversionConfig.scrollProgress}/>}
        <main>{children}</main>
        {/* Your existing footer here */}
        {conversionConfig.exitIntent.enabled && <ExitIntentPopup config={conversionConfig.exitIntent}/>}
        {conversionConfig.stickyBottomBar.enabled && <StickyBottomBar config={conversionConfig.stickyBottomBar}/>}
        {conversionConfig.floatingButton.enabled && <FloatingActionButton config={conversionConfig.floatingButton}/>}
        {conversionConfig.backToTop.enabled && <BackToTopButton config={conversionConfig.backToTop}/>}
        {conversionConfig.cookieBanner.enabled && <CookieConsentBanner config={conversionConfig.cookieBanner}/>}
      </body>
    </html>
  )
}
```

---

## Component 1 — Exit Intent Popup

```typescript
// components/conversion/ExitIntentPopup.tsx
'use client'
import { useEffect, useState } from 'react'

const SESSION_KEY = 'ta-exit-shown'

export default function ExitIntentPopup({ config }: { config: any }) {
  const [visible, setVisible] = useState(false)
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!config.enabled) return
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SESSION_KEY)) return

    const isMobile = /Mobi|Android/i.test(navigator.userAgent)
    if (config.desktopOnly && isMobile) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) open()
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [config.enabled])

  function open() {
    if (sessionStorage.getItem(SESSION_KEY)) return
    sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(true)
    document.body.style.overflow = 'hidden'
  }

  function close() {
    setVisible(false)
    document.body.style.overflow = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setSending(true)
    try {
      const fd = new FormData()
      fd.append('name', name.trim())
      fd.append('email', email.trim())
      fd.append('formType', 'exit-intent')
      fd.append('message', 'Exit intent popup submission')
      await fetch('/api/contact-lead', { method: 'POST', body: fd })
      window.location.href = '/thank-you'
    } catch {
      setSending(false)
    }
  }

  if (!visible) return null

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99990,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'taFadeIn 0.25s ease',
      }}
    >
      <style>{`@keyframes taFadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }`}</style>
      <div style={{
        background: '#fff', borderRadius: '16px',
        padding: '40px 36px', maxWidth: '480px', width: '100%',
        position: 'relative', boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
      }}>
        {/* Close button */}
        <button onClick={close} aria-label="Close" style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'none', border: 'none', fontSize: '22px',
          color: '#6B7280', cursor: 'pointer', lineHeight: 1,
        }}>×</button>

        {/* TierAlto icon */}
        <img src="/images/tieralto-icon.svg" alt="TierAlto"
          style={{ width: '36px', marginBottom: '16px' }}/>

        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1A1A2E', marginBottom: '10px' }}>
          {config.headline}
        </h2>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.6, marginBottom: '24px' }}>
          {config.subheadline}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text" placeholder="Your name" value={name}
            onChange={e => setName(e.target.value)} required
            style={{
              width: '100%', padding: '10px 14px', borderRadius: '6px',
              border: '0.5px solid #CCCCCC', fontSize: '15px',
              background: '#F5F5F5', marginBottom: '10px', boxSizing: 'border-box',
            }}
          />
          <input
            type="email" placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)} required
            style={{
              width: '100%', padding: '10px 14px', borderRadius: '6px',
              border: '0.5px solid #CCCCCC', fontSize: '15px',
              background: '#F5F5F5', marginBottom: '16px', boxSizing: 'border-box',
            }}
          />
          <a href={config.ctaLink} style={{
            display: 'block', width: '100%', background: '#028090',
            color: '#fff', borderRadius: '6px', padding: '13px 20px',
            fontSize: '15px', fontWeight: 500, textAlign: 'center',
            textDecoration: 'none', marginBottom: '14px',
          }}>
            {config.ctaText}
          </a>
        </form>

        <p style={{ textAlign: 'center', margin: 0 }}>
          <button onClick={close} style={{
            background: 'none', border: 'none', color: '#6B7280',
            fontSize: '13px', cursor: 'pointer', textDecoration: 'underline',
          }}>
            {config.dismissText}
          </button>
        </p>
      </div>
    </div>
  )
}
```

---

## Component 2 — Sticky Bottom CTA Bar

```typescript
// components/conversion/StickyBottomBar.tsx
'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const SESSION_KEY = 'ta-bottom-bar-dismissed'

export default function StickyBottomBar({ config }: { config: any }) {
  const [visible, setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const pathname = usePathname()

  // Get page-specific copy or fall back to default
  const pageCopy = config.pages[pathname] || config.pages.default

  useEffect(() => {
    if (!config.enabled) return
    if (sessionStorage.getItem(SESSION_KEY)) { setDismissed(true); return }

    const handleScroll = () => {
      setVisible(window.scrollY > config.scrollThreshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setDismissed(true)
    setVisible(false)
  }

  if (dismissed || !visible) return null

  return (
    <>
      <style>{`
        @keyframes taSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 9990,
        background: config.backgroundColor,
        color: config.textColor,
        padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '16px', flexWrap: 'wrap',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
        animation: 'taSlideUp 0.3s ease',
      }}>
        <span style={{ fontSize: '15px', fontWeight: 500, flex: 1 }}>
          {pageCopy.headline}
        </span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
          <a href={pageCopy.ctaLink} style={{
            background: config.ctaButtonColor,
            color: config.ctaButtonTextColor,
            padding: '9px 20px', borderRadius: '6px',
            fontSize: '14px', fontWeight: 500,
            textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'background 0.15s',
          }}>
            {pageCopy.ctaText}
          </a>
          <button onClick={dismiss} aria-label="Dismiss" style={{
            background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
            fontSize: '20px', cursor: 'pointer', lineHeight: 1, padding: '0 4px',
          }}>×</button>
        </div>
      </div>
    </>
  )
}
```

---

## Component 3 — Floating Action Button

```typescript
// components/conversion/FloatingActionButton.tsx
'use client'
import { useState } from 'react'

const ICONS: Record<string, string> = {
  phone: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>`,
  email: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>`,
  calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
}

export default function FloatingActionButton({ config }: { config: any }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <style>{`
        @keyframes taPulse {
          0%   { box-shadow: 0 0 0 0 rgba(2,128,144,0.5); }
          70%  { box-shadow: 0 0 0 14px rgba(2,128,144,0); }
          100% { box-shadow: 0 0 0 0 rgba(2,128,144,0); }
        }
        .ta-fab-btn {
          animation: ${config.pulse ? 'taPulse 2.5s infinite' : 'none'};
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .ta-fab-btn:hover { transform: scale(1.08); }
        .ta-fab-contact-item {
          transition: transform 0.2s, opacity 0.2s;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        bottom: config.bottom,
        right: config.right,
        zIndex: 9980,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
      }}>

        {/* Expanded contact menu */}
        {config.expandable && expanded && config.contacts.map((contact: any, i: number) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            animation: 'taFadeIn 0.2s ease',
          }}>
            <span style={{
              background: '#1E2761', color: '#fff',
              padding: '6px 12px', borderRadius: '20px',
              fontSize: '13px', fontWeight: 500,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}>
              {contact.label}
            </span>
            <a href={contact.link} style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: contact.color, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
            }} dangerouslySetInnerHTML={{ __html: ICONS[contact.icon] || ICONS.phone }}/>
          </div>
        ))}

        {/* Primary FAB */}
        <div style={{ position: 'relative' }}>
          {/* Tooltip */}
          {!expanded && (
            <span style={{
              position: 'absolute', right: '60px', top: '50%',
              transform: 'translateY(-50%)',
              background: '#1E2761', color: '#fff',
              padding: '5px 10px', borderRadius: '6px',
              fontSize: '12px', whiteSpace: 'nowrap',
              opacity: 0, transition: 'opacity 0.15s',
              pointerEvents: 'none',
            }} className="ta-fab-tooltip">
              {config.tooltip}
            </span>
          )}
          <button
            className="ta-fab-btn"
            onClick={() => config.expandable ? setExpanded(!expanded) : window.location.href = config.primaryLink}
            aria-label={config.tooltip}
            style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: config.color, color: '#fff',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(2,128,144,0.4)',
            }}
            dangerouslySetInnerHTML={{ __html: expanded
              ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
              : ICONS[config.icon]
            }}
          />
        </div>
      </div>
      <style>{`@keyframes taFadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </>
  )
}
```

---

## Component 4 — Trust Badge Bar

```typescript
// components/conversion/TrustBadgeBar.tsx
// Place this inline on the homepage between Hero and Services sections
// Import: import TrustBadgeBar from '@/components/conversion/TrustBadgeBar'

import conversionConfig from '@/lib/conversionConfig'

const BADGE_ICONS: Record<string, string> = {
  'award': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  'shield-check': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  'cpu-chip': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>`,
  'document-check': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></svg>`,
  'users': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
}

export default function TrustBadgeBar() {
  const config = conversionConfig.trustBadges
  if (!config.enabled) return null

  return (
    <>
      <style>{`
        .ta-badge-track {
          display: flex;
          align-items: center;
          gap: 40px;
          padding: 0 24px;
        }
        .ta-badge-item {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .ta-badge-marquee {
            overflow: hidden;
          }
          .ta-badge-track {
            animation: taMarquee 20s linear infinite;
            width: max-content;
          }
          @keyframes taMarquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        }
      `}</style>
      <section style={{
        background: config.backgroundColor,
        padding: '16px 0',
        borderTop: '0.5px solid rgba(2,128,144,0.15)',
        borderBottom: '0.5px solid rgba(2,128,144,0.15)',
        overflow: 'hidden',
      }}>
        <div className="ta-badge-marquee">
          <div className="ta-badge-track">
            {/* Duplicate badges for seamless marquee on mobile */}
            {[...config.badges, ...config.badges].map((badge: any, i: number) => (
              <div key={i} className="ta-badge-item">
                <span style={{ color: config.iconColor }}
                  dangerouslySetInnerHTML={{ __html: BADGE_ICONS[badge.icon] || BADGE_ICONS['award'] }}/>
                <span style={{
                  color: config.textColor,
                  fontSize: '14px',
                  fontWeight: 500,
                }}>
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

**Usage on homepage (in `app/page.tsx` or `pages/index.tsx`):**
```tsx
import TrustBadgeBar from '@/components/conversion/TrustBadgeBar'

// Between <HeroSection/> and <ServicesOverview/>:
<HeroSection/>
<TrustBadgeBar/>
<ServicesOverview/>
```

---

## Component 5 — Back to Top Button

```typescript
// components/conversion/BackToTopButton.tsx
'use client'
import { useEffect, useState } from 'react'

export default function BackToTopButton({ config }: { config: any }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!config.enabled) return
    const onScroll = () => setVisible(window.scrollY > config.scrollThreshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes taFadeIn { from { opacity:0; } to { opacity:1; } }
        .ta-back-top:hover { background: #026d79 !important; transform: translateY(-2px); }
      `}</style>
      <button
        className="ta-back-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: config.bottom,
          right: config.right,
          zIndex: 9970,
          width: '40px', height: '40px',
          borderRadius: '50%',
          background: config.color,
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          animation: 'taFadeIn 0.2s ease',
          transition: 'background 0.15s, transform 0.15s',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </>
  )
}
```

---

## Component 6 — Scroll Progress Bar

```typescript
// components/conversion/ScrollProgressBar.tsx
'use client'
import { useEffect, useState } from 'react'

export default function ScrollProgressBar({ config }: { config: any }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!config.enabled) return
    const onScroll = () => {
      const doc    = document.documentElement
      const scrolled = doc.scrollTop || document.body.scrollTop
      const total  = doc.scrollHeight - doc.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!config.enabled) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', zIndex: config.zIndex,
      height: config.height,
      background: 'rgba(0,0,0,0.08)',
      pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: config.color,
        transition: 'width 0.1s linear',
      }}/>
    </div>
  )
}
```

---

## Component 7 — Cookie Consent Banner

```typescript
// components/conversion/CookieConsentBanner.tsx
'use client'
import { useEffect, useState } from 'react'

export default function CookieConsentBanner({ config }: { config: any }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!config.enabled) return
    const choice = localStorage.getItem(config.storageKey)
    if (!choice) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(config.storageKey, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(config.storageKey, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes taSlideUp {
          from { transform: translateY(100%); opacity:0; }
          to   { transform: translateY(0);    opacity:1; }
        }
      `}</style>
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 99980,
        background: config.backgroundColor,
        color: config.textColor,
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '16px', flexWrap: 'wrap',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
        animation: 'taSlideUp 0.3s ease',
      }}>
        <p style={{ margin: 0, fontSize: '14px', flex: 1, lineHeight: 1.5 }}>
          {config.message}
        </p>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button onClick={decline} style={{
            background: config.declineButtonColor,
            color: config.textColor,
            border: '0.5px solid rgba(255,255,255,0.3)',
            borderRadius: '6px', padding: '8px 16px',
            fontSize: '13px', cursor: 'pointer',
          }}>
            {config.declineText}
          </button>
          <button onClick={accept} style={{
            background: config.acceptButtonColor,
            color: '#fff',
            border: 'none', borderRadius: '6px',
            padding: '8px 16px', fontSize: '13px',
            fontWeight: 500, cursor: 'pointer',
          }}>
            {config.acceptText}
          </button>
        </div>
      </div>
    </>
  )
}
```

---

## Component 8 — Hello Bar (Shell — Disabled at Launch)

```typescript
// components/conversion/HelloBar.tsx
'use client'
import { useEffect, useState } from 'react'

export default function HelloBar({ config }: { config: any }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!config.enabled) return
    const dismissed = localStorage.getItem(config.storageKey)
    if (!dismissed) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem(config.storageKey, '1')
    setVisible(false)
  }

  // Not enabled at launch — returns null until config.enabled = true
  if (!config.enabled || !visible) return null

  return (
    <div style={{
      background: config.backgroundColor,
      color: config.textColor,
      padding: '8px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: '8px', fontSize: '14px',
      position: 'relative',
    }}>
      {config.emoji && <span>{config.emoji}</span>}
      <span>
        {config.message}
        {config.link && (
          <a href={config.link} style={{
            color: config.textColor, fontWeight: 600,
            marginLeft: '6px', textDecoration: 'underline',
          }}>
            {config.linkText}
          </a>
        )}
      </span>
      <button onClick={dismiss} aria-label="Dismiss" style={{
        position: 'absolute', right: '16px',
        background: 'none', border: 'none', color: config.textColor,
        fontSize: '18px', cursor: 'pointer', opacity: 0.7, lineHeight: 1,
      }}>×</button>
    </div>
  )
}
```

---

## Z-Index Coordination

All components use coordinated z-index values to prevent overlap conflicts:

```
z-index: 10000   Scroll Progress Bar (always on top)
z-index: 99990   Exit Intent Popup overlay
z-index: 99980   Cookie Consent Banner
z-index: 9990    Sticky Bottom CTA Bar
z-index: 9980    Floating Action Button
z-index: 9970    Back to Top Button
z-index: 9960    Chatbot widget (from website spec)
z-index: 9950    Hello Bar
z-index: 9940    Sticky Header
```

---

## Pre-Delivery Checklist

**Exit Intent Popup**
- [ ] Fires on desktop cursor-leave (clientY < 10)
- [ ] Does NOT fire on mobile
- [ ] Shows only once per session (sessionStorage)
- [ ] Submits to /api/contact-lead with formType "exit-intent"
- [ ] Redirects to /thank-you on submit
- [ ] TierAlto icon visible in popup header
- [ ] Dismiss link closes without submitting

**Sticky Bottom CTA Bar**
- [ ] Slides up after 300px scroll
- [ ] Page-specific copy matches CTA map
- [ ] Dismiss button closes for session
- [ ] Does not overlap chatbot widget on mobile
- [ ] Works on all 6 pages with correct per-page copy

**Floating Action Button**
- [ ] Phone icon visible with teal background
- [ ] Pulse animation active
- [ ] Tap expands contact menu (phone + email + book a call)
- [ ] All three contact links work correctly
- [ ] Does not overlap Back to Top button

**Trust Badge Bar**
- [ ] All 5 badges visible on desktop
- [ ] Marquee animation works on mobile
- [ ] Placed between Hero and Services Overview on homepage only
- [ ] Icons render correctly (inline SVG)

**Back to Top Button**
- [ ] Appears after 400px scroll
- [ ] Smooth scroll to top on click
- [ ] Does not overlap Floating Action Button
- [ ] Fade in / fade out on scroll threshold

**Scroll Progress Bar**
- [ ] Fills left to right as user scrolls
- [ ] Color matches brand teal #028090
- [ ] 3px height, sits above sticky header
- [ ] Visible on all pages

**Cookie Consent Banner**
- [ ] Appears on first visit
- [ ] Accept/Decline both store choice in localStorage
- [ ] Does not appear again after choice made
- [ ] Slides up from bottom, does not overlap other elements
- [ ] Does not block mobile CTAs

**Hello Bar**
- [ ] config.enabled = false — does not render at launch
- [ ] Shell is ready to activate by setting enabled: true

**Global**
- [ ] No console errors on any component
- [ ] No z-index conflicts between components
- [ ] All components tested on mobile (375px) and desktop (1280px)
- [ ] All animations use CSS transitions only — no heavy libraries
- [ ] conversionConfig.ts is the single source of truth for all copy

---

## Quick Activation Reference

To turn a component on or off after launch, edit only `lib/conversionConfig.ts`:

```typescript
// Turn Hello Bar on when you have news:
helloBar: { enabled: true, message: "New field notes just published →" }

// Adjust sticky bottom bar threshold:
stickyBottomBar: { scrollThreshold: 500 }  // appears later

// Turn off floating button on desktop only:
// (add CSS media query in component)

// Update trust badges when branding evolves:
trustBadges: { badges: [...newBadges] }
```

---

*TierAlto CTA Components SKILL.md — tieralto.com — March 2026*
