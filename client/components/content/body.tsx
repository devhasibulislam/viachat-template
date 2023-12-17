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

"use client";

import conversations from "@/data/conversations";
import { Avatar, ScrollShadow, Tooltip } from "@nextui-org/react";
import React, { useRef, useEffect } from "react";

const Body = (): React.ReactNode => {
  const scrollRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Scroll to bottom when component mounts or conversations change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversations]);

  return (
    <ScrollShadow
      ref={scrollRef}
      hideScrollBar
      className="h-full border rounded-lg p-3 overflow-y-auto"
    >
      {conversations?.map((conversation) => (
        <div key={conversation?._id} className="flex flex-col gap-y-4">
          <div />

          {/* Receiver's Messages */}
          <div className="lg:w-[45%] md:w-[48%] w-3/4 mr-auto flex flex-row items-end gap-x-2">
            <Tooltip
              content="John Doe"
              placement="bottom"
              classNames={{
                base: ["before:bg-neutral-400"],
                content: [
                  "py-2 px-4 shadow-xl",
                  "text-black bg-gradient-to-br from-white to-neutral-400",
                ],
              }}
            >
              <div className="order-1 h-[30px] w-[30px]">
                <Avatar
                  src="https://i.pravatar.cc/50"
                  className="h-[30px] w-[30px] rounded-full"
                />
              </div>
            </Tooltip>
            <div className="flex flex-col gap-y-2.5 order-2">
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
          <div className="lg:w-[45%] md:w-[48%] w-3/4 ml-auto flex flex-row items-end gap-x-2">
            <Tooltip
              content="Marry Kom"
              placement="bottom"
              classNames={{
                base: ["before:bg-neutral-400"],
                content: [
                  "py-2 px-4 shadow-xl",
                  "text-black bg-gradient-to-br from-white to-neutral-400",
                ],
              }}
            >
              <div className="order-2 h-[30px] w-[30px]">
                <Avatar
                  src="https://i.pravatar.cc/50"
                  className="h-[30px] w-[30px] rounded-full"
                />
              </div>
            </Tooltip>
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
