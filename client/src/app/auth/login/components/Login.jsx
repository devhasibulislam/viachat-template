"use client";

import Button from "@/components/auth/Button";
import useToastMessage from "@/hooks/useToastMessage";
import Link from "next/link";
import { useLoginMutation } from "@/services/auth/authApi";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Auth from "@/layouts/Auth";
import Logo from "@/components/logo/Logo";
import getCookie from "@/libs/getCookie";

const Login = () => {
  const { handleSubmit, control } = useForm();
  const [login, { isLoading, data, error }] = useLoginMutation();

  useToastMessage(isLoading, data, error);

  useEffect(() => {
    if (data && data.acknowledgement === true) {
      console.log(data.accessToken);

      if (typeof window !== "undefined") {
        const date = new Date();
        // Adjust the date to BST (UTC+6)
        const bstOffset = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
        const localTime = date.getTime();
        const bstTime = new Date(localTime + bstOffset);
        bstTime.setTime(bstTime.getTime() + 1 * 60 * 60 * 1000); // Add 1 hour
        const expires = "expires=" + bstTime.toUTCString();
        document.cookie = `accessToken=${data.accessToken}; ${expires}; path=/`;
      }
    }

    if (getCookie("accessToken")) {
      if (typeof window !== "undefined") window.location.href = "/";
    }
  }, [data]);

  const handleLogin = (data) => {
    login(data);
  };

  return (
    <Auth>
      <section className="w-full h-full flex justify-center items-center">
        <div className="grid grid-cols-12 w-full h-full">
          <div className="lg:col-span-3 md:col-span-6 col-span-12 h-full w-full p-6 flex flex-col gap-y-12">
            <div className="flex flex-col gap-y-6">
              {/* Logo Section */}
              <Logo />

              <h2 className="text-black text-4xl font-bold">
                Signin Your Account
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col gap-y-4 text-black"
            >
              {/* email */}
              <label htmlFor="email" className="w-full">
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      autoComplete="off"
                      placeholder="Enter your email*"
                      className="w-full rounded-neutral"
                    />
                  )}
                />
              </label>

              {/* password */}
              <div className="flex flex-col gap-y-1">
                <label htmlFor="password" className="w-full">
                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        autoComplete="off"
                        placeholder="Enter your name*"
                        className="w-full rounded-neutral"
                      />
                    )}
                  />
                </label>
                <p className="text-sm text-left text-black">
                  Forget your password?{" "}
                  <Link href="/auth/reset" className="text-sm underline">
                    Reset here
                  </Link>
                </p>
              </div>

              {/* login */}
              <Button
                type="submit"
                className="w-fit mt-4 text-white text-primary"
              >
                Login
              </Button>
            </form>

            <p className="text-sm text-left text-black mt-auto">
              Want to create an account?{" "}
              <Link href="/auth/register" className="text-sm underline">
                Register here
              </Link>
            </p>
          </div>
          <div
            className="lg:col-span-9 md:col-span-6 md:block hidden h-full w-full bg-no-repeat bg-cover p-12"
            style={{
              backgroundImage: `url("/assets/models/signin.jpg")`,
            }}
          >
            <div className="h-full w-full flex flex-col gap-y-4 border rounded-md p-8 text-white">
              <h1 className="text-5xl font-bold lg:block hidden">
                ViaChat <br /> is come closer <br /> near to you soon!
              </h1>
              <p>
                Enjoy technical deep-dives, one-on-one expert advice, <br /> and
                product tutorials to elevate your skills.
              </p>

              <p className="mt-auto text-">
                <span className="flex gap-x-1">
                  Email:{" "}
                  <b
                    className="font-bold"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "devhasibulislam@gmail.com"
                      );
                    }}
                  >
                    devhasibulislam@gmail.com
                  </b>
                </span>
                <span className="flex gap-x-1">
                  Password:{" "}
                  <b
                    className="font-bold"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "devhasibulislam@gmail.com"
                      );
                    }}
                  >
                    Hasib@123
                  </b>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Auth>
  );
};

export default Login;
