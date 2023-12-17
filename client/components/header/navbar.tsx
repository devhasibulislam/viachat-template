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

"use client";

import Image from "next/image";
import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { Avatar, Chip, Tooltip } from "@nextui-org/react";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  collapseSidebar,
  expandSidebar,
} from "@/features/sidebar/sidebarSlice";
import { RxCross2 } from "react-icons/rx";

const Navbar = (): React.ReactNode => {
  const sidebar = useSelector(
    (state: { sidebar: { expand: boolean; collapse: boolean } }) =>
      state.sidebar
  );
  const dispatch = useDispatch();

  return (
    <section className="flex flex-row justify-between items-center">
      {/* Sidebar Section */}
      <span className="text-white border-2 rounded-full p-1.5 md:hidden">
        {sidebar.collapse && (
          <FiMenu
            className="h-4 w-4"
            onClick={() => dispatch(expandSidebar())}
          />
        )}
        {sidebar.expand && (
          <RxCross2
            className="h-4 w-4"
            onClick={() => dispatch(collapseSidebar())}
          />
        )}
      </span>

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
        <Chip
          variant="bordered"
          avatar={<Avatar name="John Doe" src="https://i.pravatar.cc/50" />}
        >
          <IoLogOutOutline className="w-5 h-5 text-white" />
        </Chip>
      </Tooltip>
    </section>
  );
};

export default Navbar;
