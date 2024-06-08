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
 * Date: 08, June 2024
 */

import Register from "@/components/auth/register/Register";
import React from "react";

const Page = (): React.ReactNode => {
  return (
    <section className="h-screen w-screen overflow-y-scroll scrollbar-hide !bg-white">
      <Register />
    </section>
  );
};

export default Page;
