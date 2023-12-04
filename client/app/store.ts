/**
 * Title: Write a program using JavaScript on Store
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

import { viaChatApi } from "@/services/viaChat";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [viaChatApi.reducerPath]: viaChatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== "production",
});
