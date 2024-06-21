"use client";

import React, { useState } from "react";
import Information from "./Information";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Navbar from "./Navbar";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);
  const [information, setInformation] = useState(false);

  return (
    <section className="h-full w-full flex flex-col gap-y-1 p-1">
      {/* header */}
      <header className="w-full p-1 lg:hidden">
        <Navbar
          sidebar={sidebar}
          setSidebar={setSidebar}
          information={information}
          setInformation={setInformation}
        />
      </header>

      {/* body */}
      <section className="h-full w-full grid grid-cols-12 gap-x-1 relative">
        {/* sidebar */}
        <section className="h-full w-full lg:col-span-2 md:col-span-4 md:block hidden">
          <Sidebar />
        </section>

        {/* content */}
        <section className="h-full w-full lg:col-span-7 md:col-span-8 col-span-12">
          <Content />
        </section>

        {/* information */}
        <section className="h-full w-full lg:col-span-3 lg:block hidden">
          <Information />
        </section>

        {/* for lower device */}
        {sidebar && (
          <section className="absolute top-0 left-0 h-full w-full col-span-12 md:hidden">
            <Sidebar />
          </section>
        )}

        {information && (
          <section className="absolute top-0 right-0 h-full w-full md:w-1/2 col-span-12 block lg:hidden">
            <Information />
          </section>
        )}
      </section>
    </section>
  );
};

export default Home;
