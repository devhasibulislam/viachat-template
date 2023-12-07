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
import { Avatar, ScrollShadow } from "@nextui-org/react";
import React from "react";

const Body = () => {
  return (
    <ScrollShadow
      hideScrollBar
      className="h-full border rounded-lg p-3 overflow-y-auto"
    >
      {conversations?.map((conversation) => (
        <div key={conversation?._id} className="flex flex-col gap-y-4">
          <div />

          {/* Receiver's Messages */}
          <div className="w-[45%] mr-auto flex flex-row items-end gap-x-2">
            <div>
              <Avatar
                src="https://i.pravatar.cc/50"
                className="h-[30px] w-[30px] rounded-full"
              />
            </div>
            <div className="flex flex-col gap-y-2.5">
              {conversation?.receiver.map((message) => (
                <p
                  key={message}
                  className="bg-[#705ad3] p-2 rounded-md text-sm"
                >
                  {message}
                </p>
              ))}
            </div>
          </div>

          {/* Sender's Messages */}
          <div className="w-[45%] ml-auto flex flex-row items-end gap-x-2">
            <div className="order-2">
              <Avatar
                src="https://i.pravatar.cc/50"
                className="h-[30px] w-[30px] rounded-full"
              />
            </div>
            <div className="flex flex-col gap-y-2.5 order-1">
              {conversation?.sender.map((message) => (
                <p
                  key={message}
                  className="bg-[#705ad3] p-2 rounded-md text-sm"
                >
                  {message}
                </p>
              ))}
            </div>
          </div>

          <div />
        </div>
      ))}
    </ScrollShadow>
  );
};

export default Body;
