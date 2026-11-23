"use client";
import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { cookieConsentConfig } from "../lib/cookie-consent-config";

// The library draws the banner itself and only works in the browser,
// so it runs in an effect and this component renders nothing.
export default function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run(cookieConsentConfig);
  }, []);
  return null;
}
