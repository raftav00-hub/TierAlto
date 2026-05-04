# TierAlto — Full Website Design Specification
**Document Purpose:** Complete reference spec for building tieralto.com from scratch
**Version:** 1.1 — March 2026
**Pages Covered:** Home · Services · Field Notes · Deployments · About · Contact
**Intended for:** Claude Code — use this as the authoritative build reference

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
10. [Global Widgets](#10-global-widgets)
11. [Asset Inventory](#11-asset-inventory)
12. [Component Design System](#12-component-design-system)
13. [Technical Guidance](#13-technical-guidance)
14. [SEO & Meta Tags](#14-seo--meta-tags)
15. [Do Not Include](#15-do-not-include)

---

## 1. BRAND IDENTITY

### Business
- **Company:** TierAlto LLC
- **Tagline:** "Where Expertise Meets Accountability."
- **Domain:** tieralto.com
- **Phone:** 1-678-699-5935
- **Email:** hello@tieralto.com
- **Positioning:** Vendor-neutral technology consulting firm built by engineers
  with decades of experience inside the voice and unified communications industry.
  Serving channel partners, distributors, and mid-market companies.

### Wordmark / Logo

**Logo files are ready. Use SVG files — do not render as CSS text.**

All logo files live at: `D:\projects\TierAlto\src\images\`
Reference in code as: `/images/[filename]` or `@/images/[filename]`

| File | Use On | Used For |
|------|--------|---------|
| `tieralto-logo-horizontal.svg` | Dark/navy bg | Navigation bar (desktop + mobile) |
| `tieralto-logo-white.svg` | Dark/navy bg | Footer, any dark section stacked logo |
| `tieralto-logo-color.svg` | Light/white bg | Success page, About page, light sections |
| `tieralto-icon.svg` | Any bg | Favicon, chatbot header, exit popup, post byline |
| `tieralto-logo-variants.svg` | Reference only | Do not deploy — design reference only |

**Logo colors (extracted from original):**
- Mountain light teal: `#3A90BC`
- Mountain mid teal: `#1B6A9C`
- Mountain base + wordmark navy: `#022B47`

**Logo sizing by context:**

| Context | File | Width |
|---------|------|-------|
| Nav bar desktop | tieralto-logo-horizontal.svg | 160px |
| Nav bar mobile | tieralto-logo-horizontal.svg | 130px |
| Footer column 1 | tieralto-logo-white.svg | 120px |
| Success / thank-you page | tieralto-logo-color.svg | 180px |
| Exit intent popup | tieralto-icon.svg | 36px |
| Chatbot header | tieralto-icon.svg | 28px |
| Favicon | tieralto-icon.svg | 32x32px |
| Field Notes post byline | tieralto-icon.svg | 20px |

**Always include descriptive alt text:**
- Full logo: `alt="TierAlto"`
- Icon only: `alt="TierAlto icon"`

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary Navy | #1E2761 | Headlines, nav, footer, hero bg, CTA sections, primary buttons |
| Primary Teal | #028090 | Accents, CTA buttons, card top borders, links, active states |
| Teal Dark (hover) | #026d79 | Teal button hover |
| Navy Dark (hover) | #162255 | Navy button hover |
| Light Teal | #E6F5F7 | Alternating section bg, callouts, card accents |
| Light Gray | #F5F5F5 | Alternating section bg, form fields |
| White | #FFFFFF | Card bg, clean sections |
| Dark Heading | #1A1A2E | Primary headings on light bg |
| Body Text | #374151 | Paragraphs, descriptions |
| Muted Text | #6B7280 | Captions, labels, secondary info |
| Teal on Dark | #7EC8D8 | Subheadlines on navy hero |
| Status Success | #028090 | Complete indicators |
| Status Warning | #EF9F27 | Warning flags |
| Status Error | #D93025 | Failure indicators |

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
  --shadow-card:             0 2px 12px rgba(0,0,0,0.08);
}
```

### Typography

| Element | Desktop | Mobile | Weight |
|---------|---------|--------|--------|
| Display / H1 | 48-64px | 32-40px | 800 |
| Section H2 | 32-40px | 24-30px | 700 |
| Card title H3 | 20-24px | 18-22px | 600 |
| Body copy | 16-18px | 16px | 400 |
| Small / caption | 13-14px | 13px | 400 |
| Button | 14-15px | 14px | 500 |
| Nav links | 14px | 14px | 400 |
| Line height | 1.7 | 1.6 | -- |

### Visual Style Rules
- No gradients except optional subtle navy to teal on hero
- Card shadow: var(--shadow-card) only
- Card top accent: 4px solid #028090 top edge only
- All border strokes: 0.5px
- No stock photography of people
- No vendor logos without explicit permission

---

## 2. SITE ARCHITECTURE & NAVIGATION

### Sitemap
```
tieralto.com/
  /                     Homepage
  /services             Services (5 service lines)
  /field-notes          Field Notes (blog)
  /field-notes/[slug]   Individual post
  /deployments          Get a Field Assessment
  /about                About
  /contact              Contact
  /privacy-policy       Footer only
  /terms-of-service     Footer only
```

### Navigation Bar

| Position | Element |
|----------|---------|
| Left | TIERALTO wordmark + tagline |
| Right | Services · Field Notes · Deployments · About · Contact |
| Far right | Book a Call — teal CTA button |
| Mobile | Phone number tap-to-call + hamburger |

---

## 3. GLOBAL COMPONENTS

### Header
- Background: Navy #1E2761 — full width, sticky
- Wordmark: Left — TIERALTO bold white, tagline teal italic below
- Nav links: Right — white, 14px Inter 400
- CTA button: Book a Call — teal bg, white text, border-radius 6px
- Mobile: phone number 1-678-699-5935 as tap-to-call link visible
- Height: 64-72px desktop

### Footer

Background: Navy #1E2761 | Layout: 3-column desktop, stacked mobile

**Column 1 — Brand:**
```
TIERALTO
Where Expertise Meets Accountability.

1-678-699-5935  (tap-to-call)
hello@tieralto.com
```

**Column 2 — Navigation:**
```
Services       /services
Field Notes    /field-notes
Deployments    /deployments
About          /about
Contact        /contact
```

**Column 3 — Newsletter:**
```
Stay Sharp.
Get Field Notes delivered when they publish.

[Email address input]
[Subscribe]  (teal button)
```

**Bottom bar:**
```
Privacy Policy  |  Terms of Service
2025 TierAlto LLC. All rights reserved.
```

---

## 4. PAGE 1 — HOME

URL: tieralto.com/

---

### Section 1 — Hero

Background: Navy #1E2761 with subtle CSS geometric line pattern
Text: White | Subheadline: #7EC8D8 | Min-height: 90vh

```
HEADLINE:
The Expertise You Need. The Accountability You Deserve.

SUBHEADLINE:
Decades of experience inside the voice and communications industry —
now working directly for you.

BODY:
When your technology project stalls, gets passed around, or never
quite gets delivered — that's the problem TierAlto was built to solve.

We step in as your vendor-neutral technology team: explaining,
architecting, coordinating, and delivering. No manufacturer agenda.
No hand-off. Just deep expertise and complete accountability.

PRIMARY CTA:   [Book a Discovery Call]   /contact
SECONDARY CTA: [View Our Services]       /services
```

---

### Section 2 — Services Overview

Background: White

```
LABEL: What We Do  (small caps teal 12px tracked)

HEADLINE: One Team. Complete Ownership.

SUBHEAD: TierAlto brings together decades of experience in voice,
VoIP, unified communications, and AI automation — delivering the
full range of technology consulting from advisory calls to fully
built provisioning applications.
```

5 Service Cards (white bg, 4px teal top border, radius 12px, shadow-card):

| Card | Icon SVG | Title | One-liner |
|------|----------|-------|-----------|
| 1 | Phone + checkmark | Pre-Shipment Device Configuration | Device personalization before it ever leaves the warehouse. |
| 2 | Connected nodes | Provisioning Workflow Design | Built to own. Not locked into someone else's platform. |
| 3 | Speech bubble + circuit | UC Platform Advisory | Vendor-neutral guidance from engineers who've seen it all. |
| 4 | Circular arrows | Ongoing Automation Partnership | First call for anything technical. We stay involved. |
| 5 | Code brackets + window | Custom Provisioning Application Build | One application. Everything pre-loaded. Ready to stage on day one. |

Each card footer: "Learn more" teal link to /services anchor

---

### Section 3 — How It Works

Background: Light Gray #F5F5F5

```
LABEL: How It Works  (small caps teal)
HEADLINE: Simple to Start. Built to Last.
```

4 Steps (horizontal desktop, stacked mobile):

| Step | Title | Body |
|------|-------|------|
| 01 | Discovery Call | A free 30-minute call. You tell us what you're working on. We listen and tell you honestly whether TierAlto is the right fit. |
| 02 | Scoping | We define the work together — what gets built, the timeline, and what it costs. Fixed fee or retainer — agreed upfront. No scope creep. No surprise invoices. |
| 03 | Build or Engage | We do the work. The same team that scoped it delivers it. No hand-off to a junior resource. When something unexpected comes up, we tell you. |
| 04 | Delivery + Ongoing | Work is delivered, documented, and yours to operate independently. A retainer keeps the team embedded as things evolve. |

---

### Section 4 — Why TierAlto

Background: Light Teal #E6F5F7

```
LABEL: Why TierAlto  (small caps teal)
HEADLINE: We're Different. Here's Why.
```

3 Pillars (horizontal desktop, stacked mobile):

| Pillar | Title | Body |
|--------|-------|------|
| 01 | Vendor Neutral | TierAlto has no product to sell and no manufacturer relationship to protect. You get honest recommendations based entirely on what works best for your environment. |
| 02 | Deep, Specialized Expertise | Decades of hands-on experience in voice, VoIP, SBCs, audio/video, and unified communications at enterprise scale — built from careers spent inside these systems. This isn't general IT consulting. It's the real thing. |
| 03 | Accountability | The buck stops here. TierAlto doesn't escalate, hand off, or point fingers. We own the outcome — from the first call to the final sign-off. |

---

### Section 5 — Who We Serve

Full-width 50/50 split, no gap between columns

Left column (navy #1E2761, white text):
```
Title:    Channel Partners
Subtitle: VARs, MSPs & Resellers

Body: You sell communications technology. We help you close deals
you can't fully resource, deliver projects your team can't fully
staff, and keep customers happy when things get complicated. We're
the engineering depth you need — without the full-time hire.
```

Right column (teal #028090, white text):
```
Title:    Distributors & Staging Operations
Subtitle: Device Staging at Scale

Body: You stage phones before they ship. Right now that process
depends on vendor platforms you don't control and managed services
that can't adapt when a partner asks for something different.
TierAlto gives you the workflow, the tool, and the independence
to say yes to more — and charge for it.
```

---

### Section 6 — Credibility

Background: White

```
HEADLINE: Decades of Experience. Earned Inside the Industry.

BODY:
TierAlto brings together engineers who spent their careers as
solutions architects, technical specialists, and project leads
working inside leading voice and communications technology companies
— supporting enterprise deployments of SIP, VoIP, Session Border
Controllers, audio/video systems, and unified communications
platforms at scale.

Across every role, the most valuable skill wasn't just technical
depth. It was knowing how to clarify a stalled project, coordinate
across vendors, and make sure things actually got done. That's the
experience TierAlto brings to every engagement.
```

Expertise Tags (inline pill badges — teal outline, teal text, radius 20px):
```
SIP  VoIP / Voice  Session Border Controllers  Audio / Video
Unified Communications  UCaaS  Network Design  AI Automation
Pre-Shipment Device Staging  Multi-Vendor Provisioning
Solutions Engineering  Project Delivery  Custom Application Builds
```

---

### Section 7 — Latest from the Field

Background: Light Gray #F5F5F5

```
HEADLINE: From the Field
SUBHEAD: Real problems. Real fixes. Written from decades of experience.

[2-3 post teaser cards — title, one-liner, topic tag, read more link]

LINK: "View all Field Notes"  /field-notes
```

---

### Section 8 — Newsletter Strip

Background: Navy #1E2761 | Text: White

```
HEADLINE: Stay Sharp. Subscribe to Field Notes.
BODY: Real problems, real fixes — delivered when published.
      No marketing. No product pitches.

[Email address input]  [Subscribe]
```

---

### Section 9 — Deployment Strip CTA

Background: Light Teal #E6F5F7

```
COPY: "Working on a deployment right now?
       Tell us about it — we may be able to help."

BUTTON: [Get a Field Assessment]   /deployments
```

---

### Section 10 — Final CTA

Background: Navy #1E2761 | Text: White

```
HEADLINE: Ready to Move Forward?

BODY:
Start with a free 30-minute discovery call. We'll listen to what
you're working on, tell you honestly whether TierAlto is the right
fit, and walk you through how we'd approach it.

No pitch. No pressure. Just an honest conversation.

CTA:  [Book Your Discovery Call]   /contact
NOTE: Available via phone, Zoom, or Teams · 1-678-699-5935
```

---

## 5. PAGE 2 — SERVICES

URL: tieralto.com/services

---

### Section 1 — Page Header

Background: Navy #1E2761 | Text: White

```
HEADLINE: Expert Technology Consulting — From Strategy to Delivery

INTRO: TierAlto offers five core service lines, each designed to
solve a specific problem that channel partners, distributors, and
mid-market companies face with communications technology. Every
engagement comes with the same thing: one team, one point of
accountability, one outcome.
```

---

### Section 2 — Positioning Statement

Background: Light Gray #F5F5F5

```
HEADLINE: The Problem with How Provisioning Works Today

BODY:
Most distributors today depend on a chain of vendor programs and
managed service providers to handle pre-shipment configuration.
When any link in that chain breaks — or when a partner asks for
something the program wasn't built to handle — orders stall and
relationships suffer.

Vendor zero-touch provisioning platforms were not built to be
customized. They were built to do one thing at scale: point a phone
at a URL. When a partner needs branded devices, specific firmware,
locked menus, or any configuration beyond that single step, the
answer is usually no — or it takes weeks through a vendor engagement
that may or may not deliver.

TierAlto gives distributors a provisioning workflow they own,
operate, and control — so no vendor platform change, no program
limitation, and no manufacturer dependency can interrupt their
business or their ability to say yes to a partner request.

DIFFERENTIATORS:
- Distributors own the workflow — no dependency on any vendor's ZTP platform
- Multi-vendor from day one — Poly, Yealink, Grandstream in one system
- Every partner gets a custom template — Comcast gets one, Bell Canada gets another
- Template changes on demand — partner asks, TierAlto delivers, distributor charges for it
- Completion reports per order — proof of work that justifies the premium per-unit fee
```

---

### Section 3 — Service 1: Pre-Shipment Device Configuration

Anchor: #service-1 | Background: White
Layout: 2-col (text left, image right) desktop, stacked mobile

```
TAG: Service 1
HEADLINE: Pre-Shipment Device Configuration
TAGLINE: "More than a URL on a phone. A complete, validated, partner-ready device."

DESCRIPTION:
Most pre-shipment provisioning sets one thing: a URL. The phone
plugs in, calls home, and gets configured later — by someone else's
server, on someone else's timeline.

TierAlto PreShip goes further. Before a device leaves the warehouse
it is fully personalized: partner branding loaded, timezone set,
menus locked to spec, firmware validated, security certificates
applied, and every step logged with a completion record the
distributor can stand behind.

The process runs on the distributor's own hardware. No credentials
handed to a third party. No dependency on the customer's provisioning
server being reachable at staging time.

STAGING TIERS:
- Standard — Provisioning URL set, firmware validated, completion log generated
- Professional — Standard + timezone, language, menu locks, out-of-box experience
- Premium — Professional + partner branding, ringtone, security certificates, installer notification

PRICING: "Per-unit and project-based pricing available"
```

IMAGE: [PLACEHOLDER] Yealink T5 series — dark background product shot

---

### Section 4 — Service 2: Provisioning Workflow Design

Anchor: #service-2 | Background: Light Gray #F5F5F5
Layout: 2-col (image left, text right) desktop, stacked mobile

```
TAG: Service 2
HEADLINE: Provisioning Workflow Design
TAGLINE: "Built to own. Not locked into someone else's platform."

DESCRIPTION:
Designing and implementing the internal automation workflows that
distributors and channel partners use to stage, configure, and
validate devices at scale — across multiple vendors simultaneously.
Built to be owned and operated by the client, not locked into a
SaaS subscription that changes without warning.

INCLUDES:
- Multi-vendor support: Poly, Yealink, Grandstream in one workflow
- Config template design and validation against device schemas
- Runs on your own hardware — no per-seat SaaS fees
- Documented, maintainable, and extensible by your own team
- Partner-specific templates built and updated as requirements evolve

PRICING: "Fixed-fee engagements from $5,000"
```

IMAGE: [PLACEHOLDER] Poly Edge E450 product shot

---

### Section 5 — Service 3: UC Platform Advisory

Anchor: #service-3 | Background: White

```
TAG: Service 3
HEADLINE: UC Platform Advisory
TAGLINE: "Vendor-neutral guidance from engineers who've seen it all."

DESCRIPTION:
Vendor-neutral guidance on voice, SIP, SBCs, unified communications
platforms, and technology decisions — from a team that has worked
inside these systems at enterprise scale for decades. Joining calls,
reviewing deployments, evaluating proposals, and helping partners
and distributors make the right technical decisions without a
product agenda.

IDEAL FOR:
- Channel partners closing complex UC or voice deals
- Companies evaluating vendor proposals or platform migrations
- Teams navigating a technical dispute with a manufacturer
- Anyone who needs a vendor-neutral second opinion fast

PRICING: "From $250/hour — Retainers from $1,800/month"
```

---

### Section 6 — Service 4: Ongoing Automation Partnership

Anchor: #service-4 | Background: Light Gray #F5F5F5

```
TAG: Service 4
HEADLINE: Ongoing Automation Partnership
TAGLINE: "First call for anything technical. We stay involved."

DESCRIPTION:
A retainer relationship for clients who want their tools, templates,
and workflows to keep improving as their business and vendor
landscape evolves. First call for any new technical problem, new
partner requirement, or new automation opportunity — without
re-explaining the business every time.

INCLUDED:
- Updates to provisioning templates as partner requirements change
- New vendor additions to existing multi-vendor workflows
- Advisory on new tools or platform decisions
- On-call support when something breaks or needs immediate attention
- TierAlto pushes template updates directly to your system — no manual process

PRICING: "Monthly retainer — starter, partner, and embedded tiers"
```

---

### Section 7 — Service 5: Custom Provisioning Application Build

Anchor: #service-5 | Background: White
Layout: 2-col (text left, image right) desktop, stacked mobile

```
TAG: Service 5
HEADLINE: Custom Provisioning Application Build
TAGLINE: "One application. Everything pre-loaded. Ready to stage on day one."

DESCRIPTION:
For distributors and partners who want a complete, self-contained
staging solution built specifically for their operation, TierAlto
builds it.

A single application — installed on a PC or local server, connected
to a POE switch — with everything pre-configured for the way your
business works. Templates already built for your partners. Config
files already validated. HTTP server already running. Firmware
already loaded. Branding assets already in place.

The warehouse team doesn't configure anything. They open the app,
follow the workflow, and start staging phones. No technical knowledge
required to operate it.

INCLUDED:
- Full provisioning application installed and configured for your hardware
- Partner-specific templates pre-loaded for your staging operation
- Embedded HTTP provisioning server — no external dependencies
- DHCP server with Option 66 pre-configured for your network
- Firmware files for your device portfolio loaded locally
- Branding assets per partner — logos, ringtones, screen configs
- Real-time staging dashboard showing per-device progress
- Completion report generation per order
- Workflow documentation for warehouse operators
- One clean interface — no technical knowledge required

NOT INCLUDED:
- Not a SaaS subscription you pay for monthly
- Not a vendor portal you're locked into
- Not a managed service where someone else controls your process

PRICING: "Custom project — scoped per distributor size, partner count, and device portfolio"
```

IMAGE: [PLACEHOLDER] TierAlto PreShip dashboard UI screenshot

---

### Section 8 — Pricing Transparency

Background: Light Teal #E6F5F7

```
HEADLINE: How TierAlto Is Priced
INTRO: Every engagement starts with a free 30-minute discovery call.
       No obligation, no pitch.

TIERS:
- Advisory & consulting — from $250/hour
- Day rate (up to 8 hrs) — $1,800/day
- Monthly retainer — from $1,800/month (8 hrs) to $7,500/month (40 hrs)
- Project engagements — fixed fee, scoped and agreed upfront
- Custom application builds — quoted per project based on scope

NOTE: Retainer clients receive priority scheduling, same-day response,
and direct access for any question — technical or otherwise.
Unused retainer hours do not roll over.
```

---

### Section 9 — FAQ

Background: White | Accordion — all collapsed by default

```
HEADLINE: Common Questions
```

Q1: Do you work with distributors who aren't technically sophisticated?
A1: Yes — and that's often the point. TierAlto builds tools and workflows
that non-technical warehouse operators can run without understanding what's
under the hood. The technical complexity lives in the setup and the build.
The day-to-day operation is simple by design.

Q2: Can you support multiple device vendors in the same engagement?
A2: That's one of TierAlto's core capabilities. Most provisioning services
are built around one vendor's platform. TierAlto builds workflows that
handle Poly, Yealink, and Grandstream in the same pipeline — same process,
same dashboard, same completion report.

Q3: Do I need to share vendor credentials or provisioning server passwords?
A3: No. TierAlto PreShip runs locally on your hardware. The phone gets the
provisioning server URL embedded during staging and calls home itself after
deployment. Your partner's server credentials stay with you.

Q4: Is this a SaaS subscription or a one-time engagement?
A4: Neither, unless you want it to be. Project engagements are fixed-fee —
you pay for the work, you own the result. If you want TierAlto to stay
involved for ongoing changes and support, a monthly retainer covers that.
There is no per-seat fee for any tool TierAlto builds for you.

Q5: What happens if something breaks after delivery?
A5: Every engagement includes documentation and a handover so your team
understands what was built. For retainer clients, TierAlto is the first call
when something goes wrong. For project-only clients, we offer post-delivery
support packages.

Q6: Can you work remotely or do you need to be on site?
A6: Most of what TierAlto does is remote — provisioning workflows,
configuration builds, advisory calls, and template updates. On-site presence
is available for initial installations, warehouse setup, or complex
deployments where physical access makes more sense.

Q7: How long does a typical provisioning workflow build take?
A7: A single-vendor provisioning workflow for one partner template is
typically 2-3 weeks from scoping to delivery. A multi-vendor custom
application build runs 4-8 weeks. We'll give you a realistic timeline
during the discovery call.

Q8: What's the minimum engagement?
A8: A single advisory call at the hourly rate — no minimum commitment.
The discovery call is free.

---

### Section 10 — Services CTA

Background: Navy #1E2761 | Text: White

```
HEADLINE: Not sure which service fits?
BODY: Book a free discovery call and we'll figure it out together.
CTA: [Book a Discovery Call]   /contact
```

---

## 6. PAGE 3 — FIELD NOTES

URL: tieralto.com/field-notes

---

### Section 1 — Page Header

Background: Navy #1E2761 | Text: White

```
HEADLINE: Field Notes

SUBHEAD: Real problems from real deployments. Written from decades
of experience in voice, VoIP, and unified communications.

TOPIC FILTERS (pill buttons):
All  Provisioning  SIP / VoIP  UC Advisory  AI Automation  Pre-Shipment

Filter style: white outline/text inactive, teal bg/white text active
```

---

### Section 2 — Post Grid

Responsive: 3-col desktop, 2-col tablet, 1-col mobile

Card style: White bg, 4px teal top border, radius 12px, shadow-card,
topic tag pill, H3 title navy, one-liner muted, read time, "Read more" teal link

---

POST 1:
```
SLUG:      /field-notes/distributor-failure-rate
TOPIC:     Provisioning
READ TIME: 4 min

TITLE: Why your distributor's failure rate isn't their fault — and how to fix it

ONE-LINER: When vendor ZTP platforms go down, distributors take the blame.
Here's how to stop depending on platforms you don't control.

THE PROBLEM:
A distributor has 200 phones to stage for a partner order due Friday. They
plug them into the switch as usual, the vendor's zero-touch provisioning
platform is unreachable, and nothing registers. The phones sit there. The
order doesn't ship. The partner calls to find out what happened. The
distributor has no answer except "the vendor's platform is down" — which
sounds like an excuse even when it's true.

WHY IT HAPPENS:
Most distributors stage phones using a vendor-provided ZTP service. These
are free services that do one thing: tell the phone where to go for its
config. When they're down or changed without notice, every phone in the
staging bay stops working. The distributor has no fallback because they
never owned the process to begin with.

THE FIX:
Run a local provisioning server on your own hardware. TierAlto PreShip
serves the provisioning URL directly from a device on your staging network
— no vendor platform required, no internet dependency, no outage risk.
The phone gets its URL from your server, not theirs.

WHAT THIS TELLS YOU:
Every service you depend on that you don't control is a risk. Vendor ZTP
is convenient until it isn't. Building your own staging pipeline takes a
one-time investment and pays back every time the vendor has a bad day.

CTA: "Dealing with this? Book a 30-minute call."   /contact
```

---

POST 2:
```
SLUG:      /field-notes/firmware-mismatch-customer-site
TOPIC:     Pre-Shipment
READ TIME: 3 min

TITLE: The firmware problem that only shows up at the customer site

ONE-LINER: Phones staged with the wrong firmware register fine in the
warehouse. They fail when they reach the platform.

THE PROBLEM:
Phone is staged, tested, boxed, shipped. Installer arrives at the customer
site, plugs it in, and it either can't register to the platform or it
registers but key features don't work. The staging team did everything
right. The phone looked fine on the bench. The problem is that the firmware
version loaded during staging isn't compatible with the platform the
customer is running.

WHY IT HAPPENS:
Vendors release new firmware regularly. Platforms like Cisco CUCM, Microsoft
Teams, and Zoom Phone all have minimum firmware requirements that change.
If nobody validated the firmware version against the platform requirement at
staging time, the mismatch travels all the way to the customer site — and
the installer is the one who discovers it.

THE FIX:
Build firmware validation into the pre-ship workflow. Before any phone is
boxed, the staging system confirms the firmware version matches the target
platform requirement. If it doesn't, the firmware is updated during staging
— not by the installer at 9pm at the customer site.

WHAT THIS TELLS YOU:
Pre-ship validation isn't a nice-to-have. It's the difference between a
clean installation and a support call. Every step you validate in the
warehouse is a step that can't fail in the field.

CTA: "Want a staging workflow that catches this? Let's talk."   /contact
```

---

POST 3:
```
SLUG:      /field-notes/sip-registration-failure-causes
TOPIC:     SIP / VoIP
READ TIME: 5 min

TITLE: Three reasons a phone fails to register after deployment —
and none of them are the phone

ONE-LINER: SIP registration failures at the customer site almost always
trace back to something catchable before the phone left the warehouse.

THE PROBLEM:
Installer plugs in the phone. It powers on, contacts the provisioning
server, downloads the config — and then fails to register. No dial tone.
No service. Customer is watching. Installer is on the phone with support.
Nobody can figure out why it worked in the warehouse and doesn't work here.

WHY IT HAPPENS:
Three causes come up over and over.

1. NAT traversal — the phone's SIP traffic is hitting a firewall that
wasn't configured to allow it. The warehouse network didn't have this
restriction. The customer's network does.

2. SBC misconfiguration — the Session Border Controller at the edge of
the customer's network isn't passing the phone's registration through.
Usually a missing trunk entry or an IP whitelist that doesn't include
the new devices.

3. Credentials not loading — the username and password the phone needs
to register weren't in the config file, or the config file never fully
loaded because the provisioning server timed out on first contact.

THE FIX:
For NAT and SBC issues — a pre-deployment site readiness check. Before
the installer arrives, TierAlto reviews the network config and confirms
SIP traffic can pass end-to-end. For credential issues — validate the
config file was fully applied during staging. The completion log should
confirm every parameter including auth credentials.

WHAT THIS TELLS YOU:
Most SIP registration failures are diagnostic, not technical mysteries.
If you know what to look for — and where to look — they resolve in minutes.

CTA: "Troubleshooting a registration failure right now?
Submit your deployment and we'll take a look."   /deployments
```

---

### Section 3 — Newsletter Subscribe Strip

Background: Navy #1E2761 | Text: White

```
HEADLINE: Get new field notes when they publish.
BODY: No marketing. No product pitches. Just real problems and how we solved them.
INPUT: [Email address]
BUTTON: [Subscribe]
```

---

## 7. PAGE 4 — DEPLOYMENTS

URL: tieralto.com/deployments

---

### Section 1 — Page Header

Background: Navy #1E2761 | Text: White

```
HEADLINE: Tell Us About Your Deployment

SUBHEAD:
Working on a deployment, troubleshooting a provisioning issue, or
planning something you're not sure how to approach? Share the details.
TierAlto reviews every submission and responds within one business
day if there's something we can help with.

No obligation. No sales pitch. Just an expert set of eyes on what
you're dealing with.
```

---

### Section 2 — Intake Form

Background: White | Max-width: 720px centered

SECTION A — ABOUT YOU:

| Field | Type | Required |
|-------|------|---------|
| Name | Text | Yes |
| Company | Text | Yes |
| Role | Select: Distributor, VAR/Reseller, MSP, IT Manager, Installer, Other | Yes |
| Email | Email | Yes |
| Phone | Text | No |

SECTION B — YOUR DEPLOYMENT:

| Field | Type | Options |
|-------|------|---------|
| Device vendors | Checkboxes | Poly, Yealink, Grandstream, Cisco, Avaya, Other |
| Platform | Select | Teams, Webex, Zoom Phone, RingCentral, 8x8, Hosted PBX, On-Premise, Other |
| Device count | Select | 1-10, 11-50, 51-200, 200+ |
| Stage | Select | Planning, Pre-staging, In progress, Troubleshooting, Post-deployment |

SECTION C — THE SITUATION:

| Field | Type | Notes |
|-------|------|-------|
| Describe your situation | Textarea | 500 chars, required |
| Outcome | Checkboxes | Technical advice, Provisioning help, Vendor guidance, Just sharing, Interested in TierAlto services |

```
SUBMIT: [Submit Your Deployment]  (teal, full-width on mobile)
NOTE:   "We review every submission and respond within 1 business day."
```

---

### Section 3 — Privacy Note

```
What you share here stays between you and TierAlto. We don't sell
or share submission data. We use it only to understand your situation
and respond to you directly.
```

Small text, muted #6B7280, centered below form.

---

## 8. PAGE 5 — ABOUT

URL: tieralto.com/about

---

### Section 1 — Page Header

Background: Navy #1E2761 | Text: White

```
HEADLINE: Built from the Inside Out.

INTRO: Most consulting firms learn about your industry from a distance.
TierAlto was built from decades of experience inside it.
```

---

### Section 2 — Our Story

Background: White

```
BODY:
TierAlto was founded by engineers who spent their careers working
inside leading voice and communications technology companies — not
as observers, but as the people solving the problems. Solutions
architects, technical specialists, and project leads who supported
enterprise deployments of SIP, VoIP, audio/video systems, Session
Border Controllers, and unified communications platforms at scale.

The work covered everything from advising large service providers on
platform decisions, to troubleshooting the late-night deployment
that wasn't going as planned, to building the workflows that made
staging operations actually work. That breadth of experience — across
the full stack, across vendors, across roles — is what TierAlto brings
to every engagement.

TierAlto is the direct application of that experience, now available
to channel partners, distributors, and growing companies who deserve
the same expertise — without the manufacturer politics.
```

---

### Section 3 — Our Philosophy

Background: Light Teal #E6F5F7

```
HEADLINE: Our Philosophy

BODY:
We believe that most technology projects fail not because of bad
technology — but because of bad ownership.

Someone has to step in and say: "I've got it. I'll make sure this
gets done." That's what TierAlto does.

No finger-pointing. No escalation labyrinths. No "that's not my
area." You get a team that understands the full system and is
accountable for the result.
```

---

### Section 4 — The Team

Background: White

```
HEADLINE: The Team

BODY:
TierAlto is being built around engineers who have worked together
supporting some of the industry's largest service providers and
channel partners. People who know these systems, these vendors, and
these problems from the inside — and who are now putting that
expertise to work directly for clients rather than through a
manufacturer's support chain.

As TierAlto grows, so does the team. Every new engagement is handled
by someone who has done this before — not a generalist with good
intentions, but a specialist with the experience to prove it.
```

---

### Section 5 — Areas of Expertise

Background: Light Gray #F5F5F5

```
HEADLINE: Areas of Expertise

TAGS (13 teal outline pill badges):
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

### Section 6 — About CTA

Background: Navy #1E2761 | Text: White

```
HEADLINE: Let's Talk.
BODY: If what you've read sounds like what you've been looking for,
the next step is simple.
CTA:   [Book a Free Discovery Call]   /contact
PHONE: 1-678-699-5935
```

---

## 9. PAGE 6 — CONTACT

URL: tieralto.com/contact

---

### Section 1 — Page Header

Background: Navy #1E2761 | Text: White

```
HEADLINE: Book a Discovery Call

INTRO:
A free 30-minute call to talk through what you're working on.

No pitch. No pressure. If TierAlto is a fit, we'll tell you how
we'd approach it and what it would cost. If it's not, we'll tell
you that too.

PHONE (large, prominent, tap-to-call): 1-678-699-5935
AVAILABLE VIA: Phone · Zoom · Microsoft Teams
```

Phone style: large white text, teal underline, href="tel:16786995935"

---

### Section 2 — Contact Form

Background: White | Max-width: 640px centered

| Field | Type | Required |
|-------|------|---------|
| Name | Text | Yes |
| Email | Email | Yes |
| Company | Text | No |
| Phone | Text | No |
| What are you working on? | Textarea | Yes |
| How did you hear about TierAlto? | Text | No |

```
SUBMIT: [Request a Discovery Call]  (teal, full-width mobile)
NOTE:   "We respond to every inquiry within 1 business day."
```

---

### Section 3 — Alternative Contact

```
Prefer email?  hello@tieralto.com
Or call:       1-678-699-5935
```

---

## 10. GLOBAL WIDGETS

### Widget 1 — Newsletter Subscription

Appears on: Homepage Section 8, Footer Column 3, Field Notes bottom strip

BEHAVIOR:
- Email input + Subscribe button
- On submit: inline message "You're subscribed — field notes coming your way."
- Error: "Please enter a valid email address."
- No page reload on submit

VISUAL STYLE:
- On navy bg: transparent input with white border, teal button
- On light bg: light gray input with default border, teal button
- Button: teal #028090, white text, radius 6px

IMPLEMENTATION (in preference order):
1. Mailchimp embed (free tier)
2. ConvertKit form embed
3. Formspree with email tag
4. Custom API call to chosen provider

NOTE FOR DEVELOPER: Build the UI fully. Wire to real provider once
account is confirmed. Use action="#" placeholder in the meantime.

---

### Widget 2 — Chatbot

Appears on: All pages — fixed bottom-right corner

TRIGGER BUTTON:
- Size: 56x56px circle
- Background: teal #028090
- Icon: white chat bubble SVG
- Position: fixed, bottom 24px, right 24px, z-index 9999
- Hover: scale(1.08), brighter shadow

CHAT PANEL (opens upward on click):
- Size: 320x480px
- Background: white
- Header: navy #1E2761, TIERALTO wordmark white, "Chat with us" teal
- Close button: top right

GREETING (auto-displayed on open):
```
"Hi — I'm TierAlto's assistant. I can answer questions about our
services, provisioning, or help you book a discovery call.
What are you working on?"
```

HANDLES:
- Service questions → brief summary + link to /services
- Pricing questions → share ranges + encourage discovery call
- Provisioning / technical questions → brief answer + Field Notes link
- Booking request → link to /contact or Calendly when available
- Phone request → display 1-678-699-5935 as tap-to-call

FALLBACK (anything outside scope):
```
"That's a great question for a real conversation. Let's connect:

1-678-699-5935
tieralto.com/contact"
```

IMPLEMENTATION OPTIONS:
1. Tidio — free tier, easy embed, scripted + AI responses
2. Crisp — free tier, clean UI, good mobile
3. Custom Claude-powered widget using Anthropic API
   (see Claude API patterns in PreShip Phase 1 spec)

NOTE FOR DEVELOPER: Build the full chat bubble and panel UI.
It must look complete even before the backend is connected.
Wire to real provider or Claude API once confirmed.

---

### Widget 3 — Phone Number

Number: 1-678-699-5935
HTML: <a href="tel:16786995935">1-678-699-5935</a>

Appears on:
- Header (mobile — tap-to-call link)
- Homepage Section 10 (Final CTA — note below button)
- About page Section 6 CTA
- Contact page Section 1 (large, prominent)
- Contact page Section 3 (alternative contact)
- Footer Column 1
- Chatbot fallback message

Style:
- On navy bg: white text, teal underline on hover
- On light bg: navy text, teal underline on hover
- Never plain black text — always navy or white depending on bg

---


---

## 10.5 LOGO INTEGRATION — PLACEMENT GUIDE

This section documents exactly how the logo SVG files are used at every
location across the site. Claude Code should implement each placement
exactly as specified.

---

### Placement 1 — Navigation Bar (All Pages)

**File:** `tieralto-logo-horizontal.svg`
**Background context:** Navy #1E2761

```jsx
// In your Header/Nav component
<a href="/" className="ta-nav-logo" aria-label="TierAlto — Home">
  <img
    src="/images/tieralto-logo-horizontal.svg"
    alt="TierAlto"
    width="160"
    height="52"
    style={{ display: 'block' }}
  />
</a>
```

```css
.ta-nav-logo img {
  width: 160px;
  height: auto;
}
@media (max-width: 768px) {
  .ta-nav-logo img { width: 130px; }
}
```

The horizontal lockup shows the mountain icon left + "TierAlto" wordmark
right, all white — designed specifically for the navy nav background.

---

### Placement 2 — Footer Column 1 (All Pages)

**File:** `tieralto-logo-white.svg`
**Background context:** Navy #1E2761

```jsx
// In your Footer component, Column 1
<div className="ta-footer-brand">
  <a href="/" aria-label="TierAlto — Home">
    <img
      src="/images/tieralto-logo-white.svg"
      alt="TierAlto"
      width="120"
      style={{ display: 'block', marginBottom: '12px' }}
    />
  </a>
  <p style={{ color: '#7EC8D8', fontStyle: 'italic', fontSize: '13px' }}>
    Where Expertise Meets Accountability.
  </p>
  <a href="tel:16786995935" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'block', marginTop: '10px' }}>
    1-678-699-5935
  </a>
  <a href="mailto:hello@tieralto.com" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
    hello@tieralto.com
  </a>
</div>
```

The white stacked logo (mountain icon above wordmark) sits above the tagline
in teal italic. Do not repeat the tagline as a separate text element if
it is already part of the SVG — check the SVG file first.

---

### Placement 3 — Favicon (All Pages, in <head>)

**File:** `tieralto-icon.svg`

```html
<!-- In <head> of every page — or in Next.js app/layout.tsx metadata -->
<link rel="icon" type="image/svg+xml" href="/images/tieralto-icon.svg"/>
<link rel="icon" type="image/png" sizes="32x32" href="/images/tieralto-icon.png"/>
<link rel="apple-touch-icon" sizes="180x180" href="/images/tieralto-icon.png"/>
```

For Next.js App Router, add to `app/layout.tsx`:
```typescript
export const metadata = {
  icons: {
    icon: '/images/tieralto-icon.svg',
    apple: '/images/tieralto-icon.png',
  },
}
```

Note: Create a 180x180px PNG version of the icon for Apple touch icon support.
Export from the SVG using any image editor or Inkscape.

---

### Placement 4 — Success / Thank-You Page

**File:** `tieralto-logo-color.svg`
**Background context:** White #FFFFFF

```jsx
// At the top of the /thank-you page card component
<img
  src="/images/tieralto-logo-color.svg"
  alt="TierAlto"
  width="180"
  style={{
    display: 'block',
    margin: '0 auto 32px',
  }}
/>
```

The full color stacked logo (navy/teal mountain + navy wordmark) sits centered
at the top of the white success card, above the checkmark and confirmation message.

---

### Placement 5 — Exit Intent Popup

**File:** `tieralto-icon.svg`
**Background context:** White popup card

```html
<!-- Inside the exit popup modal, above the headline -->
<img src="/images/tieralto-icon.svg"
     alt="TierAlto"
     style="width:36px; height:36px; margin-bottom:16px;"/>
```

Small icon-only mark as a trust signal above the popup headline.
Do not use the full wordmark here — the popup is compact and the
icon alone is sufficient.

---

### Placement 6 — Chatbot Widget Header

**File:** `tieralto-icon.svg`
**Background context:** Navy #1E2761 chat header bar

```html
<!-- Inside the chatbot panel header -->
<div style="background:#1E2761; padding:14px 16px; display:flex;
  align-items:center; gap:10px; border-radius:12px 12px 0 0;">

  <img src="/images/tieralto-icon.svg"
       alt="TierAlto icon"
       style="width:28px; height:28px; flex-shrink:0;"/>

  <div>
    <div style="color:#FFFFFF; font-weight:600; font-size:14px; line-height:1.2;">
      TierAlto
    </div>
    <div style="color:#7EC8D8; font-size:11px; line-height:1.3;">
      Where Expertise Meets Accountability.
    </div>
  </div>

  <button aria-label="Close chat"
    style="margin-left:auto; background:none; border:none;
    color:rgba(255,255,255,0.5); font-size:20px; cursor:pointer;">
    &times;
  </button>

</div>
```

Icon sits left, "TierAlto" bold white text beside it, tagline in teal below.
Close button floats right. This is the header of the chat panel that slides
up when the user clicks the floating chat bubble.

---

### Placement 7 — Field Notes Post Byline

**File:** `tieralto-icon.svg`
**Background context:** White post page

```html
<!-- Below post title, above post body — "Written by TierAlto" line -->
<div style="display:flex; align-items:center; gap:8px;
  margin-bottom:24px; padding-bottom:16px;
  border-bottom:0.5px solid #E2E8F0;">
  <img src="/images/tieralto-icon.svg"
       alt="TierAlto"
       style="width:20px; height:20px; border-radius:4px;"/>
  <span style="font-size:13px; color:#6B7280;">
    TierAlto · Field Notes
  </span>
  <span style="font-size:13px; color:#6B7280; margin-left:auto;">
    [Read time] min read
  </span>
</div>
```

Tiny icon acts as an avatar/byline mark. This keeps the post feeling
authored and branded without being visually heavy.

---

### Placement 8 — OG / Social Share Image

**File:** `tieralto-logo-white.svg`
**Canvas:** 1200×630px, navy background #1E2761

Create a static `og-image.png` at 1200×630px:
- Background: solid navy #1E2761
- Centered: tieralto-logo-white.svg at approximately 320px wide
- Below logo: tagline "Where Expertise Meets Accountability." in teal #7EC8D8
- This file goes in `/public/og-image.png`
- Referenced in `<meta property="og:image" content="/og-image.png"/>`

Tools to create it: Figma, Canva, or Inkscape. Export as PNG at 1200×630.

---

### Logo Integration — Quick Reference Card

```
PLACEMENT               FILE                           SIZE      BG COLOR
────────────────────────────────────────────────────────────────────────────
Nav bar (desktop)       tieralto-logo-horizontal.svg   160px w   #1E2761
Nav bar (mobile)        tieralto-logo-horizontal.svg   130px w   #1E2761
Footer column 1         tieralto-logo-white.svg        120px w   #1E2761
Success/thank-you       tieralto-logo-color.svg        180px w   #FFFFFF
Exit intent popup       tieralto-icon.svg              36px      #FFFFFF
Chatbot header          tieralto-icon.svg              28px      #1E2761
Favicon                 tieralto-icon.svg              32x32px   browser
Field Notes byline      tieralto-icon.svg              20px      #FFFFFF
OG share image          tieralto-logo-white.svg        320px w   #1E2761 canvas
────────────────────────────────────────────────────────────────────────────
```


---

## 11. ASSET INVENTORY

### Logo / Wordmark

All logo files are in: `D:\projects\TierAlto\src\images\`
Reference in code as: `/images/[filename]`

| File | Variant | Status | Used For |
|------|---------|--------|---------|
| `tieralto-logo-horizontal.svg` | White on transparent | READY | Nav bar desktop + mobile |
| `tieralto-logo-white.svg` | White on transparent | READY | Footer column 1 |
| `tieralto-logo-color.svg` | Full color on transparent | READY | Success page, light sections |
| `tieralto-icon.svg` | Full color on transparent | READY | Favicon, chatbot, popup, byline |
| `tieralto-logo-variants.svg` | All variants | REFERENCE ONLY | Do not deploy |

### Photography
| Asset | Status | Used In |
|-------|--------|---------|
| Yealink T5 series product shot | PLACEHOLDER | Services — Service 1 |
| Poly Edge E450 product shot | PLACEHOLDER | Services — Service 2 |
| PreShip dashboard screenshot | PLACEHOLDER | Services — Service 5 |

PLACEHOLDER STYLE for all image slots:
```html
<div style="background:#1E2761; aspect-ratio:16/9; display:flex;
  align-items:center; justify-content:center; border-radius:12px;
  color:rgba(255,255,255,0.35); font-size:13px; font-style:italic;">
  [Asset name — pending]
</div>
```

### Icons (all SVG, teal #028090)
Service 1: Phone + checkmark
Service 2: Connected nodes
Service 3: Speech bubble + circuit
Service 4: Circular arrows
Service 5: Code brackets + window
Chatbot trigger: Chat bubble
Email: Envelope
Phone: Handset
Accordion: Chevron
Links: Arrow right

Source: Heroicons or Lucide (MIT licensed — no attribution required)

---

## 12. COMPONENT DESIGN SYSTEM

### Service Card
```css
background: #FFFFFF;
border-top: 4px solid #028090;
border-radius: 12px;
box-shadow: 0 2px 12px rgba(0,0,0,0.08);
padding: 24px;
transition: box-shadow 0.2s;
```
Hover: box-shadow: 0 4px 20px rgba(0,0,0,0.12)

### Expertise Tag / Pill
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
```
Hover: background: #026d79

### Secondary Button (Outlined)
```css
background: transparent;
color: #FFFFFF;
border: 0.5px solid currentColor;
border-radius: 6px;
padding: 12px 24px;
font-size: 15px;
cursor: pointer;
```

### Newsletter Input Row
```css
/* Container */
display: flex; gap: 8px; align-items: center;

/* Input on dark bg */
background: transparent;
border: 1px solid rgba(255,255,255,0.4);
border-radius: 6px;
padding: 10px 14px;
color: #FFFFFF;
font-size: 14px;
flex: 1;

/* Input on light bg */
background: #F5F5F5;
border: 0.5px solid #CCCCCC;
color: #374151;
```

### Chatbot Trigger Button
```css
position: fixed;
bottom: 24px;
right: 24px;
z-index: 9999;
width: 56px;
height: 56px;
border-radius: 50%;
background: #028090;
border: none;
cursor: pointer;
box-shadow: 0 4px 16px rgba(2,128,144,0.4);
transition: transform 0.15s, box-shadow 0.15s;
```
Hover: transform: scale(1.08)

### FAQ Accordion Item
```css
border-bottom: 0.5px solid #E2E8F0;
padding: 16px 0;
/* Question row: flex space-between, chevron rotates 90deg on open */
/* Answer panel: max-height transition 0 to auto for smooth expand */
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
```
Focus: border-color: #028090; outline: none
Error: border-color: #D93025

---

## 13. TECHNICAL GUIDANCE

### Recommended Stack
- Framework: Next.js (preferred for SEO) or React + Vite
- CSS: Tailwind CSS or plain CSS with custom properties
- Fonts: Inter from Google Fonts — 400, 500, 600, 700, 800
- Icons: Heroicons or Lucide React (MIT licensed)
- Forms: Formspree or Netlify Forms
- Newsletter: Mailchimp embed (TBC — build UI first)
- Chatbot: Tidio, Crisp, or custom Claude API (TBC — build UI first)
- Booking CTAs: link to /contact until Calendly configured

### Responsive Breakpoints
- Mobile:  375px
- Tablet:  768px
- Desktop: 1280px
- Wide:    1440px

### Accessibility
- Semantic HTML: header, nav, main, section, footer, article
- All images: descriptive alt text
- Skip-to-content link at page top
- Focus states: :focus-visible ring in teal #028090
- WCAG AA contrast minimum on all text
- Accordion: aria-expanded, aria-controls on triggers
- Phone links: href="tel:16786995935"
- Chatbot: aria-label on trigger button, focus trap when panel open

### Performance
- Lazy load all images below the fold
- SVG icons inline — no icon font
- No heavy JS libraries on marketing pages
- CSS custom properties for theming

---

## 14. SEO & META TAGS

| Page | Title | Description |
|------|-------|-------------|
| Home | TierAlto - Vendor-Neutral Technology Consulting | TierAlto brings together decades of experience in voice, VoIP, and unified communications. One team. Complete ownership. |
| Services | Services - TierAlto Technology Consulting | Pre-shipment device configuration, provisioning workflow design, UC advisory, and custom application builds. |
| Field Notes | Field Notes - TierAlto Technology Consulting | Real problems from real deployments. Written from decades of experience in voice, VoIP, and unified communications. |
| Deployments | Get a Field Assessment - TierAlto | Tell TierAlto about your deployment. Expert review, response within one business day. |
| About | About - TierAlto Technology Consulting | TierAlto is built by engineers with decades of experience inside the voice and unified communications industry. |
| Contact | Contact - Book a Discovery Call - TierAlto | Book a free 30-minute discovery call. Call 1-678-699-5935 or fill out the form. |

All pages Open Graph:
- og:type: website
- og:site_name: TierAlto
- og:image: /og-image.png (1200x630 navy card with wordmark)

---

## 15. DO NOT INCLUDE

- Any reference to HP, HP Inc, Polycom, Plantronics, or Poly as former employers
- Any language implying insider knowledge of any company's internal plans
- "22 years" as a specific number — use "decades of experience" throughout
- "Our principal consultant" — use "our team" or "TierAlto" framing
- Specific client names (no case studies exist yet at launch)
- Vendor logos without written permission
- Stock photography of people
- Claims of being certified or an official partner of any vendor unless confirmed
- Excessive AI buzzwords — describe what automation does, not the label

---

## DEVELOPER NOTES

1. Logo SVG files are READY and must be used. All four files are in
   D:\projects\TierAlto\src\images\ and referenced as /images/[filename].
   Do NOT render the logo as CSS text. Do NOT use placeholder divs for the logo.
   For product photography (Yealink, Poly, PreShip dashboard) — those image
   slots still use placeholder divs until real assets arrive.

2. Logo files are real SVGs — use them, do not render as CSS text.
   Files are in D:\projects\TierAlto\src\images\
   Nav bar:      tieralto-logo-horizontal.svg (white version, 160px desktop / 130px mobile)
   Footer:       tieralto-logo-white.svg (120px wide)
   Success page: tieralto-logo-color.svg (180px wide)
   Favicon:      tieralto-icon.svg (32x32px in <head>)
   Chatbot:      tieralto-icon.svg (28px in chat header)
   Exit popup:   tieralto-icon.svg (36px accent above headline)
   Post byline:  tieralto-icon.svg (20px beside "TierAlto" author label)

3. Phone number must be tap-to-call on mobile everywhere it appears.
   Always use: <a href="tel:16786995935">1-678-699-5935</a>

4. Newsletter UI must be built fully even before provider is connected.
   Use action="#" and show a success state placeholder until wired up.

5. Chatbot UI must be built fully even before backend is connected.
   Trigger button, chat panel, greeting, and fallback must all render.

6. Field Notes post data can live in a JS array or MDX files.
   No CMS needed at launch. Structure for easy post additions.

7. Both forms need real handlers. Formspree recommended.
   Configure to deliver to hello@tieralto.com.

8. All booking CTAs link to /contact until Calendly is provided.

9. Copyright year: new Date().getFullYear()

10. All copy is final as written in this spec. Do not paraphrase,
    shorten, or reorder any section. Use the exact text throughout.

---

End of Specification — TierAlto — tieralto.com — March 2026
