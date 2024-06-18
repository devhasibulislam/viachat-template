import React from "react";

const Button = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-neutral rounded-neutral disabled:bg-neutral/30 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
