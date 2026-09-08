import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://iconicdentaldesigns.com"),
  title: {
    default: "Iconic Dental Designs | Global Digital Dental Lab",
    template: "%s | Iconic Dental",
  },
  description:
    "Iconic Dental provides digital dental design services worldwide — fixed & removable prosthesis, implants, night guards and cosmetic wax-ups, engineered with precision and delivered on time.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
