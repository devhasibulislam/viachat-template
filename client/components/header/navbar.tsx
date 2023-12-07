/**
 * Title: Write a program using JavaScript on Navbar
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

import Image from "next/image";
import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { Avatar, Tooltip } from "@nextui-org/react";

const Navbar = (): React.ReactNode => {
  return (
    <section className="flex flex-row justify-between items-center">
      {/* Logo Section */}
      <Image src="/logo.svg" alt="logo" height={30} width={30} />

      {/* Action Center */}
      <Tooltip
        content="Sign Out"
        placement="bottom"
        classNames={{
          base: ["before:bg-neutral-400"],
          content: [
            "py-2 px-4 shadow-xl",
            "text-black bg-gradient-to-br from-white to-neutral-400",
          ],
        }}
      >
        <button className="flex flex-row items-center gap-2 border rounded-full p-0.5">
          <Avatar
            src="https://i.pravatar.cc/50"
            className="h-[20px] w-[20px] rounded-full"
          />
          <IoLogOutOutline className="w-5 h-5" />
        </button>
      </Tooltip>
    </section>
  );
};

export default Navbar;
