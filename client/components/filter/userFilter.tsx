/**
 * Title: Write a program using JavaScript on User Filter
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
 * Date: 06, December 2023
 */

"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setUserName } from "@/features/userFilter/userFilterSlice";

const UserFilter = (): React.ReactNode => {
  const dispatch = useDispatch();

  const getUserName = (name: string) => {
    dispatch(setUserName(name));
  };

  return (
    <Input
      size="sm"
      radius="sm"
      type="text"
      variant="bordered"
      onValueChange={getUserName}
      classNames={{
        input: "!bg-transparent !w-full",
        innerWrapper: "!bg-transparent !w-full",
        inputWrapper: [
          "!bg-transparent",
          "!w-full",
          "!border-1",
          "!border-white",
          "focus:!border-1",
          "focus:!border-white",
          "hover:!border-white",
        ],
      }}
      placeholder="Type recipient's name"
      startContent={<CiSearch className="w-5 h-5" />}
    />
  );
};

export default UserFilter;
