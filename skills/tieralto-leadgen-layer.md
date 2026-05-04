---
name: tieralto-leadgen-layer
description: >
  TierAlto-specific lead generation and conversion layer. Deploy this skill
  against the TierAlto website build to inject a complete lead capture engine
  on top of the existing design — without changing colors, layout, or content.

  Triggers when the user says things like: "wire up the forms to Zoho",
  "add CTA buttons", "set up exit intent", "add social media icons",
  "deploy the lead gen layer", "add the logo to the chatbot", "set up
  the contact form", or "add attachment support to the form".

  Works on any HTML/React/Next.js TierAlto build.
  Does NOT rebuild or redesign anything. Adds revenue infrastructure only.
---

# TierAlto Lead Generation Layer

This skill adds a complete lead capture and conversion engine to the TierAlto
website. The design is never touched. This skill adds six revenue components:

```
WHAT THIS SKILL ADDS
  1. CTA Buttons    → sticky header CTA + per-section CTAs on every page
  2. Contact Form   → feeds Zoho CRM, supports file attachments, success page
  3. Exit Intent    → popup fires on cursor leave (desktop) / scroll-back (mobile)
  4. Newsletter     → email capture feeds Zoho CRM with tag "newsletter"
  5. Social Icons   → Instagram, X (Twitter), LinkedIn in footer + header mobile
  6. Logo in UI     → TierAlto SVG logo in chatbot header and success page
```

```
WHAT THIS SKILL NEVER CHANGES
  ✗ Design, colors, fonts, logo placement on main nav
  ✗ Page layout, section order, or existing content
  ✗ Navigation structure or internal links
  ✗ Existing copy, headings, or media files
  ✗ The chatbot widget itself (already specified in website spec)
```

---

## Pre-Flight Checklist

Before writing any code, confirm these items. Never assume. Never skip.

```
[ ] 1. SITE FILES
        Next.js / React source or exported HTML files provided

[ ] 2. ZOHO CRM CREDENTIALS
        Client ID      → ZOHO_CLIENT_ID
        Client Secret  → ZOHO_CLIENT_SECRET
        Refresh Token  → ZOHO_REFRESH_TOKEN
        (See: Zoho OAuth Setup section below if not yet generated)

[ ] 3. SOCIAL MEDIA HANDLES (confirm URLs before adding links)
        Instagram → https://instagram.com/[handle]
        X         → https://x.com/[handle]
        LinkedIn  → https://linkedin.com/company/[handle]

[ ] 4. LOGO FILE LOCATIONS
        D:\projects\TierAlto\src\images\tieralto-logo-white.svg
        D:\projects\TierAlto\src\images\tieralto-logo-color.svg
        D:\projects\TierAlto\src\images\tieralto-logo-horizontal.svg
        D:\projects\TierAlto\src\images\tieralto-icon.svg
        Reference in code as: /images/tieralto-logo-white.svg etc.

[ ] 5. SUCCESS PAGE URL
        Default: /thank-you
        Confirm or override with client preference

[ ] 6. ATTACHMENT TYPES ALLOWED ON CONTACT FORM
        Default: PDF, DOC, DOCX, PNG, JPG (max 10MB)
        Confirm or override

[ ] 7. EXIT INTENT POPUP OFFER COPY
        Default copy provided below — confirm or override
```

---

## Brand Reference — TierAlto

```
PRIMARY COLORS
  Navy:          #1E2761  (buttons, nav, hero, footer backgrounds)
  Teal:          #028090  (CTA buttons, accents, borders, links)
  Teal hover:    #026d79
  Navy hover:    #162255

TEXT COLORS
  White:         #FFFFFF  (on dark backgrounds)
  Heading:       #1A1A2E  (on light backgrounds)
  Body:          #374151
  Muted:         #6B7280

BACKGROUNDS
  Light teal:    #E6F5F7
  Light gray:    #F5F5F5
  White:         #FFFFFF

PHONE:           1-678-699-5935
EMAIL:           hello@tieralto.com
TAGLINE:         "Where Expertise Meets Accountability."

LOGO FILES (in D:\projects\TierAlto\src\images\)
  tieralto-logo-white.svg      White version — nav, footer, chatbot, dark bg
  tieralto-logo-color.svg      Color version — light bg sections
  tieralto-logo-horizontal.svg Horizontal nav lockup
  tieralto-icon.svg            Icon only — favicon, chatbot trigger badge
```

---

## Component 1 — CTA Buttons

### 1A: Sticky Header CTA

Already specified in the website spec as the "Book a Call" nav button.
Confirm it is:
- Teal `#028090` background, white text, border-radius 6px
- Visible on desktop nav at all times (rightmost element)
- On mobile: visible in sticky nav after scrolling past hero
- On click: navigates to /contact

