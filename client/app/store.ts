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

import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "@/features/sidebar/sidebarSlice";
import userFilterSlice from "@/features/userFilter/userFilterSlice";
import { viaChatApi } from "@/services/viaChat";

export const store = configureStore({
  reducer: {
    [viaChatApi.reducerPath]: viaChatApi.reducer,
    userFilter: userFilterSlice,
    sidebar: sidebarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(viaChatApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
