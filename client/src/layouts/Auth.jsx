import React from "react";

const Auth = ({ children }) => {
  return (
    <main className="h-screen w-screen overflow-y-scroll scrollbar-hide">
      {children}
    </main>
  );
};

export default Auth;
