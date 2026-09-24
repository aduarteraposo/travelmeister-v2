"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";

const NAV_LINKS = [
  { href: "/destinations", label: "Destinations" },
  { href: "/organized-trips", label: "Organized Trips" },
  { href: "/group-trips", label: "Group Trips" },
  { href: "/itinerary-planner", label: "Itinerary Planner" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 py-3 bg-white shadow transition-all duration-300 ease-out">
      <div className="max-w-6xl flex flex-col items-end md:items-center relative mx-auto px-4">
        <Link
          href="/"
          className={`
            ${isScrolled ? "-top-3" : " top-[2px] md:-top-2"} absolute left-4`}
        >
          <img
            src={isScrolled ? "/logo_small.svg" : "/logo.svg"}
            alt="Travelmeister - Home"
            className={`${
              isScrolled ? "w-12 md:w-12" : "w-16 md:w-24"
            } transition-all duration-200`}
          />
        </Link>
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <img
            src={`${isOpen ? "/close-icon.svg" : "/burger-icon.svg"}`}
            alt=""
            className="w-8 h-auto"
          />
        </button>
        <div
          className={`${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] invisible md:visible"
          } grid md:grid-rows-[1fr] self-center transition-all duration-300 ease-out`}
        >
          <nav className="md:mx-auto overflow-hidden">
            <ul className="md:flex gap-4 lg:gap-8 font-semibold text-center md:text-left">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li
                    key={item.href}
                    className={`py-1 px-2 hover:text-green-300 ${
                      isActive ? "border-b-3 border-b-green-300" : ""
                    }`}
                  >
                    <NavbarItem href={item.href} label={item.label} />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
