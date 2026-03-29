// TierAlto Conversion Components — Global Configuration
const conversionConfig = {

  exitIntent: {
    enabled: true,
    headline: "Before you go — not sure where to start?",
    subheadline: "Book a free 30-minute call. No pitch. Just an honest conversation about what you're working on.",
    ctaText: "Book a Free Discovery Call",
    ctaLink: "/contact/",
    dismissText: "No thanks, I'll figure it out myself",
    desktopOnly: true,
    sessionKey: "ta-exit-shown",
  },

  stickyBottomBar: {
    enabled: true,
    scrollThreshold: 300,
    backgroundColor: "#1E2761",
    textColor: "#FFFFFF",
    ctaButtonColor: "#028090",
    ctaButtonTextColor: "#FFFFFF",
    sessionKey: "ta-bottom-bar-dismissed",
    pages: {
      default:      { headline: "Ready to move forward?",              ctaText: "Book a Free Call",        ctaLink: "/contact/" },
      "/services/": { headline: "Not sure which service fits?",         ctaText: "Book a Free Call",        ctaLink: "/contact/" },
      "/field-notes/": { headline: "Dealing with this? Let's talk.",   ctaText: "Book 30 Min",             ctaLink: "/contact/" },
      "/deployments/": { headline: "Working on a deployment right now?", ctaText: "Submit Your Deployment", ctaLink: "/deployments/" },
      "/about/":    { headline: "Sounds like what you've been looking for?", ctaText: "Book a Discovery Call", ctaLink: "/contact/" },
    },
  },

  floatingButton: {
    enabled: true,
    color: "#028090",
    tooltip: "Contact us",
    pulse: true,
    expandable: true,
    contacts: [
      { icon: "phone",    label: "Call us",    link: "tel:16786995935",           color: "#028090" },
      { icon: "email",    label: "Email us",   link: "mailto:hello@tieralto.com", color: "#1E2761" },
      { icon: "calendar", label: "Book a call", link: "/contact/",                color: "#028090" },
    ],
  },

  trustBadges: {
    enabled: true,
    backgroundColor: "#E6F5F7",
    textColor: "#1E2761",
    iconColor: "#028090",
    marqueeOnMobile: true,
    badges: [
      { icon: "award",           text: "Decades of Industry Experience" },
      { icon: "shield-check",    text: "Vendor-Neutral — No Product Agenda" },
      { icon: "cpu-chip",        text: "Multi-Vendor: Poly · Yealink · Grandstream" },
      { icon: "document-check",  text: "Fixed-Fee Engagements — No Surprises" },
      { icon: "users",           text: "Channel Partners & Distributors" },
    ],
  },

  backToTop: {
    enabled: true,
    scrollThreshold: 400,
    color: "#028090",
  },

  scrollProgress: {
    enabled: true,
    color: "#028090",
    height: "3px",
    zIndex: 10000,
  },

  cookieBanner: {
    enabled: true,
    message: "TierAlto uses cookies to improve your experience on our site.",
    acceptText: "Accept",
    declineText: "Decline",
    backgroundColor: "#1E2761",
    textColor: "#FFFFFF",
    acceptButtonColor: "#028090",
    storageKey: "ta-cookie-consent",
  },

  helloBar: {
    enabled: false,
    message: "New field notes published — read the latest from our team.",
    link: "/field-notes/",
    linkText: "Read now →",
    emoji: "📡",
    backgroundColor: "#028090",
    textColor: "#FFFFFF",
    storageKey: "ta-hello-bar-dismissed",
  },
};
