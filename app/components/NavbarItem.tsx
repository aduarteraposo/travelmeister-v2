import Link from "next/link";

export default function NavbarItem({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`underline-offset-8 ${
        isActive
          ? "underline decoration-green-300 decoration-2"
          : "hover:underline"
      }`}
    >
      {label}
    </Link>
  );
}
