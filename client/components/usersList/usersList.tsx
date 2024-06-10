/**
 * Title: Write a program using JavaScript on UsersList
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

import users from "@/data/users";
import { Avatar, ScrollShadow } from "@nextui-org/react";
import React from "react";
import moment from "moment";

moment().format();

const UsersList = () => {
  const momentDifference = (time: string) => {
    const timestamp = time;
    const date = moment(timestamp);

    return date.fromNow();
  };

  return (
    <section
      className="h-full w-full flex flex-col gap-y-4 overflow-y-auto border rounded-lg p-3 scrollbar-hide"
    >
      {users.map((user, index) => (
        <div
          key={user?._id}
          className={`flex flex-row gap-x-2 items-start cursor-pointer p-2 rounded-lg ${
            index === 0 && "bg-[#7852ce]"
          }`}
        >
          <div className="h-[30px] w-[30px]">
            <Avatar
              src={user?.avatar}
              className="h-[30px] w-[30px] object-cover rounded-full"
            />
          </div>
          <article className="flex flex-col gap-y-0.5">
            <h2 className="text-base line-clamp-1">{user?.name}</h2>
            <p className="text-xs line-clamp-2 text-slate-300">{user?.text}</p>
            <span className="!text-xs text-slate-400">
              {momentDifference(user?.createdAt)}
            </span>
          </article>
        </div>
      ))}
    </section>
  );
};

export default UsersList;
