import React, { Suspense } from "react";
import Password from "./components/Password";

const Page = () => {
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Password />
      </Suspense>
    </>
  );
};

export default Page;
