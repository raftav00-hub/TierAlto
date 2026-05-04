# TierAlto — Full Website Design Specification
**Document Purpose:** Complete reference spec for building tieralto.com from scratch
**Version:** 1.0 — March 2026
**Pages Covered:** Home · Services · Field Notes · Deployments · About · Contact
**Intended for:** Claude Code — use this document as the authoritative build reference

---

## TABLE OF CONTENTS

1. [Brand Identity](#1-brand-identity)
2. [Site Architecture & Navigation](#2-site-architecture--navigation)
3. [Global Components](#3-global-components)
4. [Page 1 — Home](#4-page-1--home)
5. [Page 2 — Services](#5-page-2--services)
6. [Page 3 — Field Notes](#6-page-3--field-notes)
7. [Page 4 — Deployments](#7-page-4--deployments)
8. [Page 5 — About](#8-page-5--about)
9. [Page 6 — Contact](#9-page-6--contact)
10. [Asset Inventory](#10-asset-inventory)
11. [Component Design System](#11-component-design-system)
12. [Technical Guidance](#12-technical-guidance)
13. [SEO & Meta Tags](#13-seo--meta-tags)
14. [Do Not Include](#14-do-not-include)

---

## 1. BRAND IDENTITY

### Business
- **Company:** TierAlto LLC
- **Tagline:** "Where Expertise Meets Accountability."
- **Domain:** tieralto.com
- **Email:** hello@tieralto.com
- **Positioning:** Vendor-neutral technology consulting for channel partners, distributors,
  and mid-market companies in voice, VoIP, unified communications, and AI automation.

### Wordmark / Logo
- **Treatment:** Text-based wordmark — TIERALTO in bold uppercase
- **Font:** Inter 800 or Arial Black
- **On dark backgrounds:** White `#FFFFFF`
- **On light backgrounds:** Navy `#1E2761`
- **Tagline below wordmark:** "Where Expertise Meets Accountability." in teal italic, smaller size
- **No image logo file exists yet** — build as styled text until asset is provided

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary Navy | `#1E2761` | Headlines, nav, footer, hero bg, CTA sections, primary buttons |
| Primary Teal | `#028090` | Accents, CTA buttons, card top borders, links, active states |
| Teal Dark (hover) | `#026d79` | Teal button hover state |
| Navy Dark (hover) | `#162255` | Navy button hover state |
| Light Teal | `#E6F5F7` | Alternating section backgrounds, callouts, card accents |
| Light Gray | `#F5F5F5` | Alternating section backgrounds, form field backgrounds |
| White | `#FFFFFF` | Card backgrounds, clean content sections |
| Dark Heading | `#1A1A2E` | Primary headings on light backgrounds |
| Body Text | `#374151` | Paragraphs, descriptions, body copy |
| Muted Text | `#6B7280` | Captions, labels, secondary info, notes |
| White Text | `#FFFFFF` | All text on navy or teal backgrounds |
| Teal on Dark | `#7EC8D8` | Subheadlines on navy hero, italic accents on dark bg |
| Light Accent on Dark | `#A0C4FF` | Price labels, secondary info on navy cards |
| Status — Success | `#028090` | Staging dashboard complete indicators |
| Status — Warning | `#EF9F27` | Dashboard warning flags |
| Status — Error | `#D93025` | Staging failure indicators, problem card headers |
| Border Default | `#CCCCCC` | Dividers, table borders |
| Border Card | `#E2E8F0` | Subtle card outlines |

### CSS Custom Properties

```css
:root {
  --color-navy:              #1E2761;
  --color-teal:              #028090;
  --color-teal-dark:         #026d79;
  --color-navy-dark:         #162255;
  --color-white:             #FFFFFF;
  --color-light-teal:        #E6F5F7;
  --color-light-gray:        #F5F5F5;
  --color-text-heading:      #1A1A2E;
  --color-text-body:         #374151;
  --color-text-muted:        #6B7280;
  --color-text-white:        #FFFFFF;
  --color-text-teal-on-dark: #7EC8D8;
  --color-border-default:    #CCCCCC;
  --color-border-card:       #E2E8F0;
  --color-border-teal:       #028090;
  --color-success:           #028090;
  --color-warning:           #EF9F27;
  --color-error:             #D93025;
  --font-display:            'Inter', 'Arial Black', sans-serif;
  --font-body:               'Inter', system-ui, sans-serif;
  --font-mono:               'Courier New', monospace;
  --border-radius-sm:        6px;
  --border-radius-md:        8px;
  --border-radius-lg:        12px;
  --border-radius-xl:        16px;
  --shadow-card:             0 2px 12px rgba(0,0,0,0.08);
}
```

### Typography

| Element | Font | Size (desktop) | Size (mobile) | Weight |
|---------|------|---------------|--------------|--------|
| Display / H1 | Inter or Arial Black | 48–64px | 32–40px | 800 |
| Section H2 | Inter | 32–40px | 24–30px | 700 |
| Card title H3 | Inter | 20–24px | 18–22px | 600 |
| Body copy | Inter | 16–18px | 16px | 400 |
| Small / caption | Inter | 13–14px | 13px | 400 |
| Button | Inter | 14–15px | 14px | 500 |
| Nav links | Inter | 14px | 14px | 400 |
| Code / URLs | Monospace | 13px | 13px | 400 |
| Line height (body) | — | 1.7 | 1.6 | — |

### Visual Style Rules

- No gradients except optional subtle navy→teal on hero sections
- No drop shadows except `var(--shadow-card)` on cards
- Card top border accent: `4px solid #028090` (teal, top edge only)
- All border strokes: `0.5px` — refined, not heavy
- No stock photography of people
- No vendor logos without explicit permission
- Icons: custom SVG line icons or Heroicons / Lucide (MIT licensed)

---

## 2. SITE ARCHITECTURE & NAVIGATION

### Sitemap

```
tieralto.com/
├── /                     → Homepage
├── /services             → Services (5 service lines)
├── /field-notes          → Field Notes (blog — problems + fixes)
├── /field-notes/[slug]   → Individual Field Note post
├── /deployments          → Get a Field Assessment (intake form)
├── /about                → About
├── /contact              → Contact (discovery call booking)
├── /privacy-policy       → Privacy Policy (footer only)
└── /terms-of-service     → Terms of Service (footer only)
```

### Navigation Bar (desktop)

| Position | Element |
|----------|---------|
| Left | TIERALTO wordmark + tagline |
| Right | Services · Field Notes · Deployments · About · Contact |
| Far right | [Book a Call] — teal CTA button |

### Navigation Bar (mobile)
- Hamburger icon opens slide-down or overlay menu
- Full nav links stacked vertically
- [Book a Call] CTA included at bottom of mobile menu

---

## 3. GLOBAL COMPONENTS

### Header / Navigation Bar
- **Background:** Navy `#1E2761` — full width, sticky at top
- **Wordmark:** Left-aligned — TIERALTO bold white, tagline in small teal italic below
- **Nav links:** Right-aligned, white text, 14px Inter 400
- **Active state:** Teal underline or teal color on current page link
- **CTA button:** "Book a Call" — teal `#028090` bg, white text, border-radius 6px
- **Height:** ~64–72px desktop
- **Mobile:** Hamburger icon, slide-down menu

### Footer

**Background:** Navy `#1E2761`
**Layout:** 3-column grid (desktop) → stacked (mobile)
**Divider:** Thin horizontal rule above copyright line

#### Footer — Column 1: Brand
```
TIERALTO
Where Expertise Meets Accountability.

hello@tieralto.com
```

#### Footer — Column 2: Navigation
```
Services          /services
Field Notes       /field-notes
Deployments       /deployments
About             /about
Contact           /contact
```

#### Footer — Column 3: Connect
```
[Book a Discovery Call]  → /contact
Available via:
Phone · Zoom · Microsoft Teams
```

#### Footer — Bottom Bar
```
Privacy Policy  |  Terms of Service
© 2025 TierAlto LLC. All rights reserved.
```

---

## 4. PAGE 1 — HOME

**URL:** tieralto.com/
**Meta title:** TierAlto | Vendor-Neutral Technology Consulting
**Meta description:** TierAlto delivers expert voice, VoIP, and unified communications
consulting for channel partners and mid-market companies. 22 years of experience.
One point of accountability.

---

### Section 1 — Hero

| Property | Value |
|----------|-------|
| Background | Navy `#1E2761` with subtle CSS geometric/network line pattern |
| Text color | White `#FFFFFF` |
| Layout | Full-width, min-height 90vh, content left-aligned or centered |
| Subheadline color | `#7EC8D8` (teal on dark) |

**Content:**
```
HEADLINE:
The Expert Who Actually Owns the Outcome.

SUBHEADLINE:
Two decades inside the voice and communications industry —
now working directly for you.

BODY (2 paragraphs):
When your technology project stalls, gets passed around, or never
quite gets delivered — that's the problem TierAlto was built to solve.

We step in as your vendor-neutral technology expert: explaining,
architecting, coordinating, and delivering. No manufacturer agenda.
No hand-off. Just deep expertise and complete accountability.

PRIMARY CTA:  [Book a Discovery Call]  → /contact
SECONDARY CTA: [View Our Services]  → /services
```

**CTA Styles:**
- Primary: Teal `#028090` bg, white text, border-radius 6px, padding 12px 24px
- Secondary: Transparent bg, white border `0.5px`, white text

---

### Section 2 — Services Overview

| Property | Value |
|----------|-------|
| Background | White `#FFFFFF` |
| Layout | Center-aligned label/headline, then 5-card grid below |

**Content:**
```
LABEL: What We Do  (small caps, teal, 12px tracked)

HEADLINE: One Expert. Complete Ownership.

SUBHEAD: TierAlto handles the full range of communications technology
consulting — from advisory calls to a fully built provisioning application
delivered for your operation.
```

**5 Service Cards (grid: 3-col desktop → 2-col tablet → 1-col mobile):**

Each card: white bg, `4px solid #028090` top border, border-radius 12px, shadow-card, padding 24px

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | SVG: phone + checkmark | Pre-Shipment Device Configuration | Device personalization before it ever leaves the warehouse. |
| 2 | SVG: connected nodes | Provisioning Workflow Design | Built to own. Not locked into someone else's platform. |
| 3 | SVG: speech bubble + circuit | UC Platform Advisory | Vendor-neutral guidance from someone who's seen it all. |
| 4 | SVG: circular arrows | Ongoing Automation Partnership | First call for anything technical. We stay involved. |
| 5 | SVG: code brackets + window | Custom Provisioning Application Build | One application. Everything pre-loaded. Ready to stage on day one. |

Each card footer: "Learn more →" teal link → anchor on /services

---

### Section 3 — How It Works

| Property | Value |
|----------|-------|
| Background | Light Gray `#F5F5F5` |
| Layout | Label + headline centered, then 4-step row (desktop) → stacked (mobile) |

**Content:**
```
LABEL: How It Works  (small caps, teal)

HEADLINE: Simple to Start. Built to Last.
```

**4 Steps (numbered, horizontal on desktop):**

| Step | Number | Title | Body |
|------|--------|-------|------|
| 1 | 01 | Discovery Call | A free 30-minute call. You tell us what you're working on — a deployment, a workflow problem, a partner request you can't fulfill, or something you want to build. We listen and tell you honestly whether TierAlto is the right fit. |
| 2 | 02 | Scoping | We define the work together. What gets built or delivered, what the timeline looks like, and what it costs. Fixed fee or retainer — agreed upfront. No scope creep. No surprise invoices. |
| 3 | 03 | Build or Engage | We do the work. You stay informed throughout. There's no hand-off to a junior resource midway through — the same expert who scoped the work delivers it. When something unexpected comes up, we tell you. |
| 4 | 04 | Delivery + Ongoing | Work is delivered, documented, and yours. If it's a provisioning workflow or application, your team can operate it independently from day one. And if you want TierAlto to stay involved as things evolve, a retainer keeps us embedded. |

Step number style: Large `#1E2761` navy, very light opacity (background decoration)

---

### Section 4 — Why TierAlto

| Property | Value |
|----------|-------|
| Background | Light Teal `#E6F5F7` |
| Layout | Label + headline centered, 3-pillar row |

**Content:**
```
LABEL: Why TierAlto  (small caps, teal)

HEADLINE: We're Different. Here's Why.
```

**3 Pillars (horizontal on desktop, stacked on mobile):**

| # | Title | Body |
|---|-------|------|
| 1 | Vendor Neutral | TierAlto has no product to sell and no manufacturer relationship to protect. You get honest recommendations based entirely on what works best for your environment. |
| 2 | Deep, Specialized Expertise | Two decades of hands-on experience in voice, VoIP, SBCs, audio/video, and unified communications at enterprise scale. This isn't general IT consulting. It's the real thing. |
| 3 | Accountability | The buck stops here. TierAlto doesn't escalate, hand off, or point fingers. We own the outcome — from the first call to the final sign-off. |

Pillar number: Large ghost number (01, 02, 03) in very light navy behind the title

---

### Section 5 — Who We Serve

| Property | Value |
|----------|-------|
| Background | Full-width two-column split, no padding between columns |
| Layout | Left 50% + Right 50% (desktop) → stacked (mobile) |

**Content:**
```
HEADLINE (centered above split, white bg):
Built for Channel Partners and Growing Companies
```

**Left column (navy `#1E2761` bg, white text):**
```
Title: Channel Partners
Subtitle: VARs, MSPs & Resellers

Body: You sell communications technology. We help you close deals you
can't fully resource, deliver projects your team can't fully staff,
and keep customers happy when things get complicated. We're the
engineering depth you need — without the full-time hire.
```

**Right column (teal `#028090` bg, white text):**
```
Title: Distributors & Staging Operations
Subtitle: Device Staging at Scale

Body: You stage phones before they ship. Right now that process
depends on vendor platforms you don't control and managed services
that can't adapt when a partner asks for something different.
TierAlto gives you the workflow, the tool, and the independence
to say yes to more — and charge for it.
```

---

### Section 6 — Credibility / 22 Years

| Property | Value |
|----------|-------|
| Background | White `#FFFFFF` |
| Layout | Centered headline + body, then expertise tag cloud |

**Content:**
```
HEADLINE: 22 Years. Earned Inside the Industry.

BODY (2 paragraphs):
Our principal consultant spent two decades as a solutions engineer
and technical specialist working inside leading voice and communications
technology companies — supporting enterprise deployments of SIP, VoIP,
Session Border Controllers, audio/video systems, and unified
communications platforms at scale.

Across every role, the most valuable skill wasn't just technical depth.
It was knowing how to clarify a stalled project, coordinate across
vendors, and make sure things actually got done.
```

**Expertise Tags (inline pill badges — teal outline, teal text):**
```
SIP  ·  VoIP / Voice  ·  Session Border Controllers  ·  Audio / Video
Unified Communications  ·  UCaaS  ·  Network Design  ·  AI Automation
Pre-Shipment Device Staging  ·  Multi-Vendor Provisioning
Solutions Engineering  ·  Project Delivery  ·  Custom Application Builds
```

Tag style: `border: 1px solid #028090`, color `#028090`, border-radius 20px,
padding 4px 14px, font-size 13px, display inline-block, margin 4px

---

### Section 7 — Latest from the Field

| Property | Value |
|----------|-------|
| Background | Light Gray `#F5F5F5` |
| Layout | Headline centered, then 2–3 post teaser cards in a row |

**Content:**
```
HEADLINE: From the Field
SUBHEAD: Real problems. Real fixes. Written from 22 years of experience.
```

**Post teaser cards (show 2–3 most recent):**
Each card: white bg, shadow-card, teal top border 4px, title H3 navy,
one-line description muted, topic pill badge, "Read more →" teal link

```
LINK below cards: "View all Field Notes →"  → /field-notes
```

---

### Section 8 — Deployment Strip CTA

| Property | Value |
|----------|-------|
| Background | Light Teal `#E6F5F7` |
| Layout | Single row — text left, button right (desktop) → stacked (mobile) |

**Content:**
```
COPY: "Working on a deployment right now?
       Tell us about it — we may be able to help."

BUTTON: [Get a Field Assessment →]  → /deployments
```

---

### Section 9 — Final CTA

| Property | Value |
|----------|-------|
| Background | Navy `#1E2761` |
| Text color | White `#FFFFFF` |
| Layout | Centered content |

**Content:**
```
HEADLINE: Ready to Move Forward?

BODY (2 paragraphs):
Start with a free 30-minute discovery call. We'll listen to what
you're working on, tell you honestly whether TierAlto is the right
fit, and walk you through how we'd approach it.

No pitch. No pressure. Just an honest conversation.

CTA BUTTON: [Book Your Discovery Call]  → /contact
NOTE: Available via phone, Zoom, or Teams
```

CTA button: Teal `#028090` bg, white text, border-radius 6px

---

## 5. PAGE 2 — SERVICES

**URL:** tieralto.com/services
**Meta title:** Services | TierAlto Technology Consulting
**Meta description:** Technology advisory, solution architecture, project delivery,
and AI automation. Fixed-fee and retainer engagements for channel partners and growing companies.

---

### Section 1 — Page Header

| Property | Value |
|----------|-------|
| Background | Navy `#1E2761` |
| Text | White |

**Content:**
```
HEADLINE: Expert Technology Consulting — From Strategy to Delivery

INTRO: TierAlto offers five core service lines, each designed to solve
a specific problem that channel partners, distributors, and mid-market
companies face with communications technology. Every engagement comes
with the same thing: one expert, one point of accountability, one outcome.
```

---

### Section 2 — Positioning Statement

| Property | Value |
|----------|-------|
| Background | Light Gray `#F5F5F5` |
| Layout | Centered headline + 3 paragraphs + 5 bullet differentiators |

**Content:**
```
HEADLINE: The Problem with How Provisioning Works Today

BODY (3 paragraphs):
Most distributors today depend on a chain of vendor programs and managed
service providers to handle pre-shipment configuration. When any link in
that chain breaks — or when a partner asks for something the program wasn't
built to handle — orders stall and relationships suffer.

Vendor zero-touch provisioning platforms were not built to be customized.
They were built to do one thing at scale: point a phone at a URL. When a
partner needs branded devices, specific firmware, locked menus, or any
configuration beyond that single step, the answer is usually no — or it
takes weeks through a vendor engagement that may or may not deliver.

TierAlto gives distributors a provisioning workflow they own, operate, and
control — so no vendor platform change, no program limitation, and no
manufacturer dependency can interrupt their business or their ability to
say yes to a partner request.

KEY DIFFERENTIATORS (5 bullets):
• Distributors own the workflow — no dependency on any vendor's ZTP platform
• Multi-vendor from day one — Poly, Yealink, Grandstream in one system
• Every partner gets a custom template — Comcast gets one, Bell Canada gets another
• Template changes on demand — partner asks, TierAlto delivers, distributor charges for it
• Completion reports per order — proof of work that justifies the premium per-unit fee
```

---

### Section 3 — Service 1: Pre-Shipment Device Configuration

**Anchor:** `#service-1`

| Property | Value |
|----------|-------|
| Background | White |
| Layout | 2-col (text left, image placeholder right) on desktop → stacked mobile |

**Content:**
```
TAG: Service 1

HEADLINE: Pre-Shipment Device Configuration

TAGLINE: "More than a URL on a phone. A complete, validated, partner-ready device."

DESCRIPTION (3 paragraphs):
Most pre-shipment provisioning sets one thing: a URL. The phone plugs in,
calls home, and gets configured later — by someone else's server, on someone
else's timeline.

TierAlto PreShip goes further. Before a device leaves the warehouse it is
fully personalized: partner branding loaded, timezone set, menus locked to
spec, firmware validated, security certificates applied, and every step logged
with a completion record the distributor can stand behind.

The process runs on the distributor's own hardware. No credentials handed
to a third party. No dependency on the customer's provisioning server being
reachable at staging time.

STAGING TIERS (3 bullets):
• Standard — Provisioning URL set, firmware validated, completion log generated
• Professional — Standard + timezone, language, menu locks, out-of-box experience
• Premium — Professional + partner branding, ringtone, security certificates, installer notification

PRICING: "Per-unit and project-based pricing available"
```

**Image:** [PLACEHOLDER] Yealink T5 series — dark background product shot
- Placeholder style: navy bg block `#1E2761`, centered label "Device image — Yealink series"
- Dimensions: maintain 16:9 or 4:3 aspect ratio

---

### Section 4 — Service 2: Provisioning Workflow Design

**Anchor:** `#service-2`

| Property | Value |
|----------|-------|
| Background | Light Gray `#F5F5F5` |
| Layout | 2-col (image placeholder left, text right) desktop → stacked mobile |

**Content:**
```
TAG: Service 2

HEADLINE: Provisioning Workflow Design

TAGLINE: "Built to own. Not locked into someone else's platform."

DESCRIPTION (1 paragraph):
Designing and implementing the internal automation workflows that
distributors and channel partners use to stage, configure, and validate
devices at scale — across multiple vendors simultaneously. Built to be
owned and operated by the client, not locked into a SaaS subscription
that changes without warning.

INCLUDES (5 bullets):
• Multi-vendor support: Poly, Yealink, Grandstream in one workflow
• Config template design and validation against device schemas
• Runs on your own hardware — no per-seat SaaS fees
• Documented, maintainable, and extensible by your own team
• Partner-specific templates built and updated as requirements evolve

PRICING: "Fixed-fee engagements from $5,000"
```

**Image:** [PLACEHOLDER] Poly Edge E450 product shot

---

### Section 5 — Service 3: UC Platform Advisory

**Anchor:** `#service-3`

| Property | Value |
|----------|-------|
| Background | White |

**Content:**
```
TAG: Service 3

HEADLINE: UC Platform Advisory

TAGLINE: "Vendor-neutral guidance from someone who's seen it all."

DESCRIPTION (1 paragraph):
Vendor-neutral guidance on voice, SIP, SBCs, unified communications
platforms, and technology decisions — from someone who has worked inside
these systems at enterprise scale for over two decades. Joining calls,
reviewing deployments, evaluating proposals, and helping partners and
distributors make the right technical decisions without a product agenda.

IDEAL FOR (4 bullets):
• Channel partners closing complex UC or voice deals
• Companies evaluating vendor proposals or platform migrations
• Teams navigating a technical dispute with a manufacturer
• Anyone who needs a vendor-neutral second opinion fast

PRICING: "From $250/hour · Retainers from $1,800/month"
```

---

### Section 6 — Service 4: Ongoing Automation Partnership

**Anchor:** `#service-4`

| Property | Value |
|----------|-------|
| Background | Light Gray `#F5F5F5` |

**Content:**
```
TAG: Service 4

HEADLINE: Ongoing Automation Partnership

TAGLINE: "First call for anything technical. We stay involved."

DESCRIPTION (1 paragraph):
A retainer relationship for clients who want their tools, templates, and
workflows to keep improving as their business and vendor landscape evolves.
First call for any new technical problem, new partner requirement, or new
automation opportunity — without re-explaining the business every time.

WHAT'S INCLUDED (5 bullets):
• Updates to provisioning templates as partner requirements change
• New vendor additions to existing multi-vendor workflows
• Advisory on new tools or platform decisions
• On-call support when something breaks or needs immediate attention
• TierAlto pushes template updates directly to your system — no manual process

PRICING: "Monthly retainer — starter, partner, and embedded tiers"
```

---

### Section 7 — Service 5: Custom Provisioning Application Build

**Anchor:** `#service-5`

| Property | Value |
|----------|-------|
| Background | White |
| Layout | 2-col (text left, image/mockup right) desktop → stacked mobile |

**Content:**
```
TAG: Service 5

HEADLINE: Custom Provisioning Application Build

TAGLINE: "One application. Everything pre-loaded. Ready to stage on day one."

DESCRIPTION (3 paragraphs):
For distributors and partners who want a complete, self-contained staging
solution built specifically for their operation, TierAlto builds it.

A single application — installed on a PC or local server, connected to a
POE switch — with everything pre-configured for the way your business works.
Templates already built for your partners. Config files already validated.
HTTP server already running. Firmware already loaded. Branding assets already
in place.

The warehouse team doesn't configure anything. They open the app, follow the
workflow, and start staging phones. No technical knowledge required to operate it.

WHAT'S INCLUDED (10 bullets):
• Full provisioning application installed and configured for your hardware
• Partner-specific templates pre-loaded for your staging operation
• Embedded HTTP provisioning server — no external dependencies
• DHCP server with Option 66 pre-configured for your network
• Firmware files for your device portfolio loaded locally
• Branding assets per partner — logos, ringtones, screen configs
• Real-time staging dashboard showing per-device progress
• Completion report generation per order
• Workflow documentation for warehouse operators
• One clean interface — no technical knowledge required

WHAT THIS IS NOT (3 bullets):
• Not a SaaS subscription you pay for monthly
• Not a vendor portal you're locked into
• Not a managed service where someone else controls your process

PRICING: "Custom project — scoped per distributor size, partner count, and device portfolio"
```

**Image:** [PLACEHOLDER] TierAlto PreShip dashboard UI screenshot
- Placeholder: teal bg `#028090`, centered label "PreShip dashboard — screenshot TBC"

---

### Section 8 — Pricing Transparency

| Property | Value |
|----------|-------|
| Background | Light Teal `#E6F5F7` |
| Layout | Centered content, pricing as a clean visual block |

**Content:**
```
HEADLINE: How TierAlto Is Priced

INTRO: Every engagement starts with a free 30-minute discovery call.
No obligation, no pitch.

PRICING TIERS (5 bullets):
• Advisory & consulting — from $250/hour
• Day rate (up to 8 hrs) — $1,800/day
• Monthly retainer — from $1,800/month (8 hrs) to $7,500/month (40 hrs)
• Project engagements — fixed fee, scoped and agreed upfront
• Custom application builds — quoted per project based on scope

NOTE:
Retainer clients receive priority scheduling, same-day response, and
direct access for any question — technical or otherwise. Unused retainer
hours do not roll over.
```

---

### Section 9 — FAQ

| Property | Value |
|----------|-------|
| Background | White |
| Layout | Centered single column, accordion behavior |

**Content:**
```
HEADLINE: Common Questions
```

**Accordion (8 items — default all collapsed, click to expand, chevron right):**

| # | Question | Answer |
|---|---------|--------|
| 1 | Do you work with distributors who aren't technically sophisticated? | Yes — and that's often the point. TierAlto builds tools and workflows that non-technical warehouse operators can run without understanding what's under the hood. The technical complexity lives in the setup and the build. The day-to-day operation is simple by design. |
| 2 | Can you support multiple device vendors in the same engagement? | That's one of TierAlto's core capabilities. Most provisioning services are built around one vendor's platform. TierAlto builds workflows that handle Poly, Yealink, and Grandstream in the same pipeline — same process, same dashboard, same completion report. |
| 3 | Do I need to share vendor credentials or provisioning server passwords? | No. TierAlto PreShip runs locally on your hardware. The phone gets the provisioning server URL embedded during staging and calls home itself after deployment. Your partner's server credentials stay with you. |
| 4 | Is this a SaaS subscription or a one-time engagement? | Neither, unless you want it to be. Project engagements are fixed-fee — you pay for the work, you own the result. If you want TierAlto to stay involved for ongoing changes and support, a monthly retainer covers that. There is no per-seat fee for any tool TierAlto builds for you. |
| 5 | What happens if something breaks after delivery? | Every engagement includes documentation and a handover so your team understands what was built. For clients on a retainer, TierAlto is the first call when something goes wrong. For project-only clients, we offer post-delivery support packages and can always be reached to assess what happened. |
| 6 | Can you work remotely or do you need to be on site? | Most of what TierAlto does is remote — provisioning workflows, configuration builds, advisory calls, and template updates all happen remotely. On-site presence is available for initial installations, warehouse setup, or complex deployments where physical access makes more sense. |
| 7 | How long does a typical provisioning workflow build take? | Depends on scope. A single-vendor provisioning workflow for one partner template is typically 2–3 weeks from scoping to delivery. A multi-vendor custom application build with multiple partner templates runs 4–8 weeks. We'll give you a realistic timeline during the discovery call. |
| 8 | What's the minimum engagement? | A single advisory call at the hourly rate — no minimum commitment. If you want to talk through a problem before deciding anything, that's what the discovery call is for, and it's free. |

---

### Section 10 — Services Page CTA

| Property | Value |
|----------|-------|
| Background | Navy `#1E2761` |
| Text | White |

**Content:**
```
HEADLINE: Not sure which service fits?

BODY: Book a free discovery call and we'll figure it out together.

CTA: [Book a Discovery Call]  → /contact
```

---

## 6. PAGE 3 — FIELD NOTES

**URL:** tieralto.com/field-notes
**Meta title:** Field Notes | TierAlto Technology Consulting
**Meta description:** Real problems from real deployments. Written from 22 years of
experience in voice, VoIP, and unified communications.

---

### Section 1 — Page Header

| Property | Value |
|----------|-------|
| Background | Navy `#1E2761` |
| Text | White |

**Content:**
```
HEADLINE: Field Notes

SUBHEAD: Real problems from real deployments. Written from 22 years of
experience in voice, VoIP, and unified communications.

TOPIC FILTERS (pill buttons — click to filter posts):
[All]  [Provisioning]  [SIP / VoIP]  [UC Advisory]  [AI Automation]  [Pre-Shipment]
```

Filter pill style: outlined, white border/text inactive → teal bg/white text active

---

### Section 2 — Post Grid

**Layout:** Responsive grid — 3-col desktop → 2-col tablet → 1-col mobile

**Card style:** White bg, `4px solid #028090` top border, border-radius 12px,
shadow-card, padding 24px, topic tag pill (teal), title H3 navy, one-liner muted,
read time estimate muted, "Read more →" teal link

---

**Post 1:**
```
SLUG: /field-notes/distributor-failure-rate
TOPIC TAG: Provisioning
READ TIME: 4 min read

TITLE: Why your distributor's failure rate isn't their fault — and how to fix it

ONE-LINER: When vendor ZTP platforms go down, distributors take the blame.
Here's how to stop depending on platforms you don't control.

FULL POST CONTENT:

THE PROBLEM:
A distributor has 200 phones to stage for a partner order due Friday. They
plug them into the switch as usual, the vendor's zero-touch provisioning
platform is unreachable, and nothing registers. The phones sit there. The
order doesn't ship. The partner calls to find out what happened. The
distributor has no answer except "the vendor's platform is down" — which
sounds like an excuse even when it's true.

WHY IT HAPPENS:
Most distributors stage phones using a vendor-provided ZTP service. Poly
has PDMS. Yealink has RPS. Grandstream has GAPS. These are free services
that do one thing: tell the phone where to go for its config. When they're
down or changed without notice, every phone in the staging bay stops working.
The distributor has no fallback because they never owned the process to begin with.

THE FIX:
Run a local provisioning server on your own hardware. TierAlto PreShip
serves the provisioning URL directly from a device on your staging network
— no vendor platform required, no internet dependency, no outage risk. The
phone gets its URL from your server, not theirs.

WHAT THIS TELLS YOU:
Every service you depend on that you don't control is a risk. Vendor ZTP
is convenient until it isn't. Building your own staging pipeline takes a
one-time investment and pays back every time the vendor has a bad day.

CTA: "Dealing with this? Book a 30-minute call."  → /contact
```

---

**Post 2:**
```
SLUG: /field-notes/firmware-mismatch-customer-site
TOPIC TAG: Pre-Shipment
READ TIME: 3 min read

TITLE: The firmware problem that only shows up at the customer site

ONE-LINER: Phones staged with the wrong firmware register fine in the
warehouse. They fail when they reach the platform. Here's why — and how
to catch it before it ships.

FULL POST CONTENT:

THE PROBLEM:
Phone is staged, tested, boxed, shipped. Installer arrives at the customer
site, plugs it in, and it either can't register to the platform or it
registers but key features don't work. The distributor's staging team did
everything right. The phone looked fine on the bench. The problem is that
the firmware version loaded during staging isn't compatible with the platform
the customer is running.

WHY IT HAPPENS:
Vendors release new firmware regularly. Platforms like Cisco CUCM, Microsoft
Teams, and Zoom Phone all have minimum firmware requirements that change.
If nobody validated the firmware version against the platform requirement at
staging time, the mismatch travels all the way to the customer site — and the
installer is the one who discovers it.

THE FIX:
Build firmware validation into the pre-ship workflow. Before any phone is
boxed, the staging system confirms the firmware version matches the target
platform requirement. If it doesn't, the firmware is updated during staging
— not by the installer at 9pm at the customer site.

WHAT THIS TELLS YOU:
Pre-ship validation isn't a nice-to-have. It's the difference between a
clean installation and a support call. Every step you validate in the
warehouse is a step that can't fail in the field.

CTA: "Want a staging workflow that catches this? Let's talk."  → /contact
```

---

**Post 3:**
```
SLUG: /field-notes/sip-registration-failure-causes
TOPIC TAG: SIP / VoIP
READ TIME: 5 min read

TITLE: Three reasons a phone fails to register after deployment — and none
of them are the phone

ONE-LINER: SIP registration failures at the customer site almost always
trace back to something that could have been caught before the phone left
the warehouse.

FULL POST CONTENT:

THE PROBLEM:
Installer plugs in the phone. It powers on, contacts the provisioning
server, downloads the config — and then fails to register. No dial tone.
No service. Customer is watching. Installer is on the phone with support.
Nobody can figure out why it worked in the warehouse and doesn't work here.

WHY IT HAPPENS:
Three causes come up over and over.

1. NAT traversal — the phone's SIP traffic is hitting a firewall that wasn't
configured to allow it. The warehouse network didn't have this restriction.
The customer's network does.

2. SBC misconfiguration — the Session Border Controller at the edge of the
customer's network isn't passing the phone's registration through. Usually
a missing trunk entry or an IP whitelist that doesn't include the new devices.

3. Credentials not loading — the username and password the phone needs to
register weren't in the config file, or the config file never fully loaded
because the provisioning server timed out on first contact.

THE FIX:
For NAT and SBC issues — a pre-deployment site readiness check. Before the
installer arrives, TierAlto reviews the network config and confirms SIP
traffic can pass end-to-end. For credential issues — validate the config
file was fully applied during staging. The completion log should confirm
every parameter including auth credentials.

WHAT THIS TELLS YOU:
Most SIP registration failures are diagnostic, not technical mysteries. If
you know what to look for — and where to look — they resolve in minutes.
The problem is that most installers don't have that context, and manufacturers'
support lines won't prioritize a channel partner's one-off deployment.

CTA: "Troubleshooting a registration failure right now? Submit your deployment
and we'll take a look."  → /deployments
```

---

### Section 3 — Subscribe Strip

| Property | Value |
|----------|-------|
| Background | Navy `#1E2761` |
| Text | White |

**Content:**
```
HEADLINE: Get new field notes when they publish.

BODY: No marketing. No product pitches. Just real problems and how we solved them.

INPUT: [Email address]  [Subscribe]
```

---

## 7. PAGE 4 — DEPLOYMENTS

**URL:** tieralto.com/deployments
**Meta title:** Get a Field Assessment | TierAlto
**Meta description:** Tell TierAlto about your current deployment. We review every
submission and respond within one business day if we can help.

---

### Section 1 — Page Header

| Property | Value |
|----------|-------|
| Background | Navy `#1E2761` |
| Text | White |

**Content:**
```
HEADLINE: Tell Us About Your Deployment

SUBHEAD (2 paragraphs):
Working on a deployment, troubleshooting a provisioning issue, or planning
something you're not sure how to approach? Share the details. TierAlto
reviews every submission and responds within one business day if there's
something we can help with.

No obligation. No sales pitch. Just an expert set of eyes on what you're
dealing with.
```

---

### Section 2 — Deployment Intake Form

| Property | Value |
|----------|-------|
| Background | White |
| Layout | Centered, max-width 720px, clean minimal form |

**Section A — About You:**

| Field | Type | Required |
|-------|------|---------|
| Name | Text input | Yes |
| Company / Organization | Text input | Yes |
| Role | Select dropdown | Yes |
| Email | Email input | Yes |
| Phone | Text input | No |

Role dropdown options: `Distributor · VAR/Reseller · MSP · IT Manager · Installer · Other`

**Section B — Your Deployment:**

| Field | Type | Options |
|-------|------|---------|
| Device vendor(s) | Checkboxes | Poly · Yealink · Grandstream · Cisco · Avaya · Other |
| Platform / call manager | Select dropdown | Microsoft Teams · Webex · Zoom Phone · RingCentral · 8x8 · Hosted PBX · On-Premise PBX · Other |
| Number of devices | Select dropdown | 1–10 · 11–50 · 51–200 · 200+ |
| Deployment stage | Select dropdown | Planning · Pre-staging · In progress · Troubleshooting · Post-deployment |

**Section C — The Situation:**

| Field | Type | Notes |
|-------|------|-------|
| Describe your situation | Textarea | 500 char limit, required |
| What outcome are you looking for? | Checkboxes | Technical advice · Provisioning help · Vendor guidance · Just sharing · Interested in TierAlto services |

**Form footer:**
```
SUBMIT BUTTON: [Submit Your Deployment]  (teal, full-width on mobile)

NOTE BELOW: "We review every submission. If there's something we can help with,
we'll reach out within 1 business day."
```

---

### Section 3 — Privacy Note

**Content:**
```
What you share here stays between you and TierAlto. We don't sell or share
submission data. We use it only to understand your situation and respond to
you directly.
```

Small text, muted `#6B7280`, centered below form.

---

## 8. PAGE 5 — ABOUT

**URL:** tieralto.com/about
**Meta title:** About | TierAlto Technology Consulting
**Meta description:** TierAlto was built from 22 years inside the voice and
communications industry. Learn about our founder, philosophy, and areas of expertise.

---

### Section 1 — Page Header

| Property | Value |
|----------|-------|
| Background | Navy `#1E2761` |
| Text | White |

**Content:**
```
HEADLINE: Built from the Inside Out.

INTRO: Most consultants learn about your industry from a distance.
TierAlto was built from 22 years inside it.
```

---

### Section 2 — Founder Story

| Property | Value |
|----------|-------|
| Background | White |

**Content:**
```
BODY (3 paragraphs):
Our principal consultant spent two decades as a product support specialist,
sales engineer, and solutions engineer working inside leading voice and
communications technology companies. That experience covered everything —
SIP, VoIP, audio/video systems, Session Border Controllers, unified
communications platforms, and enterprise deployments at scale.

In every role, the job was the same: figure out why the project wasn't
working, build what actually needed to be built, and coordinate everyone
necessary to close it.

TierAlto is the direct application of that experience — now available to
channel partners, distributors, and growing companies who deserve the same
expertise, without the manufacturer politics.
```

---

### Section 3 — Our Philosophy

| Property | Value |
|----------|-------|
| Background | Light Teal `#E6F5F7` |

**Content:**
```
HEADLINE: Our Philosophy

BODY (3 paragraphs):
We believe that most technology projects fail not because of bad technology
— but because of bad ownership.

Someone has to step in and say: "I've got it. I'll make sure this gets done."
That's what TierAlto does.

No finger-pointing. No escalation labyrinths. No "that's not my area."
You get one expert who understands the full system and is accountable for
the result.
```

---

### Section 4 — Areas of Expertise

| Property | Value |
|----------|-------|
| Background | White |

**Content:**
```
HEADLINE: Areas of Expertise

EXPERTISE TAGS (13 pill badges — same style as homepage):
SIP Protocols
VoIP & Voice Systems
Session Border Controllers (SBCs)
Audio / Video Systems
Unified Communications (UC)
UCaaS Platforms
Network Design for Voice
AI Business Automation
Pre-Shipment Device Staging
Multi-Vendor Provisioning
Custom Application Development
Solutions Engineering
Project Coordination & Delivery
```

---

### Section 5 — About Page CTA

| Property | Value |
|----------|-------|
| Background | Navy `#1E2761` |
| Text | White |

**Content:**
```
HEADLINE: Let's Talk.

BODY: If what you've read sounds like what you've been looking for,
the next step is simple.

CTA: [Book a Free Discovery Call]  → /contact
```

---

## 9. PAGE 6 — CONTACT

**URL:** tieralto.com/contact
**Meta title:** Contact | Book a Discovery Call | TierAlto
**Meta description:** Book a free 30-minute discovery call with TierAlto.
No pitch, no pressure — just an honest conversation about your project.

---

### Section 1 — Page Header

| Property | Value |
|----------|-------|
| Background | Navy `#1E2761` |
| Text | White |

**Content:**
```
HEADLINE: Book a Discovery Call

INTRO (2 paragraphs):
A free 30-minute call to talk through what you're working on.

No pitch. No pressure. If TierAlto is a fit, we'll tell you how we'd
approach it and what it would cost. If it's not, we'll tell you that too.

AVAILABLE VIA: Phone  ·  Zoom  ·  Microsoft Teams
```

---

### Section 2 — Contact Form

| Property | Value |
|----------|-------|
| Background | White |
| Layout | Centered, max-width 640px |

| Field | Type | Required |
|-------|------|---------|
| Name | Text | Yes |
| Email | Email | Yes |
| Company / Organization | Text | No |
| Phone | Text | No |
| What are you working on? | Textarea | Yes |
| How did you hear about TierAlto? | Text | No |

```
SUBMIT BUTTON: [Request a Discovery Call]  (teal, full-width on mobile)

NOTE: "We respond to every inquiry within 1 business day."
```

---

### Section 3 — Alternative Contact

**Content:**
```
Prefer email? Reach us directly at: hello@tieralto.com
```

Small text, centered, muted color, below form.

---

## 10. ASSET INVENTORY

### Logo / Wordmark
| Asset | Status | Notes |
|-------|--------|-------|
| TIERALTO wordmark | Text-based — no image file | Build as styled HTML/CSS text |
| Logo image file | Not yet available | Add when created |

### Photography
| Asset | Status | Location Used |
|-------|--------|--------------|
| Yealink T5 series product shot | [PLACEHOLDER] | Services — Service 1 |
| Poly Edge E450 product shot | [PLACEHOLDER] | Services — Service 2 |
| PreShip dashboard screenshot | [PLACEHOLDER — build first] | Services — Service 5 |

**Placeholder style for all image slots:**
- Navy `#1E2761` or teal `#028090` background block
- Centered label text in white, 14px muted: "[Asset name — pending]"
- Maintain target aspect ratio

### Icons
| Asset | Source | Usage |
|-------|--------|-------|
| Service 1 icon: phone + checkmark | Custom SVG (teal) | Homepage + Services cards |
| Service 2 icon: connected nodes | Custom SVG (teal) | Homepage + Services cards |
| Service 3 icon: speech bubble + circuit | Custom SVG (teal) | Homepage + Services cards |
| Service 4 icon: circular arrows | Custom SVG (teal) | Homepage + Services cards |
| Service 5 icon: code brackets + window | Custom SVG (teal) | Homepage + Services cards |
| Chevron (accordion) | Heroicons or Lucide | Services FAQ, individual posts |
| Arrow right | Heroicons or Lucide | "Learn more →" links, CTAs |

---

## 11. COMPONENT DESIGN SYSTEM

### Service Card
```css
/* White bg, teal top accent, soft shadow, rounded */
background: #FFFFFF;
border-top: 4px solid #028090;
border-radius: 12px;
box-shadow: 0 2px 12px rgba(0,0,0,0.08);
padding: 24px;
```

### Expertise Tag / Pill Badge
```css
border: 1px solid #028090;
color: #028090;
border-radius: 20px;
padding: 4px 14px;
font-size: 13px;
display: inline-block;
margin: 4px;
```

### Primary Button (Teal)
```css
background: #028090;
color: #FFFFFF;
border: none;
border-radius: 6px;
padding: 12px 24px;
font-size: 15px;
font-weight: 500;
cursor: pointer;
transition: background 0.15s;
/* hover: */ background: #026d79;
```

### Secondary Button (Outlined)
```css
background: transparent;
color: #FFFFFF;  /* or #1E2761 on light bg */
border: 0.5px solid currentColor;
border-radius: 6px;
padding: 12px 24px;
font-size: 15px;
font-weight: 400;
cursor: pointer;
```

### Topic Tag / Filter Pill
```css
/* Inactive */
border: 1px solid rgba(255,255,255,0.4);
color: rgba(255,255,255,0.7);
border-radius: 20px;
padding: 4px 14px;
font-size: 13px;
cursor: pointer;

/* Active */
background: #028090;
border-color: #028090;
color: #FFFFFF;
```

### FAQ Accordion Item
```css
border-bottom: 0.5px solid #E2E8F0;
padding: 16px 0;
/* Question row: flex, space-between, chevron right */
/* Answer: collapsible, transition height/opacity */
```

### Form Inputs
```css
width: 100%;
background: #F5F5F5;
border: 0.5px solid #CCCCCC;
border-radius: 6px;
padding: 10px 14px;
font-size: 16px;
color: #374151;
/* focus: */ border-color: #028090; outline: none;
```

---

## 12. TECHNICAL GUIDANCE

### Recommended Stack
- **Framework:** Next.js (preferred for SEO + performance) or React + Vite
- **CSS:** Tailwind CSS or plain CSS with custom properties from Section 1
- **Fonts:** Inter from Google Fonts — weights 400, 500, 600, 700, 800
- **Icons:** Heroicons or Lucide React (MIT licensed — no attribution required)
- **Forms:** Formspree, Netlify Forms, or EmailJS — no backend required at launch
- **Booking CTA:** Link to Calendly or `/contact` page (Calendly embed TBC)
- **Field Notes posts:** MDX files or a simple JSON/array in code — no CMS needed at launch

### Responsive Breakpoints
```
Mobile:  375px (base)
Tablet:  768px
Desktop: 1280px
Wide:    1440px
```

### Performance
- Lazy load all images below the fold
- SVG icons inline — no icon font library needed
- No heavy JS libraries on marketing pages
- Image placeholders: use colored divs with CSS aspect-ratio until real assets arrive

### Accessibility
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`
- All images: descriptive `alt` text
- Skip-to-content link at top of page
- Focus states on all interactive elements (`:focus-visible` ring)
- WCAG AA color contrast minimum on all text
- Accordion: `aria-expanded`, `aria-controls` on trigger buttons

### Form Handling
- All forms: client-side validation before submit
- Required field indicators: asterisk `*` with sr-only label
- Success state: inline confirmation message, not page reload
- Error state: inline field-level error messages, red border on field

---

## 13. SEO & META TAGS

| Page | Title Tag | Meta Description |
|------|-----------|-----------------|
| Home | TierAlto \| Vendor-Neutral Technology Consulting | TierAlto delivers expert voice, VoIP, and unified communications consulting for channel partners and mid-market companies. 22 years of experience. One point of accountability. |
| Services | Services \| TierAlto Technology Consulting | Technology advisory, provisioning workflow design, project delivery, and AI automation. Fixed-fee and retainer engagements for channel partners and distributors. |
| Field Notes | Field Notes \| TierAlto Technology Consulting | Real problems from real deployments. Written from 22 years of experience in voice, VoIP, and unified communications. |
| Deployments | Get a Field Assessment \| TierAlto | Tell TierAlto about your current deployment. We review every submission and respond within one business day if we can help. |
| About | About \| TierAlto Technology Consulting | TierAlto was built from 22 years inside the voice and communications industry. Learn about our founder, philosophy, and areas of expertise. |
| Contact | Contact \| Book a Discovery Call \| TierAlto | Book a free 30-minute discovery call with TierAlto. No pitch, no pressure — just an honest conversation about your project. |

### Open Graph (all pages)
```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="TierAlto" />
<meta property="og:image" content="/og-image.png" />  <!-- 1200x630 navy card -->
```

---

## 14. DO NOT INCLUDE

The following must NOT appear anywhere on the website:

- Names of former employers / companies the founder worked at
- Specific client names (no case studies at launch — none completed yet)
- Vendor logos (Poly, Yealink, Cisco, Microsoft, etc.) — no permission granted
- Stock photography of people
- Excessive animation or visual complexity
- Claims of being "certified" or "partner" with any specific vendor
  unless explicitly confirmed in writing
- Pricing presented as the primary focus on the homepage
- Any "AI" buzzword-heavy language — describe what the automation does, not the label

---

## NOTES FOR DEVELOPER / DESIGNER

1. **No image assets exist at launch.** All image slots should render as
   styled placeholder blocks (colored bg + centered label) until real assets
   are provided. Do not leave broken img tags.

2. **Text-based wordmark only.** The TIERALTO logo is CSS/HTML text styled
   to look like a wordmark. No image file. This means it renders cleanly at
   any resolution without an asset.

3. **Field Notes at launch = 3 posts.** The post data can live in a simple
   JS array or MDX files. No CMS needed. Structure to make adding posts easy.

4. **Forms need real handlers.** Both the contact form and deployment intake
   form need a form handling service. Formspree is the simplest option with
   no backend. Configure with the hello@tieralto.com address.

5. **Calendly or booking link TBC.** All "Book a Discovery Call" CTAs should
   link to `/contact` until a Calendly link is provided. Then either embed
   Calendly on the contact page or link out.

6. **Copyright year:** Footer shows current year dynamically — use JS `new Date().getFullYear()`.

7. **The deployment intake form is not a contact form.** It is a structured
   data intake — treat it separately from the general contact form. Different
   fields, different success message, potentially different form handler endpoint.

8. **PreShip is mentioned but not a separate page at launch.** Service 5
   describes TierAlto PreShip as a deliverable. It does not yet have its own
   product page. A `/preship` page is Phase 2.

9. **No social media links at launch** — no confirmed profiles yet. Do not
   add placeholder social icons.

10. **All copy is final as written in this spec.** Do not paraphrase, shorten,
    or rewrite any copy. Use the exact text from each section. If a section
    has multiple paragraphs, preserve all paragraphs and their order.

---

*End of Specification — TierAlto — tieralto.com — March 2026*
