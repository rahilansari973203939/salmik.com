import "./globals.css";
import { Fraunces, Manrope } from "next/font/google";
import { ClientProvider } from "./providers";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata = {
  title: "BrushRiceMart | Premium Brushes & Rice",
  description:
    "Shop curated hair brushes and premium rice varieties with fast delivery, easy returns, and secure checkout.",
  icons: {
    icon: "/images/salmik.png",
    shortcut: "/images/salmik.png",
    apple: "/images/salmik.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${fraunces.variable} font-sans`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
