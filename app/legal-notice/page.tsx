import type { Metadata } from "next";
import ContentPage from "../components/ContentPage";

export const metadata: Metadata = {
  title: "Legal notice",
  alternates: { canonical: "/legal-notice" },
};

export default function Page() {
  return <ContentPage slug="legal-notice" />;
}
