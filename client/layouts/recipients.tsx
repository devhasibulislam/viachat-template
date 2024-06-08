/**
 * Title: Write a program using JavaScript on Recipients
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

import React from "react";
import UserFilter from "../components/filter/userFilter";
import UsersList from "../components/usersList/usersList";

const Recipients = (): React.ReactNode => {
  return (
    <section className="md:block md:col-span-4 md:h-full md:w-full md:overflow-hidden hidden">
      <div className="h-full w-full flex flex-col gap-y-4">
        {/* User Filter */}
        <UserFilter />

        {/* Users List */}
        <UsersList />
      </div>
    </section>
  );
};

export default Recipients;
