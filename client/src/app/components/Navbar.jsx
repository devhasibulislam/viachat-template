import Image from "next/image";
import React from "react";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { VscLayoutSidebarRight } from "react-icons/vsc";
import { RiSidebarFoldLine } from "react-icons/ri";
import { RiSidebarUnfoldLine } from "react-icons/ri";

const Navbar = ({ sidebar, setSidebar, information, setInformation }) => {
  return (
    <nav className="w-full flex flex-row gap-x-4 justify-between items-center">
      <Image src="/logo.svg" alt="logo" height={40} width={40} />

      <p className="flex flex-row gap-x-2 lg:hidden">
        {sidebar ? (
          <button
            type="button"
            className="border border-black rounded-md p-0.5 md:hidden"
            onClick={() => {
              setSidebar(!sidebar);
              setInformation(false);
            }}
          >
            <RiSidebarFoldLine className="h-7 w-7" />
          </button>
        ) : (
          <button
            type="button"
            className="border border-black rounded-md p-0.5 md:hidden"
            onClick={() => {
              setSidebar(!sidebar);
              setInformation(false);
            }}
          >
            <VscLayoutSidebarLeft className="h-7 w-7" />
          </button>
        )}

        {information ? (
          <button
            type="button"
            className="border border-black rounded-md p-0.5"
            onClick={() => {
              setInformation(!information);
              setSidebar(false);
            }}
          >
            <RiSidebarUnfoldLine className="h-7 w-7" />
          </button>
        ) : (
          <button
            type="button"
            className="border border-black rounded-md p-0.5"
            onClick={() => {
              setInformation(!information);
              setSidebar(false);
            }}
          >
            <VscLayoutSidebarRight className="h-7 w-7" />
          </button>
        )}
      </p>
    </nav>
  );
};

export default Navbar;
