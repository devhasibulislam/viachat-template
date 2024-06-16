import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <>
      <Image
        src="/logo.svg"
        alt="logo"
        height={50}
        width={50}
        className="cursor-pointer"
        onClick={() => {
          if (typeof window !== "undefined") window.location.href = "/";
        }}
      />
    </>
  );
};

export default Logo;