```css
.ta-cta-nav {
  background: #028090;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background 0.15s;
  white-space: nowrap;
}
.ta-cta-nav:hover { background: #026d79; }
```

---

### 1B: Per-Section CTAs

Inject one CTA pill at the bottom of each major content section that does
not already have a button. Use this map:

| Section | CTA Copy | Destination |
|---------|----------|-------------|
| Homepage — Services Overview | View All Services | /services |
| Homepage — How It Works | Start with a Free Call | /contact |
| Homepage — Why TierAlto | See How We Work | /contact |
| Homepage — Who We Serve (Channel Partners) | Talk to Our Team | /contact |
| Homepage — Who We Serve (Distributors) | Let's Build Your Workflow | /contact |
| Homepage — Credibility / 22 Years | Book a Discovery Call | /contact |
| Services — each service block footer | Get a Quote for This | /contact |
| Services — Pricing section | Book a Free Discovery Call | /contact |
| Field Notes — each post footer | Dealing with this? Book a call. | /contact |
| About — Philosophy section | Learn How We Engage | /services |
| Deployments — page header | Submit Your Deployment | #ta-intake-form |

**Per-section CTA style (pill, outlined — fills on hover):**

```css
.ta-section-cta {
  display: inline-block;
  background: transparent;
  color: #028090;
  border: 1.5px solid #028090;
  border-radius: 24px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  margin-top: 24px;
  transition: background 0.15s, color 0.15s;
}
.ta-section-cta:hover {
  background: #028090;
  color: #FFFFFF;
}
/* On navy/dark sections — white outline variant */
.ta-section-cta-light {
  color: #FFFFFF;
  border-color: rgba(255,255,255,0.6);
}
.ta-section-cta-light:hover {
  background: rgba(255,255,255,0.15);
  border-color: #FFFFFF;
}
```

**Duplicate check rule:** Before injecting any section CTA, check whether
a `.ta-section-cta` or an existing `<a href="/contact">` button already
exists at the section bottom. If found — skip. Never add two CTAs to the
same section.

---

## Component 2 — Contact Form (Zoho CRM + Attachments + Success Page)

### 2A: Form Fields

```
REQUIRED:
  Name                          text input      required
  Email                         email input     required
  What are you working on?      textarea        required

OPTIONAL:
  Company / Organization        text input
  Phone                         tel input
  How did you hear about TierAlto?  text input

ATTACHMENT:
  Attach a file                 file input      optional
  Label: "Attach a file (optional) — PDF, DOC, DOCX, PNG, JPG · Max 10MB"
  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
  Client-side size limit: 10MB validated before submit

SUBMIT:
  Text: "Request a Discovery Call"
  Style: full-width teal button on mobile, normal width on desktop
  ID: ta-contact-submit
```

### 2B: Form HTML

```html
<form id="ta-contact-form" enctype="multipart/form-data" novalidate>

  <div class="ta-form-row">
    <label for="ta-name">Name <span class="ta-required" aria-label="required">*</span></label>
    <input type="text" id="ta-name" name="name" required
           placeholder="Your full name" autocomplete="name"/>
    <span class="ta-field-error" id="ta-name-error" role="alert"></span>
  </div>

  <div class="ta-form-row">
    <label for="ta-email">Email <span class="ta-required" aria-label="required">*</span></label>
    <input type="email" id="ta-email" name="email" required
           placeholder="you@company.com" autocomplete="email"/>
    <span class="ta-field-error" id="ta-email-error" role="alert"></span>
  </div>

  <div class="ta-form-row">
    <label for="ta-company">Company / Organization</label>
    <input type="text" id="ta-company" name="company"
           placeholder="Optional" autocomplete="organization"/>
  </div>

  <div class="ta-form-row">
    <label for="ta-phone">Phone</label>
    <input type="tel" id="ta-phone" name="phone"
           placeholder="Optional" autocomplete="tel"/>
  </div>

  <div class="ta-form-row">
    <label for="ta-message">What are you working on?
      <span class="ta-required" aria-label="required">*</span>
    </label>
    <textarea id="ta-message" name="message" rows="4" required
              placeholder="Briefly describe your project or challenge..."></textarea>
    <span class="ta-field-error" id="ta-message-error" role="alert"></span>
  </div>

  <div class="ta-form-row">
    <label for="ta-source">How did you hear about TierAlto?</label>
    <input type="text" id="ta-source" name="source" placeholder="Optional"/>
  </div>

  <div class="ta-form-row">
    <label for="ta-attachment">
      Attach a file
      <span class="ta-field-note">
        (optional — PDF, DOC, DOCX, PNG, JPG · Max 10MB)
      </span>
    </label>
    <input type="file" id="ta-attachment" name="attachment"
           accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"/>
    <span class="ta-field-error" id="ta-attachment-error" role="alert"></span>
  </div>

  <button type="submit" id="ta-contact-submit" class="ta-btn-primary">
    Request a Discovery Call
  </button>

  <p class="ta-form-note" id="ta-form-status">
    We respond to every inquiry within 1 business day.
  </p>

</form>
```

