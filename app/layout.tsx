import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartSheet } from "@/modules/cart";
import { Navbar } from "@/modules/navbar";
import { AppToaster, ThemeScript } from "@/modules/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Brew & Co. · Order coffee ahead", template: "%s · Brew & Co." },
  description: "Order fresh coffee ahead and skip the line.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <CartSheet />
        <AppToaster />
      </body>
    </html>
  );
}
