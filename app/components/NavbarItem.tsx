import Link from "next/link";

export default function NavbarItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return <Link href={href}>{label}</Link>;
}
