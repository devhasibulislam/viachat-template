/**
 * Title: Write a program using JavaScript on Header
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

import React from "react";
import { Tooltip } from "@nextui-org/react";
import { IoMdCall } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";

const Header = () => {
  return (
    <section className="border rounded-lg flex flex-row justify-between items-center p-3">
      <h1 className="font-bold text-lg">John Doe</h1>
      <p className="flex flex-row gap-x-2">
        <Tooltip
          content="Voice Call"
          placement="bottom"
          classNames={{
            base: ["before:bg-neutral-400"],
            content: [
              "py-2 px-4 shadow-xl",
              "text-black bg-gradient-to-br from-white to-neutral-400",
            ],
          }}
        >
          <button className="p-1 rounded-full border">
            <IoMdCall className="h-5 w-5 text-white" />
          </button>
        </Tooltip>
        <Tooltip
          content="Video Call"
          placement="bottom"
          classNames={{
            base: ["before:bg-neutral-400"],
            content: [
              "py-2 px-4 shadow-xl",
              "text-black bg-gradient-to-br from-white to-neutral-400",
            ],
          }}
        >
          <button className="p-1 rounded-full border">
            <MdVideoCall className="h-5 w-5 text-white" />
          </button>
        </Tooltip>
      </p>
    </section>
  );
};

export default Header;
