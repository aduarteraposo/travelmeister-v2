import type { Metadata } from "next";
import ContentPage from "../components/ContentPage";

export const metadata: Metadata = {
  title: "How we earn money",
  alternates: { canonical: "/how-we-earn-money" },
};

export default function Page() {
  return <ContentPage slug="how-we-earn-money" />;
}
