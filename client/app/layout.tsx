import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import State from "@/components/redux/State";
import Persistance from "@/components/redux/Persistance";
import { Providers } from "../components/nextui/providers";

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
      <body className={`${inter.variable} ${ubuntu.variable}`}>
        <State>
          <Persistance>
            <Providers>{children}</Providers>
          </Persistance>
        </State>
      </body>
    </html>
  );
}
