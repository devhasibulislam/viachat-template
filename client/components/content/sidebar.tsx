/**
 * Title: Write a program using JavaScript on Sidebar
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
 * Date: 17, December 2023
 */

import React from "react";
import UserFilter from "../filter/userFilter";
import UsersList from "../usersList/usersList";

const Sidebar = (): React.ReactNode => {
  return (
    <section className="absolute top-0 left-0 w-full h-full bg-[#242e35]">
      <div className="h-full w-full flex flex-col gap-y-4">
        {/* User Filter */}
        <UserFilter />

        {/* Users List */}
        <UsersList />
      </div>
    </section>
  );
};

export default Sidebar;
