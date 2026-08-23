import type { Metadata } from "next";
import { Inter, Chakra_Petch, Space_Mono } from "next/font/google";
import "./globals.css";

const inter        = Inter({ subsets: ["latin"], variable: "--font-sans" });
const chakraPetch  = Chakra_Petch({ subsets: ["latin"], variable: "--font-display", weight: ["400","600","700"] });
const spaceMono    = Space_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sovaprotocol.xyz"),
  title: "SOVA Protocol — Verifiable Reputation on Whitechain",
  description: "Issuer-signed, schema-bound onchain attestations for explicit and explainable consumer policies. Live on Whitechain Sepolia.",
  openGraph: { title: "SOVA Protocol — Reputation should be proven", description: "Verifiable reputation infrastructure, live on Whitechain Sepolia.", url: "https://sovaprotocol.xyz", siteName: "SOVA Protocol", type: "website" },
  twitter: { card: "summary", title: "SOVA Protocol — Reputation should be proven", description: "Verifiable reputation infrastructure, live on Whitechain Sepolia." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${chakraPetch.variable} ${spaceMono.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