### 2C: Form CSS

```css
.ta-form-row {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ta-form-row label {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}
.ta-form-row input,
.ta-form-row textarea {
  width: 100%;
  background: #F5F5F5;
  border: 0.5px solid #CCCCCC;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 16px;
  color: #374151;
  font-family: inherit;
  transition: border-color 0.15s;
}
.ta-form-row input:focus,
.ta-form-row textarea:focus {
  outline: none;
  border-color: #028090;
  box-shadow: 0 0 0 3px rgba(2,128,144,0.12);
}
.ta-input-error {
  border-color: #D93025 !important;
}
.ta-field-error {
  font-size: 12px;
  color: #D93025;
  min-height: 16px;
}
.ta-required {
  color: #D93025;
  margin-left: 2px;
}
.ta-field-note {
  font-size: 12px;
  color: #6B7280;
  font-weight: 400;
  margin-left: 4px;
}
.ta-btn-primary {
  width: 100%;
  background: #028090;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 8px;
}
.ta-btn-primary:hover  { background: #026d79; }
.ta-btn-primary:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}
.ta-form-note {
  font-size: 13px;
  color: #6B7280;
  text-align: center;
  margin-top: 12px;
}
@media (min-width: 640px) {
  .ta-btn-primary { width: auto; min-width: 280px; }
}
```

### 2D: Client-Side Validation + Submit Handler

```javascript
// ─── Validation ──────────────────────────────────────────────────────────────
function taValidateContactForm() {
  let valid = true;

  function setError(id, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById(id + '-error');
    if (msg) {
      if (err) err.textContent = msg;
      if (el)  el.classList.add('ta-input-error');
      valid = false;
    } else {
      if (err) err.textContent = '';
      if (el)  el.classList.remove('ta-input-error');
    }
  }

  const name = document.getElementById('ta-name')?.value.trim();
  setError('ta-name', !name ? 'Please enter your name.' : '');

  const email = document.getElementById('ta-email')?.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setError('ta-email', !emailOk ? 'Please enter a valid email address.' : '');

  const msg = document.getElementById('ta-message')?.value.trim();
  setError('ta-message', !msg ? "Please tell us what you're working on." : '');

  const att = document.getElementById('ta-attachment');
  if (att?.files?.length > 0 && att.files[0].size > 10 * 1024 * 1024) {
    setError('ta-attachment', 'File is too large. Maximum size is 10MB.');
  } else {
    setError('ta-attachment', '');
  }

  return valid;
}

// ─── Submit handler ───────────────────────────────────────────────────────────
document.getElementById('ta-contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!taValidateContactForm()) return;

  const btn    = document.getElementById('ta-contact-submit');
  const status = document.getElementById('ta-form-status');

  btn.disabled    = true;
  btn.textContent = 'Sending…';
  if (status) { status.textContent = ''; status.style.color = ''; }

  const formData = new FormData();
  formData.append('name',     document.getElementById('ta-name').value.trim());
  formData.append('email',    document.getElementById('ta-email').value.trim());
  formData.append('company',  document.getElementById('ta-company')?.value.trim() || '');
  formData.append('phone',    document.getElementById('ta-phone')?.value.trim() || '');
  formData.append('message',  document.getElementById('ta-message').value.trim());
  formData.append('source',   document.getElementById('ta-source')?.value.trim() || '');
  formData.append('formType', 'contact-discovery');

  const att = document.getElementById('ta-attachment');
  if (att?.files?.length > 0) formData.append('attachment', att.files[0]);

  try {
    const res = await fetch('/api/contact-lead', { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Server error ' + res.status);
    window.location.href = '/thank-you';
  } catch (err) {
    btn.disabled    = false;
    btn.textContent = 'Request a Discovery Call';
    if (status) {
      status.textContent = 'Something went wrong. Please try again or call 1-678-699-5935.';
      status.style.color = '#D93025';
    }
  }
});
```

---

### 2E: Netlify Function — `/netlify/functions/contact-lead.js`

```javascript
// Handles: multipart form parse → Zoho OAuth refresh → Zoho lead create → file attach

async function getZohoToken() {
  const params = new URLSearchParams({
    grant_type:    'refresh_token',
    client_id:     process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
  });
  const res  = await fetch(`https://accounts.zoho.com/oauth/v2/token?${params}`, { method: 'POST' });
  const data = await res.json();
  if (!data.access_token) throw new Error('Zoho token refresh failed: ' + JSON.stringify(data));
  return data.access_token;
}

