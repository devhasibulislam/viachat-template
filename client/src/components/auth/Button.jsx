import React from "react";

const Button = ({ className, children, ...props }) => {
  return (
    <button {...props} className={`px-4 py-2 bg-neutral rounded-neutral ${className}`}>
      {children}
    </button>
  );
};

export default Button;
