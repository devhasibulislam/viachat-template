"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store";

const Providers = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <>{children}</>
      </Provider>

      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          style: {
            border: "1px solid #7852ce",
          },
        }}
      />
    </>
  );
};

export default Providers;
