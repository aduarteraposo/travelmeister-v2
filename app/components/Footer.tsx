import Link from "next/link";

export const FOOTER_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/how-we-earn-money", label: "How we earn money" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/cookies", label: "Cookie policy" },
  { href: "/legal-notice", label: "Legal notice" },
] as const;

const CONTACT_EMAIL = "hello@travelmeister.eu";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10 md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="font-semibold text-xl">
            Travelmeister
          </Link>
          <p className="mt-3 text-sm text-gray-300">
            Hotel rooms worth the trip, checked room by room by Alejandro and
            Naiara.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-block mt-4 py-1 text-sm underline underline-offset-4 hover:text-gray-300"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-8 gap-y-1 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-1.5 hover:underline underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              {/* vanilla-cookieconsent opens its settings for any element with this attribute */}
              <button
                type="button"
                data-cc="show-preferencesModal"
                className="inline-block py-1.5 hover:underline underline-offset-4 cursor-pointer"
              >
                Cookie settings
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15">
        <p className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-400">
          © {new Date().getFullYear()} TravelMeister. Some links on this site
          are affiliate links: if you book through them, we may earn a
          commission at no extra cost to you.
        </p>
      </div>
    </footer>
  );
}
