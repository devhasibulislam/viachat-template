"use client";

import Button from "@/components/auth/Button";
import useToastMessage from "@/hooks/useToastMessage";
import Auth from "@/layouts/Auth";
import { useRegisterMutation } from "@/services/auth/authApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCamera } from "react-icons/md";
import Logo from "@/components/logo/Logo";

const Register = () => {
  const { handleSubmit, control } = useForm();
  const [avatarPreview, setAvatarPreview] = useState(File | null);
  const [register, { isLoading, data, error }] = useRegisterMutation();

  useToastMessage(isLoading, data, error);

  useEffect(() => {
    if (data && data.acknowledgement === true) {
      if (typeof window !== "undefined")
        window.location.href = "/auth/register/otp";
    }
  }, [data]);

  const handleAvatarPreview = (e) => {
    const file = e.target.files[0];

    if (!avatarPreview) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleRegister = (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    register(formData);
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
                Create Your Account
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(handleRegister)}
              className="flex flex-col gap-y-4 text-black"
            >
              {/* avatar */}
              <label htmlFor="avatar" className="w-full">
                <Controller
                  control={control}
                  name="avatar"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="border border-black rounded-neutral p-2 w-[134px] h-[88px] relative">
                      {avatarPreview ? (
                        <>
                          <img
                            src={avatarPreview}
                            alt={avatarPreview}
                            srcset={avatarPreview}
                            className="h-full w-full max-w-full object-cover object-top rounded-neutral"
                          />
                        </>
                      ) : (
                        <>
                          <span className="flex flex-col gap-y-0.5 items-center justify-center text-center h-full w-full">
                            <MdCamera className="h-7 w-7 text-neutral" />
                            Choose Avatar
                          </span>
                          <input
                            type="file"
                            name="avatar"
                            accept="image/png, image/jpg, image/jpeg"
                            className="opacity-0 absolute top-0 left-0 h-full w-full cursor-pointer"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleAvatarPreview(e);
                                field.onChange(e.target.files[0]);
                              }
                            }}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            required
                          />
                        </>
                      )}
                    </div>
                  )}
                />
              </label>

              {/* name */}
              <label htmlFor="name" className="w-full">
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your name*"
                      className="w-full rounded-neutral"
                    />
                  )}
                />
              </label>

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
                      placeholder="Enter your password*"
                      className="w-full rounded-neutral"
                    />
                  )}
                />
              </label>

              {/* register */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-fit mt-4 text-white"
              >
                Register
              </Button>
            </form>

            <p className="text-sm text-left text-black mt-auto">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-sm underline">
                Login here
              </Link>
            </p>
          </div>
          <div
            className="lg:col-span-9 md:col-span-6 md:block hidden h-full w-full bg-no-repeat bg-cover p-12"
            style={{
              backgroundImage: `url("/assets/models/signup.jpg")`,
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

export default Register;