function parseMultipart(body, boundary) {
  const fields = {};
  let fileBuffer = null, fileName = null, fileMime = null;
  const parts = body.split(`--${boundary}`);
  for (const part of parts) {
    if (!part || part.trim() === '--') continue;
    const [headerBlock, ...bodyParts] = part.split('\r\n\r\n');
    const bodyContent = bodyParts.join('\r\n\r\n').replace(/\r\n$/, '');
    if (headerBlock.includes('filename=')) {
      const fnMatch = headerBlock.match(/filename="([^"]+)"/i);
      const ctMatch = headerBlock.match(/content-type:\s*([^\r\n]+)/i);
      fileName   = fnMatch ? fnMatch[1] : 'attachment';
      fileMime   = ctMatch ? ctMatch[1].trim() : 'application/octet-stream';
      fileBuffer = Buffer.from(bodyContent, 'binary');
    } else {
      const nameMatch = headerBlock.match(/name="([^"]+)"/i);
      if (nameMatch) fields[nameMatch[1]] = bodyContent;
    }
  }
  return { fields, fileBuffer, fileName, fileMime };
}

async function createZohoLead(token, fields) {
  const res = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
    method:  'POST',
    headers: { 'Authorization': `Zoho-oauthtoken ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [{
      Last_Name:   fields.name    || 'Unknown',
      Email:       fields.email   || '',
      Company:     fields.company || 'Not provided',
      Phone:       fields.phone   || '',
      Description: fields.message || '',
      Lead_Source: fields.source  || 'TierAlto Website',
      Lead_Status: 'Not Contacted',
      Form_Type:   fields.formType || 'contact-discovery',
    }]}),
  });
  const data = await res.json();
  if (!data?.data?.[0]?.details) throw new Error('Lead creation failed: ' + JSON.stringify(data));
  return data.data[0].details.id;
}

async function attachFile(token, leadId, fileBuffer, fileName, fileMime) {
  if (!fileBuffer?.length || !leadId) return;
  const boundary = '----TierAltoAttach' + Date.now();
  const CRLF = '\r\n';
  const header = Buffer.from(
    `--${boundary}${CRLF}Content-Disposition: form-data; name="file"; filename="${fileName}"${CRLF}Content-Type: ${fileMime}${CRLF}${CRLF}`
  );
  const footer = Buffer.from(`${CRLF}--${boundary}--${CRLF}`);
  const body   = Buffer.concat([header, fileBuffer, footer]);
  await fetch(`https://www.zohoapis.com/crm/v2/Leads/${leadId}/Attachments`, {
    method:  'POST',
    headers: {
      'Authorization':  `Zoho-oauthtoken ${token}`,
      'Content-Type':   `multipart/form-data; boundary=${boundary}`,
      'Content-Length': body.length,
    },
    body,
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const ct = event.headers['content-type'] || '';
    const bm = ct.match(/boundary=([^;]+)/);
    if (!bm) return { statusCode: 400, body: 'Missing multipart boundary' };
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('binary')
      : event.body;
    const { fields, fileBuffer, fileName, fileMime } = parseMultipart(rawBody, bm[1].trim());
    const token  = await getZohoToken();
    const leadId = await createZohoLead(token, fields);
    if (fileBuffer?.length) await attachFile(token, leadId, fileBuffer, fileName, fileMime);
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ success: true, leadId }) };
  } catch (err) {
    console.error('contact-lead error:', err);
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ success: false, error: err.message }) };
  }
};
```

---

### 2F: Zoho CRM Environment Variables

Set in Netlify dashboard → Site settings → Environment variables.
**Never hard-code credentials in source files.**

```
ZOHO_CLIENT_ID       = [from Zoho API Console]
ZOHO_CLIENT_SECRET   = [from Zoho API Console]
ZOHO_REFRESH_TOKEN   = [generated via OAuth flow]
```

### 2G: Zoho OAuth Setup (if credentials not yet generated)

```
1. Go to: https://api-console.zoho.com
2. Create "Server-based Application"
3. Copy Client ID and Client Secret
4. Set Redirect URI: https://tieralto.com (or any valid URI)
5. Visit this URL in browser:
   https://accounts.zoho.com/oauth/v2/auth?
     scope=ZohoCRM.modules.ALL,ZohoCRM.files.ALL&
     client_id=YOUR_CLIENT_ID&
     response_type=code&
     access_type=offline&
     redirect_uri=YOUR_REDIRECT_URI
