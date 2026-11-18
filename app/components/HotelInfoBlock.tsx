import { ReactNode } from "react";

export default function HotelInfoBlock({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-xl border p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </section>
  );
}
