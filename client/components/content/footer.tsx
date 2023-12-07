/**
 * Title: Write a program using JavaScript on Footer
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
import { TiAttachment } from "react-icons/ti";
import { FiSend } from "react-icons/fi";
import { Tooltip } from "@nextui-org/react";

const Footer = (): React.ReactNode => {
  return (
    <form className="flex flex-row items-center gap-x-2">
      <Tooltip
        content="Send Photos"
        placement="top"
        classNames={{
          base: ["before:bg-neutral-400"],
          content: [
            "py-2 px-4 shadow-xl",
            "text-black bg-gradient-to-br from-white to-neutral-400",
          ],
        }}
      >
        <label htmlFor="attachment" className="relative flex">
          <input
            type="file"
            name="attachment"
            id="attachment"
            className="absolute inset-0 opacity-0 h-full w-full cursor-pointer text-sm"
          />
          <span className="p-1 rounded-full border">
            <TiAttachment className="w-5 h-5 text-white" />
          </span>
        </label>
      </Tooltip>
      <input
        type="text"
        name="message"
        id="message"
        placeholder="Write your message"
        className="w-full bg-transparent border !border-white focus:!border-white focus:!ring-0 focus:!outline-none rounded-full py-1 px-3"
      />
      <Tooltip
        content="Send Message"
        placement="top"
        classNames={{
          base: ["before:bg-neutral-400"],
          content: [
            "py-2 px-4 shadow-xl",
            "text-black bg-gradient-to-br from-white to-neutral-400",
          ],
        }}
      >
        <button type="submit" className="p-1 rounded border">
          <FiSend className="w-5 h-5" />
        </button>
      </Tooltip>
    </form>
  );
};

export default Footer;
