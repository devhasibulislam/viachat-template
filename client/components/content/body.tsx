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
import { ScrollShadow } from "@nextui-org/react";
import React from "react";

const Body = () => {
  return (
    <ScrollShadow
      hideScrollBar
      className="h-full border rounded-lg p-3 overflow-y-auto"
    >
      {conversations?.map((conversation) => (
        <div key={conversation?._id} className="flex flex-col gap-y-2.5">
          {conversation?.receiver.map((message) => (
            <p
              key={message}
              className="w-[45%] mr-auto bg-[#705ad3] p-2 rounded-md text-sm"
            >
              {message}
            </p>
          ))}
          {conversation?.sender.map((message) => (
            <p
              key={message}
              className="w-[45%] ml-auto bg-[#705ad3] p-2 rounded-md text-sm"
            >
              {message}
            </p>
          ))}
        </div>
      ))}
    </ScrollShadow>
  );
};

export default Body;
