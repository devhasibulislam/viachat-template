const { viachatApi } = require("../viachat");

const otpApi = viachatApi.injectEndpoints({
  endpoints: (build) => ({
    verify: build.mutation({
      query: ({ otp }) => ({
        url: "/otp/verify",
        method: "PUT",
        body: {
          otp,
        },
      }),

      invalidatesTags: ["User", "OTP"],
    }),
  }),
});

export const { useVerifyMutation } = otpApi;
