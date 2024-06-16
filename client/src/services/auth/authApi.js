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

    persist: build.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),

      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResetMutation,
  usePersistQuery,
} = authApi;