6. Authorize — copy the "code" from the redirect URL
7. Run this to get your refresh token:
   curl -X POST https://accounts.zoho.com/oauth/v2/token \
     -d "grant_type=authorization_code" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "redirect_uri=YOUR_REDIRECT_URI" \
     -d "code=CODE_FROM_STEP_6"
8. Save the refresh_token — it is permanent
```

---

## Component 3 — Success Page (`/thank-you`)

Create this page at `pages/thank-you.jsx` or `app/thank-you/page.jsx`.
Redirect to it after successful contact form submission.

```jsx
// pages/thank-you.jsx  OR  app/thank-you/page.jsx

import Head from 'next/head'   // or use metadata export for App Router

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Request Received — TierAlto</title>
        <meta name="robots" content="noindex"/>
      </Head>

      <main style={{
        minHeight: '100vh',
        background: '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '48px 40px',
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}>

          {/* TierAlto logo — color version */}
          <img
            src="/images/tieralto-logo-color.svg"
            alt="TierAlto"
            style={{ width: '160px', marginBottom: '32px' }}
          />

          {/* Success checkmark */}
          <div style={{
            width: '64px', height: '64px',
            background: '#E6F5F7',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l7 7 11-11"
                stroke="#028090" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: '26px', fontWeight: '700',
            color: '#1A1A2E', marginBottom: '12px',
          }}>
            We've received your request.
          </h1>

          {/* Body */}
          <p style={{
            fontSize: '16px', color: '#374151',
            lineHeight: '1.7', marginBottom: '8px',
          }}>
            Someone from our team will be in touch within
            <strong> 1 business day</strong>.
          </p>
          <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '32px' }}>
            In the meantime, if you need to reach us directly:
          </p>

          {/* Contact options */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '12px',
            marginBottom: '36px',
          }}>
            <a href="tel:16786995935" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '8px', padding: '12px 20px',
              background: '#1E2761', color: '#FFFFFF',
              borderRadius: '8px', textDecoration: 'none',
              fontSize: '15px', fontWeight: '500',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 1h3l1.5 3.5-1.75 1.05A9 9 0 008.45 9.25L9.5 7.5 13 9v3a1 1 0 01-1 1C6.477 13 3 9.523 3 5a1 1 0 011-1z"
                  fill="currentColor"/>
              </svg>
              Call 1-678-699-5935
            </a>

            <a href="mailto:hello@tieralto.com" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '8px', padding: '12px 20px',
              background: 'transparent', color: '#028090',
              border: '1.5px solid #028090',
              borderRadius: '8px', textDecoration: 'none',
              fontSize: '15px', fontWeight: '500',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="2"
                  stroke="currentColor" strokeWidth="1.5"/>
                <path d="M1 6l7 4 7-4"
                  stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              hello@tieralto.com
            </a>
          </div>

          {/* Back link */}
          <a href="/" style={{
            fontSize: '14px', color: '#6B7280', textDecoration: 'none',
          }}>
            ← Back to TierAlto.com
          </a>

        </div>
      </main>
    </>
  )
}
```

---

## Component 4 — Exit Intent Popup

### Behavior

- **Desktop:** fires when cursor moves toward top of browser window
  (mouseleave on document with clientY < 10px)
- **Mobile:** fires after user scrolls 60%+ of page depth, then scrolls
  back up more than 300px
- **One per session:** uses sessionStorage key `ta-exit-shown`
- **Dismissible:** click overlay or × button closes it
- **Esc key:** closes the popup

### Popup Copy

```
HEADLINE:   "Before you go — not sure where to start?"
SUBHEAD:    "Book a free 30-minute call. No pitch. Just an honest
             conversation about what you're working on."
