import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const viachatApi = createApi({
  reducerPath: "viachatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  }),
  tagTypes: ["User", "OTP"],
  endpoints: () => ({}),
});
