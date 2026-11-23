import { useEffect, useState } from "react";
import CookieConsent from "vanilla-cookieconsent";

export default function useConsent(category: string) {
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    const update = () => setAccepted(CookieConsent.acceptedCategory(category));
    update(); // current state on mount
    window.addEventListener("cc:onConsent", update);
    window.addEventListener("cc:onChange", update);
    return () => {
      window.removeEventListener("cc:onConsent", update);
      window.removeEventListener("cc:onChange", update);
    };
  }, [category]);
  return accepted;
}
