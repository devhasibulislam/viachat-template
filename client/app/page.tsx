/**
 * Title: Write a program using JavaScript on Page
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

import Recipients from "@/components/layouts/recipients";
import Contents from "@/components/layouts/contents";
import React from "react";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer/footer";

export default function Home(): React.ReactNode {
  return (
    <main className="h-screen w-screen">
      <section className="max-w-5xl mx-auto h-full flex flex-col gap-y-4 p-2">
        {/* Navbar Section */}
        <Navbar />

        {/* Chat Section */}
        <section className="grid grid-cols-12 gap-x-4 h-full overflow-hidden">
          <Recipients />
          <Contents />
        </section>

        {/* Footer Section */}
        <Footer />
      </section>
    </main>
  );
}
