/**
 * Title: Write a program using JavaScript on Persistance
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
 * Date: 04, December 2023
 */

"use client";

import useToastMessage from "@/hooks/useToastMessage";
import { usePersistQuery } from "@/services/auth/authApi";
import React, { ReactNode } from "react";

const Persistance = ({ children }: { children: ReactNode }) => {
  const { data, error, isLoading } = usePersistQuery({});

  useToastMessage(data, error, isLoading);

  return <> {children} </>;
};

export default Persistance;
