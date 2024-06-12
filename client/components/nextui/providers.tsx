/**
 * Title: Write a program using JavaScript on Providers
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 05, December 2023
 */

"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          style: {
            border: "1px solid #7852ce",
          },
        }}
      />
    </NextUIProvider>
  );
}
