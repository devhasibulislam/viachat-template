"use client";

import { setAuth } from "@/features/auth/authSlice";
import { usePersistQuery } from "@/services/auth/authApi";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Auth = ({ children }) => {
  const { isLoading, data, error } = usePersistQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      console.warn("Please wait, the request is loading");
    }

    if (data) {
      if (data.acknowledgement === true) {
        dispatch(setAuth(data.data));

        console.info(data.description);
      }
      if (data.acknowledgement === false) {
        console.error(data.description);
      }
    }

    if (error && error.data) {
      console.error(error.data.description);
    }
  }, [isLoading, data, error]);

  return <>{children}</>;
};

export default Auth;