FIELD:      Name (text, required)
FIELD:      Email (email, required)
BUTTON:     "Book a Free Discovery Call"
DISMISS:    "No thanks, I'll figure it out myself"
```

### HTML (inject before `</body>` on every page)

```html
<!-- TierAlto Exit Intent Popup -->
<div id="ta-exit-overlay" style="display:none; position:fixed; inset:0;
  background:rgba(0,0,0,0.55); z-index:99990; align-items:center;
  justify-content:center; padding:24px;">
  <div id="ta-exit-modal" style="background:#fff; border-radius:16px;
    padding:40px 36px; max-width:480px; width:100%; position:relative;
    box-shadow:0 8px 40px rgba(0,0,0,0.18);">

    <button id="ta-exit-close" aria-label="Close"
      style="position:absolute; top:16px; right:16px; background:none;
      border:none; font-size:22px; color:#6B7280; cursor:pointer; line-height:1;">
      &times;
    </button>

    <img src="/images/tieralto-icon.svg" alt="TierAlto"
      style="width:40px; margin-bottom:20px;"/>

    <h2 style="font-size:22px; font-weight:700; color:#1A1A2E; margin-bottom:10px;">
      Before you go — not sure where to start?
    </h2>
    <p style="font-size:15px; color:#374151; line-height:1.6; margin-bottom:24px;">
      Book a free 30-minute call. No pitch. Just an honest conversation
      about what you're working on.
    </p>

    <form id="ta-exit-form">
      <div style="margin-bottom:12px;">
        <input type="text" id="ta-ep-name" placeholder="Your name"
          required style="width:100%; padding:10px 14px; border-radius:6px;
          border:0.5px solid #CCCCCC; font-size:15px; background:#F5F5F5;
          box-sizing:border-box;"/>
      </div>
      <div style="margin-bottom:18px;">
        <input type="email" id="ta-ep-email" placeholder="Email address"
          required style="width:100%; padding:10px 14px; border-radius:6px;
          border:0.5px solid #CCCCCC; font-size:15px; background:#F5F5F5;
          box-sizing:border-box;"/>
      </div>
      <button type="submit" id="ta-ep-submit"
        style="width:100%; background:#028090; color:#fff; border:none;
        border-radius:6px; padding:13px 20px; font-size:15px;
        font-weight:500; cursor:pointer;">
        Book a Free Discovery Call
      </button>
    </form>

    <p style="text-align:center; margin-top:16px;">
      <button id="ta-exit-dismiss"
        style="background:none; border:none; color:#6B7280; font-size:13px;
        cursor:pointer; text-decoration:underline;">
        No thanks, I'll figure it out myself
      </button>
    </p>

  </div>
</div>
```

### JavaScript (inject before `</body>`, after the HTML above)

```javascript
(function() {
  'use strict';
  const SESSION_KEY = 'ta-exit-shown';
  if (sessionStorage.getItem(SESSION_KEY)) return;

  const overlay  = document.getElementById('ta-exit-overlay');
  const closeBtn = document.getElementById('ta-exit-close');
  const dismiss  = document.getElementById('ta-exit-dismiss');
  const form     = document.getElementById('ta-exit-form');
  if (!overlay) return;

  function open() {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, '1');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Desktop: cursor leaves top of viewport
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (!isMobile) {
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 10) open();
    });
  }

  // Mobile: deep scroll then scroll back up
  if (isMobile) {
    let lastY = 0, upDist = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const pct = y / (document.body.scrollHeight - window.innerHeight);
      if (pct < 0.6) { lastY = y; upDist = 0; return; }
      if (y < lastY) {
        upDist += lastY - y;
        if (upDist > 300) open();
      } else { upDist = 0; }
      lastY = y;
    }, { passive: true });
  }

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  closeBtn.addEventListener('click', close);
  dismiss.addEventListener('click',  close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name  = document.getElementById('ta-ep-name').value.trim();
    const email = document.getElementById('ta-ep-email').value.trim();
    if (!name || !email) return;

    const btn = document.getElementById('ta-ep-submit');
    btn.disabled    = true;
    btn.textContent = 'Sending…';

    const formData = new FormData();
    formData.append('name',     name);
    formData.append('email',    email);
    formData.append('formType', 'exit-intent');
    formData.append('message',  'Exit intent popup submission');

    try {
      await fetch('/api/contact-lead', { method: 'POST', body: formData });
      // Redirect to thank-you
      window.location.href = '/thank-you';
    } catch {
      btn.disabled    = false;
      btn.textContent = 'Book a Free Discovery Call';
    }
  });
}());
```

---

## Component 5 — Newsletter (Zoho CRM Integration)

Newsletter submissions create a Zoho CRM lead with `Lead_Source: "Newsletter"`
and a custom tag field `Form_Type: "newsletter"` so they're distinguishable
from contact leads.

### Newsletter Function — `/netlify/functions/newsletter.js`

```javascript
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { email, source } = JSON.parse(event.body || '{}');
    if (!email) return { statusCode: 400, body: JSON.stringify({ error: 'Email required' }) };

    // Get Zoho token (same helper as contact-lead)
    const params = new URLSearchParams({
      grant_type:    'refresh_token',
      client_id:     process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    });
    const tokenRes  = await fetch(`https://accounts.zoho.com/oauth/v2/token?${params}`, { method: 'POST' });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) throw new Error('Token refresh failed');

    const leadRes = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
      method:  'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${tokenData.access_token}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({ data: [{
        Last_Name:   email.split('@')[0],
        Email:       email,
        Lead_Source: source || 'TierAlto Newsletter',
        Lead_Status: 'Not Contacted',
        Form_Type:   'newsletter',
        Description: 'Field Notes newsletter subscriber',
      }]}),
    });
    const leadData = await leadRes.json();
    console.log('Newsletter lead:', JSON.stringify(leadData));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('newsletter error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
```

### Newsletter Widget JavaScript (inject on every page with a newsletter form)

```javascript
document.querySelectorAll('.ta-newsletter-form').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const btn        = form.querySelector('button[type="submit"]');
    const feedback   = form.querySelector('.ta-newsletter-feedback');
    const email      = emailInput?.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (feedback) feedback.textContent = 'Please enter a valid email address.';
      return;
    }

    if (btn) { btn.disabled = true; btn.textContent = 'Subscribing…'; }

    try {
      const res = await fetch('/api/newsletter', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, source: 'TierAlto Newsletter — Field Notes' }),
      });
      if (!res.ok) throw new Error('Server error');
      form.innerHTML = `
        <p class="ta-newsletter-success">
          ✓ You're subscribed — field notes coming your way.
        </p>`;
    } catch {
      if (btn)      { btn.disabled = false; btn.textContent = 'Subscribe'; }
      if (feedback) { feedback.textContent = 'Something went wrong. Please try again.'; }
    }
  });
});
```

Add `class="ta-newsletter-form"` to every newsletter `<form>` element.
Add `class="ta-newsletter-feedback"` to the error/feedback `<span>` below the input.
Add `class="ta-newsletter-success"` styles:

```css
.ta-newsletter-success {
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 500;
  padding: 12px 0;
}
/* On light bg */
.ta-newsletter-success-light {
  color: #028090;
}
```

---

## Component 6 — Social Media Icons

### Icon SVGs (inline — no external library needed)

```javascript
// Social icon SVGs — use inline in JSX or inject as HTML

