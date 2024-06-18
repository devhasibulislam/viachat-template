const { viachatApi } = require("../viachat");

const otpApi = viachatApi.injectEndpoints({
  endpoints: (build) => ({
    verifyOTP: build.mutation({
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

export const { useVerifyOTPMutation } = otpApi;
