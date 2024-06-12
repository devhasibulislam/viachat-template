/**
 * Title: Write a program using JavaScript on AuthApi
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
 * Date: 13, June 2024
 */

import { viaChatApi } from "../viaChat";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

interface Avatar {
  url: string;
  public_id: string;
}

interface AuthData {
  name: string;
  email: string;
  password: string;
  avatar: Avatar;
}

const authApi = viaChatApi.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    login: builder.mutation({
      query: (data: AuthData) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data: AuthData) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    reset: builder.mutation({
      query: () => ({
        url: "/auth/reset",
        method: "POST",
      }),
    }),
    persist: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResetMutation,
  usePersistQuery,
} = authApi;
