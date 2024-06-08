/**
 * Title: Write a program using JavaScript on Contents
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

import React from "react";
import Header from "../components/content/header";
import Body from "../components/content/body";
import Footer from "../components/content/footer";

const Contents = (): React.ReactNode => {
  return (
    <section className="md:col-span-8 col-span-12 h-full w-full overflow-y-hidden">
      <div className="h-full w-full flex flex-col gap-y-4">
        <Header />
        <Body />
        <Footer />
      </div>
    </section>
  );
};

export default Contents;
