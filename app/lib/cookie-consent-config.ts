import type { CookieConsentConfig } from "vanilla-cookieconsent";

// Categories must match the cookie policy (/cookies) and the privacy policy.
// - necessary: only the banner's own cookie (cc_cookie), always on
// - analytics: Google Analytics, only after consent (Vercel Analytics is cookieless)
// - social: Instagram, Facebook, X, TikTok and YouTube embeds, only after consent
export const cookieConsentConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom left",
      // "Accept all" is the primary (dark) button, "Reject all" the secondary one.
      equalWeightButtons: false,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      equalWeightButtons: false,
      flipButtons: false,
    },
  },
  categories: {
    necessary: { enabled: true, readOnly: true },
    analytics: {},
    social: {},
  },
  // English only for now. Add "es" and "de" together with the site translations,
  // otherwise visitors would get a German banner on an English page.
  language: {
    default: "en",
    translations: {
      en: {
        consentModal: {
          title: "Cookies, but only if you want them",
          description:
            "We use a few optional cookies: to understand which guides are useful (Google Analytics) and to show posts from Instagram, TikTok, YouTube and other platforms. Nothing optional is loaded until you say yes.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Choose",
          footer:
            '<a href="/privacy">Privacy policy</a>\n<a href="/cookies">Cookie policy</a>\n<a href="/legal-notice">Legal notice</a>',
        },
        preferencesModal: {
          title: "Cookie settings",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save my choice",
          closeIconLabel: "Close",
          sections: [
            {
              description:
                'Choose which optional cookies you allow. You can change your choice at any time with "Cookie settings" at the bottom of every page. Details in our <a href="/cookies" class="cc__link">cookie policy</a>.',
            },
            {
              title:
                'Necessary <span class="pm__badge">Always on</span>',
              description:
                "One cookie that remembers your choice in this window. Without it, we'd have to ask you on every page.",
              linkedCategory: "necessary",
            },
            {
              title: "Analytics",
              description:
                "Google Analytics shows us which pages people read and how they find them, so we know which guides to improve. Google sets cookies for this.",
              linkedCategory: "analytics",
            },
            {
              title: "Social media",
              description:
                "Shows embedded posts and videos from Instagram, Facebook, X, TikTok and YouTube. These platforms receive your IP address and may set their own cookies. If you say no, you can still load a single post with a click.",
              linkedCategory: "social",
            },
          ],
        },
      },
    },
  },
};