const SOCIAL_ICONS = {
  instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>`,

  x: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.264 5.633 5.9-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>`,

  linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" stroke-width="1.8"/>
    <path d="M7 10v7M7 7v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M11 17v-4a2 2 0 014 0v4M11 10v7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,
};
```

### Placement 1 — Footer Column 1 (below email address)

Add after `hello@tieralto.com` in footer Column 1:

```html
<div class="ta-social-links" style="display:flex; gap:14px; margin-top:16px;">
  <a href="https://instagram.com/[HANDLE]"
     target="_blank" rel="noopener noreferrer"
     aria-label="TierAlto on Instagram"
     class="ta-social-icon">
    <!-- Instagram SVG here -->
  </a>
  <a href="https://x.com/[HANDLE]"
     target="_blank" rel="noopener noreferrer"
     aria-label="TierAlto on X"
     class="ta-social-icon">
    <!-- X SVG here -->
  </a>
  <a href="https://linkedin.com/company/[HANDLE]"
     target="_blank" rel="noopener noreferrer"
     aria-label="TierAlto on LinkedIn"
     class="ta-social-icon">
    <!-- LinkedIn SVG here -->
  </a>
</div>
```

### Placement 2 — Mobile Header (inside hamburger menu)

Add at the bottom of the mobile menu panel, below nav links:

```html
<div class="ta-social-links-mobile" style="
  display:flex; gap:16px; padding:20px 24px;
  border-top:0.5px solid rgba(255,255,255,0.15);
  margin-top:16px;">
  <!-- Same three icon links as footer -->
</div>
```

### Social Icon CSS

```css
.ta-social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}
.ta-social-icon:hover {
  background: rgba(255,255,255,0.2);
  color: #FFFFFF;
}
/* On light backgrounds */
.ta-social-icon-light {
  background: #F5F5F5;
  color: #6B7280;
}
.ta-social-icon-light:hover {
  background: #E6F5F7;
  color: #028090;
}
```

**Note:** Replace `[HANDLE]` placeholders with confirmed social media handles
from the Pre-Flight Checklist before deploying. Do not use placeholder URLs
on the live site.

---

## Component 7 — TierAlto Logo in Chatbot

The chatbot widget header (whether using Tidio, Crisp, or a custom widget)
should display the TierAlto icon and wordmark.

### For custom chatbot widget (from website spec)

Update the chat panel header:

```html
<!-- Chat panel header — inside the chatbot widget -->
<div id="ta-chat-header" style="
  background: #1E2761;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 12px 12px 0 0;">

  <img src="/images/tieralto-icon.svg"
       alt="TierAlto"
       style="width: 28px; height: 28px;"/>

  <div>
    <div style="color:#FFFFFF; font-weight:600; font-size:14px; line-height:1.2;">
      TierAlto
    </div>
    <div style="color:#7EC8D8; font-size:11px; line-height:1.2;">
      Where Expertise Meets Accountability.
    </div>
  </div>

  <button id="ta-chat-close" aria-label="Close chat"
    style="margin-left:auto; background:none; border:none;
    color:rgba(255,255,255,0.6); font-size:18px; cursor:pointer;">
    &times;
  </button>
