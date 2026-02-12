import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Providers from "./providers";

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
    <Providers>
      <html lang="pt-BR" className="max-w-screen overflow-x-hidden">
        <body
          className={`${roboto.className} min-h-screen w-full max-w-screen overflow-x-hidden pb-20 antialiased lg:flex lg:flex-col`}
        >
          <Header />
          <main className="">{children}</main>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
