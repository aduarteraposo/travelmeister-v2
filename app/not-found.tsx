import type { Metadata } from "next";
import Link from "next/link";

// Shown for every notFound() call and for URLs that match no route.
// Next.js adds noindex to 404 responses automatically.
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="max-w-xl mx-auto py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3">
        404
      </p>
      <h1 className="font-outdoor text-6xl md:text-7xl mb-4">
        This room isn&apos;t on our map
      </h1>
      <p className="mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Maybe
        one of these helps:
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="rounded-full py-3 px-6 bg-black text-white font-medium border border-black"
        >
          Go to the homepage
        </Link>
        <Link
          href="/destinations"
          className="rounded-full py-3 px-6 border border-black font-medium"
        >
          Browse destinations
        </Link>
      </div>
    </section>
  );
}