</div>
```

### For Tidio or Crisp

Upload `tieralto-icon.svg` as the bot avatar in the widget settings.
Set the bot name to "TierAlto" and the welcome message to the copy
specified in the website spec.

---

## netlify.toml

```toml
[build]
  publish = "dist"
  functions = "netlify/functions"

[dev]
  port = 8888
  framework = "#static"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to   = "/.netlify/functions/:splat"
  status = 200
```

---

## Execution Order — Apply to Every Page

When deploying this layer, process every HTML/JSX page in this sequence:

```
FOR EACH PAGE:

 1. Read the file
 2. Inject social icon CSS into <head> (once per file)
 3. Inject form CSS into <head>        (contact page only)
 4. Inject exit popup CSS into <head>  (once per file)
 5. Inject per-section CTAs at section bottoms (use CTA map)
 6. Update all newsletter <form> elements with ta-newsletter-form class
 7. Add social icons to footer Column 1 (layout component only)
 8. Add social icons to mobile menu (layout component only)
 9. Inject exit popup HTML before </body>
10. Inject exit popup JS before </body>
11. Inject newsletter JS before </body>   (once — all forms on page)
12. Save the file
13. Log: "[filename] — injected: [list every component added]"

AFTER ALL PAGES:
  → Create netlify/functions/contact-lead.js
  → Create netlify/functions/newsletter.js
  → Create netlify.toml
  → Verify all [HANDLE] placeholders are replaced with real social URLs
  → Report: pages modified, components added per page, functions created
```

**Duplicate check:** Before injecting any component, check if its ID or class
already exists. If found — skip. Never add the same component twice.

---

## Pre-Delivery Checklist

**Forms**
- [ ] Contact form submits to /api/contact-lead via multipart POST
- [ ] Zoho CRM receives test lead — verified in Zoho after submission
- [ ] File attachment uploads successfully to Zoho lead record
- [ ] Redirect to /thank-you on successful contact form submit
- [ ] Newsletter form submits to /api/newsletter
- [ ] Newsletter lead appears in Zoho CRM with Form_Type "newsletter"
- [ ] Exit intent form submits to /api/contact-lead with formType "exit-intent"

**Success Page**
- [ ] /thank-you renders correctly after form submit
- [ ] TierAlto logo (color version) displays on success page
- [ ] Phone link 1-678-699-5935 is tap-to-call
- [ ] Email link hello@tieralto.com is clickable
- [ ] Back link returns to homepage

**CTAs**
- [ ] "Book a Call" appears in nav bar (sticky, visible on scroll)
- [ ] Per-section CTAs present in every content section per CTA map
- [ ] No duplicate CTAs — only one button per section
- [ ] Pill CTAs use correct color variant (teal on light, white on dark)
- [ ] Exit intent popup fires on desktop cursor-leave (not scroll-up)
- [ ] Exit intent popup fires on mobile after deep scroll + scroll back
- [ ] Exit intent popup shows only once per session (sessionStorage check)

**Social Icons**
- [ ] Instagram, X, LinkedIn icons in footer Column 1
- [ ] Icons in mobile hamburger menu
- [ ] All three links open in new tab with rel="noopener noreferrer"
- [ ] All [HANDLE] placeholders replaced with real URLs
- [ ] Icons readable on navy background

**Logo in Chatbot**
- [ ] TierAlto icon visible in chatbot header
- [ ] Chatbot header uses navy #1E2761 background
- [ ] Bot name "TierAlto" and tagline visible in header

**Technical**
- [ ] No console errors on any page
- [ ] Netlify function logs show successful POST on test submissions
- [ ] ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN set in
      Netlify environment variables (not in source code)
- [ ] netlify.toml /api/* redirect is present

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| 401 from Zoho | Refresh token expired — regenerate via OAuth |
| Form submits but no CRM entry | Confirm env vars set in Netlify dashboard, not just locally |
| File attachment not in Zoho | Confirm ZohoCRM.files.ALL scope was included in OAuth |
| Exit popup fires every page load | Confirm sessionStorage.setItem is in the open() function |
| Exit popup fires on desktop scroll | Remove scroll listener on desktop — mouseleave only |
| CORS error on form submit | Confirm netlify.toml /api/* redirect is present |
| netlify dev hangs | Remove targetPort — use framework = "#static" |
| Social icons not showing | Confirm SVG inline — not as an img src reference |
| Logo not showing in chatbot | Confirm /images/tieralto-icon.svg path is correct and file exists |
| [HANDLE] still in social URLs | Replace all three handles with confirmed real URLs before deploy |
| Thank-you page not redirecting | Confirm window.location.href = '/thank-you' runs after res.ok check |

---

*TierAlto Lead Gen Layer SKILL.md — tieralto.com — March 2026*
