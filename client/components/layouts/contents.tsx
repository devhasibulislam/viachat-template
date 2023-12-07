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
import Header from "../content/header";
import Body from "../content/body";
import Footer from "../content/footer";

const Contents = (): React.ReactNode => {
  return (
    <section className="col-span-8 h-full w-full overflow-y-hidden">
      <div className="h-full w-full flex flex-col gap-y-4">
        <Header />
        <Body />
        <Footer />
      </div>
    </section>
  );
};

export default Contents;
