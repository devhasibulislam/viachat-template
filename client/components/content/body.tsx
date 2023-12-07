/**
 * Title: Write a program using JavaScript on Body
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
 * Date: 07, December 2023
 */

import conversations from "@/data/conversations";
import React from "react";

const Body = () => {
  return (
    <section className="h-full border rounded-lg flex flex-row justify-center items-center p-3">
      {conversations.map((conversation) => (
        <div key={conversation?._id} className="">
          {/* Write code here */}
        </div>
      ))}
      Message Body
    </section>
  );
};

export default Body;
