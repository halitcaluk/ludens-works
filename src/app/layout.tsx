import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ludens Works | Lifecycle & Retention CRM Agency",
  description:
    "E-ticaret ve dijital markalar icin lifecycle marketing, CRM stratejisi ve otomasyon cozumleri.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
