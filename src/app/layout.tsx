import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({ src: "../../public/fonts/inter-latin.woff2", variable: "--font-sans", display: "swap" });
const chakraPetch = localFont({
  src: [
    { path: "../../public/fonts/chakra-petch-400-latin.woff2", weight: "400" },
    { path: "../../public/fonts/chakra-petch-600-latin.woff2", weight: "600" },
    { path: "../../public/fonts/chakra-petch-700-latin.woff2", weight: "700" },
  ],
  variable: "--font-display",
  display: "swap",
});
const spaceMono = localFont({
  src: [
    { path: "../../public/fonts/space-mono-400-latin.woff2", weight: "400" },
    { path: "../../public/fonts/space-mono-700-latin.woff2", weight: "700" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sovaprotocol.xyz"),
  title: "SOVA Protocol - Verifiable Reputation on Whitechain",
  description: "Issuer-signed, schema-bound onchain attestations for explicit and explainable consumer policies. Live on Whitechain Sepolia.",
  openGraph: { title: "SOVA Protocol - Reputation should be proven", description: "Verifiable reputation infrastructure, live on Whitechain Sepolia.", url: "https://sovaprotocol.xyz", siteName: "SOVA Protocol", type: "website" },
  twitter: { card: "summary", title: "SOVA Protocol - Reputation should be proven", description: "Verifiable reputation infrastructure, live on Whitechain Sepolia." },
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
