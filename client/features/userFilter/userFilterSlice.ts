/**
 * Title: Write a program using JavaScript on UserFilterSlice
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
 * Date: 06, December 2023
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  filteredUsers: [],
};

const userFilterSlice = createSlice({
  name: "userFilter",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
  },
});

export const { setUserName, setFilteredUsers } = userFilterSlice.actions;
export default userFilterSlice.reducer;
