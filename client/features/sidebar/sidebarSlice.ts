/**
 * Title: Write a program using JavaScript on SidebarSlice
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
 * Date: 17, December 2023
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapse: true,
  expand: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    collapseSidebar: (state) => {
      state.collapse = true;
      state.expand = false;
    },
    expandSidebar: (state) => {
      state.collapse = false;
      state.expand = true;
    },
  },
});

export const { collapseSidebar, expandSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
