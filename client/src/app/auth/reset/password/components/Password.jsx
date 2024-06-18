"use client";

import Button from "@/components/auth/Button";
import useToastMessage from "@/hooks/useToastMessage";
import Link from "next/link";
import { useVerifyMutation } from "@/services/auth/authApi";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Auth from "@/layouts/Auth";
import Logo from "@/components/logo/Logo";
import { useSearchParams } from "next/navigation";

const Password = () => {
  const { handleSubmit, control } = useForm();
  const [verify, { isLoading, data, error }] = useVerifyMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useToastMessage(isLoading, data, error);

  useEffect(() => {
    if (data && data.acknowledgement === true) {
      if (typeof window !== "undefined") window.location.href = "/auth/login";
    }
  }, [data]);

  const handleNewPassword = (data) => {
    verify({
      token: token,
      password: data.password,
    });
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
                Set New Password
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(handleNewPassword)}
              className="flex flex-col gap-y-4 text-black"
            >
              {/* password */}
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
                      placeholder="Enter new password*"
                      className="w-full rounded-neutral"
                    />
                  )}
                />
              </label>

              {/* reset */}
              <Button
                type="submit"
                className="w-fit mt-4 text-white text-primary"
              >
                Reset
              </Button>
            </form>

            <p className="text-sm text-left text-black mt-auto">
              Want to login to account?{" "}
              <Link href="/auth/login" className="text-sm underline">
                Login here
              </Link>
            </p>
          </div>
          <div
            className="lg:col-span-9 md:col-span-6 md:block hidden h-full w-full bg-no-repeat bg-cover p-12"
            style={{
              backgroundImage: `url("/assets/models/reset-email.jpg")`,
            }}
          >
            <div className="h-full w-full flex flex-col gap-y-4 border rounded-md p-8 text-white">
              <h1 className="text-5xl font-bold">
                ViaChat <br /> is come closer <br /> near to you soon!
              </h1>
              <p>
                Enjoy technical deep-dives, one-on-one expert advice, <br /> and
                product tutorials to elevate your skills.
              </p>

              <p className="mt-auto">
                Enjoy a 50% discount with code{" "}
                <b className="font-bold">WEB50.</b>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Auth>
  );
};

export default Password;
