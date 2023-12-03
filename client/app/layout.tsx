import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "Chat App",
  description:
    "Chatting app allows you to communicate with your customers in web chat rooms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ubuntu.variable}`}>{children}</body>
    </html>
  );
}
