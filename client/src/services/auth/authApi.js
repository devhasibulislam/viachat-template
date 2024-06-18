import getCookie from "@/libs/getCookie";
const { viachatApi } = require("../viachat");

const authApi = viachatApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      invalidatesTags: ["User"],
    }),

    register: build.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    reset: build.mutation({
      query: (body) => ({
        url: "/auth/reset",
        method: "POST",
        body,
      }),
    }),

    verifyReset: build.mutation({
      query: ({ token, password }) => ({
        url: `/auth/reset?token=${token}`,
        method: "PUT",
        body: { password },
      }),
    }),

    persist: build.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResetMutation,
  useVerifyResetMutation,
  usePersistQuery,
} = authApi;
