/**
 * Title: Write a program using JavaScript on Register
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
 * Date: 08, June 2024
 */

"use client";

import React from "react";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { Button, Input, Link } from "@nextui-org/react";
import Image from "next/image";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const Register = (): React.ReactNode => {
  const { handleSubmit, control } = useForm<FormValues>();

  const handleRegister = (data: FormValues) => {
    console.log(data);
  };

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="grid grid-cols-12 w-full h-full">
        <div className="col-span-3 h-full w-full p-6 flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-6">
            {/* Logo Section */}
            <Image
              src="/logo.svg"
              alt="logo"
              height={50}
              width={50}
              className="cursor-pointer"
              onClick={() => {
                if (typeof window !== "undefined") window.location.href = "/";
              }}
            />
            <h2 className="text-black text-4xl font-bold">
              Create Your Account
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-y-4 text-black"
          >
            {/* name */}
            <label htmlFor="name" className="">
              <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "name">;
                }) => (
                  <Input
                    {...field}
                    isRequired
                    type="text"
                    variant="bordered"
                    label="Name"
                    radius="sm"
                    size="sm"
                    className=""
                  />
                )}
              />
            </label>

            {/* email */}
            <label htmlFor="email" className="">
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "email">;
                }) => (
                  <Input
                    {...field}
                    isRequired
                    type="email"
                    variant="bordered"
                    label="Email"
                    radius="sm"
                    size="sm"
                    className=""
                  />
                )}
              />
            </label>

            {/* password */}
            <label htmlFor="password" className="">
              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "password">;
                }) => (
                  <Input
                    {...field}
                    isRequired
                    type="password"
                    variant="bordered"
                    label="Password"
                    radius="sm"
                    size="sm"
                    className=""
                  />
                )}
              />
            </label>

            {/* register */}
            <Button
              type="submit"
              color="success"
              radius="sm"
              className="w-fit mt-4 text-white"
            >
              Register
            </Button>
          </form>

          <p className="text-sm text-left text-black mt-auto">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-sm">
              Login here
            </Link>
          </p>
        </div>
        <div
          className="col-span-9 h-full w-full bg-no-repeat bg-cover p-12"
          style={{
            backgroundImage: `url("/assets/models/signup.jpg")`,
          }}
        >
          <div className="h-full w-full flex flex-col gap-y-4 border rounded-md p-8">
            <h1 className="text-5xl font-bold">
              ViaChat <br /> is come closer <br /> near to you soon!
            </h1>
            <p>
              Enjoy technical deep-dives, one-on-one expert advice, <br /> and
              product tutorials to elevate your skills.
            </p>

            <p className="mt-auto">
              Enjoy a 50% discount with code <b className="font-bold">WEB50.</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
