import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { MobileHeader } from "@/components/mobile-header";
import { Footer } from "@/components/footer";
import { MdHeader } from "@/components/md-hero";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free QR Code",
  description: "Gere QR codes gratuitos com sua marca no meio!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.className} w-full max-w-screen overflow-x-hidden pb-20 antialiased`}
      >
        <MobileHeader />
        <MdHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
